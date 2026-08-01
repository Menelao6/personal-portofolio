#!/usr/bin/env node

/**
 * diff-translations.js
 *
 * Compares two JSON translation files (before / after) and outputs
 * a structured diff of added, modified, and removed keys.
 *
 * Usage:
 *   node diff-translations.js <before.json> <after.json> [--file <filename>] [--sha <commit>]
 *
 * Exit codes:
 *   0 — changes found (diff written to stdout)
 *   1 — no changes (empty diff)
 */

const fs = require("fs");
const path = require("path");

// ── helpers ──────────────────────────────────────────────────────────

/**
 * Flatten a nested object into dot-notation keys.
 *   { a: { b: "v" } }  →  { "a.b": "v" }
 * Arrays are kept as-is (values), not further flattened.
 */
function flatten(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

/**
 * Deep-equal comparison that handles primitives, arrays, and objects.
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

// ── main ─────────────────────────────────────────────────────────────

function diff(beforePath, afterPath, fileName, sha) {
  // Handle the case where a file didn't exist before (new file)
  let beforeRaw = "{}";
  if (fs.existsSync(beforePath)) {
    beforeRaw = fs.readFileSync(beforePath, "utf-8");
  }

  // Handle the case where a file was deleted
  let afterRaw = "{}";
  if (fs.existsSync(afterPath)) {
    afterRaw = fs.readFileSync(afterPath, "utf-8");
  }

  const beforeFlat = flatten(JSON.parse(beforeRaw));
  const afterFlat = flatten(JSON.parse(afterRaw));

  const allKeys = new Set([
    ...Object.keys(beforeFlat),
    ...Object.keys(afterFlat),
  ]);

  const added = [];
  const modified = [];
  const removed = [];

  for (const key of allKeys) {
    const inBefore = key in beforeFlat;
    const inAfter = key in afterFlat;

    if (!inBefore && inAfter) {
      added.push({ key, value: afterFlat[key] });
    } else if (inBefore && !inAfter) {
      removed.push({ key, lastValue: beforeFlat[key] });
    } else if (!deepEqual(beforeFlat[key], afterFlat[key])) {
      modified.push({
        key,
        oldValue: beforeFlat[key],
        newValue: afterFlat[key],
      });
    }
  }

  const totalChanges = added.length + modified.length + removed.length;

  return {
    file: fileName,
    sourceCommit: sha || "unknown",
    timestamp: new Date().toISOString(),
    summary: {
      added: added.length,
      modified: modified.length,
      removed: removed.length,
    },
    changes: {
      added: added.sort((a, b) => a.key.localeCompare(b.key)),
      modified: modified.sort((a, b) => a.key.localeCompare(b.key)),
      removed: removed.sort((a, b) => a.key.localeCompare(b.key)),
    },
    _hasChanges: totalChanges > 0,
  };
}

// ── CLI ──────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      "Usage: node diff-translations.js <before.json> <after.json> [--file <name>] [--sha <sha>]"
    );
    process.exit(2);
  }

  const beforePath = path.resolve(args[0]);
  const afterPath = path.resolve(args[1]);

  // Parse optional flags
  let fileName = path.basename(afterPath);
  let sha = "unknown";

  for (let i = 2; i < args.length; i++) {
    if (args[i] === "--file" && args[i + 1]) {
      fileName = args[++i];
    } else if (args[i] === "--sha" && args[i + 1]) {
      sha = args[++i];
    }
  }

  const result = diff(beforePath, afterPath, fileName, sha);

  // Remove internal flag before output
  const hasChanges = result._hasChanges;
  delete result._hasChanges;

  console.log(JSON.stringify(result, null, 2));

  process.exit(hasChanges ? 0 : 1);
}

module.exports = { diff, flatten, deepEqual };
"use client"

import { useState, useMemo } from "react"
import { Copy, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/context"

const namedColors: Record<string, string> = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedalmond: "#FFEBCD",
  blue: "#0000FF",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgray: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#00FF00",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#FF0000",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowgreen: "#9ACD32",
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function colorDistance(hex1: string, hex2: string) {
  const c1 = hexToRgb(hex1)
  const c2 = hexToRgb(hex2)
  return Math.sqrt(
    (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2
  )
}

function findClosestColorName(hex: string): string {
  let closest = ""
  let minDist = Infinity
  for (const [name, value] of Object.entries(namedColors)) {
    const dist = colorDistance(hex.toUpperCase(), value.toUpperCase())
    if (dist < minDist) {
      minDist = dist
      closest = name
    }
  }
  return closest
}

export function ColorTool() {
  const { t } = useTranslation()
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"name-to-hex" | "hex-to-name">(
    "name-to-hex"
  )

  const result = useMemo(() => {
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return null

    if (mode === "name-to-hex") {
      const hex = namedColors[trimmed]
      if (hex) return { color: hex, label: `${trimmed} = ${hex}` }
      return { color: null, label: t("tools.color.notFound") }
    } else {
      let hex = trimmed
      if (!hex.startsWith("#")) hex = `#${hex}`
      if (!/^#[0-9a-f]{6}$/i.test(hex))
        return { color: null, label: t("tools.color.invalidHex") }
      const name = findClosestColorName(hex)
      return {
        color: hex,
        label: `${t("tools.color.closest")}: ${name} (${namedColors[name]})`,
      }
    }
  }, [input, mode, t])

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(t("tools.color.copied"))
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {t("tools.color.title")}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={() =>
            setMode(mode === "name-to-hex" ? "hex-to-name" : "name-to-hex")
          }
        >
          <ArrowRightLeft className="h-4 w-4" />
          {mode === "name-to-hex"
            ? t("tools.color.nameToHex")
            : t("tools.color.hexToName")}
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={
            mode === "name-to-hex"
              ? t("tools.color.placeholderName")
              : t("tools.color.placeholderHex")
          }
        />
      </div>

      {result && (
        <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          {result.color && (
            <div
              className="h-14 w-14 flex-shrink-0 rounded-lg border border-border"
              style={{ backgroundColor: result.color }}
            />
          )}
          <div className="flex-1">
            <p className="font-mono text-sm text-foreground">{result.label}</p>
          </div>
          {result.color && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copy(result.color!)}
              className="flex-shrink-0"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy color</span>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

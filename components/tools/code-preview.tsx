"use client"

import { useState, useMemo } from "react"
import { Copy, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useTranslation } from "@/lib/i18n/context"

const defaultHTML = `<div class="card">
  <h1>Hello World</h1>
  <p>Edit the code and see the live preview!</p>
  <button onclick="alert('Clicked!')">Click me</button>
</div>`

const defaultCSS = `.card {
  font-family: system-ui, sans-serif;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  text-align: center;
}

h1 {
  color: #0f172a;
  margin-bottom: 0.5rem;
}

p {
  color: #64748b;
  margin-bottom: 1rem;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
}

button:hover {
  background: #1d4ed8;
}`

const defaultJS = `document.querySelector('button').addEventListener('mouseover', function() {
  this.style.transform = 'scale(1.05)';
  this.style.transition = 'transform 0.2s';
});

document.querySelector('button').addEventListener('mouseout', function() {
  this.style.transform = 'scale(1)';
});`

type Tab = "html" | "css" | "js"

export function CodePreview() {
  const { t } = useTranslation()
  const [html, setHtml] = useState(defaultHTML)
  const [css, setCss] = useState(defaultCSS)
  const [js, setJs] = useState(defaultJS)
  const [activeTab, setActiveTab] = useState<Tab>("html")

  const tabs: { id: Tab; label: string }[] = [
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "js", label: "JS" },
  ]

  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>${html}<script>${js}<\/script></body>
</html>`,
    [html, css, js]
  )

  const currentCode = activeTab === "html" ? html : activeTab === "css" ? css : js
  const setCurrentCode =
    activeTab === "html" ? setHtml : activeTab === "css" ? setCss : setJs

  const copyAll = () => {
    navigator.clipboard.writeText(srcDoc)
    toast.success(t("tools.codePreview.codeCopied"))
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Editor */}
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={copyAll}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">Copy all code</span>
            </Button>
          </div>
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            className="h-80 w-full resize-none bg-background p-4 text-xs leading-relaxed text-foreground font-mono focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div>
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <Play className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              {t("tools.codePreview.livePreview")}
            </span>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="Live preview"
            className="h-80 w-full bg-background"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #ECF4E8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 16px;
      padding: 24px;
    }
    h1 { font-size: 2.5rem; font-weight: 900; color: #1a2e1d; }
    h1 span { color: #5a8f97; }
    p {
      color: #5a7a61;
      font-size: 1.1rem;
      max-width: 420px;
      text-align: center;
      line-height: 1.7;
    }
    .btn {
      background: #93BFC7;
      color: #fff;
      border: none;
      padding: 12px 32px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .btn:hover { background: #5a8f97; transform: translateY(-2px); }
  </style>
</head>
<body>
  <h1>¡Hola, <span>Playground!</span> 🚀</h1>
  <p>Edita este código en el panel izquierdo y ve el resultado aquí al instante.</p>
  <button class="btn" onclick="this.textContent='¡Funciona! 🎉'">Pruébame</button>
</body>
</html>`

export default function PlayGemini() {
  const [code, setCode] = useState(DEFAULT_HTML)
  // Debounced srcdoc so we don't recreate the iframe on every keystroke
  const [preview, setPreview] = useState(DEFAULT_HTML)
  const [copied, setCopied] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setPreview(code), 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleReset = () => {
    setCode(DEFAULT_HTML)
    setPreview(DEFAULT_HTML)
  }

  return (
    // Use dvh so mobile browsers don't cut off the bottom
    <div className="flex flex-col bg-fp-primary" style={{ height: '100dvh' }}>

      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between px-6 py-3.5
        bg-fp-dark/95 border-b border-white/10 shadow-lg shrink-0">

        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />

          <div className="ml-3 flex items-center gap-2">
            <span className="text-white/60 font-mono text-sm">playground</span>
            <span className="text-white/30">/</span>
            <span className="text-accent font-mono text-sm font-semibold">index.html</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10
            rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-[#28c840] animate-dot-pulse" />
            <span className="text-[0.72rem] text-white/50 font-medium">En vivo</span>
          </div>

          <button
            onClick={handleReset}
            title="Resetear código"
            className="text-[0.8rem] text-white/50 hover:text-white/80 font-medium
              px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25
              transition-colors duration-150"
          >
            Resetear
          </button>

          <button
            onClick={handleCopy}
            title="Copiar código"
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold
              bg-accent text-white px-4 py-1.5 rounded-lg
              hover:bg-accent-dark transition-colors duration-150"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ¡Copiado!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 10V2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Copiar
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Main split — grows to fill remaining space ── */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* ── Editor pane ── */}
        <div className="flex flex-col md:w-1/2 min-h-0 flex-1">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-fp-dark/90
            border-b border-white/10 shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 4l4 3-4 3M7 10h5" stroke="#93BFC7" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.75rem] text-white/50 font-medium uppercase tracking-wider">
              Editor
            </span>
          </div>

          <textarea
            id="play-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            aria-label="Editor de código HTML y CSS"
            className="flex-1 resize-none bg-fp-dark/95 text-fp-secondary font-mono
              text-[0.82rem] leading-[1.8] p-5 outline-none border-none
              focus:ring-0 caret-accent min-h-0"
          />
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px md:w-px md:h-auto bg-white/10 shrink-0" />

        {/* ── Preview pane ── */}
        <div className="flex flex-col md:w-1/2 min-h-0 flex-1">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-fp-primary/80
            border-b border-divider/50 shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5a8f97" strokeWidth="1.5" />
              <path d="M1 5h12" stroke="#5a8f97" strokeWidth="1.5" />
            </svg>
            <span className="text-[0.75rem] text-fp-muted font-medium uppercase tracking-wider">
              Vista previa
            </span>
          </div>

          {/*
            srcdoc is the correct way to render HTML inside a sandboxed iframe —
            no cross-origin issues, no deprecated doc.write(), and scripts work fine.
          */}
          <iframe
            key={preview}            // remount when preview changes to force full re-render
            srcDoc={preview}
            title="Vista previa del código"
            sandbox="allow-scripts allow-modals"
            className="flex-1 w-full border-none bg-white min-h-0"
          />
        </div>
      </div>

      {/* ── Bottom hint bar ── */}
      <div className="flex items-center justify-between px-6 py-2.5 shrink-0
        bg-fp-dark/90 border-t border-white/10 text-[0.72rem] text-white/35 font-mono">
        <span>HTML · CSS · JavaScript</span>
        <span>Vista previa en tiempo real ⚡</span>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'

const codeSnippet = `<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #ECF4E8;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    h1 {
      color: #5a8f97;
      font-size: 2rem;
      border-bottom: 3px solid #93BFC7;
      padding-bottom: 8px;
    }
  </style>
</head>
<body>
  <h1>¡Hola, mundo! 🚀</h1>
</body>
</html>`

export default function PlaySection() {
  return (
    <section
      id="playground"
      className="relative overflow-hidden bg-fp-primary py-24 md:py-32"
    >
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute -top-20 right-0 w-[420px] h-[420px]
          rounded-full opacity-40 blur-[90px]
          bg-[radial-gradient(circle,#CBF3BB,#93BFC7)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-16 w-[300px] h-[300px]
          rounded-full opacity-30 blur-[70px]
          bg-[radial-gradient(circle,#ABE7B2,#CBF3BB)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ── Left: text & CTA ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-accent/15 text-accent-deep
              border border-accent px-4 py-1.5 rounded-full text-[0.82rem] font-semibold
              tracking-wide mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse shrink-0" />
            Herramienta interactiva · 100 % gratis
          </div>

          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.15]
              text-fp-dark tracking-tight mb-5"
          >
            Prueba código{' '}
            <span className="relative text-accent-deep">
              HTML &amp; CSS
              <span className="absolute left-0 bottom-[2px] w-full h-1.5 bg-divider/60 rounded -z-10" />
            </span>{' '}
            en tiempo real
          </h2>

          <p className="text-[1.05rem] text-fp-muted leading-[1.75] mb-6 max-w-[480px]">
            Escribe tu código directamente en el navegador y ve el resultado
            al instante. Sin instalaciones, sin configuraciones: solo abre el
            playground y empieza a crear.
          </p>

          {/* Feature pills */}
          <ul className="flex flex-wrap gap-3 mb-10">
            {[
              '✏️ Editor en vivo',
              '🖼️ Vista previa instantánea',
              '🎨 HTML + CSS',
              '⚡ Sin instalación',
            ].map((f) => (
              <li
                key={f}
                className="bg-white/70 backdrop-blur-sm border border-divider/60
                  text-fp-body text-[0.82rem] font-medium px-3.5 py-1.5 rounded-full"
              >
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/play"
            className="inline-flex items-center gap-2.5 bg-accent text-white font-semibold
              text-[1rem] px-8 py-3.5 rounded-lg border-2 border-accent
              hover:bg-transparent hover:text-accent hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(147,191,199,0.35)]
              transition-all duration-200"
          >
            Abrir Playground
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* ── Right: mock editor card ── */}
        <div
          className="relative bg-white/70 backdrop-blur-md border border-divider/60
            rounded-2xl shadow-[0_8px_40px_rgba(60,120,80,0.10)] overflow-hidden"
        >
          {/* Window bar */}
          <div className="flex items-center gap-1.5 bg-fp-dark/90 px-4 py-3">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-[0.72rem] text-white/50 font-mono">index.html</span>
          </div>

          {/* Code content */}
          <pre
            className="text-[0.76rem] leading-[1.7] font-mono bg-fp-dark/95
              text-fp-secondary p-5 overflow-x-auto select-none"
            aria-hidden="true"
          >
            {codeSnippet
              .split('\n')
              .map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/20 w-5 text-right shrink-0">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
          </pre>

          {/* Preview bar */}
          <div className="flex items-center gap-2 bg-fp-primary/80 border-t border-divider/50 px-4 py-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse" />
            <span className="text-[0.75rem] text-fp-muted font-medium">Vista previa en vivo</span>
          </div>
        </div>

      </div>
    </section>
  )
}
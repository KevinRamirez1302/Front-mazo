export default function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Sección principal"
      className="relative overflow-hidden bg-fp-primary min-h-screen flex items-center py-24 md:py-32"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-24 -right-20 w-[500px] h-[500px]
        rounded-full opacity-50 blur-[80px] animate-blob
        bg-[radial-gradient(circle,#CBF3BB,#ABE7B2)]" aria-hidden="true"/>
      <div className="pointer-events-none absolute bottom-0 -left-20 w-[350px] h-[350px]
        rounded-full opacity-50 blur-[80px] animate-[blob_8s_ease-in-out_3s_infinite_alternate]
        bg-[radial-gradient(circle,#93BFC7,#CBF3BB)]" aria-hidden="true"/>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6
        grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* ── Content ── */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-deep
            border border-accent px-4 py-1.5 rounded-full text-[0.82rem] font-semibold
            tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse flex-shrink-0"/>
            Formación Profesional · Grado Superior &amp; Medio
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.1]
            text-fp-dark tracking-tight mb-5">
            Tu carrera en{' '}
            <span className="relative text-accent-deep">
              tecnología
              <span className="absolute left-0 bottom-[2px] w-full h-1.5 bg-divider/60 rounded -z-10"/>
            </span>{' '}
            empieza<br/>aquí.
          </h1>

          <p className="text-[1.05rem] text-fp-muted leading-[1.75] mb-9 max-w-[500px]">
            Estudia ciclos formativos con salida laboral real. Aprende de
            profesionales del sector, trabaja en proyectos reales y accede a
            prácticas en empresas líderes.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#formulario"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold
                text-[1rem] px-8 py-3.5 rounded-lg border-2 border-accent
                hover:bg-transparent hover:text-accent hover:-translate-y-0.5
                hover:shadow-[0_8px_24px_rgba(147,191,199,0.35)] transition-all duration-200">
              Solicitar información
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#cursos"
              className="inline-flex items-center gap-2 bg-transparent text-accent font-semibold
                text-[0.95rem] px-6 py-3 rounded-lg border-2 border-accent
                hover:bg-accent hover:text-white hover:-translate-y-0.5 transition-all duration-200">
              Ver Cursos
            </a>
          </div>

          {/* Stats */}
          <div className="inline-flex items-center gap-6 bg-white/60 backdrop-blur-sm
            border border-divider/50 rounded-2xl px-6 py-5">
            {[
              { num: '+450', label: 'Alumnos graduados' },
              { num: '94%',  label: 'Inserción laboral' },
              { num: '15+',  label: 'Años de experiencia' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[1.5rem] font-extrabold text-fp-dark leading-none">{s.num}</span>
                  <span className="text-[0.78rem] text-fp-muted font-medium">{s.label}</span>
                </div>
                {i < 2 && <div className="w-px h-9 bg-divider"/>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Visual ── */}
        <div className="relative flex items-center justify-center order-first md:order-last">
          {/* Floating card 1 */}
          <div className="absolute top-[10%] -left-5 z-10 flex items-center gap-2.5
            bg-white/90 backdrop-blur-md border border-divider/60 rounded-2xl px-4 py-3
            shadow-[0_4px_24px_rgba(60,120,80,0.10)] animate-float-card">
            <div className="w-10 h-10 flex items-center justify-center bg-fp-secondary rounded-xl text-xl">🎓</div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-[0.85rem] font-bold text-fp-dark">DAM</strong>
              <span className="text-[0.72rem] text-fp-muted">Desarrollo de Apps Multiplataforma</span>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full max-w-[420px] animate-float">
            <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="210" cy="210" r="200" fill="#CBF3BB" opacity="0.6"/>
              <circle cx="210" cy="210" r="150" fill="#ABE7B2" opacity="0.4"/>
              <rect x="120" y="140" width="180" height="130" rx="16" fill="#93BFC7" opacity="0.85"/>
              <rect x="130" y="155" width="160" height="90" rx="10" fill="white" opacity="0.9"/>
              <rect x="142" y="168" width="80"  height="7" rx="3.5" fill="#ABE7B2"/>
              <rect x="142" y="182" width="110" height="7" rx="3.5" fill="#CBF3BB"/>
              <rect x="142" y="196" width="65"  height="7" rx="3.5" fill="#93BFC7" opacity="0.6"/>
              <rect x="142" y="210" width="95"  height="7" rx="3.5" fill="#ABE7B2"/>
              <rect x="142" y="224" width="50"  height="7" rx="3.5" fill="#CBF3BB"/>
              <rect x="130" y="278" width="160" height="10" rx="5" fill="#93BFC7" opacity="0.4"/>
              <rect x="145" y="265" width="130" height="10" rx="5" fill="#93BFC7" opacity="0.3"/>
              <circle cx="225" cy="158" r="4" fill="#ECF4E8"/>
              <circle cx="238" cy="158" r="4" fill="#ECF4E8"/>
              <circle cx="251" cy="158" r="4" fill="#ECF4E8"/>
            </svg>
          </div>

          {/* Floating card 2 */}
          <div className="absolute bottom-[10%] -right-5 z-10 flex items-center gap-2.5
            bg-white/90 backdrop-blur-md border border-divider/60 rounded-2xl px-4 py-3
            shadow-[0_4px_24px_rgba(60,120,80,0.10)] animate-float-card-2">
            <div className="w-10 h-10 flex items-center justify-center bg-fp-secondary rounded-xl text-xl">💼</div>
            <div className="flex flex-col gap-0.5">
              <strong className="text-[0.85rem] font-bold text-fp-dark">95% empleabilidad</strong>
              <span className="text-[0.72rem] text-fp-muted">Salidas laborales reales</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

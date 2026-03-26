import  headerimg  from "../assets/headerimg.svg";
import maletin from "../assets/maletin.png";
import codigo from "../assets/codigo.png";

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
          {/* Illustration — aspect 6:5 matches the SVG viewBox */}
          <div className="relative w-full max-w-[520px] aspect-6/5 animate-float">
            <img src={headerimg} alt="" className="w-full h-full object-contain" />

            {/* Floating card 1 — top-left over the image */}
            <div className="absolute top-[8%] left-0 z-10 flex items-center gap-2.5
              bg-white/90 backdrop-blur-md border border-divider/60 rounded-2xl px-4 py-3
              shadow-[0_4px_24px_rgba(60,120,80,0.10)] animate-float-card">
              <div className="w-9 h-9 flex items-center justify-center bg-fp-secondary rounded-xl text-lg"><img src={codigo} alt="Codigo" className=" w-7" /></div>
              <div className="flex flex-col gap-0.5">
                <strong className="text-[0.82rem] font-bold text-fp-dark">DAM</strong>
                <span className="text-[0.70rem] text-fp-muted">Desarrollo de Apps Multiplataforma</span>
              </div>
            </div>

            {/* Floating card 2 — bottom-right over the image */}
            <div className="absolute bottom-[8%] right-0 z-10 flex items-center gap-2.5
              bg-white/90 backdrop-blur-md border border-divider/60 rounded-2xl px-4 py-3
              shadow-[0_4px_24px_rgba(60,120,80,0.10)] animate-float-card-2">
              <div className="w-9 h-9 flex items-center justify-center bg-fp-secondary rounded-xl text-lg"><img src={maletin} alt="Maletin" className=" w-6 " /></div>
              <div className="flex flex-col gap-0.5">
                <strong className="text-[0.82rem] font-bold text-fp-dark">95% empleabilidad</strong>
                <span className="text-[0.70rem] text-fp-muted">Salidas laborales reales</span>
              </div>
            </div>
          </div>
        </div>
        

        

      </div>
    </section>
  )
}

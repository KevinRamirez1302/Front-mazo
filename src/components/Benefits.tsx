const benefits = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="rgba(147,191,199,0.15)"/>
        <path d="M16 24l6 6 10-10" stroke="#93BFC7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#ABE7B2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Titulaciones Oficiales',
    desc: 'Ciclos formativos reconocidos por el Ministerio de Educación con validez en toda la UE para tu carrera profesional.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="rgba(147,191,199,0.15)"/>
        <rect x="13" y="32" width="6" height="8" rx="2" fill="#93BFC7"/>
        <rect x="21" y="26" width="6" height="14" rx="2" fill="#ABE7B2"/>
        <rect x="29" y="19" width="6" height="21" rx="2" fill="#93BFC7"/>
        <path d="M13 20 Q24 14 35 10" stroke="#CBF3BB" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Inserción Laboral Real',
    desc: 'Más del 94% de nuestros alumnos encuentran empleo en su sector dentro de los 6 meses tras graduarse.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="rgba(147,191,199,0.15)"/>
        <rect x="12" y="14" width="24" height="20" rx="4" stroke="#93BFC7" strokeWidth="2.5" fill="none"/>
        <path d="M17 24h4M17 29h8" stroke="#93BFC7" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="20" r="3" fill="#ABE7B2"/>
        <path d="M8 36l32 0" stroke="#CBF3BB" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Prácticas en Empresa',
    desc: 'Convenios activos con más de 60 empresas tecnológicas del sector para que apliques lo aprendido desde el primer año.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="benefits-title"
      className="py-24 bg-fp-primary relative before:absolute before:top-0 before:left-0 before:right-0
        before:h-px before:bg-gradient-to-r before:from-transparent before:via-divider before:to-transparent">

      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-accent text-white text-[0.75rem] font-semibold
            tracking-[0.08em] uppercase px-3.5 py-1 rounded-full mb-3">
            ¿Por qué elegirnos?
          </span>
          <h2 id="benefits-title"
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-fp-dark leading-tight mb-4">
            Formación que abre puertas de verdad
          </h2>
          <p className="text-[1.05rem] text-fp-muted max-w-[560px] leading-[1.7] mx-auto">
            No solo te preparamos técnicamente. Te acompañamos desde el primer día
            hasta que consigues el trabajo que mereces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[480px] md:max-w-none mx-auto">
          {benefits.map((b, i) => (
            <article
              key={i}
              className="group bg-white/65 backdrop-blur-sm border border-divider/50 rounded-2xl
                p-9 text-center relative overflow-hidden
                hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(60,120,80,0.18)]
                hover:border-accent transition-all duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                bg-gradient-to-r from-divider to-accent
                scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>

              <div className="w-[72px] h-[72px] mx-auto mb-6">{b.icon}</div>
              <h3 className="text-[1.15rem] font-bold text-fp-dark mb-3">{b.title}</h3>
              <p className="text-[0.92rem] text-fp-muted leading-[1.7]">{b.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

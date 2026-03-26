const fp = [
    {
        emoji: '💻',
        badge: 'Grado Superior',
        badgeStyle: 'bg-accent text-white',
        title: 'Desarrollo de Aplicaciones Multiplataforma',
        short: 'DAM',
        duration: '2 años · 2.000 horas',
        desc: 'Diseña y desarrolla aplicaciones para dispositivos móviles, escritorio y sistemas de gestión empresarial.',
        tags: ['Java', 'Kotlin', 'Android', 'SQL', 'Git'],
    },
    {
        emoji: '🖧',
        badge: 'Grado Medio',
        badgeStyle: 'bg-accent-dark text-white',
        title: 'Sistemas Microinformáticos y Redes',
        short: 'SMR',
        duration: '2 años · 2.000 horas',
        desc: 'Instala, configura y mantiene equipos informáticos y redes en empresas. Administra sistemas y servicios.',
        tags: ['Redes', 'Windows Server', 'Linux', 'Cisco', 'VoIP'],
    },
    {
        emoji: '📊',
        badge: 'FPB',
        badgeStyle: 'bg-divider text-fp-dark',
        title: 'Informática y Comunicaciones',
        short: 'FPB Informática',
        duration: '2 años · Básico',
        desc: 'La base perfecta para iniciarte en el mundo digital. Aprende ofimática, mantenimiento de equipos y redes.',
        tags: ['Office', 'Hardware', 'Internet', 'Seguridad'],
    }
]


export const FpSection = () => {
    return (
       <section id="fp" aria-labelledby="fp-title"
  className="py-24 bg-fp-primary relative
    before:absolute before:top-0 before:left-0 before:right-0
    before:h-px before:bg-gradient-to-r before:from-transparent before:via-divider before:to-transparent">

  <div className="w-full max-w-[1200px] mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16">
      <span className="inline-block bg-accent text-white text-[0.75rem] font-semibold
        tracking-[0.08em] uppercase px-3.5 py-1 rounded-full mb-3">
        Oferta Académica
      </span>
      <h2 id="fp-title"
        className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-fp-dark leading-tight mb-4">
        Elige tu ciclo formativo
      </h2>
      <p className="text-[1.05rem] text-fp-muted max-w-[560px] leading-[1.7] mx-auto">
        Desde la base hasta la especialización. Tenemos el ciclo perfecto para donde
        estés en tu carrera.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fp.map((c, i) => (
        <article
          key={i}
          tabIndex={0}
          aria-label={`Ciclo: ${c.title}`}
          className="group relative bg-white border-[1.5px] border-divider rounded-2xl
            p-7 flex flex-col gap-0 overflow-hidden
            hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(60,120,80,0.18)]
            hover:border-accent hover:bg-[#d4f5c5]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            transition-all duration-300 cursor-default"
        >
          {/* Subtle inner gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br
            from-transparent via-transparent to-accent/[0.08]"/>

          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-[2rem] leading-none">{c.emoji}</span>
            <span className={`text-[0.7rem] font-bold tracking-[0.06em] uppercase
              px-2.5 py-1 rounded-full ${c.badgeStyle}`}>
              {c.badge}
            </span>
          </div>

          <div className="text-[0.78rem] font-semibold tracking-[0.1em] uppercase
            text-accent-deep mb-1.5">{c.short}</div>
          <h3 className="text-[1rem] font-bold text-fp-dark leading-[1.35] mb-2">{c.title}</h3>

          <div className="flex items-center gap-1.5 text-[0.8rem] text-fp-muted font-medium mb-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="6" stroke="#93BFC7" strokeWidth="1.5"/>
              <path d="M7 4v3.5l2.5 1.5" stroke="#93BFC7" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {c.duration}
          </div>

          <p className="text-[0.875rem] text-fp-body leading-[1.65] mb-4 flex-1">{c.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {c.tags.map(t => (
              <span key={t}
                className="text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full
                  bg-accent/[0.18] text-accent-deep border border-accent/30">
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a href="#formulario"
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold
              text-accent-deep hover:text-accent hover:gap-3 transition-all duration-200 w-fit">
            Más información
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </article>
      ))}
    </div>

  </div>
</section>
    )
}
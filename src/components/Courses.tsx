import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

export default function Courses() {
  return (
    <section id="cursos" aria-labelledby="courses-title"
      className="py-24 bg-fp-primary relative
        before:absolute before:top-0 before:left-0 before:right-0
        before:h-px before:bg-linear-to-r before:from-transparent before:via-divider before:to-transparent">

      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-accent text-white text-[0.75rem] font-semibold
            tracking-[0.08em] uppercase px-3.5 py-1 rounded-full mb-3">
            Oferta Académica
          </span>
          <h2 id="courses-title"
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-fp-dark leading-tight mb-4">
            Elige tu ciclo formativo
          </h2>
          <p className="text-[1.05rem] text-fp-muted max-w-[560px] leading-[1.7] mx-auto">
            Desde la base hasta la especialización. Tenemos el ciclo perfecto para cualquier etapa de tu carrera.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((c, i) => (
            <article
              key={i}
              tabIndex={0}
              aria-label={`Ciclo: ${c.title}`}
              className="group relative bg-white border border-white/60 rounded-3xl
                p-8 flex flex-col gap-0 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]
                hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(147,191,199,0.25)]
                hover:border-accent/40
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                transition-all duration-500 cursor-default z-10"
            >
              {/* Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-fp-secondary/15 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]"/>
              
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-fp-primary/50 border border-divider/50 flex items-center justify-center text-[2rem] shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {c.emoji}
                </div>
                <span className={`text-[0.65rem] font-bold tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full shadow-sm ${c.badgeStyle}`}>
                  {c.badge}
                </span>
              </div>

              <div className="text-[0.75rem] font-bold tracking-[0.15em] uppercase text-accent-deep mb-2">
                {c.short}
              </div>
              <h3 className="text-[1.15rem] font-extrabold text-fp-dark leading-snug mb-3 group-hover:text-accent-deep transition-colors duration-300">
                {c.title}
              </h3>

              <div className="flex items-center gap-2 text-[0.8rem] text-fp-muted font-semibold mb-5 bg-fp-primary/40 w-fit px-3 py-1.5 rounded-lg border border-divider/30">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-accent-deep">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {c.duration}
              </div>

              <p className="text-[0.9rem] text-fp-body leading-relaxed mb-6 flex-1 opacity-90">
                {c.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {c.tags.map(t => (
                  <span key={t}
                    className="text-[0.72rem] font-semibold px-3 py-1.5 rounded-lg
                      bg-white text-fp-muted border border-divider/40 shadow-sm
                      group-hover:border-accent/30 group-hover:bg-accent/5 group-hover:text-accent-deep transition-colors duration-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link to={`/curso/${c.id}`}
                className="mt-auto group/btn flex items-center justify-between w-full p-4 rounded-xl bg-fp-primary/30 border border-divider/40 hover:bg-accent hover:border-accent hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                <span className="text-[0.9rem] font-bold text-fp-dark group-hover/btn:text-white transition-colors duration-300">
                  Más información
                </span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover/btn:bg-white/20 group-hover/btn:text-white text-accent-deep transition-all duration-300 group-hover/btn:translate-x-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

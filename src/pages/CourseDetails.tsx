import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useEffect } from 'react';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === id);

  // Scroll to top on load since we are navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-fp-primary px-6">
        <div className="text-[4rem] mb-4">🔍</div>
        <h1 className="text-3xl font-extrabold text-fp-dark mb-4 text-center">Curso no encontrado</h1>
        <p className="text-fp-muted text-center max-w-md mb-8">
          Lo sentimos, no hemos podido encontrar el ciclo formativo que buscas. Puede que la dirección sea incorrecta o el curso ya no esté disponible.
        </p>
        <Link to="/" className="bg-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-accent-deep transition-colors shadow-lg shadow-accent/20">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-fp-primary min-h-screen pb-24">
      {/* Hero Header */}
      <header className="relative bg-white pt-16 pb-20 px-6 border-b border-divider/50 overflow-hidden">
        {/* Decorative background flair */}
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[150%] bg-linear-to-br from-fp-secondary/30 via-transparent to-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <Link to="/#cursos" className="inline-flex items-center gap-2 text-sm text-fp-muted hover:text-accent font-semibold mb-8 transition-colors group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver a la oferta académica
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-fp-primary/50 border border-divider/50 flex items-center justify-center text-[3rem] shadow-sm shrink-0">
              {course.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className={`text-[0.7rem] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm ${course.badgeStyle}`}>
                  {course.badge}
                </span>
                <span className="text-[0.85rem] text-fp-muted font-semibold bg-fp-primary/50 border border-divider/30 px-3 py-1 rounded-full">
                  {course.duration}
                </span>
              </div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-fp-dark leading-tight">
                {course.title} <span className="text-accent-deep">({course.short})</span>
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl text-fp-body leading-relaxed max-w-[800px] mt-6">
            {course.extendedDesc}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {course.tags.map((t) => (
              <span key={t} className="text-sm font-semibold px-4 py-2 rounded-xl bg-white text-fp-muted border border-divider/60 shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content Sections */}
      <div className="max-w-[1000px] mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Main Column */}
        <div className="md:col-span-8 flex flex-col gap-12">
          <section>
            <h2 className="text-2xl font-bold text-fp-dark mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lo que aprenderás (Temario)
            </h2>
            <div className="bg-white rounded-3xl p-8 border border-divider/40 shadow-[0_8px_30px_rgba(0,0,0,0.03)] focus-within:ring-2 ring-accent">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.curriculum.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent-deep mt-1 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-fp-muted leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fp-dark mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Salidas Profesionales
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {course.careerOpportunities.map((career, idx) => (
                <div key={idx} className="bg-white border border-divider/30 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent/40 transition-all flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-fp-primary/50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-fp-dark font-medium">{career}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Sticky CTA */}
        <aside className="md:col-span-4 relative">
          <div className="sticky top-28 bg-white border border-accent/20 rounded-3xl p-8 shadow-[0_20px_40px_rgba(147,191,199,0.15)] flex flex-col gap-6">
            <h3 className="text-xl font-extrabold text-fp-dark">¿Te interesa este curso?</h3>
            <p className="text-fp-muted text-sm leading-relaxed">
              Resuelve tus dudas o asegura tu plaza. Rellena el formulario y nos pondremos en contacto contigo lo antes posible para ayudarte en tu proceso de inscripción en <strong>{course.short}</strong>.
            </p>

            <Link to="/#formulario"
              className="w-full relative group/btn overflow-hidden rounded-xl bg-accent px-6 py-4 text-center font-bold text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all hover:-translate-y-1 block">
              <span className="relative z-10 flex items-center justify-center gap-2">
                ¡Solicita información!
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover/btn:translate-x-1 transition-transform">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="absolute inset-0 z-0 h-full w-full bg-linear-to-r from-accent via-accent-deep to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-size-[200%_auto] animate-gradient" />
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

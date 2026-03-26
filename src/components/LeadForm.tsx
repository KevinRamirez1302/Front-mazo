import { useState } from 'react'

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  const inputCls = `w-full px-3.5 py-2.5 border-[1.5px] border-divider rounded-lg text-[0.92rem]
    font-[inherit] text-fp-dark bg-fp-primary placeholder:text-fp-muted/70
    focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/20 focus:bg-white
    transition-all duration-200`

  return (
    <section id="formulario" aria-labelledby="form-title"
      className="py-24 bg-fp-primary relative overflow-hidden
        before:absolute before:top-0 before:left-0 before:right-0
        before:h-px before:bg-gradient-to-r before:from-transparent before:via-divider before:to-transparent">

      {/* BG shape */}
      <div className="pointer-events-none absolute w-[600px] h-[600px] top-1/2 -right-52 -translate-y-1/2
        rounded-full bg-[radial-gradient(circle,rgba(203,243,187,0.5),transparent_70%)]" aria-hidden="true"/>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6
        grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-[72px] items-center">

        {/* ── Left content ── */}
        <div>
          <span className="inline-block bg-accent text-white text-[0.75rem] font-semibold
            tracking-[0.08em] uppercase px-3.5 py-1 rounded-full mb-3">
            Empieza hoy
          </span>
          <h2 id="form-title"
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-fp-dark leading-tight mb-4">
            Impulsa tu futuro<br/>hoy mismo.
          </h2>
          <p className="text-[1.05rem] text-fp-muted leading-[1.7] mb-8 max-w-[500px]">
            Solicita información sin compromiso. Un orientador académico se
            pondrá en contacto contigo en menos de 24 horas.
          </p>
          <ul className="flex flex-col gap-3">
            {['Asesoramiento gratuito', 'Sin compromiso de matrícula', 'Respuesta en menos de 24h'].map(p => (
              <li key={p} className="flex items-center gap-2.5 text-[0.92rem] font-medium text-fp-body">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="8" fill="rgba(147,191,199,0.2)"/>
                  <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#93BFC7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Form card ── */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_8px_48px_rgba(60,120,80,0.12)]
          border border-divider/30">
          {submitted ? (
            <div className="text-center py-10" role="alert">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-[1.4rem] font-bold text-fp-dark mb-2">¡Solicitud recibida!</h3>
              <p className="text-fp-muted text-[0.95rem]">
                Te contactaremos en menos de 24 horas. ¡Gracias por tu interés!
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-label="Formulario de contacto"
              className="flex flex-col gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.85rem] font-semibold text-fp-dark">
                    Nombre completo <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <input type="text" id="name" name="name" value={form.name} onChange={change}
                    placeholder="Ana García López" required autoComplete="name" className={inputCls}/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.85rem] font-semibold text-fp-dark">
                    Correo electrónico <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <input type="email" id="email" name="email" value={form.email} onChange={change}
                    placeholder="ana@ejemplo.com" required autoComplete="email" className={inputCls}/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[0.85rem] font-semibold text-fp-dark">Teléfono</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={change}
                    placeholder="+34 600 000 000" autoComplete="tel" className={inputCls}/>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="course" className="text-[0.85rem] font-semibold text-fp-dark">
                    Ciclo de interés <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <select id="course" name="course" value={form.course} onChange={change} required
                    className={`${inputCls} appearance-none cursor-pointer
                      bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2393BFC7' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")]
                      bg-no-repeat bg-[right_14px_center]`}>
                    <option value="">Selecciona un ciclo</option>
                    <option value="dam">DAM – Aplicaciones Multiplataforma</option>
                    <option value="smr">SMR – Sistemas y Redes</option>
                    <option value="fpb-info">FPB Administración e Informática</option>
                    <option value="otro">Otro / No lo sé aún</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[0.85rem] font-semibold text-fp-dark">
                  Mensaje (opcional)
                </label>
                <textarea id="message" name="message" value={form.message} onChange={change}
                  placeholder="¿Tienes alguna pregunta o comentario?" rows={4}
                  className={`${inputCls} resize-y`}/>
              </div>

              <button type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white
                  font-semibold text-[1rem] py-3.5 rounded-lg border-2 border-accent
                  hover:bg-transparent hover:text-accent hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_rgba(147,191,199,0.35)] transition-all duration-200">
                Solicitar información gratuita
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <p className="text-center text-[0.78rem] text-fp-muted">
                Al enviar, aceptas nuestra{' '}
                <a href="#privacidad" className="text-accent-deep underline">Política de Privacidad</a>.
                Sin spam, nunca.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

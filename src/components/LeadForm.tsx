import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormularioEnvio } from '../utils/formularioEnvio'

type FormData = {
  name: string
  apellido: string
  email: string
  telefono?: string
  dni?: string
  course: string
  message: string
}

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })

  const [sending, setSending] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setSending(true)
    setError(null)
    try {
      console.log(data)
      await FormularioEnvio(data)
      setSubmitted(true)
    } catch {
      setError('Hubo un problema al enviar. Inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const inputCls = `w-full px-3.5 py-2.5 border-[1.5px] border-divider rounded-lg text-[0.92rem]
    font-[inherit] text-fp-dark bg-fp-primary placeholder:text-fp-muted/70
    focus:outline-none focus:border-accent focus:ring-3 focus:ring-accent/20 focus:bg-white
    transition-all duration-200`

  const errorCls = 'text-[0.78rem] text-red-500 mt-1'

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
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulario de contacto"
              className="flex flex-col gap-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.85rem] font-semibold text-fp-dark">
                    Nombre completo <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text" id="name"
                    placeholder="Ana Maria"
                    autoComplete="given-name"
                    className={`${inputCls} ${errors.name ? 'border-red-400' : ''}`}
                    {...register('name', { required: 'El nombre es obligatorio' })}
                  />
                  {errors.name && <p className={errorCls} role="alert">{errors.name.message}</p>}
                </div>

                {/* Apellido */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="apellido" className="text-[0.85rem] font-semibold text-fp-dark">
                    Apellido
                  </label>
                  <input
                    type="text" id="apellido"
                    placeholder="García López"
                    autoComplete="family-name"
                    className={inputCls}
                    {...register('apellido')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.85rem] font-semibold text-fp-dark">
                    Correo electrónico <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email" id="email"
                    placeholder="ana@ejemplo.com"
                    autoComplete="email"
                    className={`${inputCls} ${errors.email ? 'border-red-400' : ''}`}
                    {...register('email', {
                      required: 'El correo es obligatorio',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' },
                    })}
                  />
                  {errors.email && <p className={errorCls} role="alert">{errors.email.message}</p>}
                </div>

                {/* Ciclo */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="course" className="text-[0.85rem] font-semibold text-fp-dark">
                    Ciclo de interés <span className="text-accent-deep" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="course"
                    className={`${inputCls} ${errors.course ? 'border-red-400' : ''} appearance-none cursor-pointer
                      bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2393BFC7' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")]
                      bg-no-repeat bg-[right_14px_center]`}
                    {...register('course', { required: 'Selecciona un ciclo' })}
                  >
                    <option value="">Selecciona un ciclo</option>
                    <option value="dam">DAM – Aplicaciones Multiplataforma</option>
                    <option value="smr">SMR – Sistemas y Redes</option>
                    <option value="fpb-info">FPB Administración e Informática</option>
                    <option value="otro">Otro / No lo sé aún</option>
                  </select>
                  {errors.course && <p className={errorCls} role="alert">{errors.course.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Teléfono */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="telefono" className="text-[0.85rem] font-semibold text-fp-dark">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel" id="telefono"
                    placeholder="600 000 000"
                    autoComplete="tel"
                    className={`${inputCls} ${errors.telefono ? 'border-red-400' : ''}`}
                    {...register('telefono', {
                      pattern: { value: /^(|[0-9+\-\s]{9,15})$/, message: 'Teléfono no válido' },
                    })}
                  />
                  {errors.telefono && <p className={errorCls} role="alert">{errors.telefono.message}</p>}
                </div>

                {/* DNI */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dni" className="text-[0.85rem] font-semibold text-fp-dark">
                    DNI / NIE (opcional)
                  </label>
                  <input
                    type="text" id="dni"
                    placeholder="12345678A"
                    className={`${inputCls} ${errors.dni ? 'border-red-400' : ''}`}
                    {...register('dni', {
                      pattern: { value: /^(|[XYZ]?\d{5,8}[A-Z])$/, message: 'DNI/NIE no válido' },
                    })}
                  />
                  {errors.dni && <p className={errorCls} role="alert">{errors.dni.message}</p>}
                </div>
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[0.85rem] font-semibold text-fp-dark">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="message"
                  placeholder="¿Tienes alguna pregunta o comentario?"
                  rows={4}
                  className={`${inputCls} resize-y`}
                  {...register('message')}
                />
              </div>

              {error && (
                <p className="text-[0.82rem] text-red-500 text-center -mb-1" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white
                  font-semibold text-[1rem] py-3.5 rounded-lg border-2 border-accent
                  hover:bg-transparent hover:text-accent hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_rgba(147,191,199,0.35)] transition-all duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none">
                {sending ? 'Enviando…' : 'Solicitar información gratuita'}
                {!sending && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
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

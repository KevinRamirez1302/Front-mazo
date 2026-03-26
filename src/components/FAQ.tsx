import { useState } from 'react'

const faqs = [
  {
    q: '¿Necesito conocimientos previos para inscribirme?',
    a: 'Depende del ciclo. Para los ciclos de Grado Superior (DAM, DAW, CETI) necesitas el título de Bachillerato o un ciclo de Grado Medio. Para SMR, el Graduado en ESO. Para los FPB, simplemente haber cursado 2º de ESO o más, sin necesidad de haberlo superado.',
  },
  {
    q: '¿Cuándo empieza el próximo curso? ¿Hay listas de espera?',
    a: 'El periodo de matriculación ordinario se abre cada año en junio/julio. Si las plazas están completas, te incluimos en lista de espera sin ningún coste. También gestionamos el proceso de admisión extraordinaria en septiembre.',
  },
  {
    q: '¿Las prácticas en empresa (FCT) son obligatorias?',
    a: 'Sí, la Formación en Centros de Trabajo (FCT) es una parte obligatoria e imprescindible de todos los ciclos. Tenemos convenio con más de 60 empresas del sector y nuestro departamento de orientación laboral te ayudará a encontrar la empresa ideal.',
  },
  {
    q: '¿Puedo estudiar a distancia o hay modalidad semipresencial?',
    a: 'Actualmente ofrecemos la modalidad presencial y la modalidad a distancia (online) para algunos ciclos. La modalidad semipresencial está en fase de implementación. Consúltanos sobre la disponibilidad de cada ciclo.',
  },
  {
    q: '¿Qué pasa si trabajo? ¿Puedo compaginarlo con el ciclo?',
    a: 'Ofrecemos grupos en horario de tarde/noche pensados especialmente para personas que trabajan. Además, si tienes experiencia laboral acreditada en el sector, puedes solicitar el reconocimiento de créditos.',
  },
  {
    q: '¿Cuánto cuesta la matrícula? ¿Hay becas disponibles?',
    a: 'Los precios están fijados por la Consejería de Educación y son muy accesibles (desde 0€ con beca). Gestionamos las principales becas del MEC y de la comunidad autónoma. Solicita información personalizada para conocer tu caso.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section id="faq" aria-labelledby="faq-title"
      className="py-24 bg-fp-primary relative
        before:absolute before:top-0 before:left-0 before:right-0
        before:h-px before:bg-gradient-to-r before:from-transparent before:via-divider before:to-transparent">

      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-accent text-white text-[0.75rem] font-semibold
            tracking-[0.08em] uppercase px-3.5 py-1 rounded-full mb-3">
            Preguntas frecuentes
          </span>
          <h2 id="faq-title"
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-fp-dark leading-tight mb-4">
            Todo lo que necesitas saber
          </h2>
          <p className="text-[1.05rem] text-fp-muted max-w-[560px] leading-[1.7] mx-auto">
            Resolvemos las dudas más habituales. Si no encuentras tu respuesta, escríbenos directamente.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-[780px] mx-auto flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`bg-white/60 backdrop-blur-sm border-[1.5px] rounded-2xl overflow-hidden
                  transition-all duration-300
                  ${isOpen
                    ? 'border-accent shadow-[0_4px_24px_rgba(147,191,199,0.18)]'
                    : 'border-divider/50'}`}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                    bg-transparent border-0 cursor-pointer hover:bg-accent/[0.07] transition-colors duration-200"
                >
                  <span className="text-[0.97rem] font-semibold text-fp-dark leading-snug">
                    {item.q}
                  </span>
                  {/* +/× icon */}
                  <svg
                    width="22" height="22" viewBox="0 0 22 22" fill="none"
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="10" stroke="#93BFC7" strokeWidth="1.5"/>
                    <path d="M7 11h8M11 7v8" stroke="#93BFC7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                {/* Answer — max-height transition */}
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`overflow-hidden transition-all duration-300
                    ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="text-[0.92rem] text-fp-muted leading-[1.75] px-6 pb-5
                    border-t border-divider/40 pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

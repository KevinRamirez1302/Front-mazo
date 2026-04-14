import { Link } from 'react-router-dom'
import logo from '../assets/logomazo.png'

const cols = {
  Ciclos: [
    { label: 'DAM – Multiplataforma', href: '#cursos' },
    { label: 'SMR – Redes', href: '#cursos' },
    { label: 'FPB Administración e Informática',href:'#cursos' },
  ],
  Centro: [
    { label: 'Sobre nosotros',           href: '#beneficios' },
    { label: 'Instalaciones',            href: '#' },
    { label: 'Equipo docente',           href: '#' },
    { label: 'Empresas colaboradoras',   href: '#' },
    { label: 'Prácticas FCT',           href: '#' },
  ],
  Legal: [
    { label: 'Política de privacidad',   href: '#' },
    { label: 'Aviso legal',             href: '#' },
    { label: 'Cookies',                 href: '#' },
    { label: 'Accesibilidad',           href: '#' },
  ],
}

const socials = [
  {
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-footer-dark text-[#b8cfd4]" aria-label="Pie de página">
      <div className="w-full max-w-[1200px] mx-auto px-6
        grid grid-cols-1 md:grid-cols-[1.4fr_2fr_1fr] gap-10 md:gap-14 py-16 md:py-[72px]">

        {/* ── Brand ── */}
        <div className="flex flex-col gap-5">
          <a href="#inicio" className="flex items-center gap-2.5 no-underline">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
            <span className="text-[1rem] font-bold text-fp-primary tracking-wide">IES VILLA DE MAZO</span>
          </a>
          <p className="text-[0.88rem] leading-[1.75] text-[#8aa5ab] max-w-[280px]">
            Formación profesional tecnológica de referencia. Preparamos a los
            profesionales digitales que el mercado demanda.
          </p>
          <div className="flex gap-2.5">
            {socials.map(s => (
              <a key={s.label} href="https://www.instagram.com/informatica_villa_mazo?igsh=ZWJ2aGJ6aDE4ZHU5" target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center text-accent
                  bg-accent/[0.12] border border-accent/20 rounded-lg
                  hover:bg-accent hover:text-white hover:border-accent
                  hover:-translate-y-0.5 transition-all duration-200">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {Object.entries(cols).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[0.78rem] font-bold tracking-[0.1em] uppercase text-fp-primary mb-4">
                {group}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      className="text-[0.875rem] text-[#8aa5ab] hover:text-fp-primary transition-colors duration-200">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Contact ── */}
        <div>
          <h3 className="text-[0.78rem] font-bold tracking-[0.1em] uppercase text-fp-primary mb-4">
            Contacto
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 4a1 1 0 100 2 1 1 0 000-2z" stroke="#93BFC7" strokeWidth="1.2" fill="none"/><path d="M8 9v4" stroke="#93BFC7" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                text: 'C/ CARMEN MARTÍNEZ JEREZ, 1',
                href: null,
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v7A1.5 1.5 0 0112.5 13h-9A1.5 1.5 0 012 11.5v-7zM2 5l6 4 6-4" stroke="#93BFC7" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                text: 'dptoinformatica.ies.villamazo@gmail.com',
                href: 'mailto:dptoinformatica.ies.villamazo@gmail.com',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 3h2l1 3-1.5 1.5A10 10 0 009.5 11.5L11 10l3 1v2a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="#93BFC7" strokeWidth="1.2" fill="none"/></svg>,
                text: '+34 922 47 89 52',
                href: 'tel:+34922478952',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.875rem] text-[#8aa5ab] leading-snug">
                <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                {item.href
                  ? <a href={item.href} className="hover:text-fp-primary transition-colors duration-200">{item.text}</a>
                  : <span>{item.text}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent/10">
        <div className="w-full max-w-[1200px] mx-auto px-6 py-4
          flex flex-col sm:flex-row justify-between items-center gap-2
          text-[0.8rem] text-[#5a8090]">
          <p>© {new Date().getFullYear()} IES VILLA DE MAZO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

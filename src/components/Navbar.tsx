import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logomazo.png'

const navLinks = [
  { label: 'Inicio',   href: '#inicio' },
  { label: 'Cursos',   href: '#cursos' },
  { label: 'Nosotros', href: '#beneficios' },
  { label: 'FAQ',      href: '#faq' },
  { label: 'Contacto', href: '#formulario' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-fp-primary/95 backdrop-blur-md shadow-[0_1px_20px_rgba(60,120,80,0.10)]'
          : 'bg-fp-primary'}`}
    >
      {/* ── Desktop bar ── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px] gap-8">

        {/* Logo */}
        <a href="#inicio" onClick={close} className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="flex flex-col leading-tight">
            <span className="text-[1.1rem] font-extrabold text-fp-dark tracking-wider">IES VILLAS DE MAZO</span>
            <span className="text-[0.65rem] font-medium text-fp-muted tracking-widest uppercase">Centro de Formación Profesional</span>
          </span>
        </a>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Navegación principal">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.92rem] font-medium text-fp-body px-3.5 py-1.5 rounded-md
                hover:text-accent-deep hover:bg-accent/10 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA — hidden on mobile */}
        <a
          href="#formulario"
          onClick={close}
          className="hidden md:inline-flex items-center gap-2 bg-accent text-white font-semibold
            text-[0.95rem] px-6 py-3 rounded-lg border-2 border-accent flex-shrink-0
            hover:bg-transparent hover:text-accent hover:-translate-y-0.5
            hover:shadow-[0_8px_24px_rgba(147,191,199,0.35)] transition-all duration-200"
        >
          Inscríbete
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-2
            rounded-lg hover:bg-accent/15 transition-colors duration-200 flex-shrink-0"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className={`block w-[22px] h-[2px] bg-fp-dark rounded transition-all duration-300 origin-center
            ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}/>
          <span className={`block w-[22px] h-[2px] bg-fp-dark rounded transition-all duration-300
            ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-[22px] h-[2px] bg-fp-dark rounded transition-all duration-300 origin-center
            ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}/>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-fp-primary/98 backdrop-blur-md
          ${menuOpen ? 'max-h-[400px] py-4 px-6' : 'max-h-0 py-0 px-6'}`}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="text-[1rem] font-medium text-fp-body px-3 py-2.5 rounded-lg
                hover:bg-accent/15 hover:text-accent-deep transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#formulario"
            onClick={close}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-accent text-white
              font-semibold px-6 py-3 rounded-lg border-2 border-accent w-fit
              hover:bg-transparent hover:text-accent transition-all duration-200"
          >
            Inscríbete
          </a>
        </div>
      </div>
    </header>
  )
}

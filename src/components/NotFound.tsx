import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="relative overflow-hidden bg-fp-primary min-h-screen flex flex-col items-center justify-center py-24 px-6">
      {/* Blobs de fondo animados */}
      <div className="pointer-events-none absolute top-10 left-10 md:-left-20 md:-top-20 w-[400px] h-[400px]
        rounded-full opacity-50 blur-[80px] animate-blob
        bg-[radial-gradient(circle,#CBF3BB,#ABE7B2)]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 right-10 md:-right-20 md:-bottom-20 w-[300px] h-[300px]
        rounded-full opacity-50 blur-[80px] animate-[blob_8s_ease-in-out_3s_infinite_alternate]
        bg-[radial-gradient(circle,#93BFC7,#CBF3BB)]" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center animate-fade-in-up">
        {/* Número 404 gigante y estilizado */}
        <div className="relative mb-6">
          <h1 className="text-[clamp(6rem,15vw,12rem)] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-accent-deep to-fp-secondary drop-shadow-sm">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-[5px] bg-white/40 blur-[2px] rounded-full mix-blend-overlay"></div>
        </div>

        {/* Mensaje principal */}
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-fp-dark tracking-tight mb-4">
          ¡Ups! Te has perdido en la nube.
        </h2>
        
        {/* Descripción */}
        <p className="text-[1.1rem] text-fp-muted leading-relaxed mb-10 max-w-lg">
          La página o recurso que estás intentando buscar no existe, ha sido movida o está temporalmente fuera de servicio.
        </p>

        {/* Botón de retorno */}
        <Link 
          to="/"
          className="inline-flex items-center gap-3 bg-accent text-white font-semibold
            text-lg px-8 py-4 rounded-xl border-2 border-accent
            hover:bg-transparent hover:text-accent hover:-translate-y-1
            hover:shadow-[0_12px_30px_rgba(147,191,199,0.4)] transition-all duration-300 group"
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Inicio
        </Link>
      </div>
    </section>
  );
};
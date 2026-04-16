import React, { useEffect } from 'react';

export default function SobreNosotros() {
  // Desplaza al inicio al entrar en la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-fp-primary min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-fp-dark text-fp-primary py-28 px-6 mb-20 border-b-4 border-fp-secondary">
        {/* Decorative Blobs */}
        <div className="absolute -top-10 -left-10 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] animate-blob bg-[radial-gradient(circle,#CBF3BB,#ABE7B2)]" aria-hidden="true" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] animate-[blob_8s_ease-in-out_3s_infinite_alternate] bg-[radial-gradient(circle,#93BFC7,#CBF3BB)]" aria-hidden="true" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-between">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-3 text-accent font-semibold tracking-[0.15em] uppercase text-sm mb-6">
              <span className="w-8 h-px bg-accent" />
              IES Villa de Mazo
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] mb-6 tracking-tight text-white">
              Cultivando el <span className="text-fp-secondary block">Talento Tecnológico</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8aa5ab] leading-relaxed max-w-xl">
              Más de dos décadas conectando la formación pública en La Palma con las exigencias reales de la industria del software y sistemas.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1100px] mx-auto px-6 grid gap-24">
        {/* Historia / Enfoque */}
        <section className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div className="sticky top-28">
            <h2 className="text-[clamp(2rem,3vw,3rem)] font-black text-fp-dark leading-tight mb-6">
              Nuestra filosofía <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-deep">
                Learning by Doing
              </span>
            </h2>
            <div className="w-20 h-1.5 bg-fp-secondary rounded-full" />
          </div>

          <div className="flex flex-col gap-8 text-lg text-fp-muted leading-relaxed">
            <p>
              En el <strong>IES Villa de Mazo</strong> no creemos en las clases lectivas pasivas 
              frente a una pizarra. Nuestro instituto está concebido como un entorno de trabajo real. 
              Desarrollamos aplicaciones multiplataforma, levantamos infraestructuras de servidores y 
              gestionamos redes usando las mismas herramientas que emplean las grandes corporaciones.
            </p>
            <p className="p-8 bg-white rounded-2xl border-l-[6px] border-accent shadow-sm">
              <span className="font-bold text-fp-dark block mb-2">Nuestro objetivo es claro:</span>
              Garantizar que todo estudiante que salga de nuestras aulas posea un perfil técnico sólido y la autonomía necesaria para integrarse de inmediato en el tejido empresarial o iniciar su propia startup tecnológica desde La Palma.
            </p>
          </div>
        </section>

        {/* Pilares Estilizados (Efecto Tipográfico sin iconos genéricos) */}
        <section>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            {[
              {
                number: "01",
                title: "Entorno Técnico",
                desc: "Aulas equipadas que simulan oficinas de desarrollo. Cada alumno dispone del hardware y los permisos necesarios para compilar, testear y equivocarse, porque equivocarse compilando es aprender."
              },
              {
                number: "02",
                title: "Conexión Laboral",
                desc: "Los ciclos formativos finalizan con el módulo FCT (Formación en Centros de Trabajo). Mantenemos alianzas activas con el sector tecnológico canario para ofrecer prácticas formativas con un altísimo nivel de contratación posterior."
              },
              {
                number: "03",
                title: "Talento Local",
                desc: "Fomentamos la especialización desde nuestro entorno. Preparamos profesionales capaces de teletrabajar, gestionar sistemas complejos y liderar proyectos de software de impacto global sin tener que abandonar su isla."
              }
            ].map(pilar => (
              <div key={pilar.number} className="group relative pt-8 pb-4">
                {/* Número Grande en fondo */}
                <div className="absolute top-0 left-0 text-[4rem] font-black text-fp-primary leading-none -z-10 group-hover:-translate-y-2 group-hover:text-divider/30 transition-all duration-500">
                  {pilar.number}
                </div>
                
                {/* Contenido */}
                <h3 className="text-xl font-extrabold text-fp-dark mb-4 border-b-2 border-transparent group-hover:border-accent inline-block transition-colors duration-300">
                  {pilar.title}
                </h3>
                <p className="text-fp-muted leading-relaxed text-[0.95rem]">
                  {pilar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


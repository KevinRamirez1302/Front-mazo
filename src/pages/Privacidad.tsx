export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero con gradiente ── */}
      <header className="bg-gradient-to-b from-accent-deep to-accent py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-5">
          Nuestra Política de Privacidad
        </h1>
        <p className="max-w-2xl mx-auto text-white/90 text-base leading-relaxed">
          En el IES Villa de Mazo, nuestros usuarios son el activo más valioso, y con ellos, sus datos.
          Por eso, asumimos esta declaración de intenciones para garantizarles un uso responsable,
          leal y lícito de sus datos.
        </p>
      </header>

      {/* ── Cuerpo del documento ── */}
      <main className="max-w-3xl mx-auto px-6 py-14 text-[15px] text-gray-700 leading-relaxed space-y-10">

        {/* Introducción */}
        <div className="space-y-4">
          <p>
            La visita a este sitio web no supone que la persona interesada esté obligada a facilitar
            sus datos personales.
          </p>
          <p>
            En caso de que la persona interesada facilite datos de carácter personal{" "}
            <strong>("Datos")</strong>, los datos serán tratados de forma leal y lícita, respetando en
            todo momento los principios y derechos recogidos en el{" "}
            <strong>
              Reglamento (UE) 2016/679 del Parlamento y del Consejo de 27 de abril de 2016
            </strong>{" "}
            relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
            personales y a la libre circulación de estos datos <strong>("RGPD")</strong> y demás
            normativa nacional aplicable (BOE-A-2018-16673).
          </p>
        </div>

        {/* Responsable */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Responsable del Tratamiento
          </h2>
          <p>DEPARTAMENTO DE INFORMÁTICA IES VILLA DE MAZO.</p>
          <p className="mt-1">
            Dirección: C/ Carmen Martínez Jerez, 1, Villa de Mazo, La Palma, Santa Cruz de Tenerife,
            C.P. 38739.
          </p>
          <p className="mt-1">
            E-mail:{" "}
            <a
              href="mailto:dptoinformatica.ies.villamazo@gmail.com"
              className="text-accent-deep hover:underline"
            >
              dptoinformatica.ies.villamazo@gmail.com
            </a>
          </p>
        </section>

        {/* Qué hacemos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            ¿Qué hacemos con tus datos?
          </h2>

          <div className="space-y-6">
            <div>
              <p className="font-bold mb-1">"Interesado"</p>
              <p>
                La finalidad principal del tratamiento es la gestión de los usuarios registrados en
                nuestra web. Legitimación: Art. 6.1.a) RGPD: consentimiento expreso. Los datos serán
                conservados hasta que el <strong>"Interesado"</strong> desee suprimir su información
                personal, esto se puede hacer haciendo una solicitud formal de manera presencial en el
                Departamento de Informática ubicado en el IES Villa de Mazo.
              </p>
            </div>

            <div>
              <p className="font-bold mb-1">"Realizar o tramitar una Pre-Inscripción"</p>
              <p>
                Los datos serán tratados con la finalidad de gestionar tu Pre-Inscripción en alguna
                oferta formativa de uso único y exclusivo del IES Villa de Mazo. La base que legitima el
                tratamiento es la ejecución de la relación contractual de uso de datos conforme al Art.
                6.1.b) RGPD. Los datos podrán ser comunicados a los encargados en secretaría del
                instituto IES Villa de Mazo para la efectuación de la Pre-Inscripción de los interesados,
                y a los profesores o personal encargado del Departamento de Informática del IES Villa de
                Mazo. Esta comunicación está legitimada por el Art. 6.1.c) RGPD; el tratamiento es
                necesario para cumplir con la obligación legal de garantía estipulada por el Real Decreto
                Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la
                Ley General para la Defensa de los Consumidores y Usuarios y otras leyes
                complementarias. Los datos serán conservados hasta que el <strong>"Interesado"</strong>{" "}
                suprima su información personal.
              </p>
              <p className="mt-3">
                En caso de que el ingreso de los datos lo realice una persona distinta a la poseedora de
                los datos tramitados en el pedido, el IES Villa de Mazo y el Departamento de Informática
                informan que se libran de responsabilidades ante el hecho. El tratamiento de los datos es
                exactamente el mismo y solo el <strong>"Poseedor"</strong> de los datos del{" "}
                <strong>"Interesado"</strong> (el "Interesado" mismo) podrá solicitar la supresión de los
                datos. Los datos de contacto podrán ser tratados con la finalidad de notificar el estado
                de la pre-inscripción por e-mail y WhatsApp al <strong>"Interesado"</strong>, así como
                eventos relacionados al ingreso como estudiante al IES Villa de Mazo. Podrás suprimir los
                datos de manera presencial en el IES Villa de Mazo.
              </p>
            </div>

            <div>
              <p className="font-bold mb-1">"Publicidad"</p>
              <p>
                Los datos proporcionados por el interesado <strong>NUNCA serán usados con fines
                comerciales</strong> para el envío de publicidad, venta o cualquier otra explotación de
                los mismos.
              </p>
            </div>

            <div>
              <p className="font-bold mb-1">"Formulario de Contacto"</p>
              <p>
                Los datos serán tratados para tramitar una petición de información. La base legitimadora
                del tratamiento es el Art. 6.1.a) RGPD, el consentimiento expreso del interesado.
              </p>
            </div>

            <div>
              <p className="font-bold mb-1">"ChatBot (Mazito)"</p>
              <p>
                Los datos consultados por los <strong>"interesados"</strong> no serán guardados ni podrán
                ser consultados para la extracción de información de los "interesados". La información
                generada por el uso y disfrute del chatbot será únicamente accesible al momento de
                consultar; al recargar la página su registro no será guardado ni aprovechado por el IES
                Villa de Mazo ni por el Departamento de Informática de dicha institución. Los antes
                mencionados no se responsabilizan del uso de estos datos por terceros que proporcionen el
                servicio de inteligencia artificial. La base legitimadora del tratamiento es el Art.
                6.1.b) RGPD.
              </p>
            </div>
          </div>
        </section>

        {/* Destinatarios */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Destinatarios de los datos
          </h2>
          <p className="mb-3">
            Con motivo de la pre-inscripción, sus datos pueden ser comunicados a los siguientes
            destinatarios:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Entidades educacionales relacionadas a los distintos entes públicos que dependan del IES
              Villa de Mazo.
            </li>
            <li>
              El IES Villa de Mazo: Departamentos de Personal Docente y Personal Administrativo.
            </li>
            <li>
              A las administraciones públicas a las que tengamos que facilitar información a petición de
              un requerimiento. La base legitimadora de la cesión es el Art. 6.1.c) RGPD — obligación
              legal.
            </li>
          </ul>
        </section>

        {/* Derechos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Derechos de las personas interesadas
          </h2>
          <p className="mb-3">La persona interesada puede ejercer los siguientes derechos:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Podrá solicitar información sobre los datos de carácter personal almacenados que le
              conciernan <strong>(acceso)</strong>.
            </li>
            <li>
              Podrá solicitar que se corrija la inexactitud de sus datos personales{" "}
              <strong>(rectificación)</strong>.
            </li>
            <li>
              Podrá solicitar la eliminación o limitación del tratamiento de sus datos personales{" "}
              <strong>(supresión y limitación)</strong>.
            </li>
            <li>
              Oposición al tratamiento, por ejemplo, frente a la recepción de publicidad{" "}
              <strong>(oposición)</strong>.
            </li>
          </ul>
        </section>

        {/* DPO */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Delegado de protección de datos
          </h2>
          <p>
            Hemos designado un delegado de protección de datos <strong>(DPO)</strong> para cualquier
            cuestión relacionada con sus datos personales. Puede contactar con él a través de la
            dirección:{" "}
            <a
              href="mailto:dptoinformatica.ies.villamazo@gmail.com"
              className="text-accent-deep hover:underline"
            >
              dptoinformatica.ies.villamazo@gmail.com
            </a>
          </p>
        </section>

        {/* Calidad */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Calidad de los datos
          </h2>
          <p>
            Los <strong>"Interesados"</strong> deberán garantizar la veracidad, exactitud, autenticidad y
            vigencia de los datos de carácter personal que les hayan sido recogidos.
          </p>
        </section>

        {/* Menores */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Protección de los menores
          </h2>
          <p>
            No recogemos datos personales de menores. Es responsabilidad del padre/madre/tutor legal
            velar por la privacidad de los menores, haciendo todo lo posible para asegurar que han
            autorizado la recogida y el uso de los datos personales del menor.
          </p>
        </section>

        {/* RRSS */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Redes Sociales
          </h2>
          <p>
            Se puede acceder a las redes sociales <strong>Facebook, Twitter, TikTok o YouTube</strong> de
            acceso abierto a todos los usuarios. Se trata de sitios web donde el usuario puede registrarse
            y seguirnos gratuitamente. En estas redes sociales los usuarios podrán conocer nuestras
            actividades, opiniones y acceder a fotos y vídeos. Los usuarios de estas redes sociales deben
            ser conscientes de que este lugar es independiente de la web{" "}
            <a
              href="https://www.villamazo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-deep hover:underline"
            >
              www.villamazo.vercel.app
            </a>{" "}
            y está abierto, es decir, es visible para todos sus usuarios. Las políticas de privacidad a
            aplicar a estos contenidos son las fijadas por cada red social. El IES Villa de Mazo no es
            titular de las redes sociales.
          </p>
        </section>

        {/* Fecha */}
        <p className="text-gray-500 text-sm pt-4 border-t border-gray-200">
          15 de abril del 2026
        </p>

      </main>
    </div>
  );
}
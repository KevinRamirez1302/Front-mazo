export interface CourseInfo {
  id: string;
  emoji: string;
  badge: string;
  badgeStyle: string;
  title: string;
  short: string;
  duration: string;
  desc: string;
  tags: string[];
  extendedDesc: string;
  careerOpportunities: string[];
  curriculum: string[];
}

export const courses: CourseInfo[] = [
  {
    id: 'dam',
    emoji: '💻',
    badge: 'Grado Superior',
    badgeStyle: 'bg-accent text-white',
    title: 'Desarrollo de Aplicaciones Multiplataforma',
    short: 'DAM',
    duration: '2 años · 2.000 horas',
    desc: 'Diseña y desarrolla aplicaciones para dispositivos móviles, escritorio y sistemas de gestión empresarial.',
    tags: ['Java', 'Kotlin', 'Android', 'SQL', 'Git'],
    extendedDesc: 'El Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma te prepara para convertirte en un desarrollador de software versátil. Adquirirás los conocimientos necesarios para dominar tecnologías actuales, diseñar bases de datos robustas y crear aplicaciones empresariales escalables tanto para dispositivos móviles como para el escritorio.',
    careerOpportunities: [
      'Desarrollador de aplicaciones Android/iOS',
      'Programador de aplicaciones de escritorio',
      'Desarrollador Backend / Frontend',
      'Gestor de bases de datos',
      'Analista programador'
    ],
    curriculum: [
      'Sistemas Informáticos',
      'Bases de Datos',
      'Programación Orientada a Objetos',
      'Lenguajes de Marcas y Sistemas de Gestión de Información',
      'Entornos de Desarrollo',
      'Acceso a Datos',
      'Desarrollo de Interfaces',
      'Programación Multimedia y Dispositivos Móviles',
      'Sistemas de Gestión Empresarial'
    ]
  },
  {
    id: 'smr',
    emoji: '🖧',
    badge: 'Grado Medio',
    badgeStyle: 'bg-accent-dark text-white',
    title: 'Sistemas Microinformáticos y Redes',
    short: 'SMR',
    duration: '2 años · 2.000 horas',
    desc: 'Instala, configura y mantiene equipos informáticos y redes en empresas. Administra sistemas y servicios.',
    tags: ['Redes', 'Windows Server', 'Linux', 'Cisco', 'VoIP'],
    extendedDesc: 'En este Ciclo de Grado Medio obtendrás las bases esenciales de la administración de sistemas y el despliegue de redes locales. Es la formación perfecta para aquellos que desean trabajar asegurando que la infraestructura informática de una empresa funcione de manera fluida, segura y eficiente, combinando software y hardware.',
    careerOpportunities: [
      'Técnico instalador-reparador de equipos informáticos',
      'Técnico de soporte informático',
      'Técnico de redes de datos',
      'Técnico en administración de sistemas locales',
      'Operador de teleasistencia'
    ],
    curriculum: [
      'Montaje y Mantenimiento de Equipos',
      'Sistemas Operativos Monopuesto y en Red',
      'Aplicaciones Ofimáticas',
      'Redes Locales',
      'Seguridad Informática',
      'Servicios en Red',
      'Aplicaciones Web'
    ]
  },
  {
    id: 'fpb-informatica',
    emoji: '📊',
    badge: 'FPB',
    badgeStyle: 'bg-divider text-fp-dark',
    title: 'Informatica de oficina',
    short: 'FPB Informática',
    duration: '2 años · 2.000 horas',
    desc: 'La base perfecta para iniciarte en el mundo digital. Aprende ofimática, mantenimiento de equipos y redes.',
    tags: ['Office', 'Hardware', 'Internet', 'Seguridad'],
    extendedDesc: 'La Formación Profesional Básica en Informática de Oficina te brinda un primer acercamiento profesional al manejo de herramientas de escritorio, configuración física de equipos y mantenimiento esencial. Está diseñada como un punto de partida accesible que puede abrir las puertas a ciclos de grado medio.',
    careerOpportunities: [
      'Auxiliar de mantenimiento de equipos informáticos',
      'Ayudante de instalador de redes',
      'Auxiliar de digitalización y ofimática',
      'Personal de apoyo en soporte técnico básico'
    ],
    curriculum: [
      'Operaciones auxiliares de montaje de equipos informáticos',
      'Operaciones auxiliares para la configuración y explotación',
      'Montaje y mantenimiento de sistemas y componentes',
      'Instalación y mantenimiento de redes locales básicas',
      'Ofimática y tratamiento de la información',
      'Atención al cliente en soporte primario'
    ]
  }
];

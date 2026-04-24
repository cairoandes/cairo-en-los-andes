import type { Lang } from "@/contexts/LanguageContext";

/* ── helper ── */
export function t(lang: Lang, key: string): string {
  return (translations[lang] as Record<string, string>)?.[key] ?? key;
}

/* ── nav ── */
export const navLinks = (lang: Lang) => [
  { label: lang === "es" ? "Inicio" : "Home", href: "#inicio", type: "scroll" as const },
  { label: lang === "es" ? "El Festival" : "The Festival", href: "#festival", type: "scroll" as const },
  { label: lang === "es" ? "Maestros" : "Masters", href: "/maestros", type: "page" as const },
  { label: "Workshops", href: "#workshops", type: "scroll" as const },
  { label: "Galas", href: "/galas", type: "page" as const },
  { label: lang === "es" ? "Premios" : "Prizes", href: "/premios", type: "page" as const },
  { label: lang === "es" ? "Paquetes" : "Packages", href: "#paquetes", type: "scroll" as const },
  { label: "Sponsors", href: "/sponsors", type: "page" as const },
  { label: lang === "es" ? "Turismo" : "Tourism", href: "/turismo", type: "page" as const },
  { label: lang === "es" ? "Contacto" : "Contact", href: "#contacto", type: "scroll" as const },
  { label: lang === "es" ? "Pasaporte" : "Passport", href: "/pasaporte-cairo-andes", type: "page" as const },
  { label: lang === "es" ? "Mi Cuenta" : "My Account", href: "/mi-cuenta", type: "page" as const },
];

/* ── maestros ── */
export const maestrosData = (lang: Lang): Array<{name: string; role: string; origin: string; desc: string; photo?: string}> => [
  {
    name: "Khalil Khalil",
    role: lang === "es" ? "Organizador" : "Organizer",
    origin: "Egypt / Argentina",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/XFdjpItbZwnPOHah.jpg",
    desc:
      lang === "es"
        ? "Maestro argentino radicado en Egipto desde hace más de veinte años. Ha enseñado en los festivales más importantes del país junto a grandes figuras como Nagwa Fouad, Mona El Said y Zizi Mustafa."
        : "Argentine master based in Egypt for over twenty years. He has taught at the most important festivals in the country alongside great figures such as Nagwa Fouad, Mona El Said, and Zizi Mustafa.",
  },
  {
    name: "Farah Nasri",
    role: "Master Teacher",
    origin: "Egypt",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/ocEkFZlgOfeatMcf.jpg",
    desc:
      lang === "es"
        ? "Bailarina y maestra radicada en El Cairo, fue descubierta por la compañía Nile Maxim en 2014. Combina técnica, musicalidad y un fuerte enfoque pedagógico."
        : "Dancer and teacher based in Cairo, she was discovered by the Nile Maxim company in 2014. She combines technique, musicality, and a strong pedagogical approach.",
  },
  {
    name: "Samia Yasbek",
    role: "Master Teacher",
    origin: "Argentina",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/vPRlEYunOtzMrUgu.jpg",
    desc:
      lang === "es"
        ? "Profesora internacional de belly dance con casi 30 años de trayectoria. Directora de la Escuela Samia Yasbek, reconocida por su técnica y autenticidad."
        : "International belly dance teacher with nearly 30 years of experience. Director of the Samia Yasbek School, recognized for her technique and authenticity.",
  },
  {
    name: "Lilieth Polite",
    role: lang === "es" ? "Madrina del Festival" : "Festival Godmother",
    origin: "United States",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/BPowslqWfdgZYoYq.jpg",
    desc:
      lang === "es"
        ? "Bailarina y maestra radicada en Estados Unidos. Comenzó su trayectoria en Dallas en 2009, obtuvo la certificación de Ansuya en 2013 y ha ganado premios en Egipto."
        : "Dancer and teacher based in the United States. She began her career in Dallas in 2009, obtained Ansuya certification in 2013, and has won awards in Egypt.",
  },
  {
    name: "Stefanya",
    role: "Master Teacher",
    origin: "United States",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/hwPAUlGATUrrnwQb.jpg",
    desc:
      lang === "es"
        ? "Artista, coreógrafa y maestra de danza oriental de renombre internacional, radicada en Los Ángeles. Cofundadora de la L.A. Bellydance Academy."
        : "Internationally renowned artist, choreographer, and oriental dance teacher based in Los Angeles. Co-founder of the L.A. Bellydance Academy.",
  },
  {
    name: "Kasumi",
    role: "Master Teacher",
    origin: "Egypt / Japan",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/iSTPhZEmOIUtktmx.jpg",
    desc:
      lang === "es"
        ? "Artista japonesa radicada en El Cairo y una figura histórica de la danza egipcia. Fue la primera bailarina oriental asiática en presentarse en el Cairo Marriott en 1997."
        : "Japanese artist based in Cairo and a historic figure in Egyptian dance. She was the first Asian oriental dancer to perform at the Cairo Marriott in 1997.",
  },
  {
    name: "Princess of Cairo",
    role: "Master Teacher",
    origin: "UAE / Egypt",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/xggENsiicGqrVxXB.jpg",
    desc:
      lang === "es"
        ? "Princess Turrini es una artista, maestra y especialista cultural radicada en El Cairo, reconocida internacionalmente como 'The Egyptian Barbie'."
        : "Princess Turrini is an artist, teacher, and cultural specialist based in Cairo, internationally recognized as 'The Egyptian Barbie'.",
  },
  {
    name: "Dana Farida",
    role: "Master Teacher",
    origin: "Brazil",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/UjUslirBAGHkgnEC.jpg",
    desc:
      lang === "es"
        ? "Una de las grandes referentes de la danza oriental egipcia en Brasil y en la escena internacional. Bailarina, coreógrafa, docente y directora artística, cuenta con más de 25 años de trayectoria y un profundo compromiso con la tradición."
        : "One of the great references of Egyptian oriental dance in Brazil and on the international scene. Dancer, choreographer, teacher, and artistic director, with over 25 years of experience and a deep commitment to tradition.",
  },
  {
    name: "Tatiana Pedraza",
    role: "Master Teacher",
    origin: "Argentina",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/LyhrBZtjnBatpEnm.jpg",
    desc:
      lang === "es"
        ? "Figura clave de las danzas árabes en el NOA y una de las referentes más importantes de Tucumán. Bailarina, formadora, jurado y directora, ha construido una trayectoria sólida basada en la excelencia artística y el liderazgo."
        : "Key figure in Arab dances in northwestern Argentina and one of the most important references in Tucumán. Dancer, trainer, judge, and director, she has built a solid career based on artistic excellence and leadership.",
  },
  {
    name: "Yeliena Shvets Leosh",
    role: "Master Teacher",
    origin: "International",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/JrNcnXnKhPGUbBdy.jpg",
    desc:
      lang === "es"
        ? "Bailarina, coreógrafa y reconocida referente internacional de la danza oriental. Directora de la escuela LEOSH, fundadora de proyectos artísticos de proyección global y una artista admirada por su visión y excelencia escénica."
        : "Dancer, choreographer, and internationally recognized reference in oriental dance. Director of the LEOSH school, founder of global artistic projects, and an artist admired for her vision and scenic excellence.",
  },
  {
    name: "Kahina Manelli",
    role: "Master Teacher",
    origin: "International",
    photo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/IYMoOzOQQuPRmQby.jpg",
    desc:
      lang === "es"
        ? "Artista de sólida trayectoria internacional, con más de 30 años de carrera como bailarina y 25 años dedicados a la enseñanza. Maestra, coreógrafa y productora, su recorrido está marcado por una profunda conexión con la cultura árabe."
        : "Artist with a solid international career, over 30 years as a dancer and 25 years dedicated to teaching. Teacher, choreographer, and producer, her journey is marked by a deep connection with Arab culture.",
  },
];

/* ── workshops ── */
export const workshopsData = (lang: Lang) => [
  {
    title: lang === "es" ? "Cabaret Egipcio" : "Egyptian Cabaret",
    desc:
      lang === "es"
        ? "Estilo clásico de los cabarets de El Cairo: elegancia, presencia escénica y dominio del lenguaje corporal moderno."
        : "Classic style of Cairo's cabarets: elegance, stage presence, and mastery of modern body language.",
  },
  {
    title: "Shaabi & Mahraganat",
    desc:
      lang === "es"
        ? "Energía, ritmo y movimiento urbano auténtico: desde el shaabi tradicional hasta el mahraganat moderno."
        : "Energy, rhythm, and authentic urban movement: from traditional shaabi to modern mahraganat.",
  },
  {
    title: lang === "es" ? "Baladi Interpretación" : "Baladi Interpretation",
    desc:
      lang === "es"
        ? "Trabajo emocional, expresión profunda y musicalidad aplicada al baladi para lograr una interpretación real."
        : "Emotional work, deep expression, and musicality applied to baladi for a real interpretation.",
  },
  {
    title: lang === "es" ? "Musicalidad y Ritmos" : "Musicality & Rhythms",
    desc:
      lang === "es"
        ? "Comprensión profunda de ritmos, acentos y frases musicales esenciales para trabajar en Egipto."
        : "Deep understanding of rhythms, accents, and musical phrases essential for working in Egypt.",
  },
  {
    title: lang === "es" ? "Era Dorada" : "Golden Era",
    desc:
      lang === "es"
        ? "Fundamentos de la danza oriental de la primera mitad del siglo XX: técnica inicial, coreografías icónicas."
        : "Foundations of oriental dance from the first half of the 20th century: initial technique, iconic choreographies.",
  },
  {
    title: lang === "es" ? "Creación de Show" : "Show Creation",
    desc:
      lang === "es"
        ? "Herramientas profesionales para crear un show sólido: estructura, narrativa y presencia escénica."
        : "Professional tools to create a solid show: structure, narrative, and stage presence.",
  },
];

/* ── paquetes ── */
export const paquetesData = (lang: Lang) => [
  {
    name: "Full Pass",
    sub: lang === "es" ? "Sin Hotel" : "No Hotel",
    price: "$179",
    features:
      lang === "es"
        ? [
            "Gala de Apertura + Cena buffet 5 estrellas",
            "Alfombra Roja",
            "Acceso a todos los seminarios y workshops",
            "Acceso a todas las galas del festival",
            "Acceso a todas las actividades del evento",
            "Incluye una participación grupal en la competencia",
            "50% off en la primera participación solista",
          ]
        : [
            "Opening Gala + 5-star buffet dinner",
            "Red Carpet",
            "Access to all seminars and workshops",
            "Access to all festival galas",
            "Access to all event activities",
            "Includes one group competition entry",
            "50% off first solo competition entry",
          ],
    financing:
      lang === "es"
        ? "Inscripción: $24 + 5 cuotas de $31"
        : "Registration: $24 + 5 installments of $31",
    highlight: false,
  },
  {
    name: "Full Pass",
    sub: "Hotel Boutique",
    price: "$240",
    features:
      lang === "es"
        ? [
            "3 noches de hotel con desayuno (habitación compartida)",
            "Gala de Apertura + Cena buffet 5 estrellas",
            "Alfombra Roja",
            "Acceso a todos los seminarios y workshops",
            "Acceso a todas las galas y actividades",
            "Incluye una participación grupal en la competencia",
            "50% off en la primera participación solista",
          ]
        : [
            "3 hotel nights with breakfast (shared room)",
            "Opening Gala + 5-star buffet dinner",
            "Red Carpet",
            "Access to all seminars and workshops",
            "Access to all galas and activities",
            "Includes one group competition entry",
            "50% off first solo competition entry",
          ],
    financing:
      lang === "es"
        ? "Inscripción: $30 + 5 cuotas de $42"
        : "Registration: $30 + 5 installments of $42",
    highlight: true,
  },
  {
    name: "Full Pass",
    sub: "Sheraton Hotel",
    price: "$680",
    features:
      lang === "es"
        ? [
            "3 noches en el Sheraton con desayuno incluido",
            "Acceso completo al gimnasio, piscina y comodidades 5 estrellas",
            "Gala de Apertura + Cena buffet 5 estrellas",
            "Alfombra Roja",
            "Acceso a todos los seminarios y workshops",
            "Acceso a todas las galas y actividades",
            "Incluye una participación grupal en la competencia",
          ]
        : [
            "3 nights at the Sheraton with breakfast included",
            "Full access to gym, pool, and 5-star amenities",
            "Opening Gala + 5-star buffet dinner",
            "Red Carpet",
            "Access to all seminars and workshops",
            "Access to all galas and activities",
            "Includes one group competition entry",
          ],
    financing:
      lang === "es"
        ? "Inscripción: $69 + 5 cuotas de $124"
        : "Registration: $69 + 5 installments of $124",
    highlight: false,
  },
];

/* ── feature icons labels ── */
export const featureLabels = (lang: Lang) => [
  { key: "workshops", es: "14 Workshops", en: "14 Workshops" },
  { key: "competencia", es: "Competencia", en: "Competition" },
  { key: "galas", es: "3 Galas", en: "3 Galas" },
  { key: "cena", es: "Cena de Gala", en: "Gala Dinner" },
  { key: "alfombra", es: "Alfombra Roja", en: "Red Carpet" },
  { key: "certificacion", es: "Certificación", en: "Certification" },
].map((f) => ({ ...f, label: lang === "es" ? f.es : f.en }));

/* ── countdown labels ── */
export const countdownLabels = (lang: Lang) =>
  lang === "es"
    ? { days: "Días", hours: "Horas", min: "Min", sec: "Seg" }
    : { days: "Days", hours: "Hours", min: "Min", sec: "Sec" };

/* ── all other UI strings ── */
const translations: Record<Lang, Record<string, string>> = {
  es: {
    // hero
    heroPresents: "Khalil Khalil Presenta",
    heroTitle1: "Cairo",
    heroTitle2: "en los Andes",
    heroSubtitle: "Festival",
    heroDate: "16 · 17 · 18 Octubre 2026",
    heroLocation: "Sheraton Hotel Salta, Argentina",
    heroCta: "Reservá tu lugar",

    // about
    aboutSub: "Descubrí el Festival",
    aboutTitle1: "Cairo",
    aboutTitle2: "en los Andes",
    aboutP1:
      "Cuando Cairo llega a los Andes, nace una energía distinta: una mezcla de arte, fuerza y movimiento. Este festival reúne a maestros de renombre internacional en un escenario único, rodeado de la belleza natural de la montaña.",
    aboutP2:
      "Una experiencia creada para inspirar, elevar y conectar. La ciudad de Salta se alza entre montañas que atraviesan el horizonte andino. Sus colores, su naturaleza y su energía crean un destino vivo e inolvidable.",
    aboutImgLabel: "Salta La Linda",
    aboutImgSub: "Valle de Montañas",

    // maestros
    maestrosSub: "Elenco Principal",
    maestrosTitle: "Nuestros Maestros",
    maestrosMore: "Pronto anunciaremos más maestros invitados.",

    // workshops
    workshopsSub: "Aprendé de los Mejores",
    workshopsTitle: "Nuestros Workshops",
    workshopsDesc:
      "Nuestros workshops transmiten la esencia auténtica de la danza egipcia y te brindan herramientas reales en técnica, musicalidad, expresión y presencia escénica.",

    // galas
    galasSub: "Noches Inolvidables",
    galasTitle1: "Galas",
    galasTitle2: "& Escenario",
    galasP1:
      "Te invitamos a vivir una noche inolvidable. Abrimos el festival con una elegante alfombra roja y una deliciosa cena buffet. Disfrutá de shows en vivo, presentaciones de los maestros y el ambiente perfecto para empezar un fin de semana mágico.",
    galasP2:
      "Todos los eventos principales del festival tienen lugar en un escenario profesional preparado especialmente para tus presentaciones inolvidables.",
    galasTag1: "3 Galas",
    galasTag2: "Cena de Gala",
    galasTag3: "Competencia",

    // competencia
    compSub: "Brillá en el Escenario",
    compTitle: "Competencias & Premios",
    compPrize1Title: "Mejor Maestra / Coreógrafa",
    compPrize1Desc:
      "La maestra ganadora de las categorías grupales recibe como premio un pasaje aéreo a Egipto.",
    compPrize1Tag: "Pasaje a Egipto",
    compPrize2Title: "Reina Cairo Andes",
    compPrize2Desc:
      "La mejor bailarina solista recibe un premio en efectivo y el título de Reina Cairo Andes.",
    compPrize2Tag: "500 USD en efectivo",

    // paquetes
    paquetesSub: "Elegí tu Experiencia",
    paquetesTitle: "Nuestros Paquetes",
    paquetesDesc:
      "Ofrecemos paquetes pensados para cada necesidad: sin hotel, con hotel boutique o con la experiencia completa del Sheraton.",
    paquetesPopular: "Más Popular",
    paquetesCta: "Inscribite",
    paquetesFinancing: "Financiación:",
    paquetesDisclaimer:
      "Los planes de financiación en 6 cuotas aplican solo para inscripciones realizadas antes del 31 de marzo. Precios finales en dólares.",

    // carta
    cartaSub: "Carta del Director",
    cartaTitle1: "Querida",
    cartaTitle2: "Artista",
    cartaP1:
      "En la vida, hay momentos en los que la danza deja de ser movimiento y se convierte en destino. Momentos en los que entendemos que lo que hacemos no es solo arte, sino un camino para transformar nuestra historia, nuestro cuerpo y nuestra voz.",
    cartaP2:
      "Hoy quiero invitarte, desde el corazón, a compartir un encuentro que nace del deseo profundo de crear belleza, unión y propósito. Un espacio pensado para que podamos celebrar nuestra pasión, crecer juntas y honrar aquello que nos mueve por dentro.",
    cartaP3:
      "Sería un honor tenerte allí, acompañando este sueño con tu luz y tu presencia.",
    cartaSign: "Director — Cairo Andes Festival",

    // contacto
    contactoSub: "Hablemos",
    contactoTitle: "Contacto Oficial",
    contactoCta: "Reservá tu lugar ahora",

    // footer
    footerDesc:
      "Un festival creado para inspirar, elevar y conectar. Donde la danza deja de ser movimiento y se convierte en destino.",
    footerNav: "Navegación",
    footerContact: "Contacto Oficial",
    footerRights: "Todos los derechos reservados.",
    footerOrg: "Organizado por Khalil Khalil",

    // navbar
    navCta: "Inscribite",
  },
  en: {
    // hero
    heroPresents: "Khalil Khalil Presents",
    heroTitle1: "Cairo",
    heroTitle2: "in the Andes",
    heroSubtitle: "Festival",
    heroDate: "October 16 · 17 · 18, 2026",
    heroLocation: "Sheraton Hotel Salta, Argentina",
    heroCta: "Reserve your spot",

    // about
    aboutSub: "Discover the Festival",
    aboutTitle1: "Cairo",
    aboutTitle2: "in the Andes",
    aboutP1:
      "When Cairo meets the Andes, a unique energy is born: a blend of art, strength, and movement. This festival brings together internationally renowned masters on a unique stage, surrounded by the natural beauty of the mountains.",
    aboutP2:
      "An experience created to inspire, elevate, and connect. The city of Salta rises among mountains that cross the Andean horizon. Its colors, nature, and energy create a vivid and unforgettable destination.",
    aboutImgLabel: "Salta La Linda",
    aboutImgSub: "Mountain Valley",

    // maestros
    maestrosSub: "Main Cast",
    maestrosTitle: "Our Masters",
    maestrosMore: "More guest masters will be announced soon.",

    // workshops
    workshopsSub: "Learn from the Best",
    workshopsTitle: "Our Workshops",
    workshopsDesc:
      "Our workshops convey the authentic essence of Egyptian dance and provide real tools in technique, musicality, expression, and stage presence.",

    // galas
    galasSub: "Unforgettable Nights",
    galasTitle1: "Galas",
    galasTitle2: "& Stage",
    galasP1:
      "We invite you to experience an unforgettable evening. We open the festival with an elegant red carpet and a delicious buffet dinner. Enjoy live shows, master performances, and the perfect atmosphere to start a magical weekend.",
    galasP2:
      "All main festival events take place on a professional stage specially prepared for your unforgettable performances.",
    galasTag1: "3 Galas",
    galasTag2: "Gala Dinner",
    galasTag3: "Competition",

    // competencia
    compSub: "Shine on Stage",
    compTitle: "Competitions & Prizes",
    compPrize1Title: "Best Teacher / Choreographer",
    compPrize1Desc:
      "The winning teacher of the group categories receives a plane ticket to Egypt as a prize.",
    compPrize1Tag: "Ticket to Egypt",
    compPrize2Title: "Cairo Andes Queen",
    compPrize2Desc:
      "The best solo dancer receives a cash prize and the title of Cairo Andes Queen.",
    compPrize2Tag: "500 USD cash prize",

    // paquetes
    paquetesSub: "Choose Your Experience",
    paquetesTitle: "Our Packages",
    paquetesDesc:
      "We offer packages designed for every need: without hotel, with boutique hotel, or the full Sheraton experience.",
    paquetesPopular: "Most Popular",
    paquetesCta: "Register",
    paquetesFinancing: "Financing:",
    paquetesDisclaimer:
      "The 6-installment financing plans apply only for registrations made before March 31. Final prices in US dollars.",

    // carta
    cartaSub: "Director's Letter",
    cartaTitle1: "Dear",
    cartaTitle2: "Artist",
    cartaP1:
      "In life, there are moments when dance stops being movement and becomes destiny. Moments when we understand that what we do is not just art, but a path to transform our story, our body, and our voice.",
    cartaP2:
      "Today I want to invite you, from the heart, to share a gathering born from the deep desire to create beauty, unity, and purpose. A space designed so we can celebrate our passion, grow together, and honor what moves us from within.",
    cartaP3:
      "It would be an honor to have you there, accompanying this dream with your light and your presence.",
    cartaSign: "Director — Cairo Andes Festival",

    // contacto
    contactoSub: "Let's Talk",
    contactoTitle: "Official Contact",
    contactoCta: "Reserve your spot now",

    // footer
    footerDesc:
      "A festival created to inspire, elevate, and connect. Where dance stops being movement and becomes destiny.",
    footerNav: "Navigation",
    footerContact: "Official Contact",
    footerRights: "All rights reserved.",
    footerOrg: "Organized by Khalil Khalil",

    // navbar
    navCta: "Register",
  },
};

/**
 * Turismo Page — "Descubrí Salta & el Norte Argentino"
 * Design: Cinematic dark theme with golden accents, matching the main site.
 * Premium tourism experience page with destinations, experiences, and WhatsApp CTA.
 */
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin, Mountain, Wine, Sun, Users, Calendar, Compass, Star, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const t = {
  es: {
    heroTitle: "Descubrí Salta & el Norte Argentino",
    heroSubtitle: "Viví Cairo Andes y aprovechá tu viaje para descubrir algunos de los paisajes más impactantes de Argentina. Te ayudamos a recibir propuestas turísticas exclusivas antes, durante o después del festival.",
    btnSolicitar: "Solicitar paquetes turísticos",
    btnWhatsApp: "Hablar por WhatsApp",
    introTitle: "Más que un festival, una experiencia",
    introP1: "Cairo Andes no es solo un festival. Es una experiencia internacional en una de las regiones más mágicas de Sudamérica.",
    introP2: "Si viajás a Salta para vivir el festival, también podés extender tu estadía y conocer destinos únicos del norte argentino como Cafayate, Cachi, Tilcara, Purmamarca, Salinas Grandes, Humahuaca y mucho más.",
    introP3: "Estamos trabajando para que nuestras participantes y acompañantes puedan acceder a información y propuestas turísticas personalizadas, con opciones según sus días disponibles, presupuesto e intereses.",
    expTitle: "¿Qué tipo de experiencias podés vivir?",
    experiences: [
      { icon: "sun", label: "Escapadas de medio día" },
      { icon: "compass", label: "Excursiones de día completo" },
      { icon: "star", label: "Experiencias premium" },
      { icon: "users", label: "Tours privados o grupales" },
      { icon: "calendar", label: "Opciones antes o después del festival" },
      { icon: "mountain", label: "Paquetes para escuelas y delegaciones" },
    ],
    destTitle: "Destinos Destacados",
    destinations: [
      {
        name: "Cafayate & Valles Calchaquíes",
        desc: "Viñedos, montañas rojizas, paisajes imponentes y una de las rutas más espectaculares del país. Ideal para quienes quieren vivir una experiencia visual, relajada y elegante entre naturaleza, cultura y gastronomía regional.",
        includes: ["Quebrada de las Conchas", "Miradores naturales", "Cafayate histórico", "Bodegas y degustaciones", "Opciones de día completo o experiencia extendida"],
        cta: "Solicitar información de Cafayate",
      },
      {
        name: "Cachi & Ruta Escénica de Altura",
        desc: "Un recorrido inolvidable entre montañas, caminos panorámicos y pueblos con identidad única. Perfecto para quienes quieren descubrir la esencia profunda de Salta y sus paisajes más auténticos.",
        includes: ["Cuesta del Obispo", "Piedra del Molino", "Parque Nacional Los Cardones", "Pueblo histórico de Cachi", "Opciones de día completo o experiencia privada"],
        cta: "Solicitar información de Cachi",
      },
      {
        name: "Tilcara, Purmamarca & Quebrada de Humahuaca",
        desc: "Colores, historia, cultura ancestral y algunos de los paisajes más emblemáticos del norte argentino. Una experiencia ideal para quienes quieren conocer la energía única de Jujuy y sus pueblos más famosos.",
        includes: ["Purmamarca", "Cerro de los 7 Colores", "Tilcara", "Maimará / Humahuaca", "Opciones grupales o privadas"],
        cta: "Solicitar información de Tilcara & Quebrada",
      },
    ],
    customTitle: "Paquetes personalizados para participantes de Cairo Andes",
    customIntro: "¿Venís desde otra ciudad o desde otro país? Podemos ayudarte a recibir propuestas turísticas adaptadas a tu viaje, incluyendo opciones para:",
    customOptions: ["Antes del festival", "Después del festival", "1 día extra", "2 o 3 días extra", "Escuelas o grupos", "Acompañantes", "Experiencias privadas o premium"],
    customOutro: "Nuestro equipo puede orientarte para que aproveches tu estadía al máximo y conviertas Cairo Andes en una experiencia completa.",
    customCta: "Quiero recibir propuestas personalizadas",
    ctaTitle: "Viví mucho más que un festival",
    ctaText: "Cairo Andes te invita a bailar, conectar y vivir una experiencia internacional única… pero también a descubrir una de las regiones más bellas de Argentina. Si querés recibir propuestas turísticas, escribinos y te ayudamos a planificar tu viaje.",
    ctaBtnInfo: "Solicitar información turística",
    ctaBtnWA: "Hablar por WhatsApp",
    includesLabel: "Incluye:",
  },
  en: {
    heroTitle: "Discover Salta & Northern Argentina",
    heroSubtitle: "Experience Cairo Andes and take the opportunity to discover some of Argentina's most breathtaking landscapes. We help you receive exclusive tourism proposals before, during, or after the festival.",
    btnSolicitar: "Request tourism packages",
    btnWhatsApp: "Chat on WhatsApp",
    introTitle: "More than a festival, an experience",
    introP1: "Cairo Andes is not just a festival. It is an international experience in one of the most magical regions of South America.",
    introP2: "If you're traveling to Salta for the festival, you can also extend your stay and discover unique destinations in northern Argentina such as Cafayate, Cachi, Tilcara, Purmamarca, Salinas Grandes, Humahuaca, and much more.",
    introP3: "We are working to ensure that our participants and companions can access personalized tourism information and proposals, with options based on their available days, budget, and interests.",
    expTitle: "What kind of experiences can you enjoy?",
    experiences: [
      { icon: "sun", label: "Half-day getaways" },
      { icon: "compass", label: "Full-day excursions" },
      { icon: "star", label: "Premium experiences" },
      { icon: "users", label: "Private or group tours" },
      { icon: "calendar", label: "Options before or after the festival" },
      { icon: "mountain", label: "Packages for schools and delegations" },
    ],
    destTitle: "Featured Destinations",
    destinations: [
      {
        name: "Cafayate & Valles Calchaquíes",
        desc: "Vineyards, red mountains, stunning landscapes, and one of the most spectacular routes in the country. Ideal for those who want a visual, relaxed, and elegant experience among nature, culture, and regional gastronomy.",
        includes: ["Quebrada de las Conchas", "Natural viewpoints", "Historic Cafayate", "Wineries and tastings", "Full-day or extended experience options"],
        cta: "Request info about Cafayate",
      },
      {
        name: "Cachi & High Altitude Scenic Route",
        desc: "An unforgettable journey through mountains, panoramic roads, and towns with unique identity. Perfect for those who want to discover the deep essence of Salta and its most authentic landscapes.",
        includes: ["Cuesta del Obispo", "Piedra del Molino", "Los Cardones National Park", "Historic town of Cachi", "Full-day or private experience options"],
        cta: "Request info about Cachi",
      },
      {
        name: "Tilcara, Purmamarca & Quebrada de Humahuaca",
        desc: "Colors, history, ancestral culture, and some of the most iconic landscapes of northern Argentina. An ideal experience for those who want to feel the unique energy of Jujuy and its most famous towns.",
        includes: ["Purmamarca", "Hill of Seven Colors", "Tilcara", "Maimará / Humahuaca", "Group or private options"],
        cta: "Request info about Tilcara & Quebrada",
      },
    ],
    customTitle: "Custom packages for Cairo Andes participants",
    customIntro: "Coming from another city or country? We can help you receive tourism proposals tailored to your trip, including options for:",
    customOptions: ["Before the festival", "After the festival", "1 extra day", "2 or 3 extra days", "Schools or groups", "Companions", "Private or premium experiences"],
    customOutro: "Our team can guide you to make the most of your stay and turn Cairo Andes into a complete experience.",
    customCta: "I want to receive personalized proposals",
    ctaTitle: "Experience much more than a festival",
    ctaText: "Cairo Andes invites you to dance, connect, and live a unique international experience… but also to discover one of the most beautiful regions of Argentina. If you want to receive tourism proposals, write to us and we'll help you plan your trip.",
    ctaBtnInfo: "Request tourism information",
    ctaBtnWA: "Chat on WhatsApp",
    includesLabel: "Includes:",
  },
};

const HERO_BG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/iJZzMlYuqOCaLMKW.jpg";
const SHERATON_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/xPKwjMQEKqxZNYtV.avif";

const destImages = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/cafayate-aPqd9uPcJpwFFwNmiCiPnh.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/cachi-XbGccNYiVmQAzT2BxJAT3x.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663592975847/i3htKfdWPjZTzKasocqEMF/quebrada-humahuaca-4XFDt5zWgCdYwCaHTkMJ9u.webp",
];

const iconMap: Record<string, React.ReactNode> = {
  sun: <Sun className="w-7 h-7" />,
  compass: <Compass className="w-7 h-7" />,
  star: <Star className="w-7 h-7" />,
  users: <Users className="w-7 h-7" />,
  calendar: <Calendar className="w-7 h-7" />,
  mountain: <Mountain className="w-7 h-7" />,
};

const WA_LINK = "https://wa.me/5493874000000?text=Hola%2C%20quiero%20información%20turística%20de%20Cairo%20Andes";

export default function Turismo() {
  const { lang } = useLang();
  const c = t[lang];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/80 via-[#0a0e1a]/60 to-[#0a0e1a]" />
        <div className="relative z-10 container text-center max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-amber-300 drop-shadow-lg">
              {c.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              {c.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-lg w-full sm:w-auto whitespace-normal">
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                  {c.btnSolicitar}
                </Button>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" className="border-amber-400 text-amber-300 hover:bg-amber-400/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-lg w-full sm:w-auto whitespace-normal">
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                  {c.btnWhatsApp}
                </Button>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-300 mb-8 text-center">
              {c.introTitle}
            </h2>
            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>{c.introP1}</p>
              <p>{c.introP2}</p>
              <p>{c.introP3}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-16 bg-[#0d1225]">
        <div className="container max-w-5xl mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-300 mb-12 text-center">
              {c.expTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.experiences.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-xl bg-[#141a30] border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="text-amber-400 shrink-0">
                    {iconMap[exp.icon]}
                  </div>
                  <span className="text-gray-200 font-medium">{exp.label}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-300 mb-14 text-center">
              {c.destTitle}
            </h2>
          </AnimateOnScroll>
          <div className="space-y-16">
            {c.destinations.map((dest, i) => (
              <AnimateOnScroll key={i}>
                <div className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-stretch`}>
                  {/* Image */}
                  <div className="lg:w-1/2 relative rounded-2xl overflow-hidden min-h-[280px] md:min-h-[350px]">
                    <img
                      src={destImages[i]}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-300 mb-4">
                      {dest.name}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {dest.desc}
                    </p>
                    <div className="mb-6">
                      <p className="text-amber-400 font-semibold mb-3">{c.includesLabel}</p>
                      <ul className="space-y-2">
                        {dest.includes.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-lg w-fit">
                        {dest.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SHERATON HOTEL */}
      <section className="py-20 bg-[#0a0e1a]">
        <div className="container max-w-5xl mx-auto px-4">
          <AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden">
                <img src={SHERATON_IMG} alt="Sheraton Salta Hotel" className="w-full h-80 object-cover" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-400/70 mb-3">{lang === "es" ? "Sede Oficial" : "Official Venue"}</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-300 mb-4">Sheraton Salta Hotel</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {lang === "es"
                    ? "El festival se desarrolla en el Sheraton Salta Hotel, un hotel 5 estrellas rodeado de montañas y vegetación, con todas las comodidades para una experiencia premium."
                    : "The festival takes place at the Sheraton Salta Hotel, a 5-star hotel surrounded by mountains and lush vegetation, with all the amenities for a premium experience."}
                </p>
                <p className="text-gray-400 text-sm">
                  {lang === "es"
                    ? "Pileta, spa, restaurante gourmet, salones de eventos y una ubicación privilegiada en la ciudad de Salta."
                    : "Pool, spa, gourmet restaurant, event halls, and a privileged location in the city of Salta."}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CUSTOM PACKAGES */}
      <section className="py-20 bg-[#0d1225]">
        <div className="container max-w-4xl mx-auto px-4">
          <AnimateOnScroll>
            <div className="bg-gradient-to-br from-[#141a30] to-[#1a2240] border border-amber-500/30 rounded-2xl p-5 sm:p-8 md:p-12 overflow-hidden">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-300 mb-6 text-center">
                {c.customTitle}
              </h2>
              <p className="text-gray-300 text-lg mb-6 text-center">
                {c.customIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
                {c.customOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-200">
                    <div className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-8 text-center">
                {c.customOutro}
              </p>
              <div className="text-center">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-8 py-4 text-base sm:text-lg rounded-lg w-full sm:w-auto whitespace-normal text-center">
                    <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                    {c.customCta}
                  </Button>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destImages[2]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/90 via-[#0a0e1a]/70 to-[#0a0e1a]/90" />
        <div className="relative z-10 container max-w-3xl mx-auto px-4 text-center">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-amber-300 mb-6">
              {c.ctaTitle}
            </h2>
            <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed">
              {c.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-8 py-5 text-base sm:text-lg rounded-lg w-full sm:w-auto whitespace-normal">
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                  {c.ctaBtnWA}
                </Button>
              </a>
              <a href="mailto:info@cairoandes.com" className="w-full sm:w-auto">
                <Button variant="outline" className="border-amber-400 text-amber-300 hover:bg-amber-400/10 px-6 sm:px-8 py-5 text-base sm:text-lg rounded-lg w-full sm:w-auto whitespace-normal">
                  <Mail className="w-5 h-5 mr-2 shrink-0" />
                  {c.ctaBtnInfo}
                </Button>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}

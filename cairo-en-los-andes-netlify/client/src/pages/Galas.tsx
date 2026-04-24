/*
 * ── Design: Cinematic Dark + Gold ──
 * Galas page — The 3 galas of Cairo en los Andes 2026
 */
import { useLang } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { ArrowLeft, Sparkles, Star, Crown, Award, Theater, UtensilsCrossed, Camera, Music, Trophy } from "lucide-react";
import { Link } from "wouter";

const galasES = [
  {
    name: "Opening Gala",
    subtitle: "Gala de Apertura",
    day: "Viernes 16 de Octubre",
    icon: Star,
    color: "#d4a843",
    description:
      "La noche que da inicio al festival más esperado. Una velada elegante con cena show, presentaciones de los maestros internacionales y la icónica alfombra roja donde cada asistente se convierte en protagonista.",
    highlights: [
      { icon: UtensilsCrossed, text: "Cena Show de gala" },
      { icon: Theater, text: "Presentación de maestros internacionales" },
      { icon: Camera, text: "Alfombra roja y sesión fotográfica" },
      { icon: Music, text: "Shows en vivo" },
    ],
  },
  {
    name: "Gala Cairo Andes",
    subtitle: "La Gala Principal",
    day: "Sábado 17 de Octubre",
    icon: Crown,
    color: "#e8842a",
    description:
      "El corazón del festival. La gala principal de Cairo en los Andes reúne lo mejor de la danza oriental en una noche mágica con performances de los artistas más destacados del mundo, shows grupales y momentos inolvidables.",
    highlights: [
      { icon: Theater, text: "Shows de maestros internacionales" },
      { icon: Music, text: "Performances en vivo de artistas invitados" },
      { icon: Star, text: "Shows grupales y coreografías especiales" },
      { icon: Sparkles, text: "Experiencia inmersiva de danza y arte" },
    ],
  },
  {
    name: "Closing Gala",
    subtitle: "Gala Final y Premiación",
    day: "Domingo 18 de Octubre",
    icon: Trophy,
    color: "#d4a843",
    description:
      "La gran noche de cierre donde se coronan las ganadoras de la competencia oficial. Ceremonia de premiación, últimos shows y la despedida de un festival inolvidable. Aquí se entrega el título de Reina Cairo Andes y el viaje a Egipto.",
    highlights: [
      { icon: Trophy, text: "Ceremonia de premiación oficial" },
      { icon: Crown, text: "Coronación Reina Cairo Andes" },
      { icon: Award, text: "Entrega de premios y certificaciones" },
      { icon: Theater, text: "Shows de cierre" },
    ],
  },
];

const galasEN = [
  {
    name: "Opening Gala",
    subtitle: "Opening Night",
    day: "Friday, October 16th",
    icon: Star,
    color: "#d4a843",
    description:
      "The night that kicks off the most anticipated festival. An elegant evening with a dinner show, presentations by international masters, and the iconic red carpet where every attendee becomes the protagonist.",
    highlights: [
      { icon: UtensilsCrossed, text: "Gala dinner show" },
      { icon: Theater, text: "International masters presentation" },
      { icon: Camera, text: "Red carpet and photo session" },
      { icon: Music, text: "Live shows" },
    ],
  },
  {
    name: "Cairo Andes Gala",
    subtitle: "The Main Gala",
    day: "Saturday, October 17th",
    icon: Crown,
    color: "#e8842a",
    description:
      "The heart of the festival. The main Cairo in the Andes gala brings together the best of oriental dance in a magical night with performances by the world's most renowned artists, group shows, and unforgettable moments.",
    highlights: [
      { icon: Theater, text: "International masters shows" },
      { icon: Music, text: "Live performances by guest artists" },
      { icon: Star, text: "Group shows and special choreographies" },
      { icon: Sparkles, text: "Immersive dance and art experience" },
    ],
  },
  {
    name: "Closing Gala",
    subtitle: "Final Gala & Awards Ceremony",
    day: "Sunday, October 18th",
    icon: Trophy,
    color: "#d4a843",
    description:
      "The grand closing night where the winners of the official competition are crowned. Awards ceremony, final shows, and the farewell of an unforgettable festival. Here the Cairo Andes Queen title and the trip to Egypt are awarded.",
    highlights: [
      { icon: Trophy, text: "Official awards ceremony" },
      { icon: Crown, text: "Cairo Andes Queen coronation" },
      { icon: Award, text: "Prize and certification delivery" },
      { icon: Theater, text: "Closing shows" },
    ],
  },
];

export default function GalasPage() {
  const { lang } = useLang();
  const galas = lang === "es" ? galasES : galasEN;

  return (
    <div className="min-h-screen bg-[#080c1a] text-[#faf5eb] flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/vYtCPkhZyjhLAvDB.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-[#080c1a]/90 to-[#080c1a]" />
        </div>
        <div className="relative z-10 container text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#d4a843]/70 hover:text-[#d4a843] transition mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a843]/80 font-medium mb-4">
            {lang === "es" ? "3 Noches Inolvidables" : "3 Unforgettable Nights"}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold gold-text mb-4">
            Galas
          </h1>
          <p className="text-[#faf5eb]/60 max-w-2xl mx-auto text-lg">
            {lang === "es"
              ? "Tres noches únicas en el Sheraton Salta Hotel. Cena show, alfombra roja, performances de artistas internacionales y la gran ceremonia de premiación."
              : "Three unique nights at the Sheraton Salta Hotel. Dinner show, red carpet, international artist performances, and the grand awards ceremony."}
          </p>
        </div>
      </section>

      {/* Galas */}
      <section className="pb-24 relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-16">
            {galas.map((gala, i) => {
              const GalaIcon = gala.icon;
              return (
                <AnimateOnScroll key={gala.name} direction="up" delay={i * 150}>
                  <div className="relative">
                    {/* Timeline connector */}
                    {i < galas.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full h-16 w-px bg-gradient-to-b from-[#d4a843]/30 to-transparent hidden md:block" />
                    )}

                    <div className={`relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,168,67,0.1)] ${
                      i === 1
                        ? "border-[#e8842a]/40 bg-gradient-to-br from-[#1a1520] via-[#0d1225] to-[#1a1520]"
                        : "border-[#d4a843]/20 bg-gradient-to-b from-[#111827]/80 to-[#0a1128]/80"
                    }`}>
                      {/* Top accent bar */}
                      <div className="h-1.5 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: gala.color }} />

                      <div className="p-8 md:p-12">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0"
                            style={{ backgroundColor: `${gala.color}15`, border: `2px solid ${gala.color}40` }}>
                            <GalaIcon size={28} style={{ color: gala.color }} />
                          </div>
                          <div className="text-center md:text-left">
                            <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: gala.color }}>
                              {gala.day}
                            </p>
                            <h2 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: gala.color }}>
                              {gala.name}
                            </h2>
                            <p className="text-[#faf5eb]/50 text-sm mt-1">{gala.subtitle}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[#faf5eb]/70 leading-relaxed mb-8 text-lg">
                          {gala.description}
                        </p>

                        {/* Highlights */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {gala.highlights.map((h, j) => {
                            const HIcon = h.icon;
                            return (
                              <div key={j} className="flex items-center gap-3 p-3 bg-[#faf5eb]/5 rounded-lg">
                                <HIcon size={18} style={{ color: gala.color }} className="shrink-0" />
                                <span className="text-sm text-[#faf5eb]/80">{h.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* CTA */}
          <AnimateOnScroll direction="up" delay={200}>
            <div className="text-center mt-16">
              <p className="text-[#faf5eb]/50 mb-4 text-sm">
                {lang === "es"
                  ? "Las galas tienen un costo de USD $100 por cubierto"
                  : "Galas are priced at USD $100 per seat"}
              </p>
              <a
                href="https://wa.me/5493872617777?text=Hola%2C%20quiero%20reservar%20mi%20lugar%20en%20las%20galas%20de%20Cairo%20Andes%202026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#b8922e] text-[#080c1a] font-bold rounded-lg hover:shadow-[0_0_30px_rgba(212,168,67,0.3)] transition-all duration-300 text-lg"
              >
                <UtensilsCrossed size={20} />
                {lang === "es" ? "Reservá tu lugar" : "Reserve your seat"}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}

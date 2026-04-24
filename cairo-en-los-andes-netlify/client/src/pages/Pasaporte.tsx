/**
 * ── PASAPORTE CAIRO ANDES — PREMIUM FINAL VERSION (BILINGUAL) ──
 * Immersive branching game, 8 destinations, destination-based weighted rewards,
 * real tangible reward reveal, WhatsApp auto-prefilled claim, replayability,
 * local discovery tracking, premium Cairo Andes branding.
 * Full ES/EN bilingual support via useLang() context.
 */
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";
import type { Lang } from "@/contexts/LanguageContext";
import {
  Sparkles, Star, Crown, Award, Theater, UtensilsCrossed,
  Camera, Music, Trophy, MapPin, Gem, Lock, Unlock,
  ChevronRight, RotateCcw, MessageCircle, ArrowDown, Gift
} from "lucide-react";

/* ═══════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════ */
const WHATSAPP_NUMBER = "5493872617777";

const IMAGES = {
  alfombraRoja: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/qFtpyonboUQPNTtw.png",
  salonEscenario: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/vYtCPkhZyjhLAvDB.png",
  buffet: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/vSMdsUUJNNhPLPCZ.png",
  sheraton: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/xPKwjMQEKqxZNYtV.avif",
  cactus: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/iJZzMlYuqOCaLMKW.jpg",
  bailarina: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663592975847/nCyPSVcGBVeAZciF.png",
};

/* ═══════════════════════════════════════════════
   BILINGUAL STEP DATA
   ═══════════════════════════════════════════════ */
interface Step {
  question: { es: string; en: string };
  atmosphere: string;
  bgGradient: string;
  choices: { label: { es: string; en: string }; weights: number[] }[];
}

/* Step 1 variants — randomly selected per playthrough */
const STEP_1_VARIANTS: Step[] = [
  {
    question: {
      es: "Cuando llegás a una noche inolvidable… ¿qué te llama primero?",
      en: "When you arrive at an unforgettable night… what calls you first?",
    },
    atmosphere: "entrance",
    bgGradient: "from-[#1a0a0a] via-[#0d0820] to-[#060a18]",
    choices: [
      { label: { es: "Las luces y los flashes", en: "The lights and the flashes" }, weights: [3, 0, 1, 1, 0, 0, 0, 1] },
      { label: { es: "La música que envuelve todo", en: "The music that wraps around everything" }, weights: [0, 1, 1, 2, 1, 1, 0, 1] },
      { label: { es: "La entrada triunfal", en: "The triumphant entrance" }, weights: [2, 1, 2, 0, 0, 0, 1, 2] },
    ],
  },
  {
    question: {
      es: "Antes de cruzar el umbral de una experiencia única… ¿qué seguís primero?",
      en: "Before crossing the threshold of a unique experience… what do you follow first?",
    },
    atmosphere: "entrance",
    bgGradient: "from-[#1a0a0a] via-[#0d0820] to-[#060a18]",
    choices: [
      { label: { es: "El brillo de la alfombra", en: "The glow of the carpet" }, weights: [3, 0, 1, 1, 0, 0, 0, 1] },
      { label: { es: "El eco de la música", en: "The echo of the music" }, weights: [0, 1, 1, 2, 1, 1, 0, 1] },
      { label: { es: "La energía del escenario", en: "The energy of the stage" }, weights: [2, 1, 2, 0, 0, 0, 1, 2] },
    ],
  },
  {
    question: {
      es: "La noche empieza a revelarse… ¿hacia dónde va tu mirada?",
      en: "The night begins to reveal itself… where does your gaze go?",
    },
    atmosphere: "entrance",
    bgGradient: "from-[#1a0a0a] via-[#0d0820] to-[#060a18]",
    choices: [
      { label: { es: "El resplandor de las luces", en: "The glow of the lights" }, weights: [3, 0, 1, 1, 0, 0, 0, 1] },
      { label: { es: "El ritmo que vibra en el aire", en: "The rhythm vibrating in the air" }, weights: [0, 1, 1, 2, 1, 1, 0, 1] },
      { label: { es: "La llegada que lo cambia todo", en: "The arrival that changes everything" }, weights: [2, 1, 2, 0, 0, 0, 1, 2] },
    ],
  },
  {
    question: {
      es: "Cairo Andes abre su primer portal… ¿qué sentís primero?",
      en: "Cairo Andes opens its first portal… what do you feel first?",
    },
    atmosphere: "entrance",
    bgGradient: "from-[#1a0a0a] via-[#0d0820] to-[#060a18]",
    choices: [
      { label: { es: "Glamour y presencia", en: "Glamour and presence" }, weights: [3, 0, 1, 1, 0, 0, 0, 1] },
      { label: { es: "Ritmo y emoción", en: "Rhythm and emotion" }, weights: [0, 1, 1, 2, 1, 1, 0, 1] },
      { label: { es: "Poder escénico", en: "Stage power" }, weights: [2, 1, 2, 0, 0, 0, 1, 2] },
    ],
  },
  {
    question: {
      es: "Tu experiencia comienza antes de que todo suceda… ¿qué despierta algo en vos?",
      en: "Your experience begins before it all happens… what awakens something in you?",
    },
    atmosphere: "entrance",
    bgGradient: "from-[#1a0a0a] via-[#0d0820] to-[#060a18]",
    choices: [
      { label: { es: "El magnetismo de una gran entrada", en: "The magnetism of a grand entrance" }, weights: [3, 0, 1, 1, 0, 0, 0, 1] },
      { label: { es: "La atmósfera que se enciende", en: "The atmosphere igniting" }, weights: [0, 1, 1, 2, 1, 1, 0, 1] },
      { label: { es: "La promesa de una noche épica", en: "The promise of an epic night" }, weights: [2, 1, 2, 0, 0, 0, 1, 2] },
    ],
  },
];

/* Steps 2-4 remain fixed */
const BASE_STEPS: Step[] = [
  {
    question: {
      es: "En una noche legendaria… ¿dónde sentís que empieza la magia?",
      en: "On a legendary night… where do you feel the magic begins?",
    },
    atmosphere: "venue",
    bgGradient: "from-[#0a0820] via-[#0d1030] to-[#060a18]",
    choices: [
      { label: { es: "Detrás del telón, donde nace el arte", en: "Behind the curtain, where art is born" }, weights: [0, 0, 0, 3, 2, 1, 0, 1] },
      { label: { es: "En el salón principal, entre la elegancia", en: "In the main hall, surrounded by elegance" }, weights: [1, 3, 2, 0, 0, 0, 0, 1] },
      { label: { es: "Bajo los reflectores, donde todo brilla", en: "Under the spotlights, where everything shines" }, weights: [2, 0, 1, 1, 0, 2, 1, 1] },
    ],
  },
  {
    question: {
      es: "¿Qué haría que esta experiencia se sienta verdaderamente inolvidable?",
      en: "What would make this experience truly unforgettable?",
    },
    atmosphere: "experience",
    bgGradient: "from-[#0d0a1a] via-[#0a1228] to-[#060a18]",
    choices: [
      { label: { es: "Un momento en el escenario sagrado", en: "A moment on the sacred stage" }, weights: [0, 0, 1, 2, 1, 3, 0, 1] },
      { label: { es: "Una cena que parece de película", en: "A dinner that feels like a movie" }, weights: [1, 3, 0, 0, 0, 0, 1, 1] },
      { label: { es: "Sentir que formás parte de algo internacional", en: "Feeling part of something international" }, weights: [0, 0, 1, 0, 2, 0, 2, 3] },
    ],
  },
  {
    question: {
      es: "Si esta noche tuviera un símbolo… ¿cuál sería?",
      en: "If this night had a symbol… what would it be?",
    },
    atmosphere: "symbol",
    bgGradient: "from-[#0a0a1a] via-[#100d28] to-[#060a18]",
    choices: [
      { label: { es: "Una copa dorada, brindando por la victoria", en: "A golden cup, toasting to victory" }, weights: [1, 2, 0, 0, 0, 2, 1, 1] },
      { label: { es: "Una cortina roja que se abre ante vos", en: "A red curtain opening before you" }, weights: [1, 0, 3, 2, 0, 0, 0, 1] },
      { label: { es: "Una puerta imperial hacia lo desconocido", en: "An imperial door to the unknown" }, weights: [0, 0, 0, 0, 3, 0, 2, 3] },
    ],
  },
];

function pickRandomStep1(): Step {
  return STEP_1_VARIANTS[Math.floor(Math.random() * STEP_1_VARIANTS.length)];
}

const TOTAL_STEPS = 4;

/* ═══════════════════════════════════════════════
   DESTINATIONS (bilingual)
   ═══════════════════════════════════════════════ */
interface Destination {
  id: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  text: { es: string; en: string };
  icon: typeof Star;
  color: string;
  glowColor: string;
  bgImage?: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "alfombra-roja",
    title: { es: "La Alfombra Roja", en: "The Red Carpet" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Tu camino te llevó a una de las entradas más icónicas de la experiencia: flashes, presencia, glamour y una llegada que se siente inolvidable.",
      en: "Your path led you to one of the most iconic entrances of the experience: flashes, presence, glamour, and an arrival that feels unforgettable.",
    },
    icon: Camera,
    color: "#c41e3a",
    glowColor: "rgba(196,30,58,0.3)",
    bgImage: IMAGES.alfombraRoja,
  },
  {
    id: "cena-estrellas",
    title: { es: "La Cena de las Estrellas", en: "The Starlight Dinner" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Elegancia, celebración y una noche donde el festival se siente grande, exclusivo y absolutamente inolvidable. Una mesa reservada para vos.",
      en: "Elegance, celebration, and a night where the festival feels grand, exclusive, and absolutely unforgettable. A table reserved for you.",
    },
    icon: UtensilsCrossed,
    color: "#d4a843",
    glowColor: "rgba(212,168,67,0.3)",
    bgImage: IMAGES.buffet,
  },
  {
    id: "gran-gala",
    title: { es: "La Gran Gala Cairo Andes", en: "The Grand Cairo Andes Gala" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Luces, artistas, emoción y una energía que no se olvida. Tu recorrido te llevó al corazón del gran espectáculo del festival.",
      en: "Lights, artists, emotion, and an energy that is never forgotten. Your journey led you to the heart of the festival's grand show.",
    },
    icon: Crown,
    color: "#9b59b6",
    glowColor: "rgba(155,89,182,0.3)",
    bgImage: IMAGES.salonEscenario,
  },
  {
    id: "escenario-sagrado",
    title: { es: "El Escenario Sagrado", en: "The Sacred Stage" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Tu energía te acercó al arte vivo: presencia, emoción y la sensación de estar dentro de algo verdaderamente especial. El escenario te espera.",
      en: "Your energy brought you closer to living art: presence, emotion, and the feeling of being part of something truly special. The stage awaits you.",
    },
    icon: Theater,
    color: "#e8842a",
    glowColor: "rgba(232,132,42,0.3)",
    bgImage: IMAGES.bailarina,
  },
  {
    id: "portal-workshops",
    title: { es: "El Portal de los Workshops", en: "The Workshop Portal" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Tu camino abrió las puertas del aprendizaje, la inspiración y el encuentro con el corazón formativo del festival. Maestras internacionales te esperan.",
      en: "Your path opened the doors to learning, inspiration, and the encounter with the festival's educational heart. International masters await you.",
    },
    icon: Sparkles,
    color: "#2ecc71",
    glowColor: "rgba(46,204,113,0.3)",
  },
  {
    id: "noche-competencia",
    title: { es: "La Noche de Competencia", en: "Competition Night" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Intensidad, presencia, adrenalina y el momento en que el talento se vuelve inolvidable frente a todos. La competencia te llama.",
      en: "Intensity, presence, adrenaline, and the moment when talent becomes unforgettable in front of everyone. The competition calls you.",
    },
    icon: Trophy,
    color: "#f1c40f",
    glowColor: "rgba(241,196,15,0.3)",
    bgImage: IMAGES.bailarina,
  },
  {
    id: "camino-salta",
    title: { es: "El Camino de Salta & el Norte", en: "The Path of Salta & the North" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Tu recorrido te llevó más allá del salón: paisajes, cultura, experiencias y la magia de vivir Cairo Andes como destino turístico.",
      en: "Your journey took you beyond the venue: landscapes, culture, experiences, and the magic of living Cairo Andes as a travel destination.",
    },
    icon: MapPin,
    color: "#1abc9c",
    glowColor: "rgba(26,188,156,0.3)",
    bgImage: IMAGES.cactus,
  },
  {
    id: "experiencia-imperial",
    title: { es: "La Experiencia Imperial Cairo Andes", en: "The Imperial Cairo Andes Experience" },
    subtitle: { es: "Tu destino", en: "Your destination" },
    text: {
      es: "Tu camino no te llevó a un solo momento. Te llevó al festival completo: presencia, arte, emoción, lujo y una experiencia internacional difícil de repetir.",
      en: "Your path didn't lead to a single moment. It led to the complete festival: presence, art, emotion, luxury, and an international experience hard to repeat.",
    },
    icon: Gem,
    color: "#d4a843",
    glowColor: "rgba(212,168,67,0.4)",
    bgImage: IMAGES.sheraton,
  },
];

/* ═══════════════════════════════════════════════
   DESTINATION-BASED REWARD MAPPING (bilingual)
   ═══════════════════════════════════════════════ */
interface RewardEntry {
  text: { es: string; en: string };
  weight: number;
  rarity: "common" | "rare" | "legendary";
}

const DESTINATION_REWARDS: Record<string, RewardEntry[]> = {
  "alfombra-roja": [
    { text: { es: "Flyer Cairo Andes personalizado como bailarina / artista", en: "Personalized Cairo Andes flyer as a dancer / artist" }, weight: 3, rarity: "common" },
    { text: { es: "Historia destacada en redes del festival", en: "Featured story on the festival's social media" }, weight: 3, rarity: "common" },
    { text: { es: "Flyer personalizado + historia destacada en redes", en: "Personalized flyer + featured social media story" }, weight: 1, rarity: "legendary" },
    { text: { es: "10% OFF en tu reserva Cairo Andes", en: "10% OFF your Cairo Andes reservation" }, weight: 2, rarity: "rare" },
    { text: { es: "Valor congelado por 7 días para tu reserva", en: "Price locked for 7 days on your reservation" }, weight: 2, rarity: "rare" },
  ],
  "cena-estrellas": [
    { text: { es: "10% OFF en la Cena de las Estrellas", en: "10% OFF the Starlight Dinner" }, weight: 3, rarity: "common" },
    { text: { es: "5% OFF en tu reserva Cairo Andes", en: "5% OFF your Cairo Andes reservation" }, weight: 3, rarity: "common" },
    { text: { es: "10% OFF en tu reserva Cairo Andes", en: "10% OFF your Cairo Andes reservation" }, weight: 2, rarity: "rare" },
    { text: { es: "Valor congelado por 7 días para tu reserva", en: "Price locked for 7 days on your reservation" }, weight: 2, rarity: "rare" },
    { text: { es: "1 cuota extra sin recargo para activar tu experiencia", en: "1 extra installment with no surcharge to activate your experience" }, weight: 2, rarity: "rare" },
  ],
  "gran-gala": [
    { text: { es: "15% OFF en tu primera participación escénica", en: "15% OFF your first stage performance" }, weight: 3, rarity: "common" },
    { text: { es: "20% OFF en tu primera participación escénica", en: "20% OFF your first stage performance" }, weight: 2, rarity: "rare" },
    { text: { es: "25% OFF en tu primera participación escénica", en: "25% OFF your first stage performance" }, weight: 1, rarity: "legendary" },
    { text: { es: "Flyer Cairo Andes personalizado como bailarina / artista", en: "Personalized Cairo Andes flyer as a dancer / artist" }, weight: 3, rarity: "common" },
    { text: { es: "Historia destacada en redes del festival", en: "Featured story on the festival's social media" }, weight: 3, rarity: "common" },
  ],
  "escenario-sagrado": [
    { text: { es: "20% OFF en tu primera participación escénica", en: "20% OFF your first stage performance" }, weight: 3, rarity: "common" },
    { text: { es: "25% OFF en tu primera participación escénica", en: "25% OFF your first stage performance" }, weight: 2, rarity: "rare" },
    { text: { es: "50% OFF en tu primera participación escénica", en: "50% OFF your first stage performance" }, weight: 1, rarity: "legendary" },
    { text: { es: "Flyer Cairo Andes personalizado como bailarina / artista", en: "Personalized Cairo Andes flyer as a dancer / artist" }, weight: 3, rarity: "common" },
    { text: { es: "Flyer personalizado + historia destacada en redes", en: "Personalized flyer + featured social media story" }, weight: 1, rarity: "legendary" },
  ],
  "portal-workshops": [
    { text: { es: "5% OFF en tu reserva Cairo Andes", en: "5% OFF your Cairo Andes reservation" }, weight: 3, rarity: "common" },
    { text: { es: "10% OFF en tu reserva Cairo Andes", en: "10% OFF your Cairo Andes reservation" }, weight: 2, rarity: "rare" },
    { text: { es: "Valor congelado por 7 días para tu reserva", en: "Price locked for 7 days on your reservation" }, weight: 3, rarity: "common" },
    { text: { es: "1 cuota extra sin recargo para activar tu experiencia", en: "1 extra installment with no surcharge to activate your experience" }, weight: 2, rarity: "rare" },
  ],
  "noche-competencia": [
    { text: { es: "15% OFF en tu primera participación escénica", en: "15% OFF your first stage performance" }, weight: 3, rarity: "common" },
    { text: { es: "20% OFF en tu primera participación escénica", en: "20% OFF your first stage performance" }, weight: 3, rarity: "common" },
    { text: { es: "25% OFF en tu primera participación escénica", en: "25% OFF your first stage performance" }, weight: 2, rarity: "rare" },
    { text: { es: "50% OFF en tu primera participación escénica", en: "50% OFF your first stage performance" }, weight: 1, rarity: "legendary" },
  ],
  "camino-salta": [
    { text: { es: "5% OFF en tu reserva Cairo Andes", en: "5% OFF your Cairo Andes reservation" }, weight: 3, rarity: "common" },
    { text: { es: "10% OFF en tu reserva Cairo Andes", en: "10% OFF your Cairo Andes reservation" }, weight: 3, rarity: "common" },
    { text: { es: "Valor congelado por 7 días para tu reserva", en: "Price locked for 7 days on your reservation" }, weight: 2, rarity: "rare" },
    { text: { es: "1 cuota extra sin recargo para activar tu experiencia", en: "1 extra installment with no surcharge to activate your experience" }, weight: 2, rarity: "rare" },
  ],
  "experiencia-imperial": [
    { text: { es: "10% OFF en tu reserva Cairo Andes", en: "10% OFF your Cairo Andes reservation" }, weight: 3, rarity: "common" },
    { text: { es: "20% OFF en tu primera participación escénica", en: "20% OFF your first stage performance" }, weight: 2, rarity: "rare" },
    { text: { es: "25% OFF en tu primera participación escénica", en: "25% OFF your first stage performance" }, weight: 2, rarity: "rare" },
    { text: { es: "Flyer Cairo Andes personalizado como bailarina / artista", en: "Personalized Cairo Andes flyer as a dancer / artist" }, weight: 2, rarity: "rare" },
    { text: { es: "Flyer personalizado + historia destacada en redes", en: "Personalized flyer + featured social media story" }, weight: 1, rarity: "legendary" },
    { text: { es: "50% OFF en tu primera participación escénica", en: "50% OFF your first stage performance" }, weight: 1, rarity: "legendary" },
  ],
};

const STAMP_LABELS: Record<string, { es: string; en: string }> = {
  "alfombra-roja": { es: "Alfombra Roja", en: "Red Carpet" },
  "cena-estrellas": { es: "Cena de las Estrellas", en: "Starlight Dinner" },
  "gran-gala": { es: "Gran Gala", en: "Grand Gala" },
  "escenario-sagrado": { es: "Escenario Sagrado", en: "Sacred Stage" },
  "portal-workshops": { es: "Portal de Workshops", en: "Workshop Portal" },
  "noche-competencia": { es: "Noche de Competencia", en: "Competition Night" },
  "camino-salta": { es: "Camino de Salta", en: "Path of Salta" },
  "experiencia-imperial": { es: "Experiencia Imperial", en: "Imperial Experience" },
};

/* ═══════════════════════════════════════════════
   UI STRINGS (bilingual)
   ═══════════════════════════════════════════════ */
const UI = {
  interactiveExperience: { es: "Experiencia Interactiva", en: "Interactive Experience" },
  passport: { es: "PASAPORTE", en: "PASSPORT" },
  heroSubtitle: { es: "Jugá. Descubrí tu destino. Desbloqueá una oportunidad real.", en: "Play. Discover your destination. Unlock a real opportunity." },
  heroDesc: { es: "Cada recorrido revela un momento distinto del festival… y un premio tangible para vos.", en: "Each journey reveals a different moment of the festival… and a tangible prize for you." },
  startGame: { es: "COMENZAR EL RECORRIDO", en: "START THE JOURNEY" },
  playAgain: { es: "VOLVER A JUGAR", en: "PLAY AGAIN" },
  discoverBelow: { es: "Descubrí más abajo", en: "Discover more below" },
  howItWorks: { es: "¿Cómo funciona?", en: "How does it work?" },
  howStep1: { es: "Elegí tu camino a través de decisiones simbólicas", en: "Choose your path through symbolic decisions" },
  howStep2: { es: "Descubrí a qué experiencia del festival te lleva tu recorrido", en: "Discover which festival experience your journey leads to" },
  howStep3: { es: "Revelá un premio real y tangible vinculado a tu destino", en: "Reveal a real, tangible prize linked to your destination" },
  howStep4: { es: "Reclamá tu premio por WhatsApp y activalo", en: "Claim your prize via WhatsApp and activate it" },
  discoverYourPath: { es: "Descubrí tu camino", en: "Discover your path" },
  inCairoAndes: { es: "en Cairo Andes", en: "at Cairo Andes" },
  idleReplay: { es: "Cada camino abre una nueva parte del universo Cairo Andes. ¿Lista para descubrir más?", en: "Each path opens a new part of the Cairo Andes universe. Ready to discover more?" },
  idleFirst: { es: "Una experiencia interactiva que revela tu destino dentro del festival y un premio real para vos.", en: "An interactive experience that reveals your destination within the festival and a real prize for you." },
  stepOf: { es: "Paso", en: "Step" },
  of: { es: "de", en: "of" },
  suspenseTitle: { es: "Tu destino se está revelando…", en: "Your destination is being revealed…" },
  suspenseSubtitle: { es: "Preparando tu experiencia", en: "Preparing your experience" },
  alreadyDiscovered: { es: "Ya descubierto anteriormente", en: "Previously discovered" },
  butThatsNotAll: { es: "Pero eso no es todo…", en: "But that's not all…" },
  pathUnlockedReward: { es: "Tu camino ha desbloqueado un premio real.", en: "Your path has unlocked a real prize." },
  revealMyPrize: { es: "REVELAR MI PREMIO", en: "REVEAL MY PRIZE" },
  rewardSuspenseTitle: { es: "Tu recompensa se está revelando…", en: "Your reward is being revealed…" },
  yourRevealedPrize: { es: "Tu premio revelado", en: "Your revealed prize" },
  validFor48h: { es: "Válido por 48 horas para activar.", en: "Valid for 48 hours to activate." },
  code: { es: "Código", en: "Code" },
  claimMyPrize: { es: "RECLAMAR MI PREMIO", en: "CLAIM MY PRIZE" },
  rarePrize: { es: "Premio Raro", en: "Rare Prize" },
  yourPassport: { es: "Tu", en: "Your" },
  passportCairoAndes: { es: "Pasaporte", en: "Passport" },
  stampDesc: { es: "Cada experiencia descubierta deja una marca en tu recorrido.", en: "Each discovered experience leaves a mark on your journey." },
  destinationsDiscovered: { es: "Destinos descubiertos", en: "Destinations discovered" },
  stillExperiences: { es: "Todavía quedan experiencias por descubrir.", en: "There are still experiences to discover." },
  eachPath: { es: "Cada camino abre una nueva parte del universo Cairo Andes.", en: "Each path opens a new part of the Cairo Andes universe." },
  wantToActivate: { es: "¿Querés activar tu experiencia y reclamar tu premio", en: "Want to activate your experience and claim your prize" },
  inThisEdition: { es: "en esta edición", en: "in this edition" },
  talkWhatsApp: { es: "HABLAR POR WHATSAPP", en: "TALK VIA WHATSAPP" },
  exploreAgain: { es: "Volver a explorar", en: "Explore again" },
  milestone8: { es: "Completaste el Pasaporte Cairo Andes. El universo completo ya se abrió ante vos.", en: "You completed the Cairo Andes Passport. The entire universe has opened before you." },
  milestone5: { es: "Tu Pasaporte Cairo Andes ya revela una conexión más profunda con el festival.", en: "Your Cairo Andes Passport now reveals a deeper connection with the festival." },
  milestone3: { es: "Ya desbloqueaste varias experiencias del universo Cairo Andes.", en: "You've already unlocked several experiences from the Cairo Andes universe." },
};

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */
function weightedRandom<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((sum, r) => sum + r.weight, 0);
  let rand = Math.random() * total;
  for (const item of items) {
    rand -= item.weight;
    if (rand <= 0) return item;
  }
  return items[0];
}

function generateClaimCode(destId: string): string {
  const prefixes: Record<string, string> = {
    "alfombra-roja": "RED",
    "cena-estrellas": "CENA",
    "gran-gala": "GALA",
    "escenario-sagrado": "ESC",
    "portal-workshops": "WRK",
    "noche-competencia": "COMP",
    "camino-salta": "SALTA",
    "experiencia-imperial": "IMP",
  };
  const prefix = prefixes[destId] || "CA";
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CA-${prefix}-${num}`;
}

function buildWhatsAppURL(destination: string, reward: string, code: string, lang: Lang): string {
  const msg = lang === "es"
    ? `Hola ✨ Jugué el Pasaporte Cairo Andes y me salió esta experiencia: ${destination}. Además, gané este premio: ${reward}. Código: ${code}. Quiero activarlo 💛`
    : `Hello ✨ I played the Cairo Andes Passport and got this experience: ${destination}. I also won this prize: ${reward}. Code: ${code}. I want to activate it 💛`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ═══════════════════════════════════════════════
   LOCAL STORAGE HOOK
   ═══════════════════════════════════════════════ */
function usePassportStorage() {
  const [discovered, setDiscovered] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("cairo-passport-stamps");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [playCount, setPlayCount] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem("cairo-passport-plays") || "0", 10);
    } catch { return 0; }
  });

  const addStamp = useCallback((id: string) => {
    setDiscovered((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem("cairo-passport-stamps", JSON.stringify(next)); } catch {}
      return next;
    });
    setPlayCount((prev) => {
      const next = prev + 1;
      try { localStorage.setItem("cairo-passport-plays", String(next)); } catch {}
      return next;
    });
  }, []);

  return { discovered, playCount, addStamp };
}

/* ═══════════════════════════════════════════════
   GOLD PARTICLES
   ═══════════════════════════════════════════════ */
function GoldParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#d4a843]/40"
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            animation: `ppFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCENE VISUAL
   ═══════════════════════════════════════════════ */
function SceneVisual({ step, choiceIdx }: { step: number; choiceIdx: number | null }) {
  const scenes: Record<string, { gradient: string; overlay: string }> = {
    "entrance": {
      gradient: "radial-gradient(ellipse at 50% 30%, rgba(196,30,58,0.12) 0%, transparent 60%)",
      overlay: "radial-gradient(circle at 30% 70%, rgba(212,168,67,0.08) 0%, transparent 50%)",
    },
    "venue": {
      gradient: "radial-gradient(ellipse at 50% 50%, rgba(155,89,182,0.1) 0%, transparent 60%)",
      overlay: "radial-gradient(circle at 70% 30%, rgba(232,132,42,0.08) 0%, transparent 50%)",
    },
    "experience": {
      gradient: "radial-gradient(ellipse at 40% 40%, rgba(232,132,42,0.12) 0%, transparent 60%)",
      overlay: "radial-gradient(circle at 60% 60%, rgba(212,168,67,0.1) 0%, transparent 50%)",
    },
    "symbol": {
      gradient: "radial-gradient(ellipse at 50% 50%, rgba(212,168,67,0.15) 0%, transparent 60%)",
      overlay: "radial-gradient(circle at 50% 30%, rgba(196,30,58,0.08) 0%, transparent 50%)",
    },
  };

  const atmosphereMap = ["entrance", "venue", "experience", "symbol"];
  const atmosphere = atmosphereMap[step] || "entrance";
  const scene = scenes[atmosphere];

  return (
    <div className="absolute inset-0 transition-all duration-1000 pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundImage: scene.gradient }} />
      <div className="absolute inset-0" style={{ backgroundImage: scene.overlay }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[#d4a843]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-[#d4a843]/20 to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
type GamePhase = "idle" | "playing" | "transition" | "suspense" | "destination-reveal" | "reward-suspense" | "reward-reveal";

export default function Pasaporte() {
  const { lang } = useLang();
  const { discovered, playCount, addStamp } = usePassportStorage();
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const [lastChoiceIdx, setLastChoiceIdx] = useState<number | null>(null);
  const [activeSteps, setActiveSteps] = useState<Step[]>(() => [pickRandomStep1(), ...BASE_STEPS]);
  const [resultDest, setResultDest] = useState<Destination | null>(null);
  const [resultReward, setResultReward] = useState<RewardEntry | null>(null);
  const [claimCode, setClaimCode] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
  const [alreadyDiscovered, setAlreadyDiscovered] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);

  const isReplay = playCount > 0;
  const u = (key: keyof typeof UI) => UI[key][lang];

  const computeDestination = useCallback((finalScores: number[]): Destination => {
    const noisy = finalScores.map((s) => s + Math.random() * 1.2);
    const boosted = noisy.map((s, i) => {
      if (!discovered.includes(DESTINATIONS[i].id)) return s + (discovered.length >= 3 ? 1.2 : 0);
      return s;
    });
    const maxIdx = boosted.indexOf(Math.max(...boosted));
    return DESTINATIONS[maxIdx];
  }, [discovered]);

  const pickReward = useCallback((destId: string): RewardEntry => {
    const pool = DESTINATION_REWARDS[destId] || DESTINATION_REWARDS["alfombra-roja"];
    return weightedRandom(pool);
  }, []);

  const handleChoice = useCallback((choiceIdx: number) => {
    const step = activeSteps[currentStep];
    const weights = step.choices[choiceIdx].weights;
    const newScores = scores.map((s, i) => s + weights[i]);
    setLastChoiceIdx(choiceIdx);

    if (currentStep < activeSteps.length - 1) {
      setFadeIn(false);
      setPhase("transition");
      setTimeout(() => {
        setScores(newScores);
        setCurrentStep((prev) => prev + 1);
        setPhase("playing");
        setFadeIn(true);
      }, 600);
    } else {
      setFadeIn(false);
      setTimeout(() => {
        setPhase("suspense");
        const dest = computeDestination(newScores);
        const wasAlreadyDiscovered = discovered.includes(dest.id);
        setAlreadyDiscovered(wasAlreadyDiscovered);
        setResultDest(dest);
        const reward = pickReward(dest.id);
        setResultReward(reward);
        setClaimCode(generateClaimCode(dest.id));
        addStamp(dest.id);

        setTimeout(() => {
          setPhase("destination-reveal");
          setFadeIn(true);
        }, 3000);
      }, 400);
    }
  }, [currentStep, scores, activeSteps, computeDestination, pickReward, discovered, addStamp]);

  const startGame = useCallback(() => {
    setActiveSteps([pickRandomStep1(), ...BASE_STEPS]);
    setPhase("playing");
    setCurrentStep(0);
    setScores([0, 0, 0, 0, 0, 0, 0, 0]);
    setResultDest(null);
    setResultReward(null);
    setClaimCode("");
    setFadeIn(true);
    setAlreadyDiscovered(false);
    setLastChoiceIdx(null);
    setTimeout(() => {
      gameRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const milestoneMsg = useMemo(() => {
    const count = discovered.length;
    if (count >= 8) return u("milestone8");
    if (count >= 5) return u("milestone5");
    if (count >= 3) return u("milestone3");
    return null;
  }, [discovered, lang]);

  const rarityStyles = useMemo(() => ({
    common: {
      border: "border-[#d4a843]/30",
      glow: "",
      bg: "bg-gradient-to-br from-[#0d1230]/80 to-[#0a0e25]/80",
      label: "",
    },
    rare: {
      border: "border-[#e8842a]/40",
      glow: "shadow-[0_0_30px_rgba(232,132,42,0.15)]",
      bg: "bg-gradient-to-br from-[#1a1020]/80 to-[#0d1230]/80",
      label: "",
    },
    legendary: {
      border: "border-[#d4a843]/60",
      glow: "shadow-[0_0_50px_rgba(212,168,67,0.25)]",
      bg: "bg-gradient-to-br from-[#1a1510]/80 to-[#0d1230]/80",
      label: u("rarePrize"),
    },
  }), [lang]);

  return (
    <div className="min-h-screen bg-[#060a18] text-[#faf5eb] overflow-x-hidden">
      <style>{`
        @keyframes ppFloat {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-20px); }
        }
        @keyframes ppGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,168,67,0.1); }
          50% { box-shadow: 0 0 40px rgba(212,168,67,0.3); }
        }
        @keyframes ppReveal {
          0% { opacity: 0; transform: scale(0.92) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ppPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ppShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ppSuspenseOrb {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
        @keyframes ppSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ppFadeScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ppBorderGlow {
          0%, 100% { border-color: rgba(212,168,67,0.2); }
          50% { border-color: rgba(212,168,67,0.5); }
        }
        @keyframes ppLegendaryGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,168,67,0.2), 0 0 60px rgba(212,168,67,0.1); }
          50% { box-shadow: 0 0 40px rgba(212,168,67,0.4), 0 0 80px rgba(212,168,67,0.2); }
        }
        .stamp-glow { animation: ppGlow 3s ease-in-out infinite; }
        .reveal-anim { animation: ppReveal 0.8s ease-out forwards; }
        .pulse-anim { animation: ppPulse 2s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #d4a843 0%, #f5e6b8 50%, #d4a843 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ppShimmer 3s linear infinite;
        }
        .suspense-orb { animation: ppSuspenseOrb 1.5s ease-in-out infinite; }
        .slide-up { animation: ppSlideUp 0.6s ease-out forwards; }
        .fade-scale { animation: ppFadeScale 0.7s ease-out forwards; }
        .border-glow { animation: ppBorderGlow 2s ease-in-out infinite; }
        .legendary-glow { animation: ppLegendaryGlow 2s ease-in-out infinite; }
      `}</style>

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a18] via-[#0a1030] to-[#060a18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.08)_0%,transparent_70%)]" />
        <GoldParticles />

        <div className="relative z-10 container text-center px-4">
          <AnimateOnScroll direction="fade" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a843]/20 bg-[#d4a843]/5 mb-8">
              <Sparkles size={14} className="text-[#d4a843]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#d4a843]/80">{u("interactiveExperience")}</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={100}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="shimmer-text">{u("passport")}</span>
              <br />
              <span className="text-[#faf5eb]">CAIRO ANDES</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={200}>
            <p className="text-lg md:text-xl text-[#faf5eb]/60 max-w-2xl mx-auto mb-3 leading-relaxed">
              {u("heroSubtitle")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={300}>
            <p className="text-sm md:text-base text-[#faf5eb]/40 max-w-xl mx-auto mb-10 leading-relaxed">
              {u("heroDesc")}
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={400}>
            <button
              onClick={startGame}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#060a18] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-[#d4a843]/20 transition-all duration-500 hover:scale-105"
            >
              {isReplay ? u("playAgain") : u("startGame")}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimateOnScroll>

          <AnimateOnScroll direction="fade" delay={600}>
            <button
              onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 flex flex-col items-center gap-2 mx-auto text-[#d4a843]/40 hover:text-[#d4a843]/70 transition-colors"
            >
              <span className="text-xs uppercase tracking-wider">{u("discoverBelow")}</span>
              <ArrowDown size={16} className="animate-bounce" />
            </button>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="como-funciona" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a18] via-[#080c20] to-[#060a18]" />
        <div className="relative z-10 container px-4">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-center mb-16">
              <span className="text-[#d4a843]">{u("howItWorks")}</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Star, num: "01", text: u("howStep1") },
              { icon: MapPin, num: "02", text: u("howStep2") },
              { icon: Gift, num: "03", text: u("howStep3") },
              { icon: MessageCircle, num: "04", text: u("howStep4") },
            ].map((item, i) => (
              <AnimateOnScroll key={i} direction="up" delay={i * 100}>
                <div className="text-center p-6 rounded-xl bg-[#0d1230]/50 border border-[#d4a843]/10 hover:border-[#d4a843]/30 transition-all duration-500">
                  <div className="text-xs font-bold text-[#d4a843]/40 mb-3">{item.num}</div>
                  <div className="w-12 h-12 rounded-full bg-[#d4a843]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={20} className="text-[#d4a843]" />
                  </div>
                  <p className="text-sm text-[#faf5eb]/70 leading-relaxed">{item.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GAME AREA ═══ */}
      <section ref={gameRef} id="game-area" className="py-20 md:py-28 relative min-h-[80vh]">
        <div className={`absolute inset-0 bg-gradient-to-b ${phase === "playing" || phase === "transition" ? activeSteps[currentStep]?.bgGradient || "from-[#060a18] via-[#0a0e25] to-[#060a18]" : "from-[#060a18] via-[#0a0e25] to-[#060a18]"} transition-all duration-1000`} />
        {(phase === "playing" || phase === "transition") && (
          <SceneVisual step={currentStep} choiceIdx={lastChoiceIdx} />
        )}
        <div className="relative z-10 container px-4">

          {/* IDLE STATE */}
          {phase === "idle" && (
            <AnimateOnScroll direction="up">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-heading text-2xl md:text-4xl font-bold mb-6">
                  <span className="text-[#d4a843]">{u("discoverYourPath")}</span> {u("inCairoAndes")}
                </h2>
                <p className="text-[#faf5eb]/50 mb-10">
                  {isReplay ? u("idleReplay") : u("idleFirst")}
                </p>
                <button
                  onClick={startGame}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#060a18] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-[#d4a843]/20 transition-all duration-500 hover:scale-105"
                >
                  {isReplay ? u("playAgain") : u("startGame")}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </AnimateOnScroll>
          )}

          {/* PLAYING STATE */}
          {(phase === "playing" || phase === "transition") && (
            <div className={`max-w-2xl mx-auto transition-all duration-500 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {/* Progress bar */}
              <div className="flex items-center justify-center gap-3 mb-10">
                {activeSteps.map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      i < currentStep
                        ? "bg-[#d4a843] text-[#060a18]"
                        : i === currentStep
                        ? "bg-[#d4a843]/20 text-[#d4a843] border-2 border-[#d4a843] border-glow"
                        : "bg-[#faf5eb]/5 text-[#faf5eb]/30 border border-[#faf5eb]/10"
                    }`}>
                      {i + 1}
                    </div>
                    {i < activeSteps.length - 1 && (
                      <div className={`w-8 h-0.5 transition-all duration-500 ${
                        i < currentStep ? "bg-[#d4a843]" : "bg-[#faf5eb]/10"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#d4a843]/60 uppercase tracking-wider text-center mb-4">
                {u("stepOf")} {currentStep + 1} {u("of")} {activeSteps.length}
              </p>

              <div className="bg-[#0d1230]/60 border border-[#d4a843]/15 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-center mb-10 text-[#faf5eb] leading-relaxed">
                  {activeSteps[currentStep].question[lang]}
                </h3>

                <div className="space-y-4">
                  {activeSteps[currentStep].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(idx)}
                      className="w-full group text-left p-5 rounded-xl border border-[#d4a843]/15 bg-[#0a0e25]/60 hover:bg-[#d4a843]/10 hover:border-[#d4a843]/40 transition-all duration-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,168,67,0.08)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-[#d4a843]/30 flex items-center justify-center shrink-0 group-hover:bg-[#d4a843]/20 transition-all duration-300">
                          <Star size={14} className="text-[#d4a843]/50 group-hover:text-[#d4a843] transition-colors" />
                        </div>
                        <span className="text-base md:text-lg text-[#faf5eb]/80 group-hover:text-[#faf5eb] transition-colors">
                          {choice.label[lang]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUSPENSE STATE */}
          {phase === "suspense" && (
            <div className="text-center max-w-lg mx-auto reveal-anim">
              <div className="relative w-28 h-28 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[#d4a843]/20 suspense-orb" />
                <div className="absolute inset-3 rounded-full bg-[#d4a843]/10 suspense-orb" style={{ animationDelay: "0.3s" }} />
                <div className="absolute inset-0 rounded-full bg-[#0d1230] border-2 border-[#d4a843]/40 flex items-center justify-center">
                  <Sparkles size={36} className="text-[#d4a843]" />
                </div>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold shimmer-text mb-4">
                {u("suspenseTitle")}
              </h3>
              <p className="text-[#faf5eb]/40 text-sm">{u("suspenseSubtitle")}</p>
              <div className="flex items-center justify-center gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#d4a843]/60 suspense-orb" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* DESTINATION REVEAL */}
          {phase === "destination-reveal" && resultDest && (
            <div className={`max-w-2xl mx-auto transition-all duration-700 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="relative rounded-2xl overflow-hidden stamp-glow">
                {resultDest.bgImage && (
                  <div className="absolute inset-0">
                    <img src={resultDest.bgImage} alt="" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-[#060a18]/80 to-[#060a18]/60" />
                  </div>
                )}
                <div className="relative p-8 md:p-12 bg-[#0d1230]/70 border border-[#d4a843]/20 rounded-2xl">
                  {alreadyDiscovered && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 mb-6 text-xs text-[#d4a843]/70">
                      {u("alreadyDiscovered")}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${resultDest.color}20`, border: `2px solid ${resultDest.color}50`, boxShadow: `0 0 30px ${resultDest.glowColor}` }}>
                      <resultDest.icon size={28} style={{ color: resultDest.color }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#d4a843]/60 mb-1">{resultDest.subtitle[lang]}</p>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-[#faf5eb]">{resultDest.title[lang]}</h3>
                    </div>
                  </div>

                  <p className="text-[#faf5eb]/70 leading-relaxed mb-8 text-base">{resultDest.text[lang]}</p>

                  {/* Reward tease */}
                  <div className="border-t border-[#d4a843]/10 pt-8 text-center">
                    <p className="text-[#d4a843] font-heading text-lg mb-2">{u("butThatsNotAll")}</p>
                    <p className="text-[#faf5eb]/50 text-sm mb-6">{u("pathUnlockedReward")}</p>

                    <button
                      onClick={() => {
                        setPhase("reward-suspense");
                        setTimeout(() => setPhase("reward-reveal"), 2200);
                      }}
                      className="group inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-[#8b1a2b] to-[#c41e3a] text-[#faf5eb] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-[#c41e3a]/20 transition-all duration-500 hover:scale-105"
                    >
                      <Gift size={18} />
                      {u("revealMyPrize")}
                      <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REWARD SUSPENSE */}
          {phase === "reward-suspense" && (
            <div className="text-center max-w-lg mx-auto reveal-anim">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[#c41e3a]/20 suspense-orb" />
                <div className="absolute inset-0 rounded-full bg-[#0d1230] border-2 border-[#c41e3a]/40 flex items-center justify-center">
                  <Gift size={32} className="text-[#d4a843]" />
                </div>
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold shimmer-text mb-3">
                {u("rewardSuspenseTitle")}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#d4a843]/60 suspense-orb" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* REWARD REVEAL */}
          {phase === "reward-reveal" && resultDest && resultReward && (
            <div className="max-w-2xl mx-auto fade-scale">
              <div className="relative rounded-2xl overflow-hidden">
                {resultDest.bgImage && (
                  <div className="absolute inset-0">
                    <img src={resultDest.bgImage} alt="" className="w-full h-full object-cover opacity-15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a18] via-[#060a18]/85 to-[#060a18]/70" />
                  </div>
                )}
                <div className={`relative p-8 md:p-12 rounded-2xl ${rarityStyles[resultReward.rarity].bg} ${rarityStyles[resultReward.rarity].border} border ${rarityStyles[resultReward.rarity].glow} ${resultReward.rarity === "legendary" ? "legendary-glow" : ""}`}>
                  {/* Destination recap */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#d4a843]/10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${resultDest.color}20` }}>
                      <resultDest.icon size={18} style={{ color: resultDest.color }} />
                    </div>
                    <div>
                      <p className="text-xs text-[#d4a843]/50 uppercase tracking-wider">{resultDest.subtitle[lang]}</p>
                      <p className="font-heading text-sm font-bold text-[#faf5eb]/80">{resultDest.title[lang]}</p>
                    </div>
                  </div>

                  {/* Legendary badge */}
                  {resultReward.rarity === "legendary" && (
                    <div className="flex items-center justify-center mb-4 slide-up" style={{ animationDelay: "0.2s" }}>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4a843]/20 to-[#e8842a]/20 border border-[#d4a843]/40">
                        <Crown size={14} className="text-[#d4a843]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#d4a843]">{u("rarePrize")}</span>
                      </div>
                    </div>
                  )}

                  {/* Reward card */}
                  <div className="text-center py-6 slide-up" style={{ animationDelay: "0.3s" }}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${resultReward.rarity === "legendary" ? "bg-gradient-to-br from-[#d4a843]/30 to-[#e8842a]/30 border-2 border-[#d4a843]/50" : "bg-gradient-to-br from-[#d4a843]/20 to-[#c41e3a]/20 border border-[#d4a843]/30"}`}>
                      <Gift size={28} className="text-[#d4a843]" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-[#d4a843]/60 mb-4">{u("yourRevealedPrize")}</p>
                    <p className={`text-lg md:text-xl leading-relaxed font-semibold max-w-md mx-auto mb-4 ${resultReward.rarity === "legendary" ? "shimmer-text" : "text-[#faf5eb]"}`}>
                      {resultReward.text[lang]}
                    </p>
                    {resultReward.rarity !== "common" && (
                      <p className="text-[#e8842a]/60 text-xs font-medium">
                        {u("validFor48h")}
                      </p>
                    )}
                  </div>

                  {/* Claim code */}
                  <div className="text-center mb-6 slide-up" style={{ animationDelay: "0.5s" }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a0e25]/60 border border-[#d4a843]/15">
                      <span className="text-xs text-[#faf5eb]/40">{u("code")}:</span>
                      <span className="text-sm font-mono font-bold text-[#d4a843]">{claimCode}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-[#d4a843]/10 slide-up" style={{ animationDelay: "0.6s" }}>
                    <a
                      href={buildWhatsAppURL(resultDest.title[lang], resultReward.text[lang], claimCode, lang)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#060a18] font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4a843]/20 transition-all text-sm uppercase tracking-wider hover:scale-105 w-full sm:w-auto justify-center"
                    >
                      <MessageCircle size={18} />
                      {u("claimMyPrize")}
                    </a>
                    <button
                      onClick={startGame}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/30 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all text-sm uppercase tracking-wider"
                    >
                      <RotateCcw size={16} />
                      {u("playAgain")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ PASSPORT STAMPS ═══ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a18] via-[#080c20] to-[#060a18]" />
        <div className="relative z-10 container px-4">
          <AnimateOnScroll direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
                {u("yourPassport")} <span className="text-[#d4a843]">{u("passportCairoAndes")}</span> Cairo Andes
              </h2>
              <p className="text-[#faf5eb]/50 max-w-lg mx-auto">
                {u("stampDesc")}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20">
                <span className="text-sm text-[#d4a843] font-medium">
                  {u("destinationsDiscovered")}: {discovered.length} / 8
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Milestone message */}
          {milestoneMsg && (
            <AnimateOnScroll direction="fade">
              <div className="max-w-lg mx-auto mb-10 p-4 rounded-xl bg-gradient-to-r from-[#d4a843]/10 to-[#e8842a]/10 border border-[#d4a843]/20 text-center">
                <p className="text-sm text-[#d4a843] font-medium">{milestoneMsg}</p>
              </div>
            </AnimateOnScroll>
          )}

          {/* Stamps grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {DESTINATIONS.map((dest, i) => {
              const isUnlocked = discovered.includes(dest.id);
              return (
                <AnimateOnScroll key={dest.id} direction="up" delay={i * 60}>
                  <div className={`relative p-5 md:p-6 rounded-xl text-center transition-all duration-500 ${
                    isUnlocked
                      ? "bg-[#0d1230]/60 border border-[#d4a843]/30 stamp-glow"
                      : "bg-[#0d1230]/30 border border-[#faf5eb]/5 opacity-50"
                  }`}>
                    <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center transition-all ${
                      isUnlocked
                        ? "bg-gradient-to-br from-[#d4a843]/20 to-transparent border-2"
                        : "bg-[#faf5eb]/5 border border-[#faf5eb]/10"
                    }`} style={isUnlocked ? { borderColor: `${dest.color}40` } : {}}>
                      {isUnlocked ? (
                        <dest.icon size={22} style={{ color: dest.color }} />
                      ) : (
                        <Lock size={18} className="text-[#faf5eb]/20" />
                      )}
                    </div>
                    <p className={`text-xs md:text-sm font-medium leading-tight ${
                      isUnlocked ? "text-[#faf5eb]/90" : "text-[#faf5eb]/30"
                    }`}>
                      {STAMP_LABELS[dest.id][lang]}
                    </p>
                    {isUnlocked && (
                      <div className="absolute top-2 right-2">
                        <Unlock size={12} className="text-[#d4a843]/60" />
                      </div>
                    )}
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* Replay invitation */}
          {discovered.length < 8 && (
            <AnimateOnScroll direction="up" delay={200}>
              <div className="text-center mt-12">
                <p className="text-[#faf5eb]/40 text-sm mb-4">{u("stillExperiences")}</p>
                <button
                  onClick={startGame}
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/30 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all text-sm uppercase tracking-wider"
                >
                  <RotateCcw size={16} />
                  {u("playAgain")}
                </button>
                <p className="text-[#faf5eb]/30 text-xs mt-3">{u("eachPath")}</p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a18] via-[#0d1230] to-[#060a18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 container px-4 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="font-heading text-xl md:text-3xl font-bold mb-6 max-w-xl mx-auto leading-relaxed">
              {u("wantToActivate")}
              <span className="text-[#d4a843]"> {u("inThisEdition")}</span>?
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === "es" ? "Hola ✨ Jugué el Pasaporte Cairo Andes y quiero saber más sobre las experiencias del festival 💛" : "Hello ✨ I played the Cairo Andes Passport and I want to know more about the festival experiences 💛")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a843] to-[#e8842a] text-[#060a18] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-[#d4a843]/20 transition-all duration-500 hover:scale-105"
              >
                <MessageCircle size={18} />
                {u("talkWhatsApp")}
              </a>
              <button
                onClick={startGame}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#d4a843]/30 text-[#d4a843] rounded-lg hover:bg-[#d4a843]/10 transition-all text-sm uppercase tracking-wider"
              >
                {u("exploreAgain")}
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}

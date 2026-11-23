import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Tag } from "lucide-react";
import { useRef } from "react";

import photo from "@/assets/bautista-camilion.jpg";
import { Button } from "@/components/ui/button";
import { WA_MESSAGES, whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

// ✏️ COMPLETÁ CON TUS DATOS REALES. Ejemplos:
//   "en Google · 28 reseñas"  |  "según mis clientes de Mar del Plata"
const SOCIAL_PROOF = {
  rating: "5.0",
  label: "Valoración de mis clientes, vendedores y compradores",
};

// Partículas deterministas (mismo markup en server y client).
// Se reparten en los bordes y sobre la foto para que no pasen por detrás del texto.
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: i % 2 === 0 ? (i * 37) % 6 : 58 + ((i * 37) % 42),
  top: 30 + ((i * 53) % 70),
  size: 2 + (i % 3),
  duration: 7 + (i % 6),
  delay: (i * 0.7) % 8,
}));

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative isolate overflow-hidden bg-hero pt-28 pb-14 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-particle absolute rounded-full bg-primary/70"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div className="relative z-10 min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary shadow-gold" />
            Agente inmobiliario · Century 21 Mar del Plata
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-5 text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-[clamp(2rem,min(3.2vw,6.2svh),3.6rem)]"
          >
            Muchas inmobiliarias solo publican tu propiedad.{" "}
            <span className="text-gold italic">Yo armo una estrategia para venderla.</span>
          </motion.h1>

          {/* Mejor contraste: text-foreground/80 en vez del gris apagado */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-4 max-w-xl text-base text-foreground/80 sm:text-lg"
          >
            Te acompaño desde el primer análisis hasta la firma, con un precio estratégico y atención
            directa en cada paso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="gold" size="xl">
              <a href={whatsappLink(WA_MESSAGES.call)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Agendá tu llamada gratis
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a
                href={whatsappLink("Hola Bautista, quiero vender mi propiedad. ¿Podemos hablar?")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tag />
                Quiero vender mi propiedad
              </a>
            </Button>
          </motion.div>

          {/* Microcopy: baja la fricción y mantiene el camino para compradores */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Sin compromiso. ¿Buscás comprar?{" "}
            <a
              href={whatsappLink(WA_MESSAGES.buy)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              Escribime
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground"
          >
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>
              <strong className="font-semibold text-foreground">{SOCIAL_PROOF.rating}</strong> ·{" "}
              {SOCIAL_PROOF.label}
            </span>
          </motion.div>
        </div>

        {/* Foto un poco más ancha (7/8) en desktop y pegada a la derecha */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:aspect-[7/8] lg:h-[min(70svh,640px)] lg:w-auto lg:max-w-none lg:justify-self-end"
        >
          <motion.div
            style={{ y: glowY }}
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-gold opacity-25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-primary/30 shadow-card">
            <motion.img
              style={{ y: photoY }}
              src={photo}
              alt="Bautista Camilion, agente inmobiliario de Century 21 en Mar del Plata"
              className="h-full w-full scale-110 object-cover object-[70%_center]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="glass-dark absolute bottom-5 left-4 rounded-2xl px-4 py-3 shadow-card"
          >
            <p className="font-display text-3xl text-gold sm:text-4xl">+40</p>
            <p className="text-xs text-muted-foreground">operaciones cerradas en el último año</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="glass-dark absolute left-4 top-5 rounded-2xl px-3 py-2 shadow-card"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Atención 1 a 1</p>
            <p className="text-xs text-muted-foreground">Hablás directo conmigo</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll (solo desktop) */}
      <motion.a
        href="#quien-soy"
        aria-label="Seguir bajando"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground transition hover:text-primary lg:flex"
      >
        <span className="uppercase tracking-[0.25em]">Conocé más</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal, SectionHeading } from "./Reveal";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Familia Sbalordo",
    role: "Compradores · Mar del Plata",
    text: "Bauti, queremos agradecerte de corazón por todo lo que hiciste para que hoy podamos tener nuestra casa. Desde el primer momento entendiste nuestras necesidades y nuestro presupuesto, y nos acompañaste con muchísima paciencia en cada paso. Tu ayuda en la negociación fue clave para que pudiéramos concretar la compra. Valoramos especialmente tu dedicación, siempre con buena predisposición, respondiendo cada consulta y gestionando cada pedido. Gracias por tu profesionalismo y, sobre todo, por tu calidad humana. Sin dudas vamos a recomendarte a todos los que conozcamos.",
  },
  {
    name: "Lucía Fernández",
    role: "Compradora · Departamento en Playa Grande",
    text: "Buscaba mi primer departamento y estaba perdida. Bautista me escuchó, filtró solo lo que tenía sentido para mi presupuesto y me explicó todo con total claridad.",
  },
  {
    name: "Martín y Carolina",
    role: "Compradores · Casa en Los Troncos",
    text: "Nos acompañó en cada visita y en la negociación. Sentimos que estaba de nuestro lado todo el tiempo. Profesional, cercano y muy resolutivo.",
  },
  {
    name: "Diego Ramírez",
    role: "Vendedor · Departamento en La Perla",
    text: "Mi departamento llevaba casi un año publicado sin ofertas. Bautista hizo un diagnóstico real, ajustamos el precio con criterio y en poco tiempo apareció el comprador.",
  },
];

const AUTOPLAY_MS = 7000;

function initials(name: string) {
  return name
    .replace(/^Familia\s+/i, "")
    .split(/\s+y\s+|\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      <span className="ml-2 text-sm font-semibold text-foreground">5.0</span>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold font-display text-base text-primary-foreground"
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.text.length > 220;

  return (
    <figure
      aria-roledescription="diapositiva"
      aria-label={`${i + 1} de ${TESTIMONIALS.length}`}
      className="glass relative flex shrink-0 basis-full snap-start flex-col overflow-hidden rounded-3xl p-7 sm:p-9 md:basis-[calc(50%-0.625rem)]"
    >
      <Quote className="absolute right-6 top-6 h-14 w-14 text-primary/15" aria-hidden="true" />
      <Stars />
      <blockquote
        className={`mt-5 leading-relaxed text-muted-foreground sm:text-lg ${
          isLong && !expanded ? "line-clamp-6" : ""
        }`}
      >
        "{t.text}"
      </blockquote>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 self-start text-sm font-semibold text-primary hover:underline"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={t.name} />
        <div className="min-w-0">
          <p className="font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(TESTIMONIALS.length);
  const [paused, setPaused] = useState(false);

  // Ancho de un paso (card + gap) y cuántas cards entran en pantalla.
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length < 2) return { step: 0, perView: 1 };
    const first = el.children[0] as HTMLElement;
    const second = el.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    const perView = Math.max(1, Math.round((el.clientWidth + (step - first.offsetWidth)) / step));
    return { step, perView };
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const { step, perView } = measure();
      const max = TESTIMONIALS.length - perView;
      const next = Math.min(Math.max(i, 0), max);
      el.scrollTo({ left: next * step, behavior: "smooth" });
    },
    [measure],
  );

  // Sincroniza los puntos con el scroll (también cuando se desliza con el dedo).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const { step, perView } = measure();
      setPages(Math.max(1, TESTIMONIALS.length - perView + 1));
      if (step) setIndex(Math.round(el.scrollLeft / step));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [measure]);

  // Autoplay: avanza solo y vuelve al inicio; se pausa con mouse/foco/touch.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const { perView } = measure();
      const last = TESTIMONIALS.length - perView;
      goTo(index >= last ? 0 : index + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, index, goTo, measure]);

  const canPrev = index > 0;
  const canNext = index < pages - 1;

  return (
    <section id="testimonios" className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title={
            <>
              Lo que dicen quienes <span className="text-gold italic">trabajaron conmigo</span>
            </>
          }
        />

        <Reveal y={30} className="mt-14">
          <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Testimonios de clientes"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
          >
            {/* Pista: scroll horizontal con snap. El padding vertical evita que se corten las sombras. */}
            <div
              ref={trackRef}
              className="-my-4 flex snap-x items-start snap-mandatory gap-5 overflow-x-auto scroll-smooth py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map((t, i) => (
                <TestimonialCard key={t.name} t={t} i={i} />
              ))}
            </div>

            {/* Controles */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={!canPrev}
                aria-label="Testimonio anterior"
                className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={!canNext}
                aria-label="Testimonio siguiente"
                className="glass grid h-11 w-11 place-items-center rounded-full text-foreground transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
import { animate, useInView } from "framer-motion";
import { Target, TrendingUp, UserRound, type LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Reveal, SectionHeading } from "./Reveal";

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}

interface Stat {
  icon: LucideIcon;
  value: React.ReactNode;
  label: string;
  text: string;
}

const STATS: Stat[] = [
  {
    icon: TrendingUp,
    value: <Counter to={40} prefix="+" />,
    label: "Operaciones cerradas",
    text: "En el último año en Mar del Plata.",
  },
  {
    icon: UserRound,
    value: (
      <>
        <Counter to={1} /> a <Counter to={1} />
      </>
    ),
    label: "Atención personalizada",
    text: "Hablás conmigo de principio a fin.",
  },
  {
    icon: Target,
    value: <Counter to={100} suffix="%" />,
    label: "Estrategia real de mercado",
    text: "Cada decisión respaldada por datos.",
  },
];

export function Results() {
  return (
    <section id="resultados" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Resultados"
          title={
            <>
              Resultados <span className="text-gold italic">reales</span>
            </>
          }
          subtitle="Números que hablan de un trabajo constante, no de suerte."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="glass hover-lift relative h-full overflow-hidden rounded-3xl p-8 text-center">
                <div className="absolute inset-x-0 top-0 h-px bg-gold opacity-60" />
                <s.icon className="mx-auto h-7 w-7 text-primary" />
                <p className="mt-6 font-display text-6xl text-gold sm:text-7xl">{s.value}</p>
                <p className="mt-4 text-lg font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Compass, HeartHandshake, ShieldCheck } from "lucide-react";

import photo from "@/assets/bautista-camilion.jpg";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Hablás siempre conmigo, de principio a fin. Sin intermediarios ni respuestas automáticas.",
  },
  {
    icon: ShieldCheck,
    title: "Honestidad",
    text: "Te digo lo que realmente pasa en el mercado, aunque no sea lo que esperabas escuchar.",
  },
  {
    icon: Compass,
    title: "Estrategia real",
    text: "Cada decisión se apoya en datos del mercado de Mar del Plata, no en la intuición.",
  },
];

export function About() {
  return (
    <section id="quien-soy" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal x={-30} y={0} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-card">
            <img
              src={photo}
              alt="Bautista Camilion en un balcón con vista a Mar del Plata"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover object-[25%_center] lg:aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-4 -z-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Quién soy</span>
            <h2 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">
              Conocé a <span className="text-gold italic">Bautista Camilion</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Soy agente inmobiliario en Century 21 y trabajo todos los días en el mercado de Mar del
                Plata. Mi método es simple: entender tu situación, decirte la verdad y armar un plan
                concreto.
              </p>
              <p>
                Si querés vender, no me limito a publicar y esperar: analizo tu propiedad, defino un precio
                estratégico y salgo a buscar al comprador indicado. Si querés comprar, te escucho, filtro
                las opciones que de verdad te sirven y te acompaño hasta que tengas las llaves en la mano.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.15 + i * 0.1}>
                <div className="glass hover-lift h-full rounded-2xl p-5">
                  <p.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-sans text-base font-semibold tracking-normal">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
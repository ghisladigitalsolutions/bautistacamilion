import {
  ArrowUpRight,
  BadgeDollarSign,
  ClipboardCheck,
  Ear,
  Eye,
  Filter,
  Handshake,
  KeyRound,
  LineChart,
  Megaphone,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { Reveal, SectionHeading } from "./Reveal";

interface Step {
  icon: LucideIcon;
  title: string;
  text: string;
}

const SELL: Step[] = [
  { icon: Search, title: "Diagnóstico real", text: "Analizamos por qué tu propiedad no recibe consultas ni ofertas." },
  { icon: LineChart, title: "Valoración de mercado", text: "Te muestro cuánto vale realmente hoy." },
  { icon: BadgeDollarSign, title: "Precio estratégico", text: "Definimos un precio atractivo que proteja tu patrimonio." },
  { icon: Megaphone, title: "Plan de comercialización", text: "Estrategia profesional, no solo publicar y esperar." },
  { icon: Users, title: "Gestión activa", text: "Filtro compradores, coordino visitas y negocio por vos." },
  { icon: Handshake, title: "Acompañamiento hasta el cierre", text: "Estoy en cada paso, hasta la firma final." },
];

const BUY: Step[] = [
  { icon: Ear, title: "Escucho qué necesitás", text: "Entiendo lo que realmente buscás para tu vida, no solo metros." },
  { icon: Filter, title: "Filtro opciones", text: "Solo te muestro lo que tiene sentido para tu presupuesto." },
  { icon: Eye, title: "Información clara", text: "Cada propiedad con datos concretos, sin sorpresas." },
  { icon: KeyRound, title: "Visitas, negociación y cierre", text: "Te acompaño hasta que tengas las llaves en la mano." },
];

function StepCard({ step, index, kind }: { step: Step; index: number; kind: "vender" | "comprar" }) {
  const message =
    kind === "vender"
      ? `Hola Bautista, quiero vender mi propiedad y me interesa saber más sobre: ${step.title}.`
      : `Hola Bautista, quiero comprar y me interesa saber más sobre: ${step.title}.`;
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="glass hover-lift group flex h-full flex-col rounded-3xl p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <step.icon className="h-5 w-5" />
          </div>
          <span className="font-display text-3xl text-muted-foreground/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h4 className="mt-6 font-sans text-lg font-semibold">{step.title}</h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
        <Button asChild variant="link" className="mt-5 h-auto justify-start p-0">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
            Más info
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Button>
      </article>
    </Reveal>
  );
}

function GroupHeader({ icon: Icon, label, title }: { icon: LucideIcon; label: string; title: string }) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground shadow-gold-soft">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{label}</p>
        <h3 className="text-2xl sm:text-3xl">{title}</h3>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="como-trabajo" className="bg-section relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Cómo trabajo"
          title={
            <>
              Así trabajo <span className="text-gold italic">con vos</span>
            </>
          }
          subtitle="Un método claro, tanto si querés vender como si estás buscando tu próximo hogar."
        />

        <div className="mt-16">
          <GroupHeader icon={ClipboardCheck} label="Vendedores" title="Para los que quieren vender" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SELL.map((s, i) => (
              <StepCard key={s.title} step={s} index={i} kind="vender" />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <GroupHeader icon={KeyRound} label="Compradores" title="Para los que quieren comprar" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUY.map((s, i) => (
              <StepCard key={s.title} step={s} index={i} kind="comprar" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { WA_MESSAGES, whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grain relative isolate overflow-hidden rounded-[2.5rem] border border-primary/30 bg-hero px-6 py-16 text-center shadow-card sm:px-16 sm:py-24">
          <div
            className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
            aria-hidden="true"
          />
          <h2 className="mx-auto max-w-3xl text-3xl font-medium leading-tight sm:text-5xl">
            ¿Querés una <span className="text-gold italic">estrategia real</span> para tu propiedad o
            encontrar tu próximo hogar?
          </h2>
          <Button asChild variant="gold" size="xl" className="mt-10 h-16 px-10 text-lg">
            <a href={whatsappLink(WA_MESSAGES.final)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Hablar con Bautista por WhatsApp
            </a>
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">Respuesta rápida · Sin compromiso</p>
        </div>
      </Reveal>
    </section>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const FAQS = [
  {
    q: "¿Cuánto cuesta vender una propiedad con vos?",
    a: "La primera charla y la valoración de tu propiedad son sin cargo. Los honorarios se pagan únicamente cuando la venta se concreta, y te los explico con total transparencia desde el primer día.",
  },
  {
    q: "¿Cómo definís el precio de mi propiedad?",
    a: "Analizo propiedades comparables que realmente se vendieron (no solo las publicadas), la demanda actual en tu zona y el estado de tu inmueble. Con esos datos definimos un precio estratégico: atractivo para el mercado y que proteja tu patrimonio.",
  },
  {
    q: "¿Trabajás también con compradores?",
    a: "Sí. Escucho qué necesitás, filtro opciones según tu presupuesto y te acompaño en visitas, negociación y cierre, para que compres con información clara y tranquilidad.",
  },
  {
    q: "¿Cuánto tiempo suele tardar en venderse una propiedad?",
    a: "Depende del tipo de propiedad, la zona y el precio. Con un precio bien definido y un plan de comercialización activo, los tiempos se acortan notablemente frente a una propiedad que solo está publicada.",
  },
  {
    q: "¿Qué pasa si mi propiedad lleva mucho tiempo publicada?",
    a: "Es la situación más común. Hacemos un diagnóstico real para entender por qué no recibe consultas ni ofertas (precio, presentación, difusión) y armamos un plan nuevo para reposicionarla.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Preguntas <span className="text-gold italic">frecuentes</span>
            </>
          }
        />
        <Reveal delay={0.1} className="mt-14">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="glass rounded-2xl border px-6 transition-colors data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline hover:text-primary [&>svg]:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

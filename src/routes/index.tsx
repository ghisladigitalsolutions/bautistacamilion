import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/landing/About";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Results } from "@/components/landing/Results";
import { Services } from "@/components/landing/Services";
import { Testimonials } from "@/components/landing/Testimonials";

const TITLE = "Bautista Camilion | Agente Inmobiliario Century 21 - Mar del Plata";
const DESCRIPTION =
  "Ayudo a propietarios a vender su propiedad con estrategia real y a compradores a encontrar su próximo hogar. +40 operaciones cerradas en el último año.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Bautista Camilion",
          description: DESCRIPTION,
          telephone: "+54 223 591-3719",
          areaServed: "Mar del Plata",
          parentOrganization: { "@type": "Organization", name: "Century 21" },
          sameAs: ["https://instagram.com/bcamilion"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Results />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

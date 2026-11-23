import { MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  contactFormMessage,
  whatsappLink,
} from "@/lib/contact";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

const fieldClass =
  "h-12 rounded-xl border-glass-border bg-glass text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/60";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    window.open(whatsappLink(contactFormMessage({ name, phone, message })), "_blank", "noopener");
  };

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8">
      <div>
        <h3 className="text-2xl">Escribime</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tu mensaje me llega directo por WhatsApp.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="cf-name">Nombre</Label>
          <Input
            id="cf-name"
            required
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-phone">WhatsApp</Label>
          <Input
            id="cf-phone"
            type="tel"
            inputMode="tel"
            maxLength={25}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="223 ..."
            className={fieldClass}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-message">Mensaje</Label>
        <Textarea
          id="cf-message"
          required
          maxLength={800}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contame si querés vender, comprar o tasar tu propiedad."
          className="rounded-xl border-glass-border bg-glass text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/60"
        />
      </div>
      <Button type="submit" variant="gold" size="xl" className="w-full">
        <Send />
        Enviar por WhatsApp
      </Button>
    </form>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="min-w-0">
          <Logo />
          <p className="mt-6 max-w-md text-muted-foreground">
            Estrategia real para vender tu propiedad y acompañamiento cercano para encontrar tu próximo
            hogar en Mar del Plata.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              Mar del Plata, Buenos Aires
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-primary" />
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="h-5 w-5 shrink-0 text-primary" />
                Instagram: @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border px-5 pt-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>Bautista Camilion | Century 21 · Mar del Plata</p>
        <p>Bautista Camilion © 2026</p>
      </div>
    </footer>
  );
}

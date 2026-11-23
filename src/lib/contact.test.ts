import { describe, expect, it } from "vitest";
import { contactFormMessage, whatsappLink } from "./contact";

describe("WhatsApp contact", () => {
  it("links to Bautista's WhatsApp number", () => {
    expect(whatsappLink()).toBe("https://wa.me/542235913719");
  });

  it("prefills an encoded message", () => {
    expect(whatsappLink("Hola Bautista")).toBe("https://wa.me/542235913719?text=Hola%20Bautista");
  });

  it("includes name, message and phone from the contact form", () => {
    expect(contactFormMessage({ name: "Ana", phone: "2231234567", message: "Quiero vender" })).toBe(
      "Hola Bautista, soy Ana.\nQuiero vender\nMi WhatsApp: 2231234567",
    );
  });
});

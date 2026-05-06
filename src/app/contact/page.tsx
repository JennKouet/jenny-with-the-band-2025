import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Contact et booking",
  description:
    "Contactez Jenny With the Band pour une question, une demande de booking ou le dossier de presse.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}

import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import LyricsPageClient from "./LyricsPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Paroles",
  description:
    "Paroles des titres de l'album Try to kill me de Jenny With the Band.",
  path: "/lyrics",
});

export default function LyricsPage() {
  return <LyricsPageClient />;
}

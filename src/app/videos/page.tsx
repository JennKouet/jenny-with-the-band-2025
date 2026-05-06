import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import VideosPageClient from "./VideosPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "Vidéos",
  description:
    "Clips, lives et vidéos officielles de Jenny With the Band, groupe rock blues de Nantes.",
  path: "/videos",
});

export default function VideosPage() {
  return <VideosPageClient />;
}

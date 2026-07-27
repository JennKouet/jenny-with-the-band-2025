import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.openGraphImage.url],
  },
};

const musicGroupJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: siteConfig.name,
  url: getSiteUrl("/"),
  image: getSiteUrl(siteConfig.openGraphImage.url),
  genre: ["Rock", "Blues"],
  sameAs: siteConfig.socialLinks,
  email: "contact@jennywiththeband.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}

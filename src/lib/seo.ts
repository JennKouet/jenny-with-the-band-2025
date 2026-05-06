import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [siteConfig.openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteConfig.openGraphImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

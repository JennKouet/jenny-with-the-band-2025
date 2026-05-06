import type { Metadata } from "next";
import "@/lib/serverLocalStorage";
import { Roboto, Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/_shared/NavBar";
import Footer from "./components/_shared/Footer";
import { siteConfig } from "@/lib/site";

const Horbse = localFont({
  src: "../../public/fonts/Horbse-Textured.ttf",
  display: "swap",
});

const roboto = Roboto({ 
  weight: "300",
  subsets: ["latin"],
  display: "swap"
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Jenny With the Band",
    "Jenny with the band",
    "groupe rock Nantes",
    "groupe rock blues",
    "concert rock Nantes",
    "Try to kill me",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon-48x48.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${roboto.className} ${Horbse.className} ${permanentMarker.className} antialiased bg-black`}
      >
        <div id="top-trigger" className="h-1 w-full"></div>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

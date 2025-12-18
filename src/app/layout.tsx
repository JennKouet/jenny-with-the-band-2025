import type { Metadata } from "next";
import { Roboto, Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/_shared/NavBar";
import Footer from "./components/_shared/Footer";

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
  title: "Jenny With the Band 2025",
  description: "Site internet presentant le groupe de Rock/Blues Jenny with the band ",
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
    <html lang="en">
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

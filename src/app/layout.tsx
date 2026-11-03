import type { Metadata } from "next";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "NOURI Global Foods | FMCG Brands, B2B Specialty Ingredients & Sustainable Supply Chain",
  description:
    "From Volcanic Equatorial Soil to the World's Table. 285,000+ MT annual capacity across 12 FSSC 22000 v6 smart manufacturing facilities serving 48 global markets.",
  keywords: [
    "Global F&B Enterprise",
    "FMCG Consumer Brands",
    "B2B Specialty Ingredients",
    "OEM Beverage Manufacturing",
    "Single-Origin Couverture Cacao",
    "Barista Oat Milk",
    "FSSC 22000 Halal Manufacturer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-canvas-light text-text-primary antialiased selection:bg-brand-primary/15 selection:text-text-primary">
        {children}
      </body>
    </html>
  );
}

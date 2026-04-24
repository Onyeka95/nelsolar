import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

/* ─── Google Fonts (self-hosted via next/font — zero layout shift) ────────── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─── Page Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Nelsolar — Solar Panels, Batteries & Lights in Nigeria",
  description:
    "Shop solar panels, solar batteries, solar lights and generators in Nigeria. Best prices in Naira. Expert installation. Order on WhatsApp.",
  keywords: [
    "solar panels Nigeria",
    "solar battery Nigeria",
    "buy solar Naira",
    "solar installer Nigeria",
    "Nelsolar",
  ],
  openGraph: {
    title: "Nelsolar — Solar Panels, Batteries & Lights in Nigeria",
    description:
      "Shop solar panels, solar batteries, solar lights and generators in Nigeria. Best prices in Naira. Expert installation. Order on WhatsApp.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nelsolar — Nigeria's Solar Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nelsolar — Solar Panels, Batteries & Lights in Nigeria",
    description:
      "Shop solar panels, solar batteries, solar lights and generators in Nigeria. Best prices in Naira. Expert installation. Order on WhatsApp.",
    images: ["/og-image.png"],
  },
};

/* ─── Organisation JSON-LD ──────────────────────────────────────────────────── */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nelsolar",
  description:
    "Nigerian solar e-commerce platform offering solar panels, batteries, lights, generators, inverters, and charge controllers with expert installation across Nigeria.",
  url: "https://nelsolar.com",
  logo: "https://nelsolar.com/images/logo.png",
  sameAs: [
    "https://instagram.com/nelsolar",
    "https://facebook.com/nelsolar",
    "https://twitter.com/nelsolar",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "WhatsApp",
    availableLanguage: ["English"],
    areaServed: "NG",
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-off-white">
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems, galleryCategories } from "@/data/gallery";
import { getConsultationLink } from "@/lib/whatsapp";

/* ─── SEO Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Solar Installation Gallery — Nelsolar Nigeria",
  description: "View Nelsolar's completed solar installations across Nigeria. Residential, commercial and off-grid solar projects in Lagos, Abuja, Port Harcourt, Enugu and more.",
  keywords:    [
    "solar installation Nigeria",
    "solar panel installation Lagos",
    "off-grid solar Nigeria",
    "Nelsolar projects",
    "solar gallery Nigeria",
  ],
  openGraph: {
    title:       "Solar Installation Gallery — Nelsolar Nigeria",
    description: "Real solar installations completed by Nelsolar across Nigeria.",
    images:      ["/og-gallery.png"],
  },
};

/* ─── Stat pills data ────────────────────────────────────────────────────── */
const stats = [
  "🏠 Residential & Commercial",
  "📍 All 36 States",
  "⭐ 4.9 Rated",
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  const waLink = getConsultationLink();

  return (
    <>
      <Navbar />

      {/* ── Compact hero ──────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden pt-32 pb-16 px-4 text-center"
        style={{
          background: [
            "radial-gradient(ellipse 60% 55% at 90% 10%, rgba(245,158,11,0.14) 0%, transparent 65%)",
            "#1E3A5F",
          ].join(", "),
        }}
        aria-label="Gallery page header"
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
          }}
        />

        <div className="relative z-10">
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-white">
            Our Work
          </p>

          <h1 className="mt-2 font-syne font-extrabold text-white text-4xl lg:text-5xl leading-tight">
            Solar Installation Gallery
          </h1>

          <p className="mt-3 text-white/70 text-base">
            {galleryItems.length}+ completed projects across Nigeria
          </p>

          {/* Stat pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {stats.map((stat) => (
              <span
                key={stat}
                className="
                  bg-white/10 text-white
                  font-syne text-sm font-semibold
                  rounded-full px-4 py-2
                "
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Gallery grid ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-4 lg:px-8" aria-label="Project gallery">
        <div className="max-w-7xl mx-auto">
          <GalleryGrid items={galleryItems} categories={galleryCategories} />
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────── */}
      <section className="bg-white pb-16 px-4 lg:px-8" aria-label="Get a quote">
        <div className="max-w-7xl mx-auto">
          <div className="
            bg-navy rounded-2xl p-8
            flex flex-col md:flex-row items-center justify-between gap-6
          ">
            {/* Text */}
            <div>
              <h2 className="font-syne font-bold text-white text-xl leading-snug">
                Want a Solar System Like These?
              </h2>
              <p className="mt-1 text-navy text-sm leading-relaxed max-w-md">
                Contact us on WhatsApp and let&rsquo;s design the perfect system for
                your home or business.
              </p>
            </div>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                shrink-0
                flex items-center gap-2
                bg-amber text-navy
                font-syne font-bold text-sm
                px-6 py-3.5 rounded-xl
                hover:brightness-105 hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                shadow-md whitespace-nowrap
              "
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Get Your Free Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

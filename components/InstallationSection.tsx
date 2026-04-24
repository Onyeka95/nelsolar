"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { Star, Wrench, MessageCircle } from "lucide-react";
import { getInstallationLink } from "@/lib/whatsapp";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Installer {
  name:             string;
  title:            string;
  experience:       string;
  rating:           number;
  reviews:          number;
  specialities:     string[];
  initials:         string;
  whatsappMessage:  string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const installers: Installer[] = [
  {
    name:            "Emeka Okafor",
    title:           "Certified Solar Engineer",
    experience:      "8 years · 240+ installations",
    rating:          4.9,
    reviews:         58,
    specialities:    ["Residential", "Off-Grid Systems", "Lagos & South-West"],
    initials:        "EO",
    whatsappMessage: "Hi Nelsolar, I'd like to book Emeka Okafor for a solar installation. My location is...",
  },
  {
    name:            "Taiwo Adebisi",
    title:           "Solar Systems Technician",
    experience:      "6 years · 180+ installations",
    rating:          4.8,
    reviews:         44,
    specialities:    ["Commercial", "Hybrid Systems", "Abuja & North-Central"],
    initials:        "TA",
    whatsappMessage: "Hi Nelsolar, I'd like to book Taiwo Adebisi for a solar installation. My location is...",
  },
  {
    name:            "Ifeanyi Nwosu",
    title:           "Off-Grid Solar Specialist",
    experience:      "10 years · 320+ installations",
    rating:          5.0,
    reviews:         73,
    specialities:    ["Off-Grid", "Industrial", "South-East & South-South"],
    initials:        "IN",
    whatsappMessage: "Hi Nelsolar, I'd like to book Ifeanyi Nwosu for a solar installation. My location is...",
  },
];

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0  },
};

const headerTransition: Transition = { duration: 0.6, ease: EASE_OUT };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

/* ─── Installer Card ─────────────────────────────────────────────────────── */
function InstallerCard({ installer, index }: { installer: Installer; index: number }) {
  const firstName = installer.name.split(" ")[0];
  const waNumber  = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";
  const waLink    = `https://wa.me/${waNumber}?text=${encodeURIComponent(installer.whatsappMessage)}`;

  const cardTransition: Transition = {
    duration: 0.5,
    delay:    index * 0.12,
    ease:     EASE_OUT,
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={cardTransition}
      className="
        flex flex-col items-center text-center
        bg-white border border-gray-100 rounded-2xl p-6 shadow-md
        hover:shadow-xl hover:-translate-y-2 hover:border-amber/50
        transition-all duration-300
      "
    >
      {/* Avatar with outer glow ring */}
      <div className="relative mt-2">
        <div className="absolute inset-0 rounded-full ring-4 ring-amber/20 scale-110" />
        <div
          className="
            relative w-20 h-20 rounded-full
            bg-amber flex items-center justify-center
            font-syne font-bold text-2xl text-navy
          "
          aria-label={installer.name}
        >
          {installer.initials}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-syne font-bold text-navy text-xl mt-5 leading-snug">
        {installer.name}
      </h3>

      {/* Title */}
      <p className="text-slate-secondary text-sm mt-1">{installer.title}</p>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        <Star size={15} className="text-amber fill-amber" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-syne font-bold text-navy text-sm">{installer.rating}</span>
        <span className="text-slate-secondary text-xs">({installer.reviews} reviews)</span>
      </div>

      {/* Experience */}
      <div className="flex items-center justify-center gap-1 mt-2 text-slate-secondary text-xs">
        <Wrench size={11} aria-hidden="true" />
        {installer.experience}
      </div>

      {/* Specialities */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {installer.specialities.map((spec) => (
          <span
            key={spec}
            className="
              bg-[#EEF2FF] text-navy
              text-xs font-medium
              rounded-full px-3 py-1
            "
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Book button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-5 w-full
          flex items-center justify-center gap-2
          bg-amber text-navy
          font-syne font-bold text-sm
          rounded-xl py-3
          hover:brightness-105 hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-200
          shadow-amber/30 shadow-md
        "
        aria-label={`Book ${installer.name} for solar installation on WhatsApp`}
      >
        <MessageCircle size={15} strokeWidth={2.5} />
        Book {firstName} on WhatsApp
      </a>
    </motion.article>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function InstallationSection() {
  return (
    <section
      id="installation"
      className="bg-white py-20 px-4 lg:px-8"
      aria-label="Professional Solar Installation"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={headerTransition}
          className="text-center"
        >
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            Installation
          </p>
          <h2 className="mt-2 font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
            Professional Solar Installation
          </h2>
          <p className="mt-3 text-slate-secondary text-base leading-relaxed max-w-xl mx-auto">
            Our certified solar engineers will install your system safely and
            professionally — anywhere in Nigeria.
          </p>
        </motion.div>

        {/* ── Installer Cards ──────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {installers.map((installer, index) => (
            <InstallerCard key={installer.name} installer={installer} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA strip ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE_OUT } satisfies Transition}
          className="
            mt-14 max-w-5xl mx-auto
            bg-navy rounded-2xl p-8
            flex flex-col md:flex-row items-center justify-between gap-6
          "
        >
          {/* Left — icon + text */}
          <div className="flex items-start gap-4">
            <Wrench
              size={32}
              color="#F59E0B"
              strokeWidth={1.6}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 className="font-syne font-bold text-white text-xl leading-snug">
                Need a Custom Installation Quote?
              </h3>
              <p className="mt-1 text-white/70 text-sm leading-relaxed max-w-md">
                Tell us your location and energy needs — we&rsquo;ll match you with the
                right installer and give you a transparent Naira quote.
              </p>
            </div>
          </div>

          {/* Right — CTA button */}
          <a
            href={getInstallationLink("General")}
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
              shadow-amber/30 shadow-md
              whitespace-nowrap
            "
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Get Installation Quote on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

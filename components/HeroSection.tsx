"use client";

import Image from "next/image";
import { motion, type Variants, type Transition } from "framer-motion";
import { ChevronRight, MessageCircle, CheckCircle, ChevronDown } from "lucide-react";

/* ─── Typed animation constants ──────────────────────────────────────────── */

/**
 * Cubic-bezier typed as a const tuple so Framer Motion's `Easing` union
 * accepts it without widening to a plain `string`.
 */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Container variant: staggers its direct children automatically.
 * Eliminates the need to track delay per-element manually.
 */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.1,
    },
  },
};

/** Every direct child of the stagger container fades up into position. */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease:     EASE_OUT,
    } satisfies Transition,
  },
};

/** Hero image slides in from slightly scaled-down. */
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale:   1,
    transition: {
      duration: 0.7,
      delay:    0.3,
      ease:     EASE_OUT,
    } satisfies Transition,
  },
};

/** Factory for each stat card entrance — pops up from below. */
const cardVariants = (entryDelay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  show: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: {
      duration: 0.5,
      delay:    entryDelay,
      ease:     EASE_OUT,
    } satisfies Transition,
  },
});

/** Infinite floating bob shared by the stat cards. */
const bobTransition = (delay: number): Transition => ({
  repeat:   Infinity,
  duration: 3,
  ease:     "easeInOut",
  delay,
});

/** Scroll-indicator bounce. */
const bounceTransition: Transition = {
  repeat:   Infinity,
  duration: 1.5,
  ease:     "easeInOut",
};

/* ─── Static data ────────────────────────────────────────────────────────── */
const trustItems = ["Genuine Products", "Naira Prices", "WhatsApp Support"] as const;

/* ─── Scroll helper ──────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ─── FloatCard sub-component ────────────────────────────────────────────── */
interface FloatCardProps {
  value:      string;
  label:      string;
  variant:    "navy" | "amber";
  className?: string;
  bobDelay:   number;
  entryDelay: number;
}

function FloatCard({ value, label, variant, className, bobDelay, entryDelay }: FloatCardProps) {
  return (
    <motion.div variants={cardVariants(entryDelay)} initial="hidden" animate="show">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={bobTransition(bobDelay)}
        className={[
          "flex flex-col items-center justify-center",
          "rounded-xl shadow-lg px-5 py-3.5 min-w-[130px]",
          variant === "navy"
            ? "bg-navy border border-white/10 text-white"
            : "bg-amber text-navy",
          className ?? "",
        ].join(" ")}
      >
        <span
          className={[
            "font-syne text-3xl font-extrabold leading-none",
            variant === "navy" ? "text-amber" : "text-navy",
          ].join(" ")}
        >
          {value}
        </span>
        <span
          className={[
            "mt-1 text-xs font-medium text-center leading-snug",
            variant === "navy" ? "text-white/70" : "text-navy/75",
          ].join(" ")}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero — Power Your Home With Clean Solar Energy"
    >
      {/* ── Background: navy + layered amber radial glows ───────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(ellipse 65% 60% at 95% 5%,  rgba(245,158,11,0.13) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 40% at 10% 90%, rgba(245,158,11,0.06) 0%, transparent 60%)",
            "#1E3A5F",
          ].join(", "),
        }}
      />

      {/* ── Amber dot-grid overlay ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }}
      />

      {/* ── Two-column grid ──────────────────────────────────────────────── */}
      <div
        className="
          relative z-10 mx-auto w-full max-w-7xl flex-1
          grid lg:grid-cols-2 gap-12 lg:gap-8
          items-center
          px-4 sm:px-6 lg:px-8
          pt-28 pb-24 lg:pt-0 lg:pb-0
        "
      >
        {/* ── LEFT: staggered text content ──────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-6 lg:gap-7"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span
              className="
                inline-flex items-center gap-1.5
                bg-amber text-white
                font-syne text-xs font-bold tracking-widest uppercase
                rounded-full px-4 py-1.5 shadow-amber
              "
            >
              ⚡ Nigeria&rsquo;s #1 Solar Store
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="
              font-syne font-extrabold text-white
              text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]
              leading-[1.1] tracking-tight
            "
          >
            Power Your Home{" "}
            <br className="hidden sm:block" />
            With Clean{" "}
            <span className="text-amber">Solar</span>{" "}
            Energy
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-white/80 text-lg leading-relaxed max-w-md"
          >
            Browse solar panels, batteries, lights and generators. Order
            instantly on WhatsApp. Delivered across Nigeria.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollTo("products")}
              className="
                group flex items-center justify-center gap-2
                bg-amber text-white/70 font-syne font-bold text-base
                px-7 py-3.5 rounded-lg shadow-amber
                hover:scale-105 hover:brightness-105 active:scale-95
                transition-all duration-200
              "
            >
              Shop Solar Products
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button
              onClick={() => scrollTo("consultation")}
              className="
                group flex items-center justify-center gap-2
                bg-transparent text-white font-syne font-bold text-base
                border-2 border-white/60
                px-7 py-3.5 rounded-lg
                hover:border-white hover:bg-white/[0.08] hover:scale-105
                active:scale-95 transition-all duration-200
              "
            >
              Book Free Consultation
              <MessageCircle
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
          >
            {trustItems.map((label, i) => (
              <span key={label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:block w-px h-4 bg-white/20 -ml-2 mr-1"
                  />
                )}
                <CheckCircle size={15} className="text-amber shrink-0" strokeWidth={2.5} />
                <span className="text-white/80 text-sm font-medium">{label}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: image + floating stat cards ────────────────────────── */}
        <motion.div
          className="relative w-full h-[340px] sm:h-[420px] lg:h-[560px]"
          variants={imageVariants}
          initial="hidden"
          animate="show"
        >
          {/* Image frame */}
          <div
            className="
              relative w-full h-full rounded-2xl overflow-hidden
              ring-2 ring-amber/30
              shadow-[0_0_60px_rgba(245,158,11,0.15)]
            "
          >
            <Image
              src="/images/jos_panel.jpg"
              alt="Solar panel installation on a Nigerian home rooftop — Nelsolar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Bottom fade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent"
            />
          </div>

          {/* Stat card — bottom left */}
          <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 z-10">
            <FloatCard
              value="500+"
              label="Installations Completed"
              variant="navy"
              entryDelay={0.7}
              bobDelay={0}
            />
          </div>

          {/* Stat card — top right */}
          <div className="absolute -top-4 -right-4 sm:top-6 sm:right-6 z-10">
            <FloatCard
              value="100%"
              label="Genuine Products"
              variant="amber"
              entryDelay={0.9}
              bobDelay={0.4}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={bounceTransition}
          onClick={() => scrollTo("products")}
          aria-label="Scroll to products"
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-widest font-sans group-hover:text-white/60 transition-colors">
            Scroll
          </span>
          <ChevronDown
            size={22}
            strokeWidth={1.5}
            className="text-white/60 group-hover:text-white/80 transition-colors"
          />
        </motion.button>
      </div>
    </section>
  );
}

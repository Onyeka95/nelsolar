"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import {
  ShieldCheck,
  MessageCircle,
  Wrench,
  Coins,
  Cpu,
  Truck,
  type LucideIcon,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Feature {
  icon:        LucideIcon;
  title:       string;
  description: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const features: Feature[] = [
  {
    icon:        ShieldCheck,
    title:       "Genuine Products",
    description:
      "Every product we sell is sourced directly from certified manufacturers with full warranties. No fakes, no compromises.",
  },
  {
    icon:        MessageCircle,
    title:       "WhatsApp Support",
    description:
      "Order, ask questions and get real human support directly on WhatsApp. No bots, no call centres, no stress.",
  },
  {
    icon:        Wrench,
    title:       "Expert Installation",
    description:
      "Our certified solar engineers install your system safely and professionally across all 36 states in Nigeria.",
  },
  {
    icon:        Coins,
    title:       "Best Prices in Naira",
    description:
      "Transparent Naira pricing on every product. No dollar conversion stress. What you see is what you pay.",
  },
  {
    icon:        Cpu,
    title:       "Full System Design",
    description:
      "Not sure what you need? Our experts will design the perfect solar system for your exact energy needs and budget.",
  },
  {
    icon:        Truck,
    title:       "Nationwide Delivery",
    description:
      "We deliver and install solar systems across Nigeria — from Lagos to Kano, Abuja to Port Harcourt.",
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
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  const cardTransition: Transition = {
    duration: 0.5,
    delay:    index * 0.1,
    ease:     EASE_OUT,
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={cardTransition}
      className="
        group flex flex-col
        bg-[#1a3660] border border-[#2a4f80]
        rounded-2xl p-6
        hover:bg-[#1e4070] hover:border-amber
        transition-all duration-300
        cursor-default
      "
    >
      {/* Icon container */}
      <div className="
        w-12 h-12 rounded-xl mb-5 flex items-center justify-center shrink-0
        bg-amber/20
        group-hover:bg-amber/30 transition-colors duration-300
      ">
        <Icon size={24} color="#F59E0B" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title — solid white, fully opaque */}
      <h3 className="font-syne font-bold text-white text-lg mb-2 leading-snug">
        {feature.title}
      </h3>

      {/* Description — light blue-grey, still very readable on navy */}
      <p className="text-[#a8c0d6] text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function WhyNelsolar() {
  return (
    <section
      id="why-nelsolar"
      className="py-20 px-4 lg:px-8"
      style={{ backgroundColor: "#1E3A5F" }}
      aria-label="Why Choose Nelsolar"
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
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-white">
            Why Choose Us
          </p>

          <h2 className="mt-2 font-syne font-bold text-white text-3xl lg:text-4xl leading-tight">
            Why Thousands of Nigerians Choose Nelsolar
          </h2>

          <p className="mt-3 text-[#a8c0d6] text-base leading-relaxed max-w-xl mx-auto">
            We make solar simple, affordable and stress-free for every Nigerian
            home and business.
          </p>
        </motion.div>

        {/* ── Feature Cards Grid ───────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

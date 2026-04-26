"use client";

import { motion, type Transition } from "framer-motion";
import { CheckCircle, Clock, Sun, MessageCircle } from "lucide-react";
import { getConsultationLink } from "@/lib/whatsapp";

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const leftVariant = {
  initial:     { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0   },
};

const rightVariant = {
  initial:     { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0  },
};

const sharedTransition: Transition = {
  duration: 0.65,
  ease:     EASE_OUT,
};

/* ─── Static data ────────────────────────────────────────────────────────── */
const coverageItems = [
  "Energy needs assessment for your home or business",
  "Site evaluation and solar potential analysis",
  "System recommendation — panel size, battery, inverter",
  "Full cost breakdown and payment options in Naira",
  "Installation timeline and after-sales support plan",
];

const consultantStats: { label: string; value: string }[] = [
  { label: "Consultations Done", value: "1,200+"    },
  { label: "Average Rating",     value: "⭐ 4.9 / 5" },
  { label: "Response Time",      value: "< 30 mins"  },
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function ConsultationSection() {
  const waLink = getConsultationLink();

  return (
    <section
      id="consultation"
      className="py-20 px-4 lg:px-8"
      style={{ backgroundColor: "#1E3A5F" }}
      aria-label="Free Solar Consultation"
    >
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-2 gap-16 flex flex-col">

        {/* ── LEFT: Text content ────────────────────────────────────────── */}
        <motion.div
          {...leftVariant}
          viewport={{ once: true, margin: "-80px" }}
          transition={sharedTransition}
        >
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            Free Consultation
          </p>

          <h2 className="mt-2 font-syne font-bold text-white text-3xl lg:text-4xl leading-tight">
            Not Sure What Solar System You Need?
          </h2>

          <p className="mt-4 text-[#a8c0d6] text-base leading-relaxed">
            Our solar experts will analyse your energy needs, recommend the right
            system size, and give you a full transparent Naira quote —
            completely free, no obligation.
          </p>

          {/* Coverage checklist */}
          <ul className="mt-8 flex flex-col gap-4" aria-label="What the consultation covers">
            {coverageItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="text-amber shrink-0 mt-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-[#c8dce8] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {/* Response time badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-amber/15 rounded-full px-4 py-2">
            <Clock size={16} className="text-amber shrink-0" aria-hidden="true" />
            <span className="font-syne text-amber text-sm font-semibold">
              Average response time: Under 30 minutes
            </span>
          </div>
        </motion.div>

        {/* ── RIGHT: Consultant card ────────────────────────────────────── */}
        <motion.div
          {...rightVariant}
          viewport={{ once: true, margin: "-80px" }}
          transition={sharedTransition}
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl">

            {/* Card header */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center">
                <Sun size={40} className="text-amber" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-syne font-bold text-navy text-xl text-center leading-snug">
                Book Your Free Solar Consultation
              </h3>
              <p className="mt-1 text-slate-secondary text-sm text-center">
                Talk to a certified solar expert on WhatsApp
              </p>
            </div>

            {/* Amber divider */}
            <div className="mt-6 mb-6 h-px bg-amber/30" aria-hidden="true" />

            {/* Consultant stats */}
            <ul className="flex flex-col divide-y divide-gray-100">
              {consultantStats.map(({ label, value }) => (
                <li key={label} className="flex items-center justify-between py-3">
                  <span className="text-slate-secondary text-sm">{label}</span>
                  <span className="font-syne font-bold text-navy text-sm">{value}</span>
                </li>
              ))}
            </ul>

            {/* Main CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8 w-full
                flex items-center justify-center gap-2
                bg-amber text-navy
                font-syne font-bold text-base
                rounded-xl py-4
                hover:brightness-105 hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                shadow-amber/40 shadow-md
              "
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              Start Free Consultation on WhatsApp
            </a>

            {/* Privacy note */}
            <p className="mt-3 text-center text-xs text-slate-secondary">
              🔒 Your information is private. We never share your details.
            </p>

            {/* Secondary link */}
            <p className="mt-2 text-center text-xs text-slate-secondary">
              Prefer a call?{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Leave your number on WhatsApp
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

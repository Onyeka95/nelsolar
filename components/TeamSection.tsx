"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface TeamMember {
  name:     string;
  role:     string;
  bio:      string;
  initials: string;
  linkedin: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const team: TeamMember[] = [
  {
    name:     "Nelson Ejike",
    role:     "Founder & CEO",
    bio:      "Nelson founded Nelsolar with a mission to make reliable solar energy accessible to every Nigerian. With over 5 years in the renewable energy sector, he has led the installation of more than 300 solar systems across Nigeria.",
    initials: "NE",
    linkedin: "https://x.com/AGUNNAYA135",
  },
  {
    name:     "Onyeka Innocent",
    role:     "Co-Founder & CTO",
    bio:      "Onyeka leads Nelsolar's technology and product strategy. A frontend engineer and solar enthusiast, he built the Nelsolar platform from the ground up and oversees all technical operations and digital innovation.",
    initials: "OI",
    linkedin: "https://www.linkedin.com/in/onyeka-iwuji-970a7b20a/",
  },
];

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headerTransition: Transition = { duration: 0.6, ease: EASE_OUT };

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0  },
};

/* ─── Team Card ──────────────────────────────────────────────────────────── */
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const cardTransition: Transition = {
    duration: 0.55,
    delay:    index * 0.15,
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
        bg-white border border-gray-100 rounded-2xl p-8 shadow-md
        max-w-sm w-full
        hover:shadow-xl hover:-translate-y-2
        transition-all duration-300
      "
    >
      {/* Avatar with amber ring */}
      <div
        className="
          w-28 h-28 rounded-full mx-auto
          bg-navy flex items-center justify-center
          font-syne font-bold text-3xl text-navy
          ring-4 ring-amber/30 ring-offset-4
        "
        aria-label={member.name}
      >
        {member.initials}
      </div>

      {/* Name */}
      <h3 className="font-syne font-bold text-navy text-2xl mt-6 leading-snug">
        {member.name}
      </h3>

      {/* Role */}
      <p className="font-syne font-bold text-amber text-sm uppercase tracking-[0.15em] mt-1">
        {member.role}
      </p>

      {/* Amber divider */}
      <div className="w-12 h-0.5 bg-amber mx-auto mt-4 mb-4 rounded-full" aria-hidden="true" />

      {/* Bio */}
      <p className="text-slate-secondary text-sm leading-relaxed">
        {member.bio}
      </p>

      {/* LinkedIn link */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6 inline-flex items-center gap-2
          text-amber font-syne text-sm font-semibold
          hover:underline underline-offset-2
          transition-opacity hover:opacity-80
        "
        aria-label={`Connect with ${member.name} on LinkedIn`}
      >
        <ExternalLink size={14} aria-hidden="true" />
        Connect on LinkedIn
      </a>
    </motion.article>
  );
}

/* ─── Person JSON-LD ─────────────────────────────────────────────────────── */
const personSchema = team.map((m) => ({
  "@context":  "https://schema.org",
  "@type":     "Person",
  name:        m.name,
  jobTitle:    m.role,
  worksFor:    { "@type": "Organization", name: "Nelsolar" },
}));

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <section
      id="team"
      className="bg-white py-20 px-4 lg:px-8"
      aria-label="Nelsolar Team"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={headerTransition}
          className="text-center"
        >
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            Our Team
          </p>
          <h2 className="mt-2 font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
            Meet the Team Behind Nelsolar
          </h2>
          <p className="mt-3 text-slate-secondary text-base leading-relaxed max-w-2xl mx-auto">
            Built by Nigerians, for Nigerians. We are passionate about making
            clean solar energy affordable and accessible to every home and business.
          </p>
        </motion.div>

        {/* ── Team Cards ──────────────────────────────────────────────── */}
        <div className="mt-14 flex flex-col md:flex-row gap-10 justify-center items-center max-w-4xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* ── Mission strip ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE_OUT } satisfies Transition}
          className="
            mt-16 max-w-4xl mx-auto
            bg-amber rounded-2xl p-8
            flex flex-col md:flex-row items-center gap-6
          "
        >
          {/* Globe emoji */}
          <span
            className="text-5xl shrink-0 leading-none"
            aria-hidden="true"
            role="img"
          >
            🌍
          </span>

          {/* Text */}
          <div>
            <h3 className="font-syne font-bold text-navy text-xl leading-snug">
              Our Mission
            </h3>
            <p className="mt-1 text-navy/80 text-sm leading-relaxed">
              To make clean, reliable and affordable solar energy accessible to
              every Nigerian home, business and community — one installation at
              a time.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Person JSON-LD ───────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </section>
  );
}

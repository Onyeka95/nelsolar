import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Sun,
  MapPin,
  ShoppingBag,
  Wrench,
  MessageCircle,
  Calculator,
  GalleryHorizontal,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getConsultationLink } from "@/lib/whatsapp";

/* ─── SEO Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "About Nelsolar — Nigeria's Solar Energy Store",
  description: "Nelsolar is a Nigerian solar energy company providing solar panels, batteries, lights and professional installation services to homes and businesses across all 36 states in Nigeria.",
  keywords:    [
    "about Nelsolar",
    "Nigerian solar company",
    "solar energy Nigeria",
    "solar installation company Nigeria",
  ],
  openGraph: {
    title:       "About Nelsolar — Nigeria's Solar Energy Store",
    description: "Learn about Nelsolar — who we are, our mission and how we are making solar energy accessible to every Nigerian.",
    images:      ["/og-about.png"],
  },
};

/* ─── Static data ────────────────────────────────────────────────────────── */
const heroStats: { value: string; label: string }[] = [
  { value: "500+",   label: "Installations Completed" },
  { value: "36",     label: "States Covered"          },
  { value: "1,200+", label: "Happy Customers"         },
];

const coreValues = [
  "Integrity — Genuine products, honest prices",
  "Accessibility — Solar for every Nigerian",
  "Excellence — Professional installation always",
  "Community — Supporting Nigeria's energy future",
];

interface ServiceCard {
  icon:        LucideIcon;
  title:       string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon:        ShoppingBag,
    title:       "Solar Products",
    description: "Browse genuine solar panels, batteries, lights, generators, inverters and charge controllers — all priced in Naira.",
  },
  {
    icon:        Wrench,
    title:       "Professional Installation",
    description: "Certified solar engineers install your system safely across all 36 Nigerian states with a workmanship guarantee.",
  },
  {
    icon:        MessageCircle,
    title:       "Expert Consultation",
    description: "Free one-on-one consultation with a solar expert who will design the right system for your specific needs and budget.",
  },
  {
    icon:        Calculator,
    title:       "System Design",
    description: "We calculate your energy load, design your solar system and provide a full bill of materials with transparent Naira costs.",
  },
  {
    icon:        GalleryHorizontal,
    title:       "Installation Gallery",
    description: "Browse hundreds of our completed solar installations across Nigeria for inspiration and proof of quality.",
  },
  {
    icon:        Headphones,
    title:       "After-Sales Support",
    description: "We stay with you after installation. Warranty claims, maintenance advice and technical support — all on WhatsApp.",
  },
];

const coverageZones = [
  { zone: "South-West",    states: "Lagos, Ogun, Oyo, Osun, Ondo, Ekiti"                        },
  { zone: "South-South",   states: "Rivers, Delta, Edo, Bayelsa, Cross River, Akwa Ibom"         },
  { zone: "South-East",    states: "Anambra, Imo, Enugu, Abia, Ebonyi"                           },
  { zone: "North-Central", states: "Abuja FCT, Kwara, Kogi, Benue, Plateau, Niger, Nassarawa"    },
  { zone: "North-West",    states: "Kano, Kaduna, Sokoto, Zamfara, Kebbi, Katsina, Jigawa"       },
  { zone: "North-East",    states: "Borno, Adamawa, Gombe, Taraba, Bauchi, Yobe"                 },
];

const majorCities = [
  "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu",
  "Benin City", "Kaduna", "Owerri", "Calabar", "Warri", "Jos",
  "Ilorin", "Abeokuta", "Asaba", "Uyo", "Onitsha", "Aba",
  "Maiduguri", "Sokoto", "Zaria", "Bauchi",
];

/* ─── Shared animation constant ──────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const waLink = getConsultationLink();

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          1. PAGE HERO
      ═══════════════════════════════════════════════════════════════ */}
      <header
        className="relative overflow-hidden pt-36 pb-20 px-4 text-center"
        style={{
          background: [
            "radial-gradient(ellipse 65% 60% at 95% 5%,  rgba(245,158,11,0.13) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 40% at 5%  90%, rgba(245,158,11,0.06) 0%, transparent 60%)",
            "#1E3A5F",
          ].join(", "),
        }}
        aria-label="About Nelsolar"
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)",
            backgroundSize:  "28px 28px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            About Us
          </p>
          <h1 className="mt-3 font-syne font-extrabold text-white text-4xl lg:text-6xl leading-tight">
            Nigeria&rsquo;s Solar Energy Store
          </h1>
          <p className="mt-4 text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            We are on a mission to make clean, reliable and affordable solar energy
            accessible to every Nigerian home and business.
          </p>

          {/* Stat cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/8 border border-white/10 rounded-2xl p-6 text-center"
              >
                <p className="font-syne font-bold text-white text-4xl leading-none">{value}</p>
                <p className="text-white/65 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          2. OUR STORY
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-4 lg:px-8" aria-label="Our Story">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
              Our Story
            </p>
            <h2 className="mt-2 font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
              Born From Nigeria&rsquo;s Power Problem
            </h2>
            <div className="mt-4 space-y-4 text-slate-body text-base leading-relaxed">
              <p>
                Like millions of Nigerians, our founder Nelson Okafor spent years dealing
                with unreliable grid power and the high cost of generator fuel. In 2019,
                he discovered the transformative potential of solar energy — and realised
                that most Nigerians lacked access to genuine, affordable solar products
                and professional installation services.
              </p>
              <p>
                Nelsolar was founded with a simple but powerful mission: to make clean
                solar energy accessible to every Nigerian home, business and community.
                We started in Lagos and have since grown to serve customers in all 36
                states, completing over 500 installations and counting.
              </p>
              <p>
                Today, Nelsolar is Nigeria&rsquo;s trusted solar marketplace — offering
                genuine certified products at transparent Naira prices, with professional
                installation, expert consultation and real human WhatsApp support. We are
                not just selling solar — we are powering a movement.
              </p>
            </div>
          </div>

          {/* Right — values card */}
          <div
            className="rounded-2xl p-8 flex flex-col items-center"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            <Sun size={48} className="text-amber" strokeWidth={1.4} aria-hidden="true" />
            <h3 className="font-syne font-bold text-white text-xl text-center mt-6 mb-6">
              Our Core Values
            </h3>
            <ul className="w-full space-y-4">
              {coreValues.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-amber shrink-0 mt-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="font-syne font-bold text-white text-sm leading-snug">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. WHAT WE OFFER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-off-white py-20 px-4 lg:px-8" aria-label="What We Offer">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
              What We Do
            </p>
            <h2 className="mt-2 font-syne font-bold text-navy text-3xl leading-tight">
              Everything Solar, All in One Place
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="
                  bg-white rounded-2xl p-6 shadow-sm border border-gray-100
                  hover:shadow-md hover:border-amber/30
                  transition-all duration-300
                "
              >
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <Icon size={22} className="text-amber" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="font-syne font-bold text-navy text-lg mt-4 leading-snug">
                  {title}
                </h3>
                <p className="text-slate-secondary text-sm mt-2 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. COVERAGE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-4 lg:px-8" aria-label="Coverage">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
              Coverage
            </p>
            <h2 className="mt-2 font-syne font-bold text-navy text-3xl leading-tight">
              We Serve All 36 States + FCT
            </h2>
            <p className="mt-4 text-slate-secondary text-base leading-relaxed">
              Nelsolar delivers and installs solar systems across the entire country.
              From Lagos to Maiduguri, Calabar to Sokoto — our certified engineers
              will come to you.
            </p>

            <ul className="mt-6 space-y-3">
              {coverageZones.map(({ zone, states }) => (
                <li key={zone} className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-amber shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-slate-body text-sm leading-relaxed">
                    <strong className="text-navy">{zone}:</strong> {states}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 inline-flex items-center gap-2
                bg-amber text-navy
                font-syne font-bold text-sm
                rounded-xl px-6 py-3
                hover:brightness-105 hover:scale-[1.02]
                transition-all duration-200 shadow-md
              "
            >
              <MessageCircle size={15} strokeWidth={2.5} />
              Get a Quote for Your State
            </a>
          </div>

          {/* Right — cities visual */}
          <div className="rounded-2xl p-6" style={{ backgroundColor: "#1E3A5F" }}>
            <h3 className="font-syne font-bold text-white text-lg mb-4">
              Major Cities We Serve
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {majorCities.map((city) => (
                <span
                  key={city}
                  className="
                    bg-amber/15 text-amber
                    font-syne text-xs font-semibold
                    rounded-full px-3 py-1 text-center
                  "
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-4 lg:px-8 text-center"
        style={{ backgroundColor: "#F59E0B" }}
        aria-label="Call to action"
      >
        <h2 className="font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
          Ready to Switch to Solar?
        </h2>
        <p className="mt-3 text-navy/80 text-base">
          Join over 1,200 Nigerian homes and businesses already saving money with
          Nelsolar.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#products"
            className="
              flex items-center gap-2
              bg-navy text-white
              font-syne font-bold text-sm
              rounded-xl px-6 py-3
              hover:opacity-90 hover:scale-105
              transition-all duration-200
            "
          >
            Shop Solar Products
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              border-2 border-navy text-navy
              font-syne font-bold text-sm
              rounded-xl px-6 py-3
              hover:bg-navy/10 hover:scale-105
              transition-all duration-200
            "
          >
            <MessageCircle size={15} strokeWidth={2.5} />
            Book Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle,
  Sun,
  Camera,       // Instagram stand-in
  Users,        // Facebook stand-in
  AtSign,       // Twitter / X stand-in
  PlayCircle,   // YouTube stand-in
} from "lucide-react";
import { getConsultationLink } from "@/lib/whatsapp";

/* ─── Sun SVG (matches Navbar) ───────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="6" fill="#F59E0B" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={16 + Math.cos(angle) * 9}
            y1={16 + Math.sin(angle) * 9}
            x2={16 + Math.cos(angle) * 13}
            y2={16 + Math.sin(angle) * 13}
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const productLinks = [
  "Solar Panels",
  "Solar Batteries",
  "Solar Lights",
  "Solar Generators",
  "Inverters",
  "Charge Controllers",
  "Solar Kits",
];

const companyLinks: { label: string; href: string }[] = [
  { label: "About Us",     href: "/about"          },
  { label: "Gallery",      href: "/gallery"         },
  { label: "Installation", href: "/#installation"   },
  { label: "Consultation", href: "/#consultation"   },
  { label: "Our Team",     href: "/#team"           },
  { label: "FAQ",          href: "/#faq"            },
  { label: "Contact Us",   href: "/#contact"        },
];

const trustPoints = [
  "Genuine certified products",
  "Transparent Naira pricing",
  "Nationwide installation",
  "WhatsApp support 7 days a week",
  "1,200+ satisfied customers",
];

const socialLinks: { icon: typeof Camera; label: string }[] = [
  { icon: Camera,     label: "Instagram" },
  { icon: Users,      label: "Facebook"  },
  { icon: AtSign,     label: "Twitter"   },
  { icon: PlayCircle, label: "YouTube"   },
];

/* ─── Reusable footer link ───────────────────────────────────────────────── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="group">
      <Link
        href={href}
        className="
          inline-flex items-center gap-1
          text-white/60 text-sm
          hover:text-amber hover:translate-x-1
          transition-all duration-200
        "
      >
        <ChevronRight
          size={12}
          className="opacity-0 group-hover:opacity-100 -ml-1 transition-opacity"
          aria-hidden="true"
        />
        {label}
      </Link>
    </li>
  );
}

/* ─── Column heading ─────────────────────────────────────────────────────── */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="
      font-syne font-bold text-white text-sm
      uppercase tracking-[0.15em] mb-5
    ">
      {children}
    </h3>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Footer() {
  const waLink = getConsultationLink();

  return (
    <footer id="contact" style={{ backgroundColor: "#0F172A" }} aria-label="Site footer">

      {/* ── Contact Strip ─────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#1E3A5F" }}>
        <div className="max-w-6xl mx-auto py-12 px-4 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}
          <div>
            <h2 className="font-syne font-bold text-white text-2xl leading-snug">
              Have Questions? We Are Here to Help
            </h2>
            <p className="mt-2 text-[#a8c0d6] text-sm leading-relaxed max-w-md">
              Reach out on WhatsApp, send us an email or follow us on social media.
              Our team responds within 30 minutes.
            </p>
          </div>

          {/* Right — buttons */}
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                bg-amber text-white border border-white
                font-syne font-bold text-sm
                rounded-xl px-5 py-3
                hover:scale-105 transition-all duration-200
                shadow-md
              "
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Chat on WhatsApp
            </a>
            <a
              href="mailto:oshimaejike@gmail.com"
              target="_blank"
              className="
                flex items-center gap-2
                border border-white text-white
                font-syne font-bold text-sm
                rounded-xl px-5 py-3
                hover:bg-white/10 hover:scale-105
                transition-all duration-200
              "
            >
              <Mail size={16} strokeWidth={2} />
              Send an Email
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Col 1: Brand ───────────────────────────────────────────── */}
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="Nelsolar home">
              <SunIcon />
              <span className="font-syne font-bold text-white text-xl">Nelsolar</span>
            </Link>

            <p className="mt-3 text-white/60 text-sm leading-relaxed max-w-xs">
              Powering Nigeria with Clean Solar Energy
            </p>

            {/* Contact details */}
            <ul className="mt-6 space-y-3">
              {[
                { Icon: Phone,  text: "+234 813 773 1660"              },
                { Icon: Mail,   text: "oshimaejike@gmail.com"              },
                { Icon: MapPin, text: "Lagos, Nigeria (Nationwide Service)" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon size={15} className="text-white/70 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-white/70 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={waLink}
                  aria-label={`Nelsolar on ${label}`}
                  className="
                    w-9 h-9 rounded-full
                    bg-white/10 flex items-center justify-center
                    hover:bg-amber hover:text-navy
                    text-white transition-all duration-200
                  "
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Products ────────────────────────────────────────── */}
          <div>
            <ColHeading>Products</ColHeading>
            <ul className="space-y-3">
              {productLinks.map((label) => (
                <FooterLink key={label} href="/#products" label={label} />
              ))}
            </ul>
          </div>

          {/* ── Col 3: Company ─────────────────────────────────────────── */}
          <div>
            <ColHeading>Company</ColHeading>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <FooterLink key={label} href={href} label={label} />
              ))}
            </ul>
          </div>

          {/* ── Col 4: Why Nelsolar ────────────────────────────────────── */}
          <div>
            <ColHeading>Why Nelsolar</ColHeading>
            <ul className="space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="text-white/70 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-white/60 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            {/* Support hours */}
            <div className="mt-6">
              <p className="text-white/50 text-xs uppercase font-syne tracking-wider mb-2">
                Support Hours
              </p>
              <p className="text-white/60 text-sm">Mon – Sat: 8am – 8pm</p>
              <p className="text-white/60 text-sm">Sunday: 10am – 5pm</p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="
          mt-12 pt-8 border-t border-white/10
          flex flex-col sm:flex-row items-center justify-between gap-4
        ">
          {/* Copyright */}
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Nelsolar. All rights reserved.
          </p>

          {/* Decorative suns */}
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <Sun key={i} size={12} className="text-amber fill-amber" />
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-amber transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link
              href="/terms"
              className="text-white/40 hover:text-amber transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle, ChevronDown, Sun } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
}

interface ProductCategory {
  label: string;
  href: string;
  emoji: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const productCategories: ProductCategory[] = [
  { label: "Solar Panels",       href: "/#products?category=panels",             emoji: "☀️" },
  { label: "Solar Batteries",    href: "/#products?category=batteries",          emoji: "🔋" },
  { label: "Solar Lights",       href: "/#products?category=lights",             emoji: "💡" },
  { label: "Solar Generators",   href: "/#products?category=generators",         emoji: "⚙️" },
  { label: "Inverters",          href: "/#products?category=inverters",          emoji: "🔌" },
  { label: "Charge Controllers", href: "/#products?category=charge-controllers", emoji: "📡" },
  { label: "Solar Kits",         href: "/#products?category=kits",               emoji: "📦" },
];

const navLinks: NavLink[] = [
  { label: "Gallery",       href: "/gallery"        },
  { label: "Installation",  href: "/#installation"  },
  { label: "Consultation",  href: "/#consultation"  },
  { label: "About Us",      href: "/about"          },
  { label: "Contact",       href: "/#contact"       },
];

/* ─── Sun SVG ────────────────────────────────────────────────────────────── */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Centre circle */}
      <circle cx="16" cy="16" r="6" fill="#F59E0B" />
      {/* 8 radiating lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 16 + Math.cos(angle) * 9;
        const y1 = 16 + Math.sin(angle) * 9;
        const x2 = 16 + Math.cos(angle) * 13;
        const y2 = 16 + Math.sin(angle) * 13;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* ─── Products Dropdown ──────────────────────────────────────────────────── */
function ProductsDropdown({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`
          group flex items-center gap-1 py-1 text-sm font-medium tracking-wide
          relative transition-colors duration-300
          ${scrolled ? "text-navy hover:text-amber" : "text-amber hover:text-amber"}
        `}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Products
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {/* Amber underline */}
        <span
          className={`
            absolute -bottom-1 left-0 h-[2px] bg-amber rounded-full
            transition-all duration-300 ease-out
            ${open ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0,  y: 8,  scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-white shadow-card border border-slate-100 overflow-hidden z-50"
          >
            {productCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setOpen(false)}
                className="
                  group flex items-center gap-3 px-4 py-3
                  border-l-[3px] border-transparent
                  hover:border-amber hover:bg-amber/5
                  transition-all duration-150 text-sm text-slate-body
                "
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                <span className="font-medium group-hover:text-navy transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Desktop Nav Link ───────────────────────────────────────────────────── */
function DesktopNavLink({
  href,
  label,
  scrolled,
}: {
  href: string;
  label: string;
  scrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group relative py-1 text-sm font-medium tracking-wide
        transition-colors duration-300
        ${scrolled ? "text-navy hover:text-amber" : "text-amber hover:text-amber"}
      `}
    >
      {label}
      <span
        className="
          absolute -bottom-1 left-0 h-[2px] w-0 bg-amber rounded-full
          transition-all duration-300 ease-out group-hover:w-full
        "
      />
    </Link>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER;
  const waLink = `https://wa.me/${waNumber}`;

  /* Scroll detection */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
    setMobileProductsOpen(false);
  }

  return (
    <>
      {/* ── Navbar Bar ─────────────────────────────────────────────────── */}
      <nav
        className={`
          sticky top-0 z-50 w-full
          transition-all duration-400 ease-in-out
          ${
            scrolled
              ? "glass border-b border-amber/20 shadow-nav"
              : "bg-transparent"
          }
        `}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Nelsolar home"
          >
            <SunIcon />
            <span
              className={`
                font-syne text-xl font-bold tracking-tight
                transition-colors duration-300
                ${scrolled ? "text-navy" : "text-amber"}
              `}
            >
              Nelsolar
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-7">
            <ProductsDropdown scrolled={scrolled} />
            {navLinks.map((link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                scrolled={scrolled}
              />
            ))}
          </div>

          {/* ── Desktop CTA ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2
                bg-amber text-navy font-syne font-bold text-sm
                px-5 py-2.5 rounded-full
                shadow-amber hover:shadow-none
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Order via WhatsApp
            </a>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-amber"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? (
              <X size={24} className="text-navy" />
            ) : (
              <Menu
                size={24}
                className={`transition-colors duration-300 ${scrolled ? "text-navy" : "text-navy"}`}
              />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-dark/60 backdrop-blur-sm lg:hidden"
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{ opacity: 0,  y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                fixed top-16 left-0 right-0 z-50
                bg-navy shadow-2xl lg:hidden
                max-h-[calc(100vh-4rem)] overflow-y-auto
              "
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col divide-y divide-white/10">

                {/* Products accordion */}
                <div>
                  <button
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    className="
                      flex w-full items-center justify-between
                      px-6 py-4 text-left
                      text-white font-syne font-semibold text-lg
                      hover:bg-white/5 transition-colors
                    "
                    aria-expanded={mobileProductsOpen}
                  >
                    Products
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 text-amber ${
                        mobileProductsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            onClick={closeDrawer}
                            className="
                              flex items-center gap-3
                              pl-10 pr-6 py-3
                              text-white/80 hover:text-amber
                              hover:bg-white/5 transition-colors
                              border-l-2 border-transparent hover:border-amber
                              ml-4 text-base
                            "
                          >
                            <span>{cat.emoji}</span>
                            {cat.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other nav links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className="
                      block px-6 py-4
                      text-white font-syne font-semibold text-lg
                      hover:bg-white/5 hover:text-amber
                      transition-colors
                    "
                  >
                    {link.label}
                  </Link>
                ))}

                {/* WhatsApp CTA */}
                <div className="px-6 py-6">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeDrawer}
                    className="
                      flex items-center justify-center gap-2.5
                      w-full bg-amber text-navy
                      font-syne font-bold text-base
                      py-3.5 rounded-xl
                      hover:brightness-105 active:scale-95
                      transition-all duration-200 shadow-amber
                    "
                  >
                    <MessageCircle size={18} strokeWidth={2.5} />
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

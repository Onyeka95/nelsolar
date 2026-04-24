"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, type Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ActiveCategory = Category | "all";

/* ─── Animation variants ─────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headerVariants = {
  initial:    { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
};

const headerTransition = {
  duration: 0.6,
  ease:     EASE_OUT,
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1    },
  exit:    { opacity: 0, scale: 0.95 },
};

const cardTransition = { duration: 0.2, ease: EASE_OUT };

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="products"
      className="bg-off-white py-20 px-4 lg:px-8"
      aria-label="Solar Products"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ───────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
          transition={headerTransition}
          className="text-center"
        >
          <p className="
            font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber
          ">
            Our Products
          </p>

          <h2 className="
            mt-2 font-syne font-bold text-navy
            text-3xl lg:text-4xl leading-tight
          ">
            Solar Solutions for Every Need
          </h2>

          <p className="
            mt-3 text-base text-slate-secondary leading-relaxed
            max-w-xl mx-auto
          ">
            From home solar panels to complete off-grid systems — all priced
            in Naira, all available on WhatsApp.
          </p>
        </motion.div>

        {/* ── Category filter bar ──────────────────────────────────────── */}
        <div
          className="
            mt-10 mb-8
            flex gap-3
            overflow-x-auto pb-2
            lg:justify-center
            scrollbar-none
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          role="tablist"
          aria-label="Filter products by category"
        >
          {/* "All Products" pill */}
          <CategoryPill
            id="all"
            label="All Products"
            icon="⚡"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />

          {/* Dynamic category pills — exclude the "all" sentinel from data */}
          {categories
            .filter((c) => c.id !== "all")
            .map((cat) => (
              <CategoryPill
                key={cat.id}
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
              />
            ))}
        </div>

        {/* ── Product grid ─────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              gap-6
            "
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={cardTransition}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ── Empty state ──────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.3 }}
            className="
              flex flex-col items-center justify-center
              py-24 text-center gap-3
            "
            aria-live="polite"
          >
            <span className="text-5xl" aria-hidden="true">☀️</span>
            <p className="font-syne font-semibold text-navy text-lg">
              No products in this category yet
            </p>
            <p className="text-slate-secondary text-sm">
              Check back soon — we&rsquo;re adding more products regularly.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── CategoryPill sub-component ─────────────────────────────────────────── */
interface CategoryPillProps {
  id:      string;
  label:   string;
  icon:    string;
  active:  boolean;
  onClick: () => void;
}

function CategoryPill({ id, label, icon, active, onClick }: CategoryPillProps) {
  return (
    <button
      role="tab"
      aria-selected={active}
      aria-controls="products-grid"
      id={`tab-${id}`}
      onClick={onClick}
      className={`
        flex items-center gap-2 shrink-0
        px-5 py-2 rounded-full
        font-syne text-sm font-semibold
        border transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber
        ${active
          ? "bg-amber text-navy border-amber shadow-amber/30 shadow-md"
          : "bg-white text-navy border-gray-200 hover:border-amber hover:bg-amber/5"
        }
      `}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

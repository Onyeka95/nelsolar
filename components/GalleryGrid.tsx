"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { MapPin, Zap, Calendar, ZoomIn } from "lucide-react";
import type { GalleryItem, GalleryCategoryItem, GalleryCategory } from "@/data/gallery";
import GalleryLightbox from "@/components/GalleryLightbox";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type ActiveCategory = GalleryCategory | "all";

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0  },
  exit:    { opacity: 0, scale: 0.95 },
};

const cardTransition: Transition = { duration: 0.22, ease: EASE_OUT };

/* ─── Category label map ─────────────────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  residential:     "Residential",
  commercial:      "Commercial",
  "off-grid":      "Off-Grid",
  "street-lights": "Street Lights",
  batteries:       "Battery Banks",
  panels:          "Solar Panels",
};

/* ─── Gallery Card ───────────────────────────────────────────────────────── */
function GalleryCard({
  item,
  onClick,
}: {
  item:    GalleryItem;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={cardTransition}
      onClick={onClick}
      className="
        group bg-white rounded-2xl overflow-hidden shadow-sm
        cursor-pointer
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      "
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* ── Image ──────────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="
          absolute inset-0 bg-black/40
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex items-center justify-center
        ">
          <ZoomIn size={32} className="text-white drop-shadow-lg" aria-hidden="true" />
        </div>

        {/* Category badge — top left */}
        <span className="
          absolute top-3 left-3
          bg-amber text-white
          font-syne text-[10px] font-bold uppercase tracking-wide
          rounded-full px-3 py-1
        ">
          {CATEGORY_LABELS[item.category] ?? item.category}
        </span>

        {/* Featured badge — top right */}
        {item.featured && (
          <span className="
            absolute top-3 right-3
            bg-amber text-white
            font-syne text-[10px] font-bold
            rounded-full px-3 py-1
          ">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-syne font-bold text-navy text-base line-clamp-1 leading-snug">
          {item.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={11} className="text-amber shrink-0" aria-hidden="true" />
          <span className="text-slate-secondary text-xs">{item.location}</span>
        </div>

        {/* System size chip */}
        {item.systemSize && (
          <div className="mt-2 inline-flex items-center gap-1 bg-amber/15 rounded-full px-2.5 py-0.5">
            <Zap size={10} className="text-amber" aria-hidden="true" />
            <span className="text-amber text-xs font-semibold">{item.systemSize}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-slate-secondary text-sm line-clamp-2 mt-2 leading-relaxed">
          {item.description}
        </p>

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar size={11} className="text-slate-secondary" aria-hidden="true" />
            <span className="text-slate-secondary text-xs">{item.completedDate}</span>
          </div>
          <span className="font-syne font-bold text-amber text-xs">
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Category Pill ──────────────────────────────────────────────────────── */
function CategoryPill({
  cat,
  active,
  onClick,
}: {
  cat:     GalleryCategoryItem;
  active:  boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex items-center gap-2 shrink-0
        px-5 py-2 rounded-full
        font-syne text-sm font-semibold border
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber
        ${active
          ? "bg-amber text-navy border-amber shadow-md"
          : "bg-white text-navy border-gray-200 hover:border-amber hover:bg-amber/5"
        }
      `}
    >
      <span aria-hidden="true">{cat.emoji}</span>
      {cat.label}
    </button>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
interface GalleryGridProps {
  items:      GalleryItem[];
  categories: GalleryCategoryItem[];
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [selectedIndex,  setSelectedIndex]  = useState<number>(0);
  const [selectedItem,   setSelectedItem]   = useState<GalleryItem | null>(null);
  const [visibleCount,   setVisibleCount]   = useState<number>(12);

  /* Filtered list */
  const filtered = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  /* Handlers */
  function handleCategoryChange(id: ActiveCategory) {
    setActiveCategory(id);
    setVisibleCount(12);
  }

  function handleCardClick(item: GalleryItem, index: number) {
    setSelectedItem(item);
    setSelectedIndex(index);
  }

  function handleClose() {
    setSelectedItem(null);
  }

  function handlePrev() {
    const newIndex = selectedIndex === 0 ? filtered.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(filtered[newIndex]);
  }

  function handleNext() {
    const newIndex = selectedIndex === filtered.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedItem(filtered[newIndex]);
  }

  return (
    <>
      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <div
        className="
          mb-4 flex gap-3
          overflow-x-auto pb-2
          lg:justify-center
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
        role="group"
        aria-label="Filter gallery by category"
      >
        {categories.map((cat) => (
          <CategoryPill
            key={cat.id}
            cat={cat}
            active={activeCategory === cat.id}
            onClick={() => handleCategoryChange(cat.id as ActiveCategory)}
          />
        ))}
      </div>

      {/* Results count */}
      <p className="mb-6 text-slate-secondary text-sm">
        Showing {visible.length} of {filtered.length} projects
      </p>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item, index)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Load More ───────────────────────────────────────────────────── */}
      {visible.length < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="
              border-2 border-amber text-amber
              font-syne font-bold text-sm
              rounded-xl px-8 py-3
              hover:bg-amber hover:text-navy
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber
            "
          >
            Load More Projects ({filtered.length - visible.length} remaining)
          </button>
        </div>
      )}

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {selectedItem && (
        <GalleryLightbox
          item={selectedItem}
          totalCount={filtered.length}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

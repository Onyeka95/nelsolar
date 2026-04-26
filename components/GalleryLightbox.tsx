"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Zap,
  Calendar,
  MessageCircle,
} from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface GalleryLightboxProps {
  item:        GalleryItem;
  totalCount:  number;
  currentIndex: number;
  onClose:     () => void;
  onPrev:      () => void;
  onNext:      () => void;
}

/* ─── Category label helper ──────────────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  residential:   "Residential",
  commercial:    "Commercial",
  "off-grid":    "Off-Grid",
  "street-lights": "Street Lights",
  batteries:     "Battery Banks",
  panels:        "Solar Panels",
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function GalleryLightbox({
  item,
  totalCount,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";
  const waMessage = `Hi Nelsolar, I saw your project '${item.title}' in the gallery and I'm interested in a similar installation. Please contact me.`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  /* Keyboard navigation */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Image viewer: ${item.title}`}
      >
        {/* ── Close button ────────────────────────────────────────────── */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="
            absolute top-4 right-4 z-10
            w-10 h-10 rounded-full
            bg-white/10 hover:bg-white/20
            flex items-center justify-center
            transition-all duration-200
          "
          aria-label="Close lightbox"
        >
          <X size={18} className="text-white" />
        </button>

        {/* ── Prev arrow ──────────────────────────────────────────────── */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="
            absolute left-3 sm:left-6 z-10
            w-10 h-10 sm:w-12 sm:h-12 rounded-full
            bg-white/10 hover:bg-white/20
            flex items-center justify-center
            transition-all duration-200
          "
          aria-label="Previous image"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>

        {/* ── Next arrow ──────────────────────────────────────────────── */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="
            absolute right-3 sm:right-6 z-10
            w-10 h-10 sm:w-12 sm:h-12 rounded-full
            bg-white/10 hover:bg-white/20
            flex items-center justify-center
            transition-all duration-200
          "
          aria-label="Next image"
        >
          <ChevronRight size={22} className="text-white" />
        </button>

        {/* ── Content card ────────────────────────────────────────────── */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          exit={{ scale: 0.92,    opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="
            relative w-full max-w-5xl mx-4
            bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl
            flex flex-col lg:flex-row
            max-h-[90vh] overflow-y-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Left: Image ─────────────────────────────────────────── */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:w-[60%] lg:h-auto min-h-[220px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>

          {/* ── Right: Details ──────────────────────────────────────── */}
          <div className="flex flex-col justify-between p-6 lg:w-[40%] bg-[#0F172A]">
            <div>
              {/* Category pill */}
              <span className="
                inline-flex items-center
                bg-amber text-white
                font-syne text-[10px] font-bold uppercase tracking-wide
                rounded-full px-3 py-1 mb-3
              ">
                {CATEGORY_LABELS[item.category] ?? item.category}
              </span>

              {/* Title */}
              <h2 className="font-syne font-bold text-white text-xl leading-tight">
                {item.title}
              </h2>

              {/* Meta rows */}
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-white shrink-0" aria-hidden="true" />
                  <span className="text-white/70 text-sm">{item.location}</span>
                </div>

                {item.systemSize && (
                  <div className="flex items-center gap-1.5">
                    <Zap size={14} className="text-white shrink-0" aria-hidden="true" />
                    <span className="text-white/70 text-sm">System: {item.systemSize}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-white shrink-0" aria-hidden="true" />
                  <span className="text-white/70 text-sm">{item.completedDate}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-4 mb-4 h-px bg-amber/30" aria-hidden="true" />

              {/* Description */}
              <p className="text-white/75 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6 w-full
                flex items-center justify-center gap-2
                bg-[#a8c0d6] text-navy
                font-syne font-bold text-sm
                rounded-xl py-3
                hover:brightness-105 hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                shadow-md
              "
            >
              <MessageCircle size={15} strokeWidth={2.5} />
              Enquire About This System on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* ── Image counter ────────────────────────────────────────────── */}
        <p className="absolute bottom-5 font-syne text-sm text-white/60">
          {currentIndex + 1} / {totalCount}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

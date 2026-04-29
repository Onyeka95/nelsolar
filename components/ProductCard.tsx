"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { type Product, categories } from "@/data/products";
import { getWhatsAppLink } from "@/lib/whatsapp";

/* ─── Helper: resolve category label from id ─────────────────────────────── */
function getCategoryLabel(categoryId: Product["category"]): string {
  return categories.find((c) => c.id === categoryId)?.label ?? categoryId;
}

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface ProductCardProps {
  product: Product;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ProductCard({ product }: ProductCardProps) {
  function handleBuy() {
    const link = getWhatsAppLink(product.name, product.price);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  const isInStock = product.badge === "In Stock";

  return (
    <article className="
      group flex flex-col
      bg-white rounded-2xl shadow-md overflow-hidden
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300
    ">
      {/* ── Image area ──────────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — Nelsolar Nigeria`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient for badge legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
        />

        {/* Category badge — top left */}
        <span className="
          absolute top-3 left-3
          bg-amber text-white
          font-syne text-[10px] font-bold uppercase tracking-wide
          rounded-full px-3 py-1
          shadow-sm
        ">
          {getCategoryLabel(product.category)}
        </span>

        {/* Stock badge — top right */}
        <span className={`
          absolute top-3 right-3
          font-syne text-[10px] font-bold uppercase tracking-wide
          rounded-full px-3 py-1 shadow-sm
          ${isInStock
            ? "bg-solar-green text-white"
            : "bg-amber text-white"
          }
        `}>
          {product.badge}
        </span>
      </div>

      {/* ── Content area ────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">

        {/* Name */}
        <h3 className="
          font-syne font-bold text-navy text-base leading-snug
          line-clamp-2
        ">
          {product.name}
        </h3>

        {/* Description */}
        <p className="
          mt-1 text-sm leading-relaxed text-slate-secondary
          line-clamp-3
        ">
          {product.description}
        </p>

        {/* Specs pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.specs.map((spec) => (
            <span
              key={spec}
              className="
                bg-slate-100 text-navy
                text-xs font-medium
                rounded-full px-2.5 py-0.5
                border border-slate-200
              "
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Spacer pushes button to bottom */}
        <div className="flex-1" />

        {/* Price / WhatsApp button */}
        <button
          onClick={handleBuy}
          aria-label={`Buy ${product.name} for ₦${product.price.toLocaleString()} via WhatsApp`}
          className="
            mt-4 w-full
            flex items-center justify-center gap-2
            bg-amber text-navy
            font-syne font-bold text-sm
            rounded-xl py-3
            hover:brightness-105 hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200
            shadow-amber/40 shadow-md
          "
        >
          <MessageCircle size={15} strokeWidth={2.5} />
          Buy for ₦{product.price.toLocaleString("en-NG")} via WhatsApp
        </button>
      </div>
    </article>
  );
}

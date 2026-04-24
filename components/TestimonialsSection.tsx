"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { Star, MapPin } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Testimonial {
  name:     string;
  location: string;
  product:  string;
  rating:   number;
  initials: string;
  quote:    string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const testimonials: Testimonial[] = [
  {
    name:     "Chukwuemeka Adeyemi",
    location: "Lagos, Nigeria",
    product:  "3kVA Solar System",
    rating:   5,
    initials: "CA",
    quote:
      "Since installing my Nelsolar 3kVA system, my electricity bill dropped from ₦45,000 to zero. The installation team was professional and finished in one day. Best investment I have ever made for my home.",
  },
  {
    name:     "Amara Okonkwo",
    location: "Abuja, FCT",
    product:  "200W Solar Panel Kit",
    rating:   5,
    initials: "AO",
    quote:
      "The WhatsApp support is unbeatable. I described what I needed, got a recommendation in minutes, paid and received delivery in 3 days. The installer was clean and thorough. Very impressed.",
  },
  {
    name:     "Tunde Bakare",
    location: "Ibadan, Oyo",
    product:  "Solar Battery 200Ah",
    rating:   5,
    initials: "TB",
    quote:
      "I was skeptical at first but Nelsolar proved me wrong. The battery has been running my home for 8 months without any issues. Genuine product, fair price in Naira. I have already referred four people.",
  },
  {
    name:     "Grace Nwosu",
    location: "Enugu, Nigeria",
    product:  "5kVA Off-Grid System",
    rating:   5,
    initials: "GN",
    quote:
      "I run a small tailoring business in Enugu. The constant power cuts were killing my productivity. Nelsolar installed a full off-grid system and now I work 24/7 without interruption. Saving ₦30,000 monthly on fuel.",
  },
  {
    name:     "Musa Abdullahi",
    location: "Kano, Nigeria",
    product:  "Solar Street Light 60W",
    rating:   5,
    initials: "MA",
    quote:
      "Ordered six solar street lights for our community. Delivery was fast, the lights are very bright and have been working perfectly through rain and harmattan. Nelsolar customer service answered every question patiently.",
  },
  {
    name:     "Chidinma Eze",
    location: "Port Harcourt, Rivers",
    product:  "Solar Generator 1kVA",
    rating:   4,
    initials: "CE",
    quote:
      "Great product and great service. The solar generator is perfect for my apartment — quiet, clean, and saves me a fortune on fuel. Only giving 4 stars because delivery took an extra day, but the team apologised and followed up.",
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

/* ─── Star Rating ────────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          className={i < rating ? "text-amber fill-amber" : "text-gray-300 fill-gray-200"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ─── Testimonial Card ───────────────────────────────────────────────────── */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const cardTransition: Transition = {
    duration: 0.5,
    delay:    index * 0.1,
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
        flex flex-col
        bg-white border border-gray-100
        rounded-2xl p-6 shadow-sm
        hover:shadow-md hover:-translate-y-1
        transition-all duration-300
      "
    >
      {/* Top row — avatar + stars */}
      <div className="flex items-start justify-between">
        {/* Avatar */}
        <div
          className="
            w-12 h-12 rounded-full shrink-0
            bg-amber flex items-center justify-center
            font-syne font-bold text-navy text-sm
          "
          aria-label={t.name}
        >
          {t.initials}
        </div>

        {/* Stars */}
        <StarRating rating={t.rating} />
      </div>

      {/* Name */}
      <h3 className="font-syne font-bold text-navy text-base mt-3 leading-snug">
        {t.name}
      </h3>

      {/* Location */}
      <span className="flex items-center gap-1 text-slate-secondary text-xs mt-0.5">
        <MapPin size={11} aria-hidden="true" />
        {t.location}
      </span>

      {/* Product pill */}
      <span className="
        mt-2 self-start inline-flex items-center
        bg-amber/15 text-amber
        font-syne text-xs font-semibold
        rounded-full px-3 py-0.5
      ">
        Purchased: {t.product}
      </span>

      {/* Quote */}
      <div className="mt-3 flex-1">
        <span
          className="block font-syne text-4xl text-amber leading-none -mb-1"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="text-slate-body text-sm leading-relaxed italic">
          {t.quote}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Aggregate Rating Bar ───────────────────────────────────────────────── */
function AggregateRatingBar() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="
        inline-flex flex-wrap items-center justify-center gap-4
        bg-white border border-gray-100
        rounded-2xl shadow-sm
        px-8 py-4
      ">
        {/* Stars */}
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} className="text-amber fill-amber" strokeWidth={1.5} />
          ))}
        </div>

        {/* Score */}
        <span className="font-syne font-bold text-navy text-lg">
          4.9 out of 5
        </span>

        {/* Divider */}
        <span aria-hidden="true" className="hidden sm:block w-px h-5 bg-gray-200" />

        {/* Count */}
        <span className="text-slate-secondary text-sm">
          Based on 200+ verified customer reviews
        </span>
      </div>
    </div>
  );
}

/* ─── Aggregate Rating JSON-LD ───────────────────────────────────────────── */
const aggregateRatingSchema = {
  "@context":    "https://schema.org",
  "@type":       "AggregateRating",
  itemReviewed:  { "@type": "Organization", name: "Nelsolar" },
  ratingValue:   "4.9",
  reviewCount:   "200",
  bestRating:    "5",
};

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-white py-20 px-4 lg:px-8"
      aria-label="Customer Testimonials"
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
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            Customer Stories
          </p>
          <h2 className="mt-2 font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-slate-secondary text-base leading-relaxed max-w-xl mx-auto">
            Nigerians across the country are saving money and enjoying power
            independence with Nelsolar.
          </p>
        </motion.div>

        {/* ── Cards Grid ──────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} />
          ))}
        </div>

        {/* ── Aggregate Rating Bar ─────────────────────────────────────── */}
        <AggregateRatingBar />
      </div>

      {/* ── JSON-LD ─────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
    </section>
  );
}

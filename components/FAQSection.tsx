"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface FAQItem {
  question: string;
  answer:   string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const faqs: FAQItem[] = [
  {
    question: "How much does a solar system cost in Nigeria?",
    answer:
      "Solar system costs in Nigeria vary based on your energy needs. A basic 1kVA system for a small apartment starts around ₦350,000, a 3kVA home system is typically ₦750,000 to ₦1,000,000, and a full 5kVA off-grid system for a large home or business ranges from ₦1,200,000 to ₦2,000,000. All Nelsolar prices are transparent and quoted in Naira with no hidden charges.",
  },
  {
    question: "Can solar power run an air conditioner in Nigeria?",
    answer:
      "Yes, solar can power an air conditioner in Nigeria, but it requires a properly sized system. A 1.5HP AC typically needs a minimum 3kVA inverter, 400Ah battery bank and at least 600W of solar panels to run comfortably. Our consultants will design the right system for your specific AC load and other appliances.",
  },
  {
    question: "How long does a solar battery last?",
    answer:
      "Battery lifespan depends on the type. Lithium Iron Phosphate (LiFePO4) batteries last 8 to 15 years with proper use. AGM and Gel batteries typically last 3 to 5 years. Tubular batteries last 5 to 8 years. Nelsolar recommends LiFePO4 batteries for the best long-term value in the Nigerian climate.",
  },
  {
    question: "What size solar panel do I need for my home?",
    answer:
      "The right solar panel size depends on your daily energy consumption. A small apartment using a TV, fans, lights and phone charging typically needs 200W to 400W. A medium home with a fridge and more appliances needs 600W to 1,200W. A large home or business may need 2,000W or more. Use our free Solar Calculator above for a quick estimate or book a free consultation for an accurate assessment.",
  },
  {
    question: "How do I order from Nelsolar?",
    answer:
      "Ordering from Nelsolar is simple. Browse our products, click the 'Buy via WhatsApp' button on any product, and you will be connected directly to our sales team on WhatsApp. Describe what you need, confirm your order, make payment, and we will arrange delivery and installation. Our team is available 7 days a week.",
  },
  {
    question: "Do you install across all states in Nigeria?",
    answer:
      "Yes, Nelsolar provides installation services across all 36 states in Nigeria including FCT Abuja. Our network of certified solar engineers covers Lagos, Abuja, Port Harcourt, Kano, Enugu, Ibadan, Benin City and everywhere in between. Delivery and installation timelines vary by location — contact us on WhatsApp for your area's timeline.",
  },
  {
    question: "What warranty do your products come with?",
    answer:
      "All Nelsolar products come with manufacturer warranties. Solar panels typically carry 10 to 25 year performance warranties. Inverters carry 1 to 3 year warranties. Batteries carry 1 to 5 year warranties depending on the type. We handle all warranty claims on your behalf — you deal with us, not the manufacturer directly.",
  },
  {
    question: "Can I pay in instalments for a solar system?",
    answer:
      "Yes, Nelsolar offers flexible payment options for qualifying customers. We work with several financing partners to provide instalment plans for solar systems above ₦500,000. Contact us on WhatsApp to discuss your budget and we will find a payment plan that works for you.",
  },
];

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headerTransition: Transition = { duration: 0.6, ease: EASE_OUT };

const answerTransition: Transition = {
  duration: 0.25,
  ease:     "easeInOut",
};

/* ─── JSON-LD ────────────────────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type":    "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type":         "Question",
    name:            f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text:    f.answer,
    },
  })),
};

/* ─── Accordion Item ─────────────────────────────────────────────────────── */
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item:     FAQItem;
  index:    number;
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl border shadow-sm overflow-hidden
        transition-all duration-200
        ${isOpen ? "border-amber/50" : "border-gray-100 hover:border-amber/40"}
      `}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className="
          w-full flex items-center justify-between
          text-left cursor-pointer
          p-5 gap-4
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber
        "
      >
        <span className="font-syne font-bold text-navy text-base pr-4 leading-snug">
          {item.question}
        </span>

        {/* Animated chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={20} className="text-amber" />
        </motion.div>
      </button>

      {/* Answer — animated open/close */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={answerTransition}
            className="overflow-hidden"
          >
            <div className="ml-5 mr-5 mb-5 pl-4 border-l-2 border-amber">
              <p className="text-slate-secondary text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      id="faq"
      className="bg-off-white py-20 px-4 lg:px-8"
      aria-label="Frequently Asked Questions"
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
            FAQ
          </p>
          <h2 className="mt-2 font-syne font-bold text-navy text-3xl lg:text-4xl leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-secondary text-base leading-relaxed max-w-lg mx-auto">
            Everything you need to know about solar in Nigeria.
          </p>
        </motion.div>

        {/* ── Accordion ───────────────────────────────────────────────── */}
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>

      {/* ── FAQPage JSON-LD ─────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}

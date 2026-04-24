"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Banknote, MapPin, Sun, MessageCircle } from "lucide-react";
import { getConsultationLink } from "@/lib/whatsapp";

/* ─── Nigerian states ────────────────────────────────────────────────────── */
const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

/* Northern states get higher sun-hour estimate */
const NORTHERN_STATES = new Set([
  "Adamawa", "Bauchi", "Borno", "Gombe", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT Abuja",
]);

/* ─── Types ──────────────────────────────────────────────────────────────── */
type HomeSize = "Small" | "Medium" | "Large";

interface CalculationResult {
  systemSize:    number;   // kW
  systemCost:    number;   // ₦
  monthlySavings: number;  // ₦
  paybackMonths: number;
  annualSavings: number;   // ₦
}

/* ─── Calculation logic ──────────────────────────────────────────────────── */
function calculate(
  monthlySpend: number,
  homeSize:     HomeSize,
  location:     string,
): CalculationResult {
  const _sunHours      = NORTHERN_STATES.has(location) ? 6.5 : 5.5;
  const systemSizes:   Record<HomeSize, number> = { Small: 1.5, Medium: 3, Large: 5 };
  const systemSize     = systemSizes[homeSize];
  const installCostPerKW = 350_000;
  const systemCost     = systemSize * installCostPerKW;
  const monthlySavings = Math.round(monthlySpend * 0.85);
  const paybackMonths  = Math.ceil(systemCost / (monthlySavings || 1));
  const annualSavings  = monthlySavings * 12;

  return { systemSize, systemCost, monthlySavings, paybackMonths, annualSavings };
}

/* ─── Animation constants ────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0  },
};

const resultsVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0  },
  exit:   { opacity: 0, y: -12 },
};

const resultTransition: Transition = { duration: 0.4, ease: EASE_OUT };

/* ─── Result Card ────────────────────────────────────────────────────────── */
function ResultCard({
  label,
  value,
  sub,
  delay,
}: {
  label: string;
  value: string;
  sub:   string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.35, delay, ease: EASE_OUT }}
      className="
        flex flex-col items-center justify-center text-center
        bg-[#FFF8E7] rounded-xl p-4 gap-1
      "
    >
      <span className="font-syne text-[10px] font-bold uppercase tracking-widest text-slate-secondary">
        {label}
      </span>
      <span className="font-syne font-bold text-navy text-2xl leading-none">
        {value}
      </span>
      <span className="text-[10px] text-slate-secondary leading-snug">
        {sub}
      </span>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function SolarCalculator() {
  const [monthlySpend, setMonthlySpend] = useState<string>("");
  const [homeSize, setHomeSize]         = useState<HomeSize>("Medium");
  const [location, setLocation]         = useState<string>("Lagos");
  const [result, setResult]             = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  function handleCalculate() {
    const spend = parseInt(monthlySpend, 10);
    if (!spend || spend <= 0) return;
    const res = calculate(spend, homeSize, location);
    setResult(res);
    setHasCalculated(true);
  }

  function buildWhatsAppMessage(): string {
    if (!result) return getConsultationLink();
    const base = getConsultationLink();
    // Append system details to the pre-filled message
    const msg = `Hi Nelsolar, I'd like a custom solar quote. Based on the calculator: I need a ${result.systemSize}kW system (est. cost ₦${result.systemCost.toLocaleString("en-NG")}). My monthly spend is ₦${parseInt(monthlySpend).toLocaleString("en-NG")}. Please help me get started.`;
    const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  }

  const homeSizes: HomeSize[] = ["Small", "Medium", "Large"];
  const homeSizeLabels: Record<HomeSize, string> = {
    Small:  "Small (1–2 rooms)",
    Medium: "Medium (3–4 beds)",
    Large:  "Large (5+ / Business)",
  };

  return (
    <section
      id="calculator"
      className="bg-off-white py-20 px-4 lg:px-8"
      aria-label="Solar Savings Calculator"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT } satisfies Transition}
          className="text-center"
        >
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-amber">
            Free Tool
          </p>
          <h2 className="
            mt-2 font-syne font-bold text-navy
            text-3xl lg:text-4xl leading-tight
          ">
            How Much Can You Save With Solar?
          </h2>
          <p className="
            mt-3 text-slate-secondary text-base leading-relaxed
            max-w-xl mx-auto
          ">
            Enter your details below and we&rsquo;ll estimate your ideal solar
            system size and monthly savings in Naira.
          </p>
        </motion.div>

        {/* ── Two-column calculator ────────────────────────────────────── */}
        <div className="
          mt-12 max-w-4xl mx-auto
          grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-0
          bg-white rounded-2xl shadow-md overflow-hidden
        ">
          {/* ── LEFT: Inputs ───────────────────────────────────────────── */}
          <div className="p-6 sm:p-8">
            <h3 className="font-syne font-bold text-navy text-xl mb-6">
              Tell Us About Your Energy Needs
            </h3>

            {/* Monthly Spend */}
            <div className="mb-5">
              <label
                htmlFor="monthly-spend"
                className="block text-sm font-semibold text-slate-body mb-1.5"
              >
                Monthly Electricity / Generator Spend (₦)
              </label>
              <div className="relative">
                <Banknote
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-secondary"
                  aria-hidden="true"
                />
                <input
                  id="monthly-spend"
                  type="number"
                  min={0}
                  placeholder="e.g. 50000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(e.target.value)}
                  className="
                    w-full pl-9 pr-4 py-3
                    border border-gray-200 rounded-xl
                    text-sm text-slate-body
                    placeholder:text-slate-secondary/60
                    focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber
                    transition-all duration-200
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />
              </div>
            </div>

            {/* Home Size */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-slate-body mb-2">
                Home or Business Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {homeSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setHomeSize(size)}
                    aria-pressed={homeSize === size}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-syne font-semibold
                      border transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber
                      ${homeSize === size
                        ? "bg-amber text-navy border-amber shadow-sm"
                        : "bg-white text-navy border-gray-200 hover:border-amber hover:bg-amber/5"
                      }
                    `}
                  >
                    {homeSizeLabels[size]}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-body mb-1.5"
              >
                Your State
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-secondary pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="
                    w-full pl-9 pr-4 py-3
                    border border-gray-200 rounded-xl
                    text-sm text-slate-body bg-white
                    focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber
                    transition-all duration-200
                    appearance-none cursor-pointer
                  "
                >
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-secondary"
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Calculate button */}
            <button
              onClick={handleCalculate}
              disabled={!monthlySpend || parseInt(monthlySpend) <= 0}
              className="
                w-full py-4 rounded-xl
                bg-amber text-navy
                font-syne font-bold text-base
                hover:brightness-105 hover:scale-[1.01]
                active:scale-[0.99]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                transition-all duration-200
                shadow-amber/40 shadow-md
              "
            >
              Calculate My Solar Savings ⚡
            </button>
          </div>

          {/* ── Amber divider — desktop only ───────────────────────────── */}
          <div
            aria-hidden="true"
            className="hidden lg:block bg-amber/20 w-px self-stretch my-8"
          />

          {/* ── RIGHT: Results ─────────────────────────────────────────── */}
          <div className="
            p-6 sm:p-8 flex flex-col
            border-t border-gray-100 lg:border-t-0
          ">
            <AnimatePresence mode="wait">
              {!hasCalculated ? (
                /* Default idle state */
                <motion.div
                  key="idle"
                  variants={resultsVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={resultTransition}
                  className="flex flex-col items-center justify-center flex-1 gap-4 py-8"
                >
                  {/* Pulsing amber ring around sun */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.1, 0.35] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      className="absolute w-28 h-28 rounded-full bg-amber/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.3 }}
                      className="absolute w-20 h-20 rounded-full bg-amber/25"
                    />
                    <Sun size={64} color="#F59E0B" strokeWidth={1.2} aria-hidden="true" />
                  </div>
                  <p className="text-slate-secondary text-sm text-center max-w-[200px] leading-relaxed">
                    Your results will appear here after you calculate
                  </p>
                </motion.div>
              ) : (
                /* Calculation results */
                <motion.div
                  key="results"
                  variants={resultsVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={resultTransition}
                  className="flex flex-col gap-4 flex-1"
                >
                  <h3 className="font-syne font-bold text-navy text-lg">
                    Your Solar Estimate
                  </h3>

                  {/* 2×2 result cards */}
                  {result && (
                    <div className="grid grid-cols-2 gap-3">
                      <ResultCard
                        label="Recommended System"
                        value={`${result.systemSize} kW`}
                        sub="Solar system size"
                        delay={0.05}
                      />
                      <ResultCard
                        label="Estimated Cost"
                        value={`₦${result.systemCost.toLocaleString("en-NG")}`}
                        sub="One-time installation"
                        delay={0.12}
                      />
                      <ResultCard
                        label="Monthly Savings"
                        value={`₦${result.monthlySavings.toLocaleString("en-NG")}`}
                        sub="Every month saved"
                        delay={0.19}
                      />
                      <ResultCard
                        label="Payback Period"
                        value={`${result.paybackMonths} months`}
                        sub="To recover investment"
                        delay={0.26}
                      />
                    </div>
                  )}

                  {/* WhatsApp CTA */}
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-1 w-full
                      flex items-center justify-center gap-2
                      bg-amber text-navy
                      font-syne font-bold text-sm
                      rounded-xl py-3.5
                      hover:brightness-105 hover:scale-[1.02]
                      active:scale-[0.98]
                      transition-all duration-200
                      shadow-amber/40 shadow-md
                    "
                  >
                    <MessageCircle size={16} strokeWidth={2.5} />
                    Get My Custom Quote on WhatsApp
                  </a>

                  {/* Disclaimer */}
                  <p className="text-slate-secondary text-xs leading-relaxed text-center">
                    * Estimates are indicative. A free consultation will give you
                    an accurate quote for your specific needs.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

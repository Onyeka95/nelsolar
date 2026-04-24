/* PartnersSection — pure CSS marquee, no Framer Motion needed */

const partners = [
  "Luminous",
  "Felicity Solar",
  "Victron Energy",
  "Canadian Solar",
  "Schneider Electric",
  "Trojan Battery",
  "Phocos",
  "SunKing",
];

/* ─── Partner Wordmark ───────────────────────────────────────────────────── */
function PartnerLogo({ name }: { name: string }) {
  return (
    <div
      className="
        group relative shrink-0
        font-syne font-bold text-xl
        text-navy/40 hover:text-navy
        transition-colors duration-300
        cursor-pointer
        pb-1
      "
    >
      {name}
      {/* Amber underline on hover */}
      <span className="
        absolute bottom-0 left-0 h-[2px] w-0 bg-amber rounded-full
        transition-all duration-300 group-hover:w-full
      " />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="bg-off-white py-14 px-4 lg:px-8"
      aria-label="Brands We Work With"
    >
      {/* Keyframe definition */}
      <style>{`
        @keyframes partners-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-track {
          animation: partners-marquee 20s linear infinite;
        }
        .partners-wrapper:hover .partners-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <p className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-slate-secondary">
            Trusted Brands
          </p>
          <h2 className="mt-2 font-syne font-bold text-navy text-2xl leading-tight">
            Brands We Work With
          </h2>
        </div>

        {/* ── Marquee wrapper ──────────────────────────────────────────── */}
        <div
          className="partners-wrapper overflow-hidden"
          aria-label="Scrolling list of partner brands"
        >
          {/* Track — duplicated for seamless loop */}
          <div className="partners-track flex items-center gap-16 w-max">
            {/* First copy */}
            {partners.map((name) => (
              <PartnerLogo key={`a-${name}`} name={name} />
            ))}
            {/* Second copy — creates the seamless loop */}
            {partners.map((name) => (
              <PartnerLogo key={`b-${name}`} name={name} aria-hidden />
            ))}
          </div>
        </div>

        {/* Edge fades — mask the left/right scroll edges */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-y-0 left-0 w-24
            bg-gradient-to-r from-off-white to-transparent
          "
        />
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-y-0 right-0 w-24
            bg-gradient-to-l from-off-white to-transparent
          "
        />
      </div>
    </section>
  );
}

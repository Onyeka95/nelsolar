export type GalleryCategory =
  | "residential"
  | "commercial"
  | "off-grid"
  | "street-lights"
  | "batteries"
  | "panels";

export interface GalleryItem {
  id:            string;
  title:         string;
  description:   string;
  category:      GalleryCategory;
  location:      string;
  image:         string;
  systemSize:    string;
  completedDate: string;
  featured:      boolean;
}

export interface GalleryCategoryItem {
  id:    GalleryCategory | "all";
  label: string;
  emoji: string;
}

/* ─── Gallery Items ──────────────────────────────────────────────────────── */
export const galleryItems: GalleryItem[] = [

  // ── Residential ────────────────────────────────────────────────────────────
  {
    id:            "res-001",
    title:         "5kVA Off-Grid System, Enugu",
    description:   "This residential property in Independence Layout, Enugu had no stable grid power for over 3 years. Nelsolar installed a complete 5kVA off-grid solar system with a 400Ah LiFePO4 battery bank and 2,000W of Canadian Solar panels. The family now enjoys 24/7 uninterrupted power with zero electricity bills.",
    category:      "residential",
    location:      "Independence Layout, Enugu",
    image:         "/images/solarone.jpg",
    systemSize:    "5kVA",
    completedDate: "January 2025",
    featured:      true,
  },
  {
    id:            "res-002",
    title:         "3kVA Hybrid System, Lekki Lagos",
    description:   "A 4-bedroom detached home in Lekki Phase 1 was spending over ₦80,000 monthly on generator fuel. Nelsolar designed and installed a 3kVA hybrid solar system with 200Ah LiFePO4 batteries and 1,200W of panels. Monthly energy costs dropped to near zero within the first billing cycle.",
    category:      "residential",
    location:      "Lekki Phase 1, Lagos",
    image:         "/images/lekkihybrid.jpg",
    systemSize:    "3kVA",
    completedDate: "February 2025",
    featured:      true,
  },
  {
    id:            "res-003",
    title:         "1.5kVA Apartment System, Abuja",
    description:   "A compact 1.5kVA solar system installed for a 2-bedroom apartment in Gwarinpa Estate, Abuja. The system powers lights, fans, a 32-inch TV, a refrigerator and all phone charging throughout the day and night. Installation was completed in under 6 hours with zero disruption.",
    category:      "residential",
    location:      "Gwarinpa Estate, Abuja",
    image:         "/images/apartment_abuja.jpg",
    systemSize:    "1.5kVA",
    completedDate: "March 2025",
    featured:      false,
  },

  // ── Commercial ─────────────────────────────────────────────────────────────
  {
    id:            "com-001",
    title:         "10kVA Office Complex, Victoria Island",
    description:   "A 4-storey office complex on Victoria Island, Lagos needed a reliable backup that could handle server rooms, air conditioning and full office operations. Nelsolar deployed a 10kVA hybrid solar system with a 600Ah lithium battery bank and 4,000W of panels on the rooftop. The system now covers 90% of the building's daily energy consumption.",
    category:      "commercial",
    location:      "Victoria Island, Lagos",
    image:         "/images/officecomplex_vi.jpg",
    systemSize:    "10kVA",
    completedDate: "November 2024",
    featured:      true,
  },
  {
    id:            "com-002",
    title:         "5kVA Salon & Boutique, Port Harcourt",
    description:   "A beauty salon and boutique in D/Line, Port Harcourt was losing significant revenue due to daily power outages disrupting customer appointments. Nelsolar installed a 5kVA solar system with a 300Ah battery bank. The business now operates uninterrupted from 8am to 10pm, saving the owner over ₦45,000 monthly in generator costs.",
    category:      "commercial",
    location:      "D/Line, Port Harcourt",
    image:         "/images/portharcout_boutique.jpg",
    systemSize:    "5kVA",
    completedDate: "December 2024",
    featured:      false,
  },
  {
    id:            "com-003",
    title:         "3kVA Pharmacy Solar Backup, Ibadan",
    description:   "A busy pharmacy in Bodija Market, Ibadan required reliable power to preserve temperature-sensitive medicines and keep point-of-sale systems running. Nelsolar installed a 3kVA solar system with a 200Ah LiFePO4 battery. The pharmacy has not experienced a single power-related drug loss since installation.",
    category:      "commercial",
    location:      "Bodija Market, Ibadan",
    image:         "/images/pharmacy_ibadan.jpg",
    systemSize:    "3kVA",
    completedDate: "January 2025",
    featured:      false,
  },

  // ── Off-Grid ───────────────────────────────────────────────────────────────
  {
    id:            "off-001",
    title:         "8kVA Off-Grid Farm System, Ogun",
    description:   "A poultry farm in Sagamu, Ogun State needed reliable off-grid power to run water pumps, ventilation fans and incubators 24/7. Nelsolar designed an 8kVA off-grid system with a 600Ah LiFePO4 battery bank and 3,200W of solar panels. The farm has been fully grid-independent since installation, reducing operating costs by ₦120,000 per month.",
    category:      "off-grid",
    location:      "Sagamu, Ogun State",
    image:         "/images/gridfarm_ogun.jpg",
    systemSize:    "8kVA",
    completedDate: "October 2024",
    featured:      true,
  },
  {
    id:            "off-002",
    title:         "5kVA Off-Grid School System, Kogi",
    description:   "A primary school in Lokoja, Kogi State had never had access to reliable electricity, making computer education impossible. Nelsolar installed a 5kVA off-grid solar system powering a computer lab with 20 PCs, lights and a projector. Students now have access to digital education for the first time.",
    category:      "off-grid",
    location:      "Lokoja, Kogi State",
    image:         "/images/gridschool_kogi.jpg",
    systemSize:    "5kVA",
    completedDate: "September 2024",
    featured:      false,
  },
  {
    id:            "off-003",
    title:         "3kVA Rural Home, Benue",
    description:   "A remote farmstead in Makurdi, Benue State — over 12km from the nearest grid connection — received a complete 3kVA off-grid solar system from Nelsolar. The system includes a 200Ah lithium battery, 1,200W of panels and a solar water pump. Four family members now have reliable lighting, mobile charging and refrigeration.",
    category:      "off-grid",
    location:      "Makurdi, Benue State",
    image:         "/images/ruralhome_benue.jpg",
    systemSize:    "3kVA",
    completedDate: "August 2024",
    featured:      false,
  },

  // ── Street Lights ──────────────────────────────────────────────────────────
  {
    id:            "str-001",
    title:         "12 Solar Street Lights, Kano",
    description:   "Supplied and installed 12 units of 60W solar street lights for a housing estate in Nassarawa GRA, Kano. The estate had been in complete darkness for over 2 years, causing security concerns for residents. Installation was completed in 2 days and all 12 lights have been fully operational with automatic dusk-to-dawn control ever since.",
    category:      "street-lights",
    location:      "Nassarawa GRA, Kano",
    image:         "/images/kano_light.jpeg",
    systemSize:    "12 × 60W",
    completedDate: "December 2024",
    featured:      true,
  },
  {
    id:            "str-002",
    title:         "Community Road Lighting, Anambra",
    description:   "A 1.2km community road in Awka, Anambra State received 20 units of 80W solar street lights installed by Nelsolar. The road was previously a known crime hotspot due to total darkness at night. Since installation, the community has reported a significant improvement in safety and evening economic activity.",
    category:      "street-lights",
    location:      "Awka, Anambra State",
    image:         "/images/anambra_light.jpeg",
    systemSize:    "20 × 80W",
    completedDate: "November 2024",
    featured:      false,
  },
  {
    id:            "str-003",
    title:         "Hospital Compound Lighting, Kaduna",
    description:   "Nelsolar installed 8 units of 100W solar security floodlights across the grounds of a private hospital in Kaduna South. The hospital required bright, reliable outdoor lighting for patient drop-offs and staff safety during night shifts. The motion-activated lights activate instantly and have required zero maintenance since installation.",
    category:      "street-lights",
    location:      "Kaduna South, Kaduna",
    image:         "/images/kaduna_light.jpeg",
    systemSize:    "8 × 100W",
    completedDate: "October 2024",
    featured:      false,
  },

  // ── Batteries ──────────────────────────────────────────────────────────────
  {
    id:            "bat-001",
    title:         "600Ah LiFePO4 Battery Bank, Abuja",
    description:   "A large 600Ah LiFePO4 battery bank installation for a telecommunications company's base station in Wuse 2, Abuja. The telecom site required zero-downtime backup power to maintain network coverage. The Nelsolar battery bank replaced aging lead-acid units and extended runtime from 4 hours to over 18 hours per charge cycle.",
    category:      "batteries",
    location:      "Wuse 2, Abuja",
    image:         "/images/sixsolar_setup.jpg",
    systemSize:    "600Ah",
    completedDate: "January 2025",
    featured:      false,
  },
  {
    id:            "bat-002",
    title:         "200Ah Lithium Upgrade, Surulere Lagos",
    description:   "A homeowner in Surulere, Lagos upgraded from ageing 200Ah tubular batteries to a high-performance 200Ah LiFePO4 battery bank installed by Nelsolar. The new batteries charge three times faster and deliver consistent power output until fully depleted. The customer reported an immediate improvement in overnight power availability.",
    category:      "batteries",
    location:      "Surulere, Lagos",
    image:         "/images/solar_setup.jpg",
    systemSize:    "200Ah",
    completedDate: "February 2025",
    featured:      false,
  },
  {
    id:            "bat-003",
    title:         "400Ah Battery Bank, Cold Room Enugu",
    description:   "A cold storage facility in Emene Industrial Layout, Enugu required a robust battery bank to maintain compressor operation during grid outages. Nelsolar installed a 400Ah LiFePO4 battery bank integrated with the facility's existing 5kVA inverter. Product spoilage due to power cuts has been eliminated entirely since installation.",
    category:      "batteries",
    location:      "Emene Industrial Layout, Enugu",
    image:         "/images/solar_assembly.jpg",
    systemSize:    "400Ah",
    completedDate: "March 2025",
    featured:      false,
  },

  // ── Panels ─────────────────────────────────────────────────────────────────
  {
    id:            "pan-001",
    title:         "2,400W Rooftop Array, Ikoyi Lagos",
    description:   "A premium 2,400W rooftop panel array installed on a duplex in Ikoyi, Lagos. Nelsolar mounted six 400W half-cut Canadian Solar panels in a south-facing orientation for maximum daily yield. The array generates an average of 12kWh per day, covering the entire household's energy consumption including two split air conditioners.",
    category:      "panels",
    location:      "Ikoyi, Lagos",
    image:         "/images/ikoyi_rooftop.jpeg",
    systemSize:    "2,400W",
    completedDate: "February 2025",
    featured:      true,
  },
  {
    id:            "pan-002",
    title:         "1,200W Panel Installation, Jos",
    description:   "A 1,200W solar panel installation for a 3-bedroom home in Jos, Plateau State. Nelsolar selected high-efficiency 400W monocrystalline panels optimised for Jos's exceptionally high solar irradiance. The panels were installed on a flat concrete roof using adjustable aluminium mounting rails angled for peak performance year-round.",
    category:      "panels",
    location:      "Jos, Plateau State",
    image:         "/images/jos_panel.jpg",
    systemSize:    "1,200W",
    completedDate: "January 2025",
    featured:      false,
  },
  {
    id:            "pan-003",
    title:         "800W Ground-Mount Array, Sokoto",
    description:   "Nelsolar designed and installed an 800W ground-mounted solar array for a rural health clinic in Sokoto State — one of Nigeria's sunniest regions. The ground-mount structure was fabricated locally from galvanised steel and allows seasonal angle adjustment for optimal output. The clinic now powers essential medical equipment reliably throughout the year.",
    category:      "panels",
    location:      "Sokoto State",
    image:         "/images/sokoto_goundmount.jpeg",
    systemSize:    "800W",
    completedDate: "December 2024",
    featured:      false,
  },
];

/* ─── Gallery Categories ─────────────────────────────────────────────────── */
export const galleryCategories: GalleryCategoryItem[] = [
  { id: "all",           label: "All Projects",    emoji: "🏆" },
  { id: "residential",   label: "Residential",     emoji: "🏠" },
  { id: "commercial",    label: "Commercial",      emoji: "🏢" },
  { id: "off-grid",      label: "Off-Grid Systems",emoji: "🔋" },
  { id: "street-lights", label: "Street Lights",   emoji: "💡" },
  { id: "batteries",     label: "Battery Banks",   emoji: "⚡" },
  { id: "panels",        label: "Solar Panels",    emoji: "☀️" },
];

export type Category =
  | "panels"
  | "batteries"
  | "lights"
  | "generators"
  | "inverters"
  | "charge-controllers";

export type StockBadge = "In Stock" | "Limited";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  description: string;
  specs: [string, string] | [string, string, string];
  badge: StockBadge;
  image: string;
}

export interface CategoryItem {
  id: Category | "all";
  label: string;
  icon: string;
}

export const products: Product[] = [
  // ─── Solar Panels ────────────────────────────────────────────────────────────
  {
    id: "panel-100w-mono",
    name: "100W Monocrystalline Solar Panel",
    slug: "100w-monocrystalline-solar-panel",
    category: "panels",
    price: 45_000,
    description:
      "A high-efficiency 100W monocrystalline panel ideal for small homes and apartments. Built with premium silicon cells for maximum output even on cloudy days. Comes with a 25-year performance warranty.",
    specs: ["100W", "Monocrystalline", "25yr Warranty"],
    badge: "In Stock",
    image: "/images/rooftop_ikoyi.jpg",
  },
  {
    id: "panel-200w-mono",
    name: "200W Monocrystalline Solar Panel",
    slug: "200w-monocrystalline-solar-panel",
    category: "panels",
    price: 85_000,
    description:
      "Our best-selling 200W panel delivers reliable power for medium-sized homes across Nigeria. Monocrystalline technology ensures top-tier efficiency in Nigeria's high-sun climate. Certified by IEC and ISO standards.",
    specs: ["200W", "Monocrystalline", "25yr Warranty"],
    badge: "In Stock",
    image: "/images/panel-200w.jpeg",
  },
  {
    id: "panel-400w-half-cut",
    name: "400W Half-Cut Solar Panel",
    slug: "400w-half-cut-solar-panel",
    category: "panels",
    price: 160_000,
    description:
      "Premium 400W half-cut cell panel engineered for maximum performance in Nigeria's tropical heat. Half-cut technology reduces resistive losses and improves shade tolerance significantly. Perfect for offices, businesses, and large residential systems.",
    specs: ["400W", "Half-Cut Cell", "25yr Warranty"],
    badge: "In Stock",
    image: "/images/panel-400w.jpeg",
  },

  // ─── Solar Batteries ─────────────────────────────────────────────────────────
  {
    id: "battery-100ah-lifepo4",
    name: "5KWH Lithium Ion Battery || 100AH",
    slug: "100ah-lithium-battery",
    category: "batteries",
    price: 180_000,
    description:
      "The gold standard in solar storage — this 100Ah Lithium ion battery offers over 3,000 charge cycles and a 10-year lifespan. Lightweight, maintenance-free, and safe with no risk of thermal runaway. Ideal for daily cycling in Nigerian off-grid systems.",
    specs: ["100Ah", "Lithium", "3000+ Cycles"],
    badge: "In Stock",
    image: "/images/battery-lifepo4-100ah.jpeg",
  },
  {
    id: "battery-200ah-gel",
    name: "10kWH LVTOPSUN Lithium Ion Battery",
    slug: "200ah-gel-deep-cycle-battery",
    category: "batteries",
    price: 120_000,
    description:
      "A robust 10kwh lithium ion deep cycle battery built for daily discharge in Nigerian solar setups. Sealed, spill-proof design means zero maintenance and safe indoor installation. Compatible with all standard solar inverters and charge controllers.",
    specs: ["10Kwh", "Gel Deep Cycle", "Sealed"],
    badge: "In Stock",
    image: "/images/10kwh-lithium-battery.jpeg",
  },
  {
    id: "battery-150ah-agm",
    name: "150Ah AGM Battery",
    slug: "150ah-agm-battery",
    category: "batteries",
    price: 75_000,
    description:
      "Affordable and reliable 150Ah AGM battery, a popular choice for first-time solar buyers in Nigeria. Absorbent Glass Mat technology delivers stable power output and handles deep discharges well. No water topping required — fully sealed and maintenance-free.",
    specs: ["150Ah", "AGM", "Maintenance-Free"],
    badge: "In Stock",
    image: "/images/battery-agm.jpeg",
  },

  // ─── Solar Lights ─────────────────────────────────────────────────────────────
  {
    id: "light-street-60w",
    name: "Solar Street Light 60W",
    slug: "solar-street-light-60w",
    category: "lights",
    price: 35_000,
    description:
      "A powerful 60W all-in-one solar street light suitable for roads, estates, car parks, and compounds in Nigeria. Automatically turns on at dusk and off at dawn with a built-in PIR motion sensor. Durable IP65-rated housing withstands Nigeria's rainy season.",
    specs: ["60W", "PIR Motion Sensor", "IP65 Rated"],
    badge: "In Stock",
    image: "/images/street-light.jpeg",
  },
  {
    id: "light-garden-pack4",
    name: "Solar Garden Light (Pack of 4)",
    slug: "solar-garden-light-pack-of-4",
    category: "lights",
    price: 18_000,
    description:
      "Beautify and secure your garden, driveway, or pathway with this pack of 4 solar garden lights. No wiring needed — simply stake into the ground and let the sun do the rest. Automatic dusk-to-dawn operation with warm LED glow.",
    specs: ["Pack of 4", "Auto Dusk-to-Dawn", "Stake Mount"],
    badge: "In Stock",
    image: "/images/garden-light.jpeg",
  },
  {
    id: "light-floodlight-100w",
    name: "Solar Security Floodlight 100W",
    slug: "solar-security-floodlight-100w",
    category: "lights",
    price: 28_000,
    description:
      "High-output 100W solar security floodlight for warehouses, gates, filling stations, and business premises. Motion-activated with a 120-degree wide detection angle for comprehensive coverage. Heavy-duty aluminium housing stands up to Nigerian weather year-round.",
    specs: ["100W", "Motion Activated", "120° Detection"],
    badge: "Limited",
    image: "/images/floodlight.jpeg",
  },

  // ─── Solar Generators ─────────────────────────────────────────────────────────
  {
    id: "generator-1kva-kit",
    name: "1kVA Solar Generator Kit",
    slug: "1kva-solar-generator-kit",
    category: "generators",
    price: 350_000,
    description:
      "A complete plug-and-play 1kVA solar generator kit — panels, battery, inverter, and charge controller included. Powers fans, lights, TVs, and phone charging for small 1–2 bedroom apartments. Eliminate generator fuel costs and enjoy clean, silent power.",
    specs: ["1kVA", "Complete Kit", "Off-Grid Ready"],
    badge: "In Stock",
    image: "/images/generator-1kva.jpeg",
  },
  {
    id: "generator-3kva-system",
    name: "3kVA Solar Generator System",
    slug: "3kva-solar-generator-system",
    category: "generators",
    price: 750_000,
    description:
      "A full 3kVA off-grid solar system designed for 3-bedroom Nigerian homes. Runs air conditioners, refrigerators, washing machines, and all essential appliances without NEPA or generator fuel. Engineered for 24/7 power independence.",
    specs: ["3kVA", "Full System", "AC Compatible"],
    badge: "In Stock",
    image: "/images/gen2.jpeg",
  },
  {
    id: "generator-5kva-offgrid",
    name: "5kVA Off-Grid Solar System",
    slug: "5kva-off-grid-solar-system",
    category: "generators",
    price: 1_200_000,
    description:
      "Our flagship 5kVA off-grid system for large homes, offices, schools, and SMEs across Nigeria. Supports heavy loads including multiple ACs, industrial equipment, and commercial refrigeration. Fully expandable — add more panels or batteries as your needs grow.",
    specs: ["5kVA", "Off-Grid", "Expandable"],
    badge: "Limited",
    image: "/images/system-5kva.jpeg",
  },

  // ─── Inverters ────────────────────────────────────────────────────────────────
  {
    id: "inverter-1-5kva-pure-sine",
    name: "1.5kVA Pure Sine Wave Inverter",
    slug: "1-5kva-pure-sine-wave-inverter",
    category: "inverters",
    price: 65_000,
    description:
      "A compact 1.5kVA pure sine wave inverter that produces clean, stable power safe for all sensitive electronics. Features overload protection, low battery shutdown, and a clear LCD display for system monitoring. Ideal for homes upgrading from a basic setup.",
    specs: ["1.5kVA", "Pure Sine Wave", "LCD Display"],
    badge: "In Stock",
    image: "/images/products/inverter-1-5kva.jpg",
  },
  {
    id: "inverter-3-5kva-solar",
    name: "3.5kVA Solar Inverter",
    slug: "3-5kva-solar-inverter",
    category: "inverters",
    price: 130_000,
    description:
      "A high-capacity 3.5kVA solar hybrid inverter with a built-in MPPT charge controller for seamless panel integration. Automatically switches between solar, battery, and NEPA grid without interruption. Handles multiple large appliances simultaneously for full-home coverage.",
    specs: ["3.5kVA", "Hybrid", "Built-in MPPT"],
    badge: "In Stock",
    image: "/images/inverter-3-5kva.jpeg",
  },

  // ─── Charge Controllers ───────────────────────────────────────────────────────
  {
    id: "controller-30a-mppt",
    name: "30A MPPT Charge Controller",
    slug: "30a-mppt-charge-controller",
    category: "charge-controllers",
    price: 22_000,
    description:
      "A smart 30A MPPT charge controller that maximises solar harvest by up to 30% compared to PWM controllers. Compatible with 12V and 24V battery banks and supports multiple battery types including lithium, gel, and AGM. LCD screen provides real-time charge status and system data.",
    specs: ["30A", "MPPT", "12V / 24V"],
    badge: "In Stock",
    image: "/images/products/controller-30a-mppt.jpg",
  },
  {
    id: "controller-60a-mppt",
    name: "60A MPPT Charge Controller",
    slug: "60a-mppt-charge-controller",
    category: "charge-controllers",
    price: 45_000,
    description:
      "Professional-grade 60A MPPT charge controller for larger solar systems up to 48V. Handles high-wattage panel arrays and charges batteries with precision and efficiency. Built-in Bluetooth allows wireless monitoring via mobile app for remote system management.",
    specs: ["60A", "MPPT", "Bluetooth App"],
    badge: "Limited",
    image: "/images/products/controller-60a-mppt.jpg",
  },
];

export const categories: CategoryItem[] = [
  { id: "all", label: "All Products", icon: "⚡" },
  { id: "panels", label: "Solar Panels", icon: "☀️" },
  { id: "batteries", label: "Solar Batteries", icon: "🔋" },
  { id: "lights", label: "Solar Lights", icon: "💡" },
  { id: "generators", label: "Solar Generators", icon: "⚙️" },
  { id: "inverters", label: "Inverters", icon: "🔌" },
  { id: "charge-controllers", label: "Charge Controllers", icon: "📡" },
];

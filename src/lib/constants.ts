export type LocaleCode = "ID" | "EN" | "GLOBAL";

export const COMPANY = {
  name: "NOURI Global Foods",
  legalName: "PT Nouri Archipelago Food & Ingredients Tbk",
  tagline: "From Volcanic Soil to the World's Table.",
  subheadline:
    "Integrating regenerative equatorial agriculture, precision food science, and beloved consumer brands across 48 global markets.",
  founded: 1984,
  headquarters: "Jakarta • Singapore • Zurich",
  annualCapacityMT: 285000,
  exportCountriesCount: 48,
  partnerFarmersCount: 18400,
  rdPatentsCount: 142,
};

export interface NavCategoryItem {
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  metric?: string;
  previewImage?: string;
  accentColor?: string;
}

export interface MegaMenuGroup {
  id: string;
  label: Record<LocaleCode, string>;
  audienceTag: string;
  href: string;
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
  };
  items: NavCategoryItem[];
}

export const MEGA_MENU_GROUPS: MegaMenuGroup[] = [
  {
    id: "company",
    label: { ID: "Perusahaan", EN: "Our Company", GLOBAL: "Enterprise" },
    audienceTag: "Corporate & Governance",
    href: "/solutions",
    featured: {
      eyebrow: "42 Years of Culinary Stewardship",
      title: "Bio-Industrial Precision Meets Equatorial Heritage",
      description:
        "Twelve zero-contamination smart plants across Indonesia, Singapore, and the Netherlands processing 285,000+ MT annually.",
      metricLabel: "Global Quality Index",
      metricValue: "99.94% Batch Compliance",
      image: "/images/hero-culinary.png",
      ctaLabel: "Explore Global Facilities",
      ctaHref: "/solutions#facilities",
    },
    items: [
      {
        title: "Heritage & Philosophy",
        subtitle: "Four decades bridging smallholder agroforestry with modern gastronomy",
        href: "/solutions#heritage",
        metric: "Est. 1984",
      },
      {
        title: "Executive Leadership & Board",
        subtitle: "Food scientists, supply-chain veterans, and ESG governance council",
        href: "/newsroom#governance",
        metric: "NYSE / IDX Dual Audit",
      },
      {
        title: "Smart Manufacturing Plants",
        subtitle: "IoT-automated aseptic, spray-dry, and cryogenic extraction hubs",
        href: "/solutions#facilities",
        badge: "12 Plants",
      },
      {
        title: "Global Quality & Food Safety",
        subtitle: "FSSC 22000 v6, ISO 9001, Halal Assurance, and EU Organic compliance",
        href: "#authority-vault",
        badge: "Zero Recall",
      },
    ],
  },
  {
    id: "brands",
    label: { ID: "Portofolio Brand", EN: "Brand Portfolio", GLOBAL: "Consumer FMCG" },
    audienceTag: "Consumer Brands (FMCG)",
    href: "/brands",
    featured: {
      eyebrow: "No. 1 Craft Botanical & Dairy Alternative in APAC",
      title: "Crafted for Modern Palates, Backed by Clinical Nutrition",
      description:
        "Hover over each brand to preview formulation profiles, sensory notes, and retail velocity across 62,000+ points of sale.",
      metricLabel: "Retail Distribution",
      metricValue: "62,000+ Stores",
      image: "/images/brand-oat-dairy.png",
      ctaLabel: "View Full Brand Portfolio",
      ctaHref: "/brands",
    },
    items: [
      {
        title: "VELVETA™ Oat & Botanical Creamery",
        subtitle: "Barista-grade fermented oat milk, cultured plant yogurts & cold-brew elixirs",
        href: "/brands?brand=velveta-oat",
        badge: "Bestseller",
        previewImage: "/images/brand-oat-dairy.png",
        accentColor: "oklch(64.8% 0.165 48)",
      },
      {
        title: "KAKAO KULTURA™ Single-Estate Reserve",
        subtitle: "Fine-flavor Trinitario couverture, ceremonial cacao & functional dark bars",
        href: "/brands?brand=kakao-kultura",
        badge: "Single-Origin",
        previewImage: "/images/brand-cacao-reserve.png",
        accentColor: "oklch(38% 0.09 42)",
      },
      {
        title: "VERDANTIA™ Living Botanical Tonics",
        subtitle: "Adaptogenic sparkling infusions with cold-pressed Java turmeric & pandan",
        href: "/brands?brand=verdantia-tonics",
        badge: "Functional",
        previewImage: "/images/brand-botanical-tonics.png",
        accentColor: "oklch(32.5% 0.075 152)",
      },
      {
        title: "NUSA SPICE™ Culinary Artisanal Pastes",
        subtitle: "Slow-simmered heritage spice bases, coconut creams & umami reductions",
        href: "/brands?brand=nusa-spice",
        badge: "Culinary",
        previewImage: "/images/sustainability-farm.png",
        accentColor: "oklch(72% 0.14 75)",
      },
    ],
  },
  {
    id: "b2b",
    label: { ID: "Solusi B2B & Industri", EN: "B2B & Industrial", GLOBAL: "B2B Ingredients" },
    audienceTag: "Mitra B2B, OEM & Export",
    href: "/solutions",
    featured: {
      eyebrow: "Barry Callebaut & ofi Standard Supply Partner",
      title: "Custom Formulation, Private Label OEM & Bulk Commodity Supply",
      description:
        "From 1 MT pilot R&D runs to 10,000 MT annual container contracts with real-time COA & blockchain lot documentation.",
      metricLabel: "On-Time In-Full (OTIF)",
      metricValue: "99.3% Global SLA",
      image: "/images/brand-cacao-reserve.png",
      ctaLabel: "Explore B2B Capabilities",
      ctaHref: "/solutions",
    },
    items: [
      {
        title: "Custom Manufacturing (OEM / ODM)",
        subtitle: "Turnkey UHT aseptic beverages, retort pouches, and spray-dried powders",
        href: "/solutions#oem",
        metric: "MOQ from 5,000 L",
      },
      {
        title: "Bulk Specialty Ingredients",
        subtitle: "Deodorized cocoa butter, micro-milled oat flour, coconut cream & oleoresins",
        href: "/solutions#bulk-ingredients",
        metric: "ISO Tank & IBC Tote",
      },
      {
        title: "HoReCa & Culinary Service",
        subtitle: "Barista dairy-free systems, pastry chocolate drops & chef-ready bases",
        href: "/solutions#horeca",
        badge: "4,800+ Cafés & Hotels",
      },
      {
        title: "Global Export & Cold-Chain Logistics",
        subtitle: "Reefer sea-freight (-18°C to +15°C) across Rotterdam, Yokohama, Dubai & LA",
        href: "/solutions#export-logistics",
        metric: "48 Countries",
      },
    ],
  },
  {
    id: "esg",
    label: { ID: "Farm-to-Table & ESG", EN: "Farm-to-Table & ESG", GLOBAL: "Sustainability" },
    audienceTag: "Traceability & Public Impact",
    href: "/sustainability",
    featured: {
      eyebrow: "Radical Transparency • Verified by SGS & SBTi",
      title: "100% Polygon-Mapped Farms from Seed to Retail Shelf",
      description:
        "Every shipping lot carries a cryptographic GPS passport linking soil health, smallholder living-income premiums, and carbon footprint.",
      metricLabel: "Deforestation-Free Verified",
      metricValue: "99.8% EUDR Ready",
      image: "/images/sustainability-farm.png",
      ctaLabel: "Inspect ESG Impact Dashboard",
      ctaHref: "/sustainability",
    },
    items: [
      {
        title: "Seed-to-Shelf Traceability Pipeline",
        subtitle: "Interactive 4-stage telemetry from equatorial farms to cold-chain vessels",
        href: "#traceability-pipeline",
        badge: "Live GPS Lots",
      },
      {
        title: "2026 Sustainability & Net-Zero Report",
        subtitle: "Scope 1, 2 & 3 emissions disclosure, water stewardship & circular packaging",
        href: "#esg-dashboard",
        metric: "-46% CO₂e vs 2019",
      },
      {
        title: "Smallholder Farmer Empowerment",
        subtitle: "18,400+ partner farmers receiving +24% above-market living income premiums",
        href: "/sustainability#farmers",
        metric: "18,400+ Families",
      },
    ],
  },
];

export interface CertificationVaultItem {
  id: string;
  code: string;
  name: string;
  issuer: string;
  regNumber: string;
  scope: string;
  validUntil: string;
  auditScore: string;
  accent: "green" | "amber" | "gold";
}

export const CERTIFICATIONS: CertificationVaultItem[] = [
  {
    id: "fssc-22000",
    code: "FSSC 22000 v6.0",
    name: "Food Safety System Certification",
    issuer: "SGS United Kingdom / GFSI Recognized",
    regNumber: "FSSC-ID-2026-88412",
    scope: "Aseptic UHT Beverage Processing, Botanical Extraction & Cocoa Refining",
    validUntil: "2028-11-30",
    auditScore: "Unannounced Audit: Grade A+",
    accent: "green",
  },
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    name: "Quality Management System",
    issuer: "TÜV Rheinland Cert GmbH",
    regNumber: "QMS-TR-01-100-229481",
    scope: "End-to-End R&D Formulation, B2B Bulk Ingredients & Global Export Supply",
    validUntil: "2028-06-15",
    auditScore: "Zero Non-Conformities",
    accent: "green",
  },
  {
    id: "haccp",
    code: "HACCP Codex",
    name: "Hazard Analysis Critical Control Point",
    issuer: "Lloyd's Register Quality Assurance (LRQA)",
    regNumber: "HACCP-APAC-90418-V4",
    scope: "14 Automated Critical Control Gates with Real-Time Metal & X-Ray Telemetry",
    validUntil: "2027-12-31",
    auditScore: "99.98% CCP Pass Rate",
    accent: "amber",
  },
  {
    id: "halal-global",
    code: "Halal MUI / Global",
    name: "HAS 23000 & JAKIM / GSO Mutual Recognition",
    issuer: "BPJPH & LPPOM MUI Indonesia",
    regNumber: "ID00410000284910925",
    scope: "All 12 Manufacturing Plants, Consumer Brands & Bulk Ingredient Lines",
    validUntil: "2029-03-20",
    auditScore: "Status A (Excellent)",
    accent: "gold",
  },
  {
    id: "bpom-fda",
    code: "BPOM RI & US FDA",
    name: "Low-Acid Canned Food (FCE/SID) & BPOM MD",
    issuer: "BPOM RI & US FDA Registration",
    regNumber: "FDA-FCE-19402 / MD-869031",
    scope: "Export-Ready Retort, Aseptic Liquid & Nutraceutical Powder Lines",
    validUntil: "2028-09-01",
    auditScore: "FSMA 204 Compliant",
    accent: "amber",
  },
];

export type BrandCategory =
  | "All"
  | "Beverages"
  | "Culinary & Dairy"
  | "Functional Foods"
  | "B2B Bulk Ingredients";

export const BRAND_CATEGORIES: BrandCategory[] = [
  "All",
  "Beverages",
  "Culinary & Dairy",
  "Functional Foods",
  "B2B Bulk Ingredients",
];

export interface BrandPortfolioItem {
  id: string;
  name: string;
  category: Exclude<BrandCategory, "All">;
  tagline: string;
  storyExcerpt: string;
  fullStory: string;
  image: string;
  fallbackSvg: string;
  ambientOklch: string;
  cardAccentHex: string;
  badge: string;
  originCoordinates: string;
  originName: string;
  certifications: string[];
  b2bSpecs: {
    moq: string;
    packagingFormat: string;
    shelfLife: string;
    hsCode: string;
    brixOrPurity: string;
    leadTime: string;
  };
  nutritionHighlights: Array<{ label: string; value: string }>;
  skus: string[];
}

export const BRANDS: BrandPortfolioItem[] = [
  {
    id: "velveta-oat",
    name: "VELVETA™ Barista & Creamery",
    category: "Culinary & Dairy",
    tagline: "Enzymatically Crafted Oat & Coconut Dairy Alternatives",
    storyExcerpt:
      "Formulated with beta-glucan rich whole oats and cold-pressed volcanic coconut cream for micro-foam stability at 68°C without splitting.",
    fullStory:
      "Developed across 18 months with World Barista Championship sensory judges in Melbourne and Tokyo. VELVETA uses proprietary dual-enzyme hydrolysis to unlock natural maltose sweetness with zero added cane sugar, paired with high-lauric West Java coconut cream for silky latte art texture.",
    image: "/images/brand-oat-dairy.png",
    fallbackSvg: "/images/brand-placeholder-3.svg",
    ambientOklch: "oklch(91.5% 0.048 75)",
    cardAccentHex: "#C87A3E",
    badge: "No. 1 APAC Café Choice",
    originCoordinates: "07°11'S 107°36'E",
    originName: "Pangajaran Highland & Subang Processing Hub",
    certifications: ["FSSC 22000", "Halal Global", "Barista Guild Approved"],
    b2bSpecs: {
      moq: "1x20' FCL (14,400 x 1L Tetra Brik) or 1,000L Aseptic Tote",
      packagingFormat: "1L Tetra Prisma Aseptic / 200L Bulk Bag-in-Drum",
      shelfLife: "12 Months Ambient (Unopened)",
      hsCode: "2202.99.90",
      brixOrPurity: "11.4° Brix • 1.8% Beta-Glucan Fiber",
      leadTime: "14 Days Ex-Works Jakarta / Surabaya",
    },
    nutritionHighlights: [
      { label: "Added Sugar", value: "0.0g" },
      { label: "Plant Calcium", value: "120mg / 100ml" },
      { label: "Carbon Intensity", value: "0.31 kg CO₂e/L" },
    ],
    skus: [
      "Barista Edition Oat 1L",
      "Roasted Black Sesame Oat Latte",
      "Cultured Coconut Strained Yogurt",
      "Single-Origin Matcha Oat Cold Brew",
    ],
  },
  {
    id: "kakao-kultura",
    name: "KAKAO KULTURA™ Reserve",
    category: "Culinary & Dairy",
    tagline: "Single-Estate Fine Trinitario Couverture & Ceremonial Cacao",
    storyExcerpt:
      "68% to 85% stone-conched couverture chocolate crafted from fermented Bali, Flores, and Ransiki West Papua heirloom cacao beans.",
    fullStory:
      "Direct-traded from 6,200 agroforestry cacao guardians who intercrop cacao with vanilla, shade banana, and nutmeg. Slow-roasted in small European ball-mills and conched for 72 hours to preserve bright red-berry acidity, caramel undertones, and 920mg/100g natural flavanols.",
    image: "/images/brand-cacao-reserve.png",
    fallbackSvg: "/images/brand-placeholder-2.svg",
    ambientOklch: "oklch(89.5% 0.045 45)",
    cardAccentHex: "#8B4A2B",
    badge: "ICA Gold Award 2025",
    originCoordinates: "08°20'S 115°09'E",
    originName: "Jembrana Co-op Bali & Ransiki Highland Papua",
    certifications: ["EU Organic", "Rainforest Alliance", "FSSC 22000", "Halal"],
    b2bSpecs: {
      moq: "500 kg (Culinary Pistoles) / 5 MT (Industrial Liquid Tank)",
      packagingFormat: "2.5kg Chef Pouches / 25kg Kraft Multi-Wall Bags",
      shelfLife: "24 Months at 16–18°C, <60% RH",
      hsCode: "1806.20.00",
      brixOrPurity: "72% Cocoa Solids • 41% Natural Cocoa Butter",
      leadTime: "10 Days Ex-Works",
    },
    nutritionHighlights: [
      { label: "Cocoa Flavanols", value: "920mg / 100g" },
      { label: "Farmer Premium", value: "+28% Above ICE" },
      { label: "Lecithin Source", value: "Non-GMO Sunflower" },
    ],
    skus: [
      "72% Ransiki Dark Couverture Coins",
      "45% Caramelized Coconut Milk Couverture",
      "100% Ceremonial Cacao Liquor Blocks",
      "Alkalized Ruby-Bronze Cocoa Powder (22-24% Fat)",
    ],
  },
  {
    id: "verdantia-tonics",
    name: "VERDANTIA™ Botanical Elixirs",
    category: "Beverages",
    tagline: "Cold-Pressed Adaptogenic Sparkling Tonics & NFC Juices",
    storyExcerpt:
      "Bio-active Indonesian jamu botanicals — white turmeric, wild ginger, calamansi, and pandan leaf — cold-pasteurized via HPP.",
    fullStory:
      "Bridging 800-year-old royal Javanese herbal pharmacopoeia with modern clinical bioavailability. VERDANTIA combines High-Pressure Processing (HPP 6,000 bar) with micro-encapsulated curcuminoids and prebiotic cassava root fiber for clean, crisp functional refreshment.",
    image: "/images/brand-botanical-tonics.png",
    fallbackSvg: "/images/brand-placeholder-1.svg",
    ambientOklch: "oklch(91.0% 0.052 152)",
    cardAccentHex: "#23533A",
    badge: "Prebiotic + Adaptogenic",
    originCoordinates: "07°46'S 110°22'E",
    originName: "Merapi Volcanic Slopes, Central Java",
    certifications: ["FSSC 22000", "USDA Organic", "Halal", "Clean Label Project"],
    b2bSpecs: {
      moq: "1x20' Reefer / Ambient FCL (24,000 Sleek Cans 250ml)",
      packagingFormat: "250ml BPA-NI Aluminum Cans / 275ml Flint Glass",
      shelfLife: "15 Months Ambient",
      hsCode: "2202.10.00",
      brixOrPurity: "6.2° Brix • 5g Prebiotic Fiber / Can",
      leadTime: "18 Days (Private Label OEM Available)",
    },
    nutritionHighlights: [
      { label: "Curcuminoids", value: "85mg Active" },
      { label: "Prebiotic Fiber", value: "5.0g / Serving" },
      { label: "Calories", value: "28 kcal / 250ml" },
    ],
    skus: [
      "Java Turmeric, Yuzu & Black Pepper",
      "Pandan Leaf, Lemongrass & Green Tea",
      "Mangosteen Pericarp & Hibiscus Spritz",
      "Volcanic Ginger & Calamansi Botanical Tonic",
    ],
  },
  {
    id: "nutri-flora",
    name: "NUTRIFLORA™ Bio-Actives",
    category: "Functional Foods",
    tagline: "Clinically Standardized Superfood Powders & Plant Proteins",
    storyExcerpt:
      "Cryo-milled moringa leaf protein, fermented tempeh peptide isolates, and marine red-algae calcium for wellness brands.",
    fullStory:
      "Engineered in our Singapore-Jakarta Bioprocessing Lab using low-temperature flash dehydration (<42°C) to retain 96% native polyphenol and chlorophyll activity. Available both as retail consumer canisters and high-solubility instantized powders for global nutraceutical brands.",
    image: "/images/sustainability-farm.png",
    fallbackSvg: "/images/brand-placeholder-4.svg",
    ambientOklch: "oklch(90.8% 0.048 130)",
    cardAccentHex: "#3C6E47",
    badge: "380+ Clinical Assays",
    originCoordinates: "01°17'N 103°50'E",
    originName: "Biopolis R&D Center & East Java Agro-Park",
    certifications: ["ISO 22000", "GMP Nutraceutical", "Halal", "Kosher Parve"],
    b2bSpecs: {
      moq: "250 kg per SKU (Foil-Lined Fiber Drums)",
      packagingFormat: "20kg Nitrogen-Flushed Aluminum Drum / 300g Retail Tin",
      shelfLife: "24 Months",
      hsCode: "2106.10.00",
      brixOrPurity: "82% Digestible Protein (PDCAAS 0.94)",
      leadTime: "12 Days Air or Sea Freight",
    },
    nutritionHighlights: [
      { label: "Protein Purity", value: "82% Isolate" },
      { label: "Mesh Fineness", value: "200 Micron" },
      { label: "Heavy Metals", value: "<0.05 ppm Prop65" },
    ],
    skus: [
      "Fermented Tempeh Peptide Isolate 82%",
      "Cryo-Micronized Moringa Oleifera Leaf",
      "Water-Soluble Curcumin C3 Complex 95%",
      "Organic Coconut Flower Low-GI Nectar Crystal",
    ],
  },
  {
    id: "archipelago-ingredients",
    name: "ARCHIPELAGO™ B2B Ingredients",
    category: "B2B Bulk Ingredients",
    tagline: "Industrial-Scale Specialty Fats, Oleoresins & Aseptic Purees",
    storyExcerpt:
      "Supplying Tier-1 global CPG manufacturers with RSPO Identity-Preserved lipids, supercritical CO₂ spice extracts, and aseptic tropical purees.",
    fullStory:
      "Our flagship B2B industrial division operates dedicated tank farms in Tanjung Priok, Surabaya, and Rotterdam. Every shipment includes full GC-MS authenticity spectra, pesticide-free screening (550+ residues), and automated SAP/EDI lot synchronization.",
    image: "/images/smart-rnd-facility.png",
    fallbackSvg: "/images/brand-placeholder-2.svg",
    ambientOklch: "oklch(92.0% 0.042 88)",
    cardAccentHex: "#9E7B3B",
    badge: "RSPO IP & EUDR Verified",
    originCoordinates: "06°06'S 106°52'E",
    originName: "Tanjung Priok Integrated Refinery & Rotterdam Hub",
    certifications: ["FSSC 22000", "RSPO Identity Preserved", "ISO 9001", "Halal", "Kosher"],
    b2bSpecs: {
      moq: "1x20' FCL (18 MT) or 24 MT Heated ISO Tank",
      packagingFormat: "200kg Aseptic Steel Drums / 1,000L IBC / 24MT Flexitank",
      shelfLife: "18–24 Months",
      hsCode: "1513.29.00 / 3301.90.00",
      brixOrPurity: "99.9% Purity • Free Fatty Acid <0.08%",
      leadTime: "7–14 Days from Regional Buffer Stock",
    },
    nutritionHighlights: [
      { label: "3-MCPD & GE", value: "<0.5 ppm EU Spec" },
      { label: "Traceability", value: "100% Mill & Plot" },
      { label: "Annual Capacity", value: "190,000 MT" },
    ],
    skus: [
      "Deodorized Prime Pressed Cocoa Butter",
      "Supercritical CO₂ Nutmeg, Clove & Vanilla Oleoresin",
      "Aseptic Alphonso & Harumanis Mango Puree 28° Brix",
      "UHT Aseptic Coconut Cream 24% & 30% Fat",
    ],
  },
  {
    id: "nusa-culinary",
    name: "NUSA SPICE™ Gastronomy",
    category: "Beverages",
    tagline: "Craft Cold-Brew Concentrates & Botanical Syrups for Mixology",
    storyExcerpt:
      "Single-origin Gayo Arabica cold-brew concentrates, smoked palm-nectar reductions, and aromatic pandan-vanilla cordials.",
    fullStory:
      "Created for specialty coffee chains, luxury hotel groups, and RTD beverage formulators. Extracted under nitrogen pressure to lock in volatile aromatics without oxidation, delivering consistent cup profiles across thousands of outlets.",
    image: "/images/hero-culinary.png",
    fallbackSvg: "/images/brand-placeholder-3.svg",
    ambientOklch: "oklch(90.5% 0.044 62)",
    cardAccentHex: "#B5633A",
    badge: "Specialty Coffee Assoc. 87.5+",
    originCoordinates: "04°37'N 096°50'E",
    originName: "Takengon Gayo Highlands, Aceh (1,650 masl)",
    certifications: ["FSSC 22000", "Rainforest Alliance", "Halal MUI", "BPOM RI"],
    b2bSpecs: {
      moq: "500 Cartons (6 x 1L BIB) or 5,000L Aseptic BIB",
      packagingFormat: "1L Barista Bottle / 10L Bag-in-Box Dispense",
      shelfLife: "12 Months Ambient",
      hsCode: "2101.11.10",
      brixOrPurity: "18.5% TDS Cold Extraction Ratio 1:8",
      leadTime: "10 Days Ex-Works",
    },
    nutritionHighlights: [
      { label: "Cupping Score", value: "87.5 SCA" },
      { label: "Dissolved Oxygen", value: "<0.4 ppm (N₂)" },
      { label: "Dilution Yield", value: "80 Cups / 1L" },
    ],
    skus: [
      "Gayo Highland 1:8 Nitrogen Cold Brew Concentrate",
      "Wild Forest Arenga Palm Nectar Syrup",
      "Distilled Pandan & Tahitian Vanilla Bean Cordial",
      "Spiced Cascara & Tamarind Aperitivo Base",
    ],
  },
];

export interface TraceabilityStage {
  step: string;
  phaseCode: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  description: string;
  telemetryBadge: string;
  image: string;
  metrics: Array<{ label: string; value: string; monoCode: string }>;
  verifications: string[];
}

export const TRACEABILITY_PIPELINE: TraceabilityStage[] = [
  {
    step: "01",
    phaseCode: "AGRO-ORIGIN",
    title: "Ethical Sourcing",
    subtitle: "Direct Smallholder Partnerships & Polygon GPS Mapping",
    location: "Aceh, West Java, Bali & Flores Cooperatives",
    coordinates: "04°37'12\"N 096°50'44\"E • ALT 1,420M",
    description:
      "Every harvest sack is scanned at farm-gate via offline-first NFC tags linked to satellite-verified deforestation-free farm polygons. Farmers receive instant digital settlement with a +24% living-income quality premium.",
    telemetryBadge: "LOT #NR-2026-0891 • 100% EUDR POLYGON VERIFIED",
    image: "/images/sustainability-farm.png",
    metrics: [
      { label: "Partner Smallholders", value: "18,400+", monoCode: "AGR-COOP-18K" },
      { label: "Satellite Mapped Land", value: "64,200 Ha", monoCode: "SENTINEL-2-OK" },
      { label: "Farm-Gate Premium", value: "+24.2%", monoCode: "FAIR-PAY-VERIFIED" },
    ],
    verifications: [
      "Polygon GeoJSON Passport",
      "Soil Carbon & Moisture IoT Sensor",
      "Zero Child-Labor & Fair-Wage Audit",
    ],
  },
  {
    step: "02",
    phaseCode: "BIO-INNOVATION",
    title: "R&D & Culinary Innovation",
    subtitle: "Sensory Gastronomy & Clinical Formulation Labs",
    location: "Jakarta Innovation Campus & Singapore Biopolis",
    coordinates: "01°18'04\"N 103°47'28\"E • ISO-17025 LAB",
    description:
      "240+ food scientists, enzymologists, and Michelin-trained research chefs collaborate in ISO 17025 accredited laboratories — profiling 550+ volatile aroma compounds via GC-MS and running pilot UHT/spray-dry trials.",
    telemetryBadge: "GC-MS PURITY 99.94% • 142 ACTIVE PATENTS",
    image: "/images/smart-rnd-facility.png",
    metrics: [
      { label: "Food Scientists & Chefs", value: "240+", monoCode: "RND-TEAM-240" },
      { label: "Proprietary Patents", value: "142", monoCode: "WIPO-PCT-142" },
      { label: "Pilot-to-Scale Speed", value: "14 Days", monoCode: "RAPID-PILOT-V3" },
    ],
    verifications: [
      "ISO/IEC 17025 Accredited Lab",
      "550-Residue LC-MS/MS Screening",
      "Accelerated Shelf-Life Stability Chambers",
    ],
  },
  {
    step: "03",
    phaseCode: "SMART-PLANT",
    title: "Smart Manufacturing",
    subtitle: "Zero-Contamination Automated Processing",
    location: "12 Integrated Plants across Java, Sumatra & Rotterdam",
    coordinates: "06°18'40\"S 107°09'15\"E • FSSC-22000-V6",
    description:
      "Closed-loop CIP (Clean-in-Place) stainless-steel processing lines powered by 78% solar & biomass cogeneration. Positive-pressure HEPA Class 10,000 filling rooms eliminate cross-contamination at 36,000 units/hour.",
    telemetryBadge: "HEPA ISO-7 CLEANROOM • 285,000 MT/YR CAPACITY",
    image: "/images/brand-oat-dairy.png",
    metrics: [
      { label: "Annual Output Capacity", value: "285,000 MT", monoCode: "CAP-285K-MT" },
      { label: "CCP Quality Pass Rate", value: "99.98%", monoCode: "SIX-SIGMA-QA" },
      { label: "Renewable Plant Energy", value: "78.4%", monoCode: "SOLAR-BIO-GEN" },
    ],
    verifications: [
      "Inline X-Ray & Optical Sorting",
      "Automated Digital COA Generation",
      "Allergen-Segregated Dedicated Lines",
    ],
  },
  {
    step: "04",
    phaseCode: "GLOBAL-COLDCHAIN",
    title: "Cold-Chain & Global Distribution",
    subtitle: "IoT-Monitored Sea & Air Logistics to 48 Countries",
    location: "Jakarta • Singapore • Rotterdam • Yokohama • Dubai • Los Angeles",
    coordinates: "51°55'28\"N 004°28'47\"E • REEFER-IOT-ACTIVE",
    description:
      "Smart reefer containers transmit satellite temperature, humidity, and shock telemetry every 15 minutes from port of loading to regional fulfillment hubs, guaranteeing unbroken cold-chain integrity and 99.3% OTIF delivery.",
    telemetryBadge: "TEMP LOCK -18.0°C / +4.0°C • 48 EXPORT MARKETS",
    image: "/images/brand-cacao-reserve.png",
    metrics: [
      { label: "Export Destinations", value: "48 Countries", monoCode: "GLB-NET-48" },
      { label: "Regional Buffer Hubs", value: "8 Ports", monoCode: "HUB-RTM-SIN-TYO" },
      { label: "On-Time In-Full (OTIF)", value: "99.3%", monoCode: "SLA-OTIF-993" },
    ],
    verifications: [
      "Real-Time Satellite Reefer Telemetry",
      "Automated Customs & Phytosanitary EDI",
      "Carbon-Neutral Green Corridor Shipping",
    ],
  },
];

export interface EsgMetricCategory {
  id: "carbon" | "water" | "packaging" | "farmers";
  label: string;
  labelId: string;
  shortTitle: string;
  unit: string;
  currentValue: string;
  targetValue: string;
  targetYear: number;
  progressPercent: number;
  deltaBadge: string;
  summary: string;
  methodologyNote: string;
  yearlyComparison: Array<{
    year: string;
    actual: number;
    benchmark: number;
    displayActual: string;
    displayBenchmark: string;
  }>;
  keyInitiatives: Array<{ title: string; metric: string; detail: string }>;
}

export const ESG_DASHBOARD_METRICS: EsgMetricCategory[] = [
  {
    id: "carbon",
    label: "Carbon Footprint",
    labelId: "Jejak Karbon",
    shortTitle: "Scope 1, 2 & FLAG Emissions Reduction",
    unit: "kg CO₂e / MT Produced",
    currentValue: "312 kg",
    targetValue: "Net-Zero (0 kg)",
    targetYear: 2040,
    progressPercent: 64,
    deltaBadge: "-46.2% vs 2019 Baseline",
    summary:
      "SBTi-validated 1.5°C pathway powered by cacao shell biomass boilers, 28 MWp rooftop solar arrays, and agroforestry soil carbon sequestration.",
    methodologyNote: "Audited by Ernst & Young under GHG Protocol & SBTi FLAG Guidance (FY 2025/26).",
    yearlyComparison: [
      { year: "2020", actual: 88, benchmark: 95, displayActual: "540 kg", displayBenchmark: "580 kg" },
      { year: "2022", actual: 72, benchmark: 90, displayActual: "445 kg", displayBenchmark: "550 kg" },
      { year: "2024", actual: 58, benchmark: 85, displayActual: "360 kg", displayBenchmark: "520 kg" },
      { year: "2026 (YTD)", actual: 50, benchmark: 80, displayActual: "312 kg", displayBenchmark: "490 kg" },
      { year: "2030 Target", actual: 26, benchmark: 68, displayActual: "160 kg", displayBenchmark: "415 kg" },
      { year: "2040 Net-Zero", actual: 4, benchmark: 50, displayActual: "0 Net", displayBenchmark: "310 kg" },
    ],
    keyInitiatives: [
      {
        title: "Biomass & Solar Plant Grid",
        metric: "78.4% Renewable",
        detail: "Upcycling spent coffee grounds & cocoa husks into clean thermal steam across 9 factories.",
      },
      {
        title: "Agroforestry Carbon Insetting",
        metric: "118,000 tCO₂e",
        detail: "1.4 million shade trees planted within our own smallholder cacao and coffee supply sheds.",
      },
      {
        title: "Electric Port Drayage Fleet",
        metric: "42 EV Heavy Trucks",
        detail: "Zero-emission container transport between Cikarang factories and Tanjung Priok Port.",
      },
    ],
  },
  {
    id: "water",
    label: "Water Stewardship",
    labelId: "Konservasi Air",
    shortTitle: "Closed-Loop Water Reclamation & Watershed Restoration",
    unit: "Liters Recycled / Year",
    currentValue: "1.94 Billion L",
    targetValue: "100% Water Positive",
    targetYear: 2032,
    progressPercent: 76,
    deltaBadge: "76% Process Water Recycled",
    summary:
      "Membrane bioreactor (MBR) and reverse-osmosis ultrafiltration plants reclaim condensate from evaporation lines back into utility cooling and CIP cycles.",
    methodologyNote: "Alliance for Water Stewardship (AWS) Platinum Certified at Subang & Surabaya Hubs.",
    yearlyComparison: [
      { year: "2020", actual: 32, benchmark: 18, displayActual: "0.78B L", displayBenchmark: "0.42B L" },
      { year: "2022", actual: 48, benchmark: 22, displayActual: "1.18B L", displayBenchmark: "0.51B L" },
      { year: "2024", actual: 65, benchmark: 26, displayActual: "1.62B L", displayBenchmark: "0.60B L" },
      { year: "2026 (YTD)", actual: 76, benchmark: 30, displayActual: "1.94B L", displayBenchmark: "0.71B L" },
      { year: "2029 Target", actual: 90, benchmark: 35, displayActual: "2.35B L", displayBenchmark: "0.82B L" },
      { year: "2032 Positive", actual: 100, benchmark: 40, displayActual: "105% Replenish", displayBenchmark: "0.95B L" },
    ],
    keyInitiatives: [
      {
        title: "Condensate Recovery Loops",
        metric: "1.42M m³ Saved",
        detail: "Capturing vapor condensate from mango puree & coconut cream vacuum evaporators.",
      },
      {
        title: "Volcanic Watershed Recharge",
        metric: "4,800 Ha Protected",
        detail: "Riparian bamboo buffer zones restoring spring catchments in Mount Arjuno & Pangajaran.",
      },
      {
        title: "Zero Liquid Effluent Discharge",
        metric: "COD < 25 mg/L",
        detail: "Biogas anaerobic digesters turn organic wastewater into clean factory electricity.",
      },
    ],
  },
  {
    id: "packaging",
    label: "Circular Packaging",
    labelId: "Kemasan Daur Ulang",
    shortTitle: "Recyclable, Plant-Based & FSC-Certified Packaging",
    unit: "% Circular Material Share",
    currentValue: "88.5%",
    targetValue: "100% Circular / Reusable",
    targetYear: 2030,
    progressPercent: 89,
    deltaBadge: "+54% Circularity Since 2020",
    summary:
      "Eliminating virgin fossil plastics across consumer packs through Bonsucro plant-based polymers, infinite-loop aluminum cans, and stainless returnable B2B totes.",
    methodologyNote: "Ellen MacArthur Foundation New Plastics Economy Global Commitment Signatory.",
    yearlyComparison: [
      { year: "2020", actual: 34, benchmark: 25, displayActual: "34.0%", displayBenchmark: "25.0%" },
      { year: "2022", actual: 56, benchmark: 32, displayActual: "56.2%", displayBenchmark: "32.0%" },
      { year: "2024", actual: 74, benchmark: 40, displayActual: "74.8%", displayBenchmark: "40.0%" },
      { year: "2026 (YTD)", actual: 89, benchmark: 46, displayActual: "88.5%", displayBenchmark: "46.0%" },
      { year: "2028 Target", actual: 96, benchmark: 52, displayActual: "96.0%", displayBenchmark: "52.0%" },
      { year: "2030 Target", actual: 100, benchmark: 60, displayActual: "100.0%", displayBenchmark: "60.0%" },
    ],
    keyInitiatives: [
      {
        title: "FSC & Bonsucro Tetra Cartons",
        metric: "89% Bio-Based",
        detail: "Sugarcane-derived caps and polymers reducing carton carbon footprint by 34%.",
      },
      {
        title: "Closed-Loop B2B Stainless IBCs",
        metric: "14,000+ Totes",
        detail: "Reusable collapsible aseptic totes replacing single-use steel drums for regional clients.",
      },
      {
        title: "Mono-Material High-Barrier Pouches",
        metric: "100% Recyclable PE",
        detail: "Replaced multi-layer metallized PET/foil with recyclable high-barrier mono-polyolefin.",
      },
    ],
  },
  {
    id: "farmers",
    label: "Farmer Empowerment",
    labelId: "Kesejahteraan Petani",
    shortTitle: "Verified Living Income & Agronomic Resilience",
    unit: "% Reaching Living Income Benchmark",
    currentValue: "84.0%",
    targetValue: "100% Living Income",
    targetYear: 2030,
    progressPercent: 84,
    deltaBadge: "+38% Net Household Income",
    summary:
      "Direct digital off-take contracts, high-yield climate-resilient seedlings, and women-led fermentation cooperatives lift rural incomes across 28 provinces.",
    methodologyNote: "Anker Living Income Reference Value verified by Fair Trade & Rainforest Alliance.",
    yearlyComparison: [
      { year: "2020", actual: 42, benchmark: 30, displayActual: "42%", displayBenchmark: "30%" },
      { year: "2022", actual: 58, benchmark: 34, displayActual: "58%", displayBenchmark: "34%" },
      { year: "2024", actual: 71, benchmark: 38, displayActual: "71%", displayBenchmark: "38%" },
      { year: "2026 (YTD)", actual: 84, benchmark: 42, displayActual: "84%", displayBenchmark: "42%" },
      { year: "2028 Target", actual: 93, benchmark: 46, displayActual: "93%", displayBenchmark: "46%" },
      { year: "2030 Target", actual: 100, benchmark: 50, displayActual: "100%", displayBenchmark: "50%" },
    ],
    keyInitiatives: [
      {
        title: "Nouri Agro-Academy Field Schools",
        metric: "18,400 Farmers",
        detail: "Hands-on pruning, organic composting, and post-harvest solar drying workshops.",
      },
      {
        title: "Climate-Resilient Clonal Nursery",
        metric: "3.2M Seedlings",
        detail: "Free distribution of drought-tolerant cacao and arabica cultivars to cooperative members.",
      },
      {
        title: "Women-Led Village Fermentation Hubs",
        metric: "64 Micro-Centers",
        detail: "Captures value-add processing margins directly inside rural farming communities.",
      },
    ],
  },
];

export interface ExportDestinationPoint {
  name: string;
  hubType: "Manufacturing & HQ" | "Regional Distribution Hub" | "Export Market";
  lat: number;
  lng: number;
  volumeShare: string;
  leadTimeDays: string;
  keyProducts: string;
}

export const EXPORT_DESTINATIONS: ExportDestinationPoint[] = [
  {
    name: "Jakarta & Subang, Indonesia",
    hubType: "Manufacturing & HQ",
    lat: -6.2088,
    lng: 106.8456,
    volumeShare: "Global Primary Production Hub (9 Plants)",
    leadTimeDays: "Ex-Works Day 0",
    keyProducts: "All FMCG & B2B Bulk Lines",
  },
  {
    name: "Singapore (Biopolis & Jurong)",
    hubType: "Regional Distribution Hub",
    lat: 1.3521,
    lng: 103.8198,
    volumeShare: "18.5% APAC Trade & R&D Hub",
    leadTimeDays: "2 Days Sea Freight",
    keyProducts: "VELVETA™ Oat, Bio-Actives, Specialty Extracts",
  },
  {
    name: "Rotterdam, Netherlands",
    hubType: "Regional Distribution Hub",
    lat: 51.9244,
    lng: 4.4777,
    volumeShare: "24.0% European Union Gateway",
    leadTimeDays: "Buffer Stock: 48h EU Delivery",
    keyProducts: "KAKAO KULTURA™ Couverture, RSPO Lipids, Spices",
  },
  {
    name: "Tokyo & Yokohama, Japan",
    hubType: "Regional Distribution Hub",
    lat: 35.6762,
    lng: 139.6503,
    volumeShare: "16.2% East Asia Supply",
    leadTimeDays: "9 Days Direct Reefer",
    keyProducts: "Barista Oat Milk, Tropical Aseptic Purees",
  },
  {
    name: "Dubai (Jebel Ali), UAE",
    hubType: "Regional Distribution Hub",
    lat: 25.0657,
    lng: 55.1713,
    volumeShare: "14.8% MENA & GCC Halal Hub",
    leadTimeDays: "11 Days Direct Sea",
    keyProducts: "Halal Culinary Bases, UHT Coconut Cream, Confectionery",
  },
  {
    name: "Los Angeles & Seattle, USA",
    hubType: "Regional Distribution Hub",
    lat: 34.0522,
    lng: -118.2437,
    volumeShare: "15.5% North America Gateway",
    leadTimeDays: "18 Days Trans-Pacific",
    keyProducts: "Organic Botanical Tonics, Single-Origin Cocoa, Superfoods",
  },
  {
    name: "Melbourne & Sydney, Australia",
    hubType: "Export Market",
    lat: -37.8136,
    lng: 144.9631,
    volumeShare: "6.4% Oceania Specialty Café Network",
    leadTimeDays: "8 Days Direct",
    keyProducts: "VELVETA™ Barista Series, Cold-Brew Concentrates",
  },
  {
    name: "Seoul & Busan, South Korea",
    hubType: "Export Market",
    lat: 37.5665,
    lng: 126.978,
    volumeShare: "4.6% K-Bakery & Beverage OEM",
    leadTimeDays: "7 Days Direct",
    keyProducts: "Cocoa Butter, Pandan Extracts, Functional Peptides",
  },
];

export const PARTNERSHIP_TYPES = [
  {
    id: "distributor",
    title: "Global Distributor / Importer",
    subtitle: "Exclusive or regional FMCG retail & foodservice distribution",
    moqHint: "From 1x20' FCL Mixed SKU",
  },
  {
    id: "oem",
    title: "OEM / Private Label Manufacturing",
    subtitle: "Custom UHT beverage, chocolate, or powder co-manufacturing",
    moqHint: "Pilot R&D + Commercial Contract",
  },
  {
    id: "bulk-ingredients",
    title: "B2B Industrial Bulk Ingredients",
    subtitle: "Cocoa derivatives, coconut cream, aseptic purees & oleoresins",
    moqHint: "18 MT FCL / 24 MT ISO Tank",
  },
  {
    id: "horeca",
    title: "HoReCa & Café Chain Supply",
    subtitle: "Barista plant milks, couverture pistoles & cold-brew systems",
    moqHint: "Pallet or Regional Hub Dispatch",
  },
  {
    id: "investor-media",
    title: "Investor Relations & ESG Audit",
    subtitle: "Institutional governance, factory visits & sustainability briefings",
    moqHint: "Corporate Desk Direct",
  },
] as const;

export const B2B_INTEREST_CATEGORIES = [
  "VELVETA™ Oat & Coconut Barista Dairy-Free",
  "KAKAO KULTURA™ Couverture & Cocoa Derivatives",
  "VERDANTIA™ Adaptogenic Sparkling Beverages",
  "Aseptic Tropical Fruit Purees & Coconut Cream",
  "Supercritical Spice Oleoresins & Botanical Extracts",
  "Custom OEM / ODM Formulation & Co-Packing",
] as const;

export const NEWSROOM_ARTICLES = [
  {
    id: "rotterdam-bio-refinery-2026",
    date: "October 18, 2026",
    category: "Global Expansion",
    readTime: "4 min read",
    title: "NOURI Commissions Carbon-Neutral Specialty Cocoa & Botanical Buffer Hub in Port of Rotterdam",
    excerpt:
      "New 22,000 m² temperature-controlled facility cuts European B2B delivery lead times to 48 hours while running on 100% North Sea wind power.",
    metricTag: "48h EU Delivery SLA",
  },
  {
    id: "sbti-flag-validation-2026",
    date: "September 29, 2026",
    category: "ESG & Climate",
    readTime: "6 min read",
    title: "Science Based Targets Initiative (SBTi) Validates NOURI's 2040 Net-Zero & FLAG Trajectory",
    excerpt:
      "Scope 1 and 2 emissions reduced by 46.2% ahead of schedule through biomass gasification of spent cacao shells and 64,200 hectares of polygon-mapped agroforestry.",
    metricTag: "-46.2% Scope 1 & 2",
  },
  {
    id: "velveta-enzymatic-barista-patent",
    date: "August 14, 2026",
    category: "R&D Innovation",
    readTime: "5 min read",
    title: "Biopolis Lab Awarded WIPO Patent for Zero-Sugar Enzymatic Oat-Coconut Micro-Foam Matrix",
    excerpt:
      "Breakthrough dual-enzyme hydrolysis achieves natural sweetness and high-acid espresso stability without synthetic gums or dipotassium phosphate.",
    metricTag: "Patent #WO-2026-119402",
  },
  {
    id: "eudr-blockchain-passport",
    date: "July 04, 2026",
    category: "Supply Chain",
    readTime: "4 min read",
    title: "18,400 Partner Smallholders Connected to Real-Time EUDR Satellite Polygon & Instant Pay Ledger",
    excerpt:
      "Every container shipped to Europe, Japan, and North America now embeds a downloadable GeoJSON farm-plot certificate and SGS laboratory COA.",
    metricTag: "99.8% EUDR Verified",
  },
];

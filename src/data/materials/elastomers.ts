import { mat } from "./_shared";

export const elastomerMaterials = [
  mat({
    id: "tpu",
    name: "TPU",
    full: "Thermoplastic Polyurethane",
    family: "elastomer",
    desc: "Flexible thermoplastic elastomer for grips, bumpers, and tough soft-touch parts.",
    applications: ["Grips", "Bumpers", "Phone cases", "Seals (geometry-dependent)"],
    pros: [
      "Wide hardness range across grades",
      "Good abrasion resistance in many grades",
      "Processable by molding, extrusion, and some additive methods",
    ],
    cons: [
      "Chemistry and hydrolysis resistance vary",
      "Can be sticky or hard to print/mold depending on grade",
      "Compression-set limits for some sealing uses",
    ],
    processes: ["injection", "extrusion", "fdm", "cnc"],
    relativeCost: "moderate",
    summary:
      "Thermoplastic elastomer bridging rubber-like feel with melt-processability.",
    propertyNotes: [
      "Shore hardness is a selection key — not a single material",
      "Polyester vs polyether TPUs differ in hydrolysis/microbial resistance",
    ],
    designConsiderations: [
      "Specify hardness and chemistry family, not only “TPU”",
      "Validate sealing/compression needs with application testing",
    ],
  }),
  mat({
    id: "silicone",
    name: "Silicone Rubber",
    full: "Silicone elastomer (VMQ family and liquid silicone rubber)",
    family: "elastomer",
    desc: "High-performance elastomer for seals, medical/consumer soft goods, and wide temperature service.",
    applications: ["Seals", "Gaskets", "Bakeware", "Medical soft goods (grade-dependent)"],
    pros: [
      "Wide service temperature potential",
      "Excellent for many sealing and soft-touch uses",
      "LSR enables detailed molded geometries",
    ],
    cons: [
      "Higher relative cost than many commodity elastomers",
      "Tear and abrasion vary by formulation",
      "Bonding to substrates needs process design",
    ],
    processes: ["injection", "compression", "extrusion"],
    relativeCost: "high",
    summary:
      "Silicone elastomers for temperature-capable soft goods and seals.",
    propertyNotes: [
      "HTV vs LSR systems are different manufacturing paths",
      "Medical/food contact requires certified grades",
    ],
    designConsiderations: [
      "Design seals with compression set and groove geometry in mind",
      "Plan overmolding/bonding strategy early",
    ],
  }),
  mat({
    id: "epdm",
    name: "EPDM",
    full: "Ethylene Propylene Diene Monomer rubber",
    family: "elastomer",
    desc: "Weather-resistant rubber common in outdoor seals, gaskets, and automotive weatherstrips.",
    applications: ["Weatherstrips", "Outdoor gaskets", "Hoses (application-dependent)"],
    pros: [
      "Strong weathering/ozone resistance in many compounds",
      "Good for outdoor sealing",
      "Common automotive/building supply base",
    ],
    cons: [
      "Oil/fuel resistance often limited vs nitrile",
      "Compounding dominates performance",
      "Not melt-processable like TPU",
    ],
    processes: ["compression", "extrusion", "injection"],
    relativeCost: "moderate",
    summary:
      "Diene rubber family oriented to weathering and outdoor seals.",
    propertyNotes: [
      "Hardness, fillers, and cure system define real properties",
      "Fluid compatibility must be checked per compound",
    ],
    designConsiderations: [
      "Select compounds with the target fluid and UV exposure",
      "Extruded profiles need die and splice design attention",
    ],
  }),
  mat({
    id: "nbr",
    name: "Nitrile (NBR)",
    full: "Acrylonitrile Butadiene Rubber",
    family: "elastomer",
    desc: "Oil-resistant rubber widely used for fuel/oil seals and gaskets.",
    applications: ["Oil seals", "O-rings", "Fuel-system gaskets (compound-dependent)"],
    pros: [
      "Good resistance to many oils and fuels (compound-dependent)",
      "Common sealing material",
      "Broad hardness availability",
    ],
    cons: [
      "Weaker weathering/ozone resistance than EPDM in many cases",
      "Low-temperature flexibility depends on ACN content",
      "Not a universal chemical resistor",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Oil-service elastomer family for many industrial sealing duties.",
    propertyNotes: [
      "Acrylonitrile content trades oil resistance vs low-temp flexibility",
      "Hydrogenated NBR (HNBR) is a related but different option",
    ],
    designConsiderations: [
      "Match compound to fluid, temperature, and squeeze",
      "Use standard O-ring gland design practices",
    ],
  }),
];

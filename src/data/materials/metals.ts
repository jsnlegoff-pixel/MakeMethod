import { mat } from "./_shared";

export const metalMaterials = [
  mat({
    id: "al-6061",
    name: "Aluminum 6061",
    full: "Aluminum Alloy 6061 (general engineering)",
    family: "metal",
    desc: "Widely used heat-treatable aluminum alloy for machined brackets, plates, and structural frames.",
    applications: ["Brackets", "Plates", "Frames", "Fixtures"],
    pros: [
      "Good machinability in many tempers",
      "Favorable strength-to-weight for general engineering",
      "Broad stock availability",
    ],
    cons: [
      "Corrosion performance depends on temper/finish/environment",
      "Not as strong as many 7xxx alloys",
      "Welding/heat treatment effects must be considered",
    ],
    processes: ["cnc", "sheet-metal", "extrusion", "forging"],
    relativeCost: "moderate",
    summary:
      "Workhorse aluminum alloy family for machined and fabricated general engineering parts.",
    propertyNotes: [
      "Temper (e.g. T6) dominates strength and machining behavior",
      "Anodizing and coatings change corrosion and cosmetics",
    ],
    designConsiderations: [
      "Specify temper and finish, not only alloy number",
      "Mind galvanic couples with dissimilar metals",
    ],
  }),
  mat({
    id: "al-7075",
    name: "Aluminum 7075",
    full: "Aluminum Alloy 7075 (high-strength)",
    family: "metal",
    desc: "High-strength aluminum alloy used when stiffness/strength matter more than easiest fabrication.",
    applications: ["Aerospace fittings", "High-stress brackets", "Sporting goods"],
    pros: [
      "High strength potential among aluminum alloys",
      "Useful where weight-critical structures matter",
      "Machinable with appropriate tooling",
    ],
    cons: [
      "More expensive and less corrosion-forgiving than 6061 in many cases",
      "Forming and welding are more constrained",
      "Over-specified for many consumer products",
    ],
    processes: ["cnc", "forging", "sheet-metal"],
    relativeCost: "high",
    summary:
      "Higher-strength aluminum option when 6xxx alloys are insufficient.",
    propertyNotes: [
      "Temper and grain direction strongly affect performance",
      "Stress-corrosion considerations are application-specific",
    ],
    designConsiderations: [
      "Confirm corrosion protection strategy early",
      "Avoid unnecessary complexity that fights machining cost",
    ],
  }),
  mat({
    id: "ss-304",
    name: "Stainless 304",
    full: "Stainless Steel 304 / 304L family",
    family: "metal",
    desc: "Common austenitic stainless for corrosion-resistant fabricated and machined parts.",
    applications: ["Food equipment", "Architectural hardware", "Enclosures"],
    pros: [
      "Broad corrosion resistance in many environments",
      "Widely available sheet and bar forms",
      "Good fabricability relative to many stainless grades",
    ],
    cons: [
      "Work-hardens in machining",
      "Heavier than aluminum",
      "Not ideal for all chloride/high-temp chemistries",
    ],
    processes: ["cnc", "sheet-metal", "stamping", "investment-casting", "forging"],
    relativeCost: "moderate",
    summary:
      "General-purpose stainless family for corrosion-resistant everyday engineering.",
    propertyNotes: [
      "304 vs 304L choice often driven by welding/corrosion practice",
      "Passivation and surface finish affect real-world corrosion",
    ],
    designConsiderations: [
      "Plan for work-hardening in tight-tolerance machining",
      "Specify finish (2B, brushed, polished) for cosmetics and cleanability",
    ],
  }),
  mat({
    id: "ss-316",
    name: "Stainless 316",
    full: "Stainless Steel 316 / 316L family",
    family: "metal",
    desc: "Molybdenum-bearing stainless often selected for tougher corrosion environments than 304.",
    applications: ["Marine hardware", "Chemical equipment", "Medical devices (grade-dependent)"],
    pros: [
      "Improved corrosion resistance vs 304 in many chloride exposures",
      "Common in process industries",
      "Available in sheet, bar, and cast forms",
    ],
    cons: [
      "Higher cost than 304",
      "Still not universal against all chemicals",
      "Machining remains challenging vs carbon steels",
    ],
    processes: ["cnc", "sheet-metal", "investment-casting", "forging"],
    relativeCost: "high",
    summary:
      "Corrosion-upgraded austenitic stainless for more aggressive environments.",
    propertyNotes: [
      "Environment, temperature, and crevice geometry dominate corrosion outcomes",
      "L grades are often preferred for welded assemblies",
    ],
    designConsiderations: [
      "Do not assume 316 solves all corrosion problems — validate chemistry",
      "Detail crevices and stagnant zones carefully",
    ],
  }),
  mat({
    id: "carbon-steel",
    name: "Carbon Steel",
    full: "Carbon / mild steel family (e.g. 1018 / A36-class materials)",
    family: "metal",
    desc: "Economical structural and machined steel when corrosion resistance is handled by coatings or environment.",
    applications: ["Frames", "Brackets", "Shafts", "Weldments"],
    pros: [
      "Low relative material cost",
      "Excellent availability",
      "Easy to weld/machine in many grades",
    ],
    cons: [
      "Corrodes without protection",
      "Heavier than aluminum",
      "Grade selection still matters for strength and weldability",
    ],
    processes: ["cnc", "sheet-metal", "stamping", "forging", "sand-casting"],
    relativeCost: "low",
    summary:
      "Broad steel family for cost-effective structural and mechanical parts.",
    propertyNotes: [
      "Mild vs higher-carbon grades change hardness, weldability, and toughness",
      "Coatings/paint/plating are part of the material system in service",
    ],
    designConsiderations: [
      "Specify corrosion protection with the alloy choice",
      "Call out grade/spec rather than only “steel”",
    ],
  }),
  mat({
    id: "ti-6al4v",
    name: "Titanium Ti-6Al-4V",
    full: "Titanium Alloy Ti-6Al-4V (Grade 5 family)",
    family: "metal",
    desc: "High-performance titanium alloy for strength-to-weight and corrosion-demanding applications.",
    applications: ["Aerospace fittings", "Medical implants (certified grades)", "Racing components"],
    pros: [
      "Excellent strength-to-weight potential",
      "Strong corrosion performance in many environments",
      "High-value structural applications",
    ],
    cons: [
      "Very high relative cost",
      "Challenging machining and fabrication",
      "Specialized supply chain and certifications",
    ],
    processes: ["cnc", "forging", "investment-casting", "sls"],
    relativeCost: "very-high",
    summary:
      "Premium titanium alloy reserved for performance that justifies cost and processing difficulty.",
    propertyNotes: [
      "Mill product form and heat treatment state are critical",
      "Medical/aerospace use requires controlled certified material",
    ],
    designConsiderations: [
      "Engage suppliers early on buy-to-fly and machining strategy",
      "Avoid casual substitution for aluminum without a performance need",
    ],
  }),
  mat({
    id: "brass",
    name: "Brass",
    full: "Brass (copper-zinc alloys)",
    family: "metal",
    desc: "Machinable copper alloy family for fittings, hardware, and decorative functional parts.",
    applications: ["Fittings", "Valves", "Hardware", "Musical/decorative parts"],
    pros: [
      "Excellent machinability in many free-cutting grades",
      "Attractive appearance",
      "Good for precision turned parts",
    ],
    cons: [
      "Cost tracks copper markets",
      "Dezincification/corrosion concerns in some waters",
      "Strength below many steels",
    ],
    processes: ["cnc", "die-casting", "forging", "investment-casting"],
    relativeCost: "high",
    summary:
      "Copper-zinc alloys prized for machining and hardware aesthetics.",
    propertyNotes: [
      "Lead-free vs free-cutting grades change machining and regulations",
      "Color and patina evolve with environment and finish",
    ],
    designConsiderations: [
      "Check potable-water and RoHS/lead constraints",
      "Specify alloy number for corrosion-critical service",
    ],
  }),
  mat({
    id: "copper",
    name: "Copper",
    full: "Copper (and high-conductivity copper alloys)",
    family: "metal",
    desc: "High-conductivity metal for electrical and thermal components.",
    applications: ["Bus bars", "Heat spreaders", "Electrical contacts"],
    pros: [
      "Excellent electrical/thermal conductivity",
      "Useful corrosion behavior in many atmospheres",
      "Formable in sheet and wire products",
    ],
    cons: [
      "Soft relative to structural steels",
      "Higher cost",
      "Machining/galling can be tricky",
    ],
    processes: ["cnc", "sheet-metal", "stamping", "extrusion", "forging"],
    relativeCost: "high",
    summary:
      "Conductivity-driven metal choice for electrical and thermal paths.",
    propertyNotes: [
      "Oxygen-free vs tough-pitch coppers matter for conductivity/joining",
      "Alloying quickly trades conductivity for strength",
    ],
    designConsiderations: [
      "Protect contact surfaces from oxidation where conductivity matters",
      "Design for softness (support, creep, wear)",
    ],
  }),
  mat({
    id: "zinc",
    name: "Zinc Alloys",
    full: "Zinc die-casting alloys (e.g. Zamak-class families)",
    family: "metal",
    desc: "Castable zinc alloys for detailed net-shape hardware and housings at production volume.",
    applications: ["Die-cast housings", "Hardware", "Automotive small parts"],
    pros: [
      "Excellent for thin-wall detailed die castings",
      "Good dimensional repeatability in production",
      "Attractive plated finishes common",
    ],
    cons: [
      "Lower high-temperature capability than many aluminums",
      "Alloy and process control affect porosity/cosmetics",
      "Not ideal for all structural loads",
    ],
    processes: ["die-casting", "cnc"],
    relativeCost: "moderate",
    summary:
      "Die-casting-focused zinc alloys for detailed production hardware.",
    propertyNotes: [
      "Mechanical properties depend on alloy and casting quality",
      "Aging/dimensional stability should be validated for precision fits",
    ],
    designConsiderations: [
      "Design for die casting draft, ejector marks, and gate locations",
      "Plan plating/painting with as-cast surface in mind",
    ],
  }),
  mat({
    id: "magnesium",
    name: "Magnesium Alloys",
    full: "Magnesium alloy family (e.g. AZ91-class die-cast alloys)",
    family: "metal",
    desc: "Ultra-light structural metals used in weight-critical housings and frames.",
    applications: ["Lightweight housings", "Electronics chassis", "Automotive brackets"],
    pros: [
      "Very low density among structural metals",
      "Good for weight-sensitive cast or machined parts",
      "Useful stiffness-to-weight in appropriate designs",
    ],
    cons: [
      "Corrosion protection often required",
      "Specialized machining/casting practices",
      "Supply and joining constraints vs aluminum",
    ],
    processes: ["die-casting", "cnc", "forging"],
    relativeCost: "high",
    summary:
      "Lightest common structural metal family for weight-driven designs.",
    propertyNotes: [
      "Corrosion and flammability handling are process/design concerns",
      "Alloy systems differ for cast vs wrought product",
    ],
    designConsiderations: [
      "Coatings and galvanic isolation are usually part of the design",
      "Engage experienced magnesium processors",
    ],
  }),
];

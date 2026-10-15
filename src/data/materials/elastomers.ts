import { mat } from "./_shared";
import type { ElastomerFeel } from "../types";

function feel(
  partial: ElastomerFeel
): ElastomerFeel {
  return partial;
}

/** Educational elastomer / rubber library — qualitative feel only. */
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
    elastomerFeel: feel({
      flexibility: "flexible",
      pliability: "soft",
      recovery: "fair",
      gasketFit: "situational",
      hardnessGuidance:
        "Usually specified across a wide Shore A/D band — pick hardness for the grip or seal duty.",
      notes: [
        "More melt-processable than thermoset rubbers",
        "Long-term gasket squeeze often needs compression-set validation",
      ],
    }),
  }),
  mat({
    id: "silicone",
    name: "Silicone Rubber",
    full: "Silicone elastomer (VMQ family and liquid silicone rubber)",
    family: "elastomer",
    desc: "High-performance elastomer for seals, medical/consumer soft goods, and wide temperature service.",
    applications: [
      "Seals",
      "Gaskets",
      "Bakeware",
      "Medical soft goods (grade-dependent)",
    ],
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
    elastomerFeel: feel({
      flexibility: "very-flexible",
      pliability: "soft",
      recovery: "good",
      gasketFit: "preferred",
      hardnessGuidance:
        "Commonly compounded across soft-to-medium Shore A ranges for seals and soft goods.",
      notes: [
        "Favored when temperature window and soft sealing matter",
        "LSR is especially useful for fine gasket and septum geometries",
      ],
    }),
  }),
  mat({
    id: "epdm",
    name: "EPDM",
    full: "Ethylene Propylene Diene Monomer rubber",
    family: "elastomer",
    desc: "Weather-resistant rubber common in outdoor seals, gaskets, and automotive weatherstrips.",
    applications: [
      "Weatherstrips",
      "Outdoor gaskets",
      "Hoses (application-dependent)",
    ],
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
    elastomerFeel: feel({
      flexibility: "flexible",
      pliability: "medium",
      recovery: "good",
      gasketFit: "preferred",
      hardnessGuidance:
        "Weatherstrip and gasket compounds span soft-to-firm Shore A — match to squeeze and door/cover geometry.",
      notes: [
        "Strong outdoor gasket candidate when oils/fuels are not the main fluid",
        "Closed-cell sponge EPDM variants are common for soft weather seals",
      ],
    }),
  }),
  mat({
    id: "nbr",
    name: "Buna-N / Nitrile (NBR)",
    full: "Buna-N (Nitrile, NBR) — Acrylonitrile Butadiene Rubber",
    family: "elastomer",
    desc: "Oil-resistant rubber (also called Buna-N or NBR) widely used for fuel/oil seals, O-rings, and gaskets.",
    applications: [
      "Oil seals",
      "O-rings",
      "Fuel-system gaskets (compound-dependent)",
      "Hydraulic seals (compound-dependent)",
    ],
    pros: [
      "Good resistance to many oils and fuels (compound-dependent)",
      "Common sealing / gasket material under the Buna-N name",
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
      "Buna-N / NBR oil-service elastomer family for many industrial sealing duties.",
    propertyNotes: [
      "Buna-N, nitrile, and NBR refer to the same elastomer family",
      "Acrylonitrile content trades oil resistance vs low-temp flexibility",
      "Hydrogenated NBR (HNBR) is a related but different, higher-duty option",
    ],
    designConsiderations: [
      "Match compound to fluid, temperature, and squeeze",
      "Use standard O-ring gland design practices",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "medium",
      recovery: "good",
      gasketFit: "preferred",
      hardnessGuidance:
        "O-ring and gasket compounds are typically specified in Shore A; higher ACN often feels a bit firmer at equal hardness.",
      notes: [
        "Go-to screening family for oil/fuel gasket duty (Buna-N / NBR)",
        "Outdoor UV/ozone exposure usually needs protection or a different family",
      ],
    }),
  }),
  mat({
    id: "hnbr",
    name: "HNBR",
    full: "Hydrogenated Nitrile Butadiene Rubber (upgraded Buna-N / NBR family)",
    family: "elastomer",
    desc: "Upgraded nitrile (Buna-N) family for hotter, more demanding oil and industrial sealing service.",
    applications: [
      "Automotive seals",
      "Oil-field elastomers",
      "High-duty O-rings and gaskets",
    ],
    pros: [
      "Better heat and aging resistance than many NBRs",
      "Retains oil/fuel usefulness of the nitrile family",
      "Common in demanding industrial seals",
    ],
    cons: [
      "Higher relative cost than standard NBR",
      "Still not a universal chemical resistor",
      "Compound selection remains critical",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "high",
    summary:
      "Hydrogenated nitrile for tougher oil-service sealing than commodity NBR.",
    propertyNotes: [
      "Often chosen when NBR temperature/aging margin is insufficient",
      "Fluid and temperature charts are compound-specific",
    ],
    designConsiderations: [
      "Confirm fluid + temperature envelope before locking geometry",
      "Do not assume NBR and HNBR are interchangeable without testing",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "medium",
      recovery: "good",
      gasketFit: "preferred",
      hardnessGuidance:
        "Sealing compounds are hardness-specified like NBR; feel is typically medium rather than ultra-soft.",
      notes: [
        "Useful when gasket duty needs oil resistance with more thermal margin",
        "Still verify compression set for the target squeeze and bake",
      ],
    }),
  }),
  mat({
    id: "neoprene",
    name: "Neoprene (CR)",
    full: "Chloroprene rubber (Neoprene-class)",
    family: "elastomer",
    desc: "General-purpose rubber for gaskets, pads, and weather-facing seals with balanced oil/weather behavior.",
    applications: [
      "General gaskets",
      "Vibration pads",
      "Hose covers",
      "Weather seals",
    ],
    pros: [
      "Balanced weather and moderate oil resistance in many compounds",
      "Familiar gasket sheet and extrusion supply",
      "Useful for general industrial sealing",
    ],
    cons: [
      "Not as oil-focused as NBR or as weather-focused as EPDM in extremes",
      "Compound quality varies widely",
      "Higher-temp/chemical duties may need FKM or specialty grades",
    ],
    processes: ["compression", "extrusion", "injection"],
    relativeCost: "moderate",
    summary:
      "Balanced chloroprene family for everyday gaskets and pads.",
    propertyNotes: [
      "Often a compromise choice when both mild oil and weather exposure appear",
      "Closed-cell sponge neoprene is common for soft gasketing",
    ],
    designConsiderations: [
      "State whether solid or sponge stock is required",
      "Check fluid splash and outdoor UV expectations early",
    ],
    elastomerFeel: feel({
      flexibility: "flexible",
      pliability: "medium",
      recovery: "fair",
      gasketFit: "common",
      hardnessGuidance:
        "Sheet and extruded gasket stocks span soft sponge to firmer solid Shore A compounds.",
      notes: [
        "Sponge grades feel much more pliable than solid sheet",
        "Good general gasket screening material when duty is not extreme",
      ],
    }),
  }),
  mat({
    id: "fkm",
    name: "FKM (Viton-class)",
    full: "Fluoroelastomer (FKM)",
    family: "elastomer",
    desc: "Premium fluoroelastomer for aggressive chemical and higher-temperature seals and gaskets.",
    applications: [
      "Chemical-plant seals",
      "Fuel-system O-rings",
      "High-temp gaskets",
    ],
    pros: [
      "Strong chemical and heat capability relative to many rubbers",
      "Common aerospace/auto/chemical sealing choice",
      "Broad compound portfolio",
    ],
    cons: [
      "High relative cost",
      "Can be less flexible at low temperature",
      "Not ideal for every ketone/polar solvent without checking grade",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "very-high",
    summary:
      "Fluoroelastomer family for demanding chemical and thermal sealing.",
    propertyNotes: [
      "Different FKM types target different fluid classes",
      "Low-temperature flexibility is a frequent tradeoff",
    ],
    designConsiderations: [
      "Match FKM type to the fluid list, not only the brand nickname",
      "Budget for higher piece and tooling processing costs",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "firm",
      recovery: "excellent",
      gasketFit: "preferred",
      hardnessGuidance:
        "Often compounded toward medium-to-firm Shore A for sealing integrity under heat and chemicals.",
      notes: [
        "Feels less “soft and bouncy” than silicone in many gasket hardnesses",
        "Chosen for duty severity more than soft-touch pliability",
      ],
    }),
  }),
  mat({
    id: "natural-rubber",
    name: "Natural Rubber (NR)",
    full: "Natural polyisoprene rubber",
    family: "elastomer",
    desc: "Highly resilient rubber for pads, mounts, and flexible parts where bounce and tear strength matter.",
    applications: [
      "Vibration mounts",
      "Bushings",
      "Flexible pads",
      "Some soft seals (limited fluids)",
    ],
    pros: [
      "Excellent resilience and tear strength in many compounds",
      "Very flexible / pliable feel available",
      "Cost-effective for dynamic soft parts",
    ],
    cons: [
      "Poor oil/fuel and ozone resistance without protection",
      "Not a first pick for many outdoor or oily gaskets",
      "Aging and weathering need compounding attention",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "low",
    summary:
      "Resilient natural rubber for dynamic soft goods more than chemical gaskets.",
    propertyNotes: [
      "Outstanding rebound compared with many specialty elastomers",
      "Fluid and weather exposure usually push designers to EPDM/NBR/FKM",
    ],
    designConsiderations: [
      "Prefer for mounts and soft pads over oil-service gaskets",
      "Protect from ozone/UV when used outdoors",
    ],
    elastomerFeel: feel({
      flexibility: "very-flexible",
      pliability: "very-soft",
      recovery: "excellent",
      gasketFit: "limited",
      hardnessGuidance:
        "Can be compounded from very soft to firm; soft compounds feel highly pliable and springy.",
      notes: [
        "Great “soft and bouncy” feel for mounts and pads",
        "Gasket use is limited when oils, fuels, or weather dominate",
      ],
    }),
  }),
  mat({
    id: "sbr",
    name: "SBR",
    full: "Styrene-Butadiene Rubber",
    family: "elastomer",
    desc: "Commodity synthetic rubber for general flexible parts, tires-adjacent compounds, and low-cost elastomeric goods.",
    applications: [
      "General rubber goods",
      "Flooring / mats",
      "Some molded flexible parts",
    ],
    pros: [
      "Widely available and relatively low cost",
      "Good abrasion in many tire-related compounds",
      "Familiar processing base",
    ],
    cons: [
      "Oil and ozone resistance often limited",
      "Not a premium chemical gasket family",
      "Property package is highly compound-driven",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "low",
    summary:
      "Commodity SBR for general flexible goods rather than specialty seals.",
    propertyNotes: [
      "Often blended or reinforced for abrasion-heavy uses",
      "Sealing/gasket duty usually loses to NBR/EPDM/FKM",
    ],
    designConsiderations: [
      "Use when cost and general flexibility matter more than fluids",
      "Validate weathering if outdoors",
    ],
    elastomerFeel: feel({
      flexibility: "flexible",
      pliability: "medium",
      recovery: "fair",
      gasketFit: "limited",
      hardnessGuidance:
        "Hardness is compound-specified; many general goods sit in medium Shore A bands.",
      notes: [
        "Pliable enough for flexible goods",
        "Not the first gasket screen for oils or outdoor weatherstrips",
      ],
    }),
  }),
  mat({
    id: "butyl",
    name: "Butyl (IIR)",
    full: "Isobutylene-Isoprene Rubber (Butyl)",
    family: "elastomer",
    desc: "Low-permeability rubber used where air/gas retention and damping matter, including some sealing bladders.",
    applications: [
      "Inner tubes / bladders",
      "Damping mounts",
      "Pharmaceutical stoppers (grade-dependent)",
    ],
    pros: [
      "Excellent gas impermeability among common rubbers",
      "Good damping / low resilience feel",
      "Useful for certain sealed bladder and stopper duties",
    ],
    cons: [
      "Lower rebound (feels less springy)",
      "Processing and compounding can be specialized",
      "Not a universal oil/chemical gasket",
    ],
    processes: ["compression", "injection", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Butyl family known for impermeability and damping rather than high bounce.",
    propertyNotes: [
      "Halobutyl variants are common in curing/bladders and pharma",
      "Feel is characteristically deadened vs natural rubber",
    ],
    designConsiderations: [
      "Choose when permeation or damping dominates requirements",
      "Confirm grade for any pharmaceutical or food contact path",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "soft",
      recovery: "limited",
      gasketFit: "situational",
      hardnessGuidance:
        "Often soft-to-medium; the standout trait is low rebound / damping, not springiness.",
      notes: [
        "Feels pliable but less “bouncy” after squeeze",
        "Situational gasket/bladder use when impermeability matters",
      ],
    }),
  }),
  mat({
    id: "ffkm",
    name: "FFKM",
    full: "Perfluoroelastomer (FFKM)",
    family: "elastomer",
    desc: "Ultra-premium perfluoroelastomer for the most aggressive chemical and temperature sealing duties.",
    applications: [
      "Semiconductor seals",
      "Aggressive chemical O-rings",
      "Extreme-service gaskets",
    ],
    pros: [
      "Top-tier chemical and heat capability among elastomers",
      "Used when FKM still is not enough",
      "Critical sealing in harsh processes",
    ],
    cons: [
      "Very high relative cost",
      "Lead times and grade selection are specialized",
      "Overkill for ordinary consumer gaskets",
    ],
    processes: ["compression", "injection"],
    relativeCost: "very-high",
    summary:
      "Perfluoroelastomer for extreme chemical/thermal sealing beyond FKM.",
    propertyNotes: [
      "Grade families differ by thermal and chemical emphasis",
      "Almost always specified from seal specialists, not commodity catalogs",
    ],
    designConsiderations: [
      "Reserve for duties that justify cost and specialty supply",
      "Engage seal vendors early on gland design and bake-out",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "firm",
      recovery: "excellent",
      gasketFit: "preferred",
      hardnessGuidance:
        "Sealing grades are typically medium-to-firm; soft-touch is rarely the design goal.",
      notes: [
        "Feel is secondary to extreme chemical survival",
        "Preferred gasket family only in severe service",
      ],
    }),
  }),
  mat({
    id: "cast-pu",
    name: "Cast Polyurethane",
    full: "Thermoset / cast polyurethane elastomer",
    family: "elastomer",
    desc: "Tough castable elastomer for wheels, bumpers, and wear parts needing abrasion resistance with rubber-like flex.",
    applications: [
      "Industrial wheels",
      "Bumpers",
      "Wear pads",
      "Some custom seals",
    ],
    pros: [
      "Outstanding abrasion resistance in many systems",
      "Wide hardness capability including firmer elastomer bands",
      "Castable into thick custom sections",
    ],
    cons: [
      "Hydrolysis and heat limits depend on chemistry",
      "Not as universal a chemical gasket as FKM/HNBR",
      "Different from melt-processable TPU",
    ],
    processes: ["compression", "cnc"],
    relativeCost: "moderate",
    summary:
      "Cast polyurethane for tough, abrasion-heavy flexible parts.",
    propertyNotes: [
      "Ester vs ether systems change moisture and dynamic performance",
      "Can be formulated softer or quite firm while remaining elastomeric",
    ],
    designConsiderations: [
      "Distinguish cast PU from TPU early in process planning",
      "Validate heat and humidity for the duty cycle",
    ],
    elastomerFeel: feel({
      flexibility: "moderate",
      pliability: "firm",
      recovery: "good",
      gasketFit: "situational",
      hardnessGuidance:
        "Often specified from soft rubber-like through firm elastomer bands — wear parts skew firmer.",
      notes: [
        "Can feel pliable in soft grades, but many industrial parts are intentionally firm",
        "Gasket use is situational vs dedicated sealing elastomers",
      ],
    }),
  }),
];

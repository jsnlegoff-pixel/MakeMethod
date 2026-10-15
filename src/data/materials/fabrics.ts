import { mat } from "./_shared";
import type { FabricFeel } from "../types";

function feel(partial: FabricFeel): FabricFeel {
  return partial;
}

/**
 * Educational fabric / textile library for speaker cloth and softgoods.
 * Qualitative feel only — constructions and finishes vary widely.
 */
export const fabricMaterials = [
  mat({
    id: "speaker-cloth",
    name: "Speaker Grille Cloth",
    full: "Acoustically oriented speaker / grille fabric",
    family: "fabric",
    desc: "Open or semi-open woven/knit cloth used over speaker drivers and AV grilles where looks and acoustic transparency both matter.",
    applications: [
      "Speaker grilles",
      "AV / soundbar covers",
      "Acoustic panel faces",
    ],
    pros: [
      "Designed to stay relatively open to sound",
      "Hides drivers while keeping a finished look",
      "Available in many colors and weaves",
    ],
    cons: [
      "Too-tight weaves or heavy backings can dull high frequencies",
      "Dust and pet hair collect on open constructions",
      "Fire, outdoor, and stretch behavior are product-specific",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Decorative acoustic face cloth for speakers and grille openings.",
    propertyNotes: [
      "Acoustic openness depends on weave, yarn, and any backing",
      "Stretch-knit grille fabrics behave differently from stiff woven cloth",
    ],
    designConsiderations: [
      "Validate transparency with the actual driver and enclosure",
      "Plan mounting tension so the cloth does not sag or boom",
      "Softgoods sewing/bonding is outside the current process catalog",
    ],
    fabricFeel: feel({
      hand: "technical",
      drape: "moderate",
      stretch: "limited",
      breathability: "high",
      acousticOpenness: "open",
      constructionGuidance:
        "Prefer open weaves/knits without heavy coatings when acoustic transparency is the priority.",
      notes: [
        "Primary softgoods choice for speaker faces",
        "Backings and prints can close the acoustic path — check the finished stack-up",
      ],
    }),
  }),
  mat({
    id: "acoustic-mesh",
    name: "Acoustic Mesh",
    full: "Open mesh / spacer-style acoustic fabric",
    family: "fabric",
    desc: "Highly open mesh used when maximum airflow or sound passage is needed behind or instead of decorative cloth.",
    applications: [
      "Speaker vents",
      "Mic / grille inserts",
      "Breathable softgoods panels",
    ],
    pros: [
      "Very open structure for air and sound",
      "Lightweight",
      "Useful as a support or under-layer",
    ],
    cons: [
      "Shows more of what is behind it",
      "Can snag or look industrial",
      "Less “premium cloth” appearance than speaker gauze",
    ],
    processes: [],
    relativeCost: "low",
    summary:
      "Open mesh textile when transparency beats concealment.",
    propertyNotes: [
      "Hole size and yarn stiffness dominate both look and acoustics",
      "Often paired with a finer face cloth",
    ],
    designConsiderations: [
      "Use when concealment is secondary to openness",
      "Edge finishing matters — raw mesh frays",
    ],
    fabricFeel: feel({
      hand: "technical",
      drape: "stiff",
      stretch: "limited",
      breathability: "high",
      acousticOpenness: "open",
      constructionGuidance:
        "Specify aperture and yarn type; mesh is a structure, not a single SKU.",
      notes: [
        "Very open acoustic path",
        "Often a layer in a softgoods or grille stack, not the only visible surface",
      ],
    }),
  }),
  mat({
    id: "polyester-woven",
    name: "Polyester Woven",
    full: "Woven polyester softgoods fabric",
    family: "fabric",
    desc: "Workhorse woven polyester for bags, covers, apparel panels, and general softgoods shells.",
    applications: [
      "Bags and pouches",
      "Product covers",
      "Apparel / softgoods panels",
    ],
    pros: [
      "Durable and widely available",
      "Takes coatings, prints, and laminations well",
      "Good dimensional stability vs many knits",
    ],
    cons: [
      "Basic weaves can feel crisp rather than plush",
      "Acoustic openness is usually low unless designed as mesh",
      "Hand and drape depend heavily on denier and finish",
    ],
    processes: [],
    relativeCost: "low",
    summary:
      "General woven polyester for everyday softgoods constructions.",
    propertyNotes: [
      "Denier, weave, and DWR/coatings change performance dramatically",
      "Not interchangeable with stretch knits",
    ],
    designConsiderations: [
      "Call out coating, waterproofing, and print method early",
      "Allow seam and hem allowances in patterns",
    ],
    fabricFeel: feel({
      hand: "crisp",
      drape: "moderate",
      stretch: "none",
      breathability: "moderate",
      acousticOpenness: "closed",
      constructionGuidance:
        "Specify denier/weave/finish; shell fabrics are often laminated or coated for softgoods.",
      notes: [
        "Common softgoods shell fabric",
        "Poor speaker-cloth substitute unless specifically an open weave",
      ],
    }),
  }),
  mat({
    id: "nylon-ripstop",
    name: "Nylon Ripstop",
    full: "Ripstop nylon pack / softgoods fabric",
    family: "fabric",
    desc: "Lightweight nylon with a ripstop grid, common in packs, stuff sacks, and technical softgoods.",
    applications: [
      "Packs and stuff sacks",
      "Lightweight covers",
      "Technical softgoods shells",
    ],
    pros: [
      "Tear resistance from the ripstop grid",
      "Light for its toughness",
      "Familiar outdoor softgoods supply base",
    ],
    cons: [
      "Can be noisy / crinkly depending on coating",
      "UV and abrasion still need finish attention",
      "Not acoustically open",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Technical nylon softgoods fabric oriented to tear resistance and light weight.",
    propertyNotes: [
      "Calendering and coatings change hand from soft to papery",
      "Denier selection drives both durability and packability",
    ],
    designConsiderations: [
      "Match denier to abrasion expectation",
      "Seam sealing may be needed for weatherproof softgoods",
    ],
    fabricFeel: feel({
      hand: "technical",
      drape: "moderate",
      stretch: "none",
      breathability: "low",
      acousticOpenness: "closed",
      constructionGuidance:
        "Call out denier, ripstop spacing, and coating (PU/silicone/DWR) for softgoods duty.",
      notes: [
        "Strong pack/softgoods shell candidate",
        "Closed structure — not for speaker grilles",
      ],
    }),
  }),
  mat({
    id: "cotton-canvas",
    name: "Cotton Canvas",
    full: "Cotton canvas / twill softgoods fabric",
    family: "fabric",
    desc: "Natural-fiber woven canvas for totes, workwear-style softgoods, and casual covers.",
    applications: [
      "Totes and bags",
      "Casual covers",
      "Apparel-adjacent softgoods",
    ],
    pros: [
      "Familiar soft, matte hand",
      "Easy to sew and print for many softgoods shops",
      "Breathable in unfinished form",
    ],
    cons: [
      "Absorbs moisture and can mildew without finish",
      "Heavier than many synthetics at equal durability",
      "Not for acoustic transparency",
    ],
    processes: [],
    relativeCost: "low",
    summary:
      "Cotton canvas for casual softgoods with a natural hand.",
    propertyNotes: [
      "Waxed or coated canvas changes breathability and weather behavior",
      "Shrinkage and wash care must be specified",
    ],
    designConsiderations: [
      "Pre-shrink or specify finished goods washing rules",
      "Use synthetics if weather or weight is primary",
    ],
    fabricFeel: feel({
      hand: "soft",
      drape: "moderate",
      stretch: "none",
      breathability: "high",
      acousticOpenness: "closed",
      constructionGuidance:
        "Weight (oz/yd²) and weave (canvas vs twill) set structure; finishes change water behavior.",
      notes: [
        "Softgoods favorite for casual bags and covers",
        "Closed weave — not a speaker cloth",
      ],
    }),
  }),
  mat({
    id: "stretch-knit",
    name: "Stretch Knit",
    full: "Stretch knit jersey / performance knit",
    family: "fabric",
    desc: "Knitted stretch fabric for apparel softgoods, fitted covers, and products that need give.",
    applications: [
      "Apparel softgoods",
      "Fitted covers",
      "Wearable / wrap parts",
    ],
    pros: [
      "High stretch and recovery vs wovens",
      "Soft, conforming hand",
      "Good for contoured softgoods",
    ],
    cons: [
      "Edges curl and need finishing",
      "Dimensional control is harder than woven shells",
      "Acoustic behavior is usually closed unless an open knit",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Stretch knit family for conforming softgoods rather than stiff shells.",
    propertyNotes: [
      "Fiber blend (poly/spandex, nylon/spandex, cotton jersey) dominates feel",
      "Open athletic meshes are a different acoustic/breathability class",
    ],
    designConsiderations: [
      "Pattern for stretch; do not treat like woven canvas",
      "Specify stretch direction and recovery needs",
    ],
    fabricFeel: feel({
      hand: "soft",
      drape: "fluid",
      stretch: "high",
      breathability: "moderate",
      acousticOpenness: "semi-open",
      constructionGuidance:
        "State fiber blend, stretch %, and whether the knit is jersey, rib, or mesh.",
      notes: [
        "Best when softgoods must stretch and hug a form",
        "Only semi-open acoustically — not a dedicated speaker cloth",
      ],
    }),
  }),
  mat({
    id: "fleece",
    name: "Fleece",
    full: "Brushed fleece / pile softgoods knit",
    family: "fabric",
    desc: "Plush brushed knit used for linings, warmth layers, and soft tactile softgoods.",
    applications: [
      "Linings",
      "Warmth layers",
      "Soft cases and pouches",
    ],
    pros: [
      "Plush, soft hand",
      "Insulating loft",
      "Friendly for consumer softgoods interiors",
    ],
    cons: [
      "Pills depending on quality",
      "Bulk can fight slim product envelopes",
      "Acoustically absorptive / closed, not transparent",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Plush fleece for softgoods linings and tactile interiors.",
    propertyNotes: [
      "Anti-pill finishes and weight change longevity",
      "Often laminated to shells for cases",
    ],
    designConsiderations: [
      "Use as lining more often than as a speaker face",
      "Account for loft in zipper and seam clearances",
    ],
    fabricFeel: feel({
      hand: "plush",
      drape: "moderate",
      stretch: "moderate",
      breathability: "moderate",
      acousticOpenness: "closed",
      constructionGuidance:
        "Specify weight and anti-pill grade; fleece is a pile knit, not a woven shell.",
      notes: [
        "Softgoods lining workhorse",
        "Absorbs rather than passes sound — avoid as speaker grille cloth",
      ],
    }),
  }),
  mat({
    id: "spacer-mesh",
    name: "Spacer Mesh",
    full: "3D spacer mesh / sandwich knit",
    family: "fabric",
    desc: "Three-dimensional knit mesh that creates cushioned airflow channels for softgoods and pads.",
    applications: [
      "Backpack suspension",
      "Cushioned softgoods panels",
      "Breathable pads",
    ],
    pros: [
      "Built-in thickness and airflow",
      "Cushion without foam in some designs",
      "Technical softgoods look",
    ],
    cons: [
      "Bulkier than flat fabrics",
      "Edges need careful binding",
      "Not a fine decorative speaker cloth",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "3D spacer mesh for breathable cushioned softgoods panels.",
    propertyNotes: [
      "Thickness and compression come from the spacer monofilament layer",
      "Can be acoustically more open than solid foam pads",
    ],
    designConsiderations: [
      "Design edge binding early",
      "Check compression set under sustained load",
    ],
    fabricFeel: feel({
      hand: "technical",
      drape: "stiff",
      stretch: "limited",
      breathability: "high",
      acousticOpenness: "semi-open",
      constructionGuidance:
        "Specify overall thickness and face/back knit densities for softgoods cushioning.",
      notes: [
        "Great for breathable padded softgoods",
        "Semi-open — sometimes used near vents, rarely as fine speaker gauze",
      ],
    }),
  }),
  mat({
    id: "microfiber",
    name: "Microfiber",
    full: "Microfiber / suede-like softgoods fabric",
    family: "fabric",
    desc: "Fine-fiber woven or knit fabric with a soft, often suede-like hand for cases and consumer softgoods.",
    applications: [
      "Device sleeves",
      "Soft cases",
      "Interior linings",
    ],
    pros: [
      "Premium soft hand",
      "Good for scratch-conscious linings",
      "Printable / colorable for consumer goods",
    ],
    cons: [
      "Can show wear and staining",
      "Usually acoustically closed",
      "Quality varies widely by construction",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Soft microfiber for consumer softgoods cases and linings.",
    propertyNotes: [
      "Sueded faces hide minor scuffs better than shiny shells",
      "Not a substitute for open speaker cloth",
    ],
    designConsiderations: [
      "Specify cleanability if the product will be handled often",
      "Pair with a tougher outer shell when abrasion is high",
    ],
    fabricFeel: feel({
      hand: "soft",
      drape: "fluid",
      stretch: "limited",
      breathability: "low",
      acousticOpenness: "closed",
      constructionGuidance:
        "Call out woven vs knit microfiber and whether the face is sueded.",
      notes: [
        "Softgoods cases and linings",
        "Closed face — keeps dust out, blocks acoustic transparency",
      ],
    }),
  }),
  mat({
    id: "felt",
    name: "Felt",
    full: "Pressed / needled felt (wool or synthetic)",
    family: "fabric",
    desc: "Nonwoven felt for pads, dampers, liners, and soft industrial softgoods details.",
    applications: [
      "Pads and dampers",
      "Liners",
      "Craft / soft industrial details",
    ],
    pros: [
      "Cuts cleanly into shapes",
      "Useful damping and cushion in thin sections",
      "No fray like woven edges",
    ],
    cons: [
      "Limited tensile strength vs woven shells",
      "Absorbs moisture depending on fiber",
      "Acoustically absorptive, not transparent",
    ],
    processes: ["cnc"],
    relativeCost: "low",
    summary:
      "Nonwoven felt for pads, liners, and damping softgoods details.",
    propertyNotes: [
      "Wool vs polyester felts differ in resilience and moisture behavior",
      "Density drives both cushion and acoustic absorption",
    ],
    designConsiderations: [
      "Good for cut gaskets/pads that are not elastomer seals",
      "Avoid as a speaker face if you need acoustic transparency",
    ],
    fabricFeel: feel({
      hand: "plush",
      drape: "stiff",
      stretch: "none",
      breathability: "low",
      acousticOpenness: "closed",
      constructionGuidance:
        "Specify fiber, density, and thickness; felt is nonwoven, not a drape fabric.",
      notes: [
        "Softgoods pads and dampers",
        "Absorbs sound energy — opposite of open speaker cloth",
      ],
    }),
  }),
  mat({
    id: "outdoor-acrylic",
    name: "Outdoor Acrylic Textile",
    full: "Solution-dyed acrylic outdoor fabric",
    family: "fabric",
    desc: "UV-oriented acrylic outdoor textile for awnings, marine softgoods, and weather-facing covers.",
    applications: [
      "Awnings",
      "Outdoor covers",
      "Marine softgoods",
    ],
    pros: [
      "Strong outdoor colorfastness in solution-dyed forms",
      "Familiar weather softgoods category",
      "More outdoor-ready than commodity cotton",
    ],
    cons: [
      "Stiffer hand than apparel knits",
      "Not acoustically open",
      "Cost higher than basic polyester in many cases",
    ],
    processes: [],
    relativeCost: "high",
    summary:
      "Outdoor acrylic textiles for weather-facing softgoods.",
    propertyNotes: [
      "Solution dyeing improves UV color hold vs piece-dyed fabrics",
      "Coatings and weaves change water shedding",
    ],
    designConsiderations: [
      "Specify outdoor rating and water behavior explicitly",
      "Hardware and seam design dominate real weather performance",
    ],
    fabricFeel: feel({
      hand: "crisp",
      drape: "stiff",
      stretch: "none",
      breathability: "low",
      acousticOpenness: "closed",
      constructionGuidance:
        "Prefer solution-dyed acrylic constructions for long outdoor exposure softgoods.",
      notes: [
        "Outdoor softgoods / cover fabric",
        "Closed weave for weather — not speaker grille cloth",
      ],
    }),
  }),
  mat({
    id: "neoprene-laminate",
    name: "Neoprene Laminate",
    full: "Fabric-faced neoprene softgoods laminate",
    family: "fabric",
    desc: "Foam-rubber core laminated to jersey or other faces — classic softgoods for sleeves, koozies, and padded wraps.",
    applications: [
      "Device sleeves",
      "Padded wraps",
      "Sports softgoods",
    ],
    pros: [
      "Cushion + stretch in one sheet",
      "Familiar consumer softgoods construction",
      "Sewable with the right needles and techniques",
    ],
    cons: [
      "Bulk and heat retention",
      "Edges expose foam unless bound",
      "Acoustically closed / dampening",
    ],
    processes: [],
    relativeCost: "moderate",
    summary:
      "Fabric-faced neoprene sheets for padded stretch softgoods.",
    propertyNotes: [
      "Face fabric (jersey, polyester) sets exterior hand",
      "Thickness of the neoprene core sets cushion",
    ],
    designConsiderations: [
      "Bind or overlock edges for durability",
      "Not a speaker cloth — use for padded softgoods only",
    ],
    fabricFeel: feel({
      hand: "plush",
      drape: "moderate",
      stretch: "high",
      breathability: "low",
      acousticOpenness: "closed",
      constructionGuidance:
        "Specify foam thickness and face/back textiles; this is a laminate softgoods sheet.",
      notes: [
        "Padded softgoods workhorse",
        "Closed acoustic behavior — dampens rather than passes sound",
      ],
    }),
  }),
];

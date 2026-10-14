import { proc } from "./_shared";

/** Educational process library — volumes/tooling are qualitative guidance. */
export const processCatalog = [
  proc({
    id: "injection",
    name: "Injection Molding",
    family: "Molding",
    desc: "Melt resin pellets and inject into a closed mold to produce repeatable parts.",
    best: "Detailed housings, ribs, bosses and snap features",
    pros: [
      "Good repeatability",
      "Integrated details",
      "Strong economics at sufficient volume",
    ],
    cons: [
      "Higher initial mold investment",
      "Draft and tooling access constraints",
      "Tool changes can be expensive",
    ],
    steps: [
      "Dry and prepare resin where required",
      "Plasticize and inject into mold",
      "Pack, cool and solidify",
      "Eject, inspect and finish",
    ],
    typicalVolumes:
      "Often economical from mid to high volume once tooling is amortized (qualitative — verify with quotes).",
    tooling: [
      "Hard or soft molds depending on volume and resin",
      "Hot/cold runner choices affect cost and waste",
      "Side actions add complexity and cost",
    ],
    costDrivers: [
      "Mold complexity and cavitation",
      "Cycle time and resin price",
      "Secondary finishing and inspection",
    ],
    dfm: [
      "Maintain uniform wall thickness where practical",
      "Add draft for ejection",
      "Place gates and knit lines away from high-stress cosmetics",
    ],
    illustration: "molding",
  }),
  proc({
    id: "rim",
    name: "Reaction Injection Molding (RIM)",
    family: "Molding",
    desc: "Meter reactive liquid components into a mold where they polymerize into a finished part.",
    best: "Large, stiff covers and enclosures with lower clamp forces than thermoplastic injection",
    pros: [
      "Useful for larger parts with moderate tooling pressure",
      "Can integrate stiffening structures",
      "Good for low-to-mid volume large covers",
    ],
    cons: [
      "Chemistry and process control are specialized",
      "Surface finish systems may be required",
      "Not a drop-in for all thermoplastic geometries",
    ],
    steps: [
      "Prepare and meter reactive components",
      "Inject into closed mold",
      "Allow reaction/cure",
      "Demold, trim, and finish",
    ],
    typicalVolumes:
      "Often used for large parts at low-to-mid volumes (qualitative).",
    tooling: [
      "Lower-pressure tooling than many thermoplastic molds",
      "Mold temperature control affects cure and cosmetics",
    ],
    costDrivers: [
      "Part size and chemistry",
      "Cycle/cure time",
      "Finishing and paint systems",
    ],
    dfm: [
      "Design for demold and trim access",
      "Plan ribs and bosses with RIM flow in mind",
      "Define cosmetic Class requirements early",
    ],
    illustration: "molding",
  }),
  proc({
    id: "compression",
    name: "Compression Molding",
    family: "Molding",
    desc: "Place a charge in a heated mold and close under pressure to form thermoset or composite parts.",
    best: "SMC/BMC panels, seals, and semi-structural covers",
    pros: [
      "Suited to fiber-filled thermosets and elastomers",
      "Good for larger flat/curved panels",
      "Can be economical at production volume",
    ],
    cons: [
      "Flash and trim operations common",
      "Detail resolution differs from injection",
      "Charge placement affects knit lines",
    ],
    steps: [
      "Prepare charge (sheet, bulk, or preform)",
      "Load into heated mold",
      "Close, press, and cure",
      "Demold, deflash, and finish",
    ],
    typicalVolumes:
      "From development tools to high-volume automotive/industrial panels (qualitative).",
    tooling: [
      "Heated matched metal molds",
      "Ejector and vacuum assists as needed",
    ],
    costDrivers: [
      "Mold size and temperature control",
      "Cycle/cure time",
      "Material scrap and finishing",
    ],
    dfm: [
      "Design for flow and knit-line locations",
      "Allow for flash trim",
      "Specify surface/paint expectations with the molder",
    ],
    illustration: "molding",
  }),
  proc({
    id: "blow",
    name: "Blow Molding",
    family: "Molding",
    desc: "Inflate a heated parison or preform against a mold to create hollow parts.",
    best: "Bottles, tanks, and hollow containers",
    pros: [
      "Efficient for hollow thin-wall parts",
      "Wide packaging industry base",
      "Multiple process variants (extrusion, injection, stretch)",
    ],
    cons: [
      "Limited for complex solid internals",
      "Wall thickness distribution needs control",
      "Not ideal for many enclosure geometries",
    ],
    steps: [
      "Form a parison or preform",
      "Clamp in mold",
      "Inflate to shape and cool",
      "Trim flash and finish",
    ],
    typicalVolumes:
      "Very common at packaging production volumes; also used for industrial tanks (qualitative).",
    tooling: [
      "Mold halves sized to the hollow form",
      "Trim tooling for flash and necks",
    ],
    costDrivers: [
      "Resin and cycle time",
      "Mold complexity and multi-cavity tooling",
      "Secondary decorating",
    ],
    dfm: [
      "Design for blow ratio and wall distribution",
      "Provide draft and avoid trapped geometries",
      "Detail necks/threads with process capability in mind",
    ],
    illustration: "molding",
  }),
  proc({
    id: "rotomold",
    name: "Rotational Molding",
    family: "Molding",
    desc: "Tumble powdered polymer in a heated mold to build hollow, stress-relatively-uniform parts.",
    best: "Large tanks, kayaks, and hollow industrial containers",
    pros: [
      "Low-pressure tooling relative to injection",
      "Good for large hollow parts",
      "Uniform walls without parison programming",
    ],
    cons: [
      "Longer cycles",
      "Limited fine detail vs injection",
      "Material options narrower than injection molding",
    ],
    steps: [
      "Charge powder into mold",
      "Heat while biaxially rotating",
      "Cool while rotating",
      "Demold and finish",
    ],
    typicalVolumes:
      "Often low-to-mid volume for large hollow parts (qualitative).",
    tooling: [
      "Fabricated or cast molds, typically lower pressure",
      "Venting and parting line design matter",
    ],
    costDrivers: [
      "Cycle time (heat/cool)",
      "Part size and mold count",
      "Secondary machining of openings",
    ],
    dfm: [
      "Avoid sharp external corners",
      "Design generous radii",
      "Plan inserts and openings carefully",
    ],
    illustration: "molding",
  }),
  proc({
    id: "thermo",
    name: "Thermoforming",
    family: "Sheet forming",
    desc: "Heat plastic sheet, form it over or into a tool, cool, then trim.",
    best: "Open-backed shells, trays and covers",
    pros: [
      "Relatively accessible tooling for simple shapes",
      "Good sheet-side appearance",
      "Scales well for shallow shells",
    ],
    cons: [
      "Limited molded-in internal details",
      "Trimming and sheet waste matter",
      "Thickness varies after forming",
    ],
    steps: [
      "Heat a compatible plastic sheet",
      "Form over or into a tool using vacuum/pressure",
      "Cool and release the part",
      "Trim edges and openings",
    ],
    typicalVolumes:
      "Prototype to high volume for trays/covers depending on automation (qualitative).",
    tooling: [
      "Male/female tools; aluminum common for mid volume",
      "Trim fixtures or CNC/router paths",
    ],
    costDrivers: [
      "Sheet utilization and trim scrap",
      "Tooling and plug assists",
      "Labor vs automated trim",
    ],
    dfm: [
      "Limit draw depth and sharp features",
      "Allow for thinning on corners",
      "Design trim lines accessibly",
    ],
    illustration: "forming",
  }),
  proc({
    id: "cnc",
    name: "CNC Machining",
    family: "Subtractive",
    desc: "Remove material from solid stock using computer-controlled cutting tools.",
    best: "Precise simple parts, fixtures and some prototypes",
    pros: [
      "No dedicated mold",
      "Good precision potential",
      "Many stock materials",
    ],
    cons: [
      "Waste from stock removal",
      "Undercut/tool access limitations",
      "Can be expensive for thin shells",
    ],
    steps: [
      "Select stock and fixturing",
      "Program cutting operations",
      "Machine the part",
      "Deburr and inspect",
    ],
    typicalVolumes:
      "Prototypes and low-to-mid volume; bridges to molding (qualitative).",
    tooling: [
      "Fixtures and soft jaws",
      "Standard cutting tools; specialty cutters as needed",
    ],
    costDrivers: [
      "Machine time and setups",
      "Material buy-to-fly ratio",
      "Tolerance and inspection requirements",
    ],
    dfm: [
      "Provide tool access and avoid deep narrow pockets when possible",
      "Standardize radii to tool sizes",
      "Tolerate non-critical faces more loosely",
    ],
    illustration: "subtractive",
  }),
  proc({
    id: "sheet-metal",
    name: "Sheet Metal Fabrication",
    family: "Sheet metal",
    desc: "Cut, bend, and join sheet stock into brackets, enclosures, and chassis.",
    best: "Metal enclosures, brackets, and chassis",
    pros: [
      "Fast iteration with laser/punch + brake",
      "Strong for thin-wall metal structures",
      "Scalable with hard tooling later",
    ],
    cons: [
      "Bend relief and springback constraints",
      "Not ideal for highly organic solids",
      "Welding/finishing add cost",
    ],
    steps: [
      "Cut flat pattern",
      "Bend/form features",
      "Join (weld, rivet, PEM hardware)",
      "Finish and inspect",
    ],
    typicalVolumes:
      "Prototypes to high volume; hard tooling for stamping at scale (qualitative).",
    tooling: [
      "Soft tooling for proto; progressive dies for volume",
      "Brake tooling and weld fixtures",
    ],
    costDrivers: [
      "Material thickness and grade",
      "Number of bends and secondary ops",
      "Finishing (powder coat, plating)",
    ],
    dfm: [
      "Respect minimum flange and bend radii",
      "Keep consistent bend directions when possible",
      "Design self-fixturing tabs carefully",
    ],
    illustration: "sheet",
  }),
  proc({
    id: "stamping",
    name: "Stamping",
    family: "Sheet metal",
    desc: "Form sheet metal in powered presses using dies for high-volume repeatable parts.",
    best: "High-volume brackets, shields, and stamped housings",
    pros: [
      "Very low piece price at volume",
      "High repeatability",
      "Can combine blank, pierce, and form ops",
    ],
    cons: [
      "High tooling investment",
      "Design changes are expensive after die build",
      "Limited to stampable geometries",
    ],
    steps: [
      "Feed coil or blanks",
      "Progress through die stations",
      "Eject stamped parts",
      "Secondary finish as required",
    ],
    typicalVolumes:
      "Typically justified at higher production volumes (qualitative).",
    tooling: [
      "Progressive or transfer dies",
      "Press selection by tonnage and bed size",
    ],
    costDrivers: [
      "Die design and maintenance",
      "Coil utilization",
      "Press time and secondary ops",
    ],
    dfm: [
      "Design for progressive strip layout",
      "Avoid features that need impossible forms",
      "Freeze design before hard tooling",
    ],
    illustration: "sheet",
  }),
  proc({
    id: "extrusion",
    name: "Extrusion",
    family: "Continuous forming",
    desc: "Force material through a die to create continuous profiles later cut to length.",
    best: "Profiles, tubing, channels, and linear stock",
    pros: [
      "Excellent for constant cross-sections",
      "Good material efficiency for profiles",
      "Works for plastics, metals, and elastomers (process variants)",
    ],
    cons: [
      "Limited to extruded shapes",
      "Die development needed for custom profiles",
      "Secondary ops for holes/features",
    ],
    steps: [
      "Prepare feedstock",
      "Push through shaped die",
      "Cool/calibrate profile",
      "Cut to length and finish",
    ],
    typicalVolumes:
      "Economical once die is ready; common from mid volume upward (qualitative).",
    tooling: [
      "Extrusion dies and calibrators",
      "Puller and cut-off equipment",
    ],
    costDrivers: [
      "Die complexity",
      "Line speed and scrap",
      "Secondary machining/punching",
    ],
    dfm: [
      "Keep wall thicknesses as uniform as practical",
      "Avoid unsupported thin legs",
      "Design snap/fit features compatible with extruded tolerances",
    ],
    illustration: "forming",
  }),
  proc({
    id: "die-casting",
    name: "Die Casting",
    family: "Casting",
    desc: "Inject molten metal into a steel die under pressure for detailed net-shape parts.",
    best: "High-volume zinc/aluminum housings and hardware",
    pros: [
      "Detailed features and thin walls possible",
      "High production rates",
      "Good dimensional repeatability in production",
    ],
    cons: [
      "High tooling cost",
      "Porosity and cosmetics need process control",
      "Alloy set is limited vs machining any stock",
    ],
    steps: [
      "Melt and meter alloy",
      "Inject into die",
      "Solidify and eject",
      "Trim, machine critical features, finish",
    ],
    typicalVolumes:
      "Usually mid-to-high volume to justify dies (qualitative).",
    tooling: [
      "Hardened dies with cooling and ejection",
      "Trim dies for flash",
    ],
    costDrivers: [
      "Die complexity and life",
      "Alloy and cycle time",
      "Secondary machining/plating",
    ],
    dfm: [
      "Provide draft and uniform sections",
      "Locate ejector pins thoughtfully",
      "Plan machining stock only where needed",
    ],
    illustration: "casting",
  }),
  proc({
    id: "sand-casting",
    name: "Sand Casting",
    family: "Casting",
    desc: "Form a sand mold around a pattern, pour metal, then break out the casting.",
    best: "Large metal parts and lower-volume housings/frames",
    pros: [
      "Flexible for large geometries",
      "Lower tooling cost than die casting",
      "Wide alloy possibilities",
    ],
    cons: [
      "Coarser surfaces and tolerances vs die casting/CNC",
      "More machining stock often required",
      "Labor and variability depend on foundry practice",
    ],
    steps: [
      "Build pattern and mold",
      "Pour molten metal",
      "Shake out and remove gates",
      "Heat treat/machine as required",
    ],
    typicalVolumes:
      "Prototypes through moderate production, especially for large parts (qualitative).",
    tooling: [
      "Patterns and core boxes",
      "Flask/molding equipment at the foundry",
    ],
    costDrivers: [
      "Part size and alloy",
      "Core complexity",
      "Machining of datums and interfaces",
    ],
    dfm: [
      "Add draft and machining stock",
      "Avoid isolated heavy sections that shrink",
      "Design gates/risers with the foundry",
    ],
    illustration: "casting",
  }),
  proc({
    id: "investment-casting",
    name: "Investment Casting",
    family: "Casting",
    desc: "Lost-wax style process for detailed metal parts with better surfaces than many sand castings.",
    best: "Complex metal parts needing finer detail than sand casting",
    pros: [
      "Good detail and surface relative to sand casting",
      "Complex internal passages possible with cores",
      "Broad alloy range including stainless and superalloys",
    ],
    cons: [
      "Higher cost than simple sand casting for many parts",
      "Size limits vs very large sand castings",
      "Lead time for tooling/patterns",
    ],
    steps: [
      "Inject/build wax pattern",
      "Build ceramic shell",
      "Burn out wax and pour metal",
      "Knockout, cut gates, finish",
    ],
    typicalVolumes:
      "From low volume specialty parts to production runs (qualitative).",
    tooling: [
      "Wax injection dies or printed patterns",
      "Shell room and foundry process controls",
    ],
    costDrivers: [
      "Alloy and part complexity",
      "Yield and scrap",
      "Secondary machining",
    ],
    dfm: [
      "Design for wax injection and shell strength",
      "Minimize ultra-thin unsupported walls",
      "Locate gates with cosmetics in mind",
    ],
    illustration: "casting",
  }),
  proc({
    id: "forging",
    name: "Forging",
    family: "Deformation",
    desc: "Shape metal using compressive force, often improving grain flow for structural parts.",
    best: "High-strength structural metal components",
    pros: [
      "Favorable grain flow for many structural uses",
      "Good toughness potential vs some castings",
      "Scalable with impression dies",
    ],
    cons: [
      "Tooling for closed-die forging can be costly",
      "Geometry constraints vs machining from billet",
      "Secondary machining usually required",
    ],
    steps: [
      "Heat billet (for hot forging)",
      "Form in dies or under hammer/press",
      "Trim flash",
      "Heat treat and machine",
    ],
    typicalVolumes:
      "Open-die for low volume; closed-die for higher volume (qualitative).",
    tooling: [
      "Impression dies for closed-die work",
      "Fixtures for machining forged blanks",
    ],
    costDrivers: [
      "Die sets and die life",
      "Material utilization",
      "Heat treat and machining",
    ],
    dfm: [
      "Design forgeable envelopes with draft",
      "Allow machining stock on critical faces",
      "Avoid features that block metal flow",
    ],
    illustration: "deformation",
  }),
  proc({
    id: "fdm",
    name: "FDM 3D Printing",
    family: "Additive",
    desc: "Deposit thermoplastic filament in layers to build a part without dedicated molds.",
    best: "Prototypes and low-volume geometrically complex parts",
    pros: [
      "No mold tooling",
      "Fast design iteration",
      "Good for small runs",
    ],
    cons: [
      "Visible layer lines",
      "Build time per part",
      "Anisotropic properties and support cleanup",
    ],
    steps: [
      "Orient and slice 3D geometry",
      "Prepare filament and printer",
      "Print layer by layer",
      "Remove supports and finish",
    ],
    typicalVolumes:
      "Prototypes and low volume; economics worsen as quantity rises (qualitative).",
    tooling: [
      "No part-specific mold; fixtures optional",
      "Printer/material system selection matters",
    ],
    costDrivers: [
      "Machine time and labor",
      "Support material and finishing",
      "Failure/reprint rate",
    ],
    dfm: [
      "Orient for strength and cosmetics",
      "Minimize steep overhangs or plan supports",
      "Design for layer anisotropy",
    ],
    illustration: "additive",
  }),
  proc({
    id: "sla",
    name: "SLA / Resin Additive",
    family: "Additive",
    desc: "Cure photopolymer resin with light to build detailed prototypes and patterns.",
    best: "High-detail prototypes, masters, and cosmetic concept models",
    pros: [
      "Fine feature resolution",
      "Smooth as-printed surfaces relative to FDM",
      "Useful for form/fit models and casting patterns",
    ],
    cons: [
      "Resin mechanical/UV limits vary widely",
      "Post-cure and cleaning required",
      "Long-term durability is material-specific",
    ],
    steps: [
      "Orient and support the model",
      "Print in resin vat",
      "Wash and post-cure",
      "Remove supports and finish",
    ],
    typicalVolumes:
      "Primarily prototypes and very low volume (qualitative).",
    tooling: ["Build platforms and support strategies; no production mold"],
    costDrivers: [
      "Resin cost and print time",
      "Labor for wash/cure/finish",
      "Support scarring rework",
    ],
    dfm: [
      "Design drainage for cups and cavities",
      "Plan support touch-points on non-cosmetic faces",
      "Validate resin for functional loads",
    ],
    illustration: "additive",
  }),
  proc({
    id: "sls",
    name: "SLS (Selective Laser Sintering)",
    family: "Additive",
    desc: "Fuse polymer powder with a laser to build durable nested parts without dedicated supports.",
    best: "Functional nylon parts and complex low-volume geometries",
    pros: [
      "No support structures in many polymer SLS workflows",
      "Good for complex organic shapes",
      "Nesting improves machine utilization",
    ],
    cons: [
      "Powdery surface finish",
      "Material set narrower than FDM filaments",
      "Thermal history can affect dimensions",
    ],
    steps: [
      "Nest parts in the powder bed",
      "Laser-sinter layer by layer",
      "Cool the cake",
      "Break out, bead blast, and finish",
    ],
    typicalVolumes:
      "Low-to-mid volume production for suitable nylon parts (qualitative).",
    tooling: ["No part mold; packing density matters for cost"],
    costDrivers: [
      "Bed utilization / nesting",
      "Powder refresh rates",
      "Finishing (dye, vapor smooth, machine)",
    ],
    dfm: [
      "Design for powder removal from cavities",
      "Mind wall thickness guidelines from the bureau",
      "Allow for growth/shrinkage compensation",
    ],
    illustration: "additive",
  }),
  proc({
    id: "mjf",
    name: "Multi Jet Fusion (MJF)",
    family: "Additive",
    desc: "Powder-bed polymer process using detailing agents and heat for functional production parts.",
    best: "Functional nylon housings and complex low-to-mid volume parts",
    pros: [
      "Good mechanical consistency for many PA parts",
      "Efficient nesting",
      "Faster cooling/turnaround than some SLS workflows in practice",
    ],
    cons: [
      "Gray/black cosmetics often need dyeing",
      "Bureau process parameters matter",
      "Not universal for all polymers",
    ],
    steps: [
      "Nest parts in powder",
      "Print with agents and fusing energy",
      "Cool and unpack",
      "Bead blast and finish",
    ],
    typicalVolumes:
      "Low-to-mid volume production candidates for PA parts (qualitative).",
    tooling: ["No part-specific mold; packing density drives cost"],
    costDrivers: [
      "Nesting efficiency",
      "Material and refresh",
      "Dye/vapor/machine finishing",
    ],
    dfm: [
      "Follow wall and gap guidelines from the manufacturer/bureau",
      "Design for powder escape",
      "Plan cosmetic finishing if appearance matters",
    ],
    illustration: "additive",
  }),
];

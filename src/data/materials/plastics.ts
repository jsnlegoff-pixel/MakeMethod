import { mat } from "./_shared";

/** Educational plastic library — qualitative properties only. */
export const plasticMaterials = [
  mat({
    id: "hips",
    name: "HIPS",
    full: "High Impact Polystyrene",
    family: "plastic",
    desc: "Affordable, formable thermoplastic for lightweight indoor covers, packaging, and display components.",
    applications: ["Indoor covers", "Packaging inserts", "Display components"],
    pros: [
      "Low relative material cost",
      "Readily thermoformed from sheet",
      "Good cosmetic finishes",
    ],
    cons: [
      "Limited heat resistance",
      "Lower toughness than many ABS grades",
      "Poor unmodified UV durability",
    ],
    processes: ["thermo", "injection", "extrusion"],
    relativeCost: "low",
    summary:
      "Rigid styrenic plastic with useful impact toughness for light-duty indoor parts.",
    propertyNotes: [
      "Generally easier to form than many engineering plastics",
      "UV and heat performance are grade- and environment-dependent",
    ],
    designConsiderations: [
      "Prefer indoor use unless a stabilized grade is confirmed",
      "Account for sheet thinning in deep thermoformed draws",
    ],
  }),
  mat({
    id: "abs",
    name: "ABS",
    full: "Acrylonitrile Butadiene Styrene",
    family: "plastic",
    desc: "General-purpose engineering thermoplastic for durable consumer housings and molded components.",
    applications: ["Consumer housings", "Appliance parts", "Prototypes"],
    pros: ["Good impact toughness", "Attractive finishes", "Widely available"],
    cons: [
      "Standard grades have limited UV durability",
      "Higher material cost than HIPS in many cases",
      "Property variation by grade",
    ],
    processes: ["thermo", "injection", "fdm", "cnc", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Balanced toughness and appearance for many consumer and light industrial housings.",
    propertyNotes: [
      "Impact and heat performance vary widely by grade",
      "Outdoor use usually needs UV-capable formulations or coatings",
    ],
    designConsiderations: [
      "Design for draft and uniform walls in injection molding",
      "Validate painted or plated finishes with the selected grade",
    ],
  }),
  mat({
    id: "pc",
    name: "PC",
    full: "Polycarbonate",
    family: "plastic",
    desc: "Tough, often transparent engineering thermoplastic used where impact resistance and clarity matter.",
    applications: [
      "Clear covers",
      "Safety glazing-style parts",
      "Electronics housings",
    ],
    pros: [
      "High toughness potential",
      "Useful optical clarity in many grades",
      "Good dimensional stability vs some commodity plastics",
    ],
    cons: [
      "Higher relative resin cost",
      "Sensitive to some chemicals and stress cracking",
      "Processing windows can be demanding",
    ],
    processes: ["injection", "cnc", "thermo", "fdm", "extrusion"],
    relativeCost: "high",
    summary:
      "Engineering plastic often chosen for toughness and clarity rather than lowest cost.",
    propertyNotes: [
      "Chemical resistance is application-specific — verify solvents and cleaners",
      "Flame-retardant and optical grades differ substantially",
    ],
    designConsiderations: [
      "Avoid sharp corners that concentrate stress",
      "Dry resin properly before molding when required by the grade",
    ],
  }),
  mat({
    id: "pcabs",
    name: "PC/ABS",
    full: "Polycarbonate / ABS Blend",
    family: "plastic",
    desc: "Engineering blend used in consumer and electronics housings requiring a balance of toughness and appearance.",
    applications: ["Electronics housings", "Automotive interior trim", "Appliances"],
    pros: [
      "Good toughness",
      "Useful cosmetic potential",
      "Grade-specific flame-retardant options",
    ],
    cons: [
      "Higher resin cost",
      "Processing and shrinkage depend on grade",
      "May be unnecessary for light-duty shells",
    ],
    processes: ["injection", "cnc"],
    relativeCost: "high",
    summary:
      "Blend intended to combine PC toughness with ABS processability/appearance traits.",
    propertyNotes: [
      "Exact balance of stiffness, heat, and impact is grade-specific",
      "Flame ratings must be confirmed on the finished part geometry",
    ],
    designConsiderations: [
      "Match wall thickness and gate strategy to blend shrinkage behavior",
      "Confirm color and surface requirements early",
    ],
  }),
  mat({
    id: "pp",
    name: "PP",
    full: "Polypropylene",
    family: "plastic",
    desc: "Lightweight, chemical-resistant thermoplastic used in packaging, containers, and molded parts.",
    applications: ["Containers", "Living hinges", "Automotive interior parts"],
    pros: [
      "Low density",
      "Good chemical resistance",
      "Potentially low material cost",
    ],
    cons: [
      "Difficult to bond or paint",
      "Shrinkage/warpage require attention",
      "Lower stiffness than some alternatives",
    ],
    processes: ["injection", "cnc", "blow", "extrusion", "rotomold"],
    relativeCost: "low",
    summary:
      "Commodity polyolefin valued for density, chemistry, and cost in many packaging and durable goods.",
    propertyNotes: [
      "Filled and copolymer grades change stiffness and impact substantially",
      "Surface energy makes bonding/painting challenging without treatment",
    ],
    designConsiderations: [
      "Allow for higher shrinkage than many engineering plastics",
      "Living-hinge designs need geometry and grade validation",
    ],
  }),
  mat({
    id: "hdpe",
    name: "HDPE",
    full: "High-Density Polyethylene",
    family: "plastic",
    desc: "Tough polyolefin for bottles, tanks, and durable goods needing chemical resistance.",
    applications: ["Bottles", "Tanks", "Industrial containers"],
    pros: [
      "Good chemical resistance",
      "Toughness for many container uses",
      "Common in blow and rotational molding",
    ],
    cons: [
      "Lower stiffness than many engineering plastics",
      "Poor paint adhesion without treatment",
      "Limited high-temperature capability in unmodified grades",
    ],
    processes: ["blow", "rotomold", "extrusion", "injection", "cnc"],
    relativeCost: "low",
    summary:
      "Dense polyethylene family member widely used for hollow and chemical-service parts.",
    propertyNotes: [
      "Density and molecular weight distributions change processability",
      "ESCR (environmental stress crack resistance) is grade-dependent",
    ],
    designConsiderations: [
      "Design hollow parts with process-specific wall distribution in mind",
      "Plan for welding/assembly methods compatible with polyolefins",
    ],
  }),
  mat({
    id: "ldpe",
    name: "LDPE",
    full: "Low-Density Polyethylene",
    family: "plastic",
    desc: "Flexible polyethylene used in films, squeezable packaging, and soft molded goods.",
    applications: ["Films", "Squeeze bottles", "Flexible packaging"],
    pros: [
      "High flexibility",
      "Good for film and soft packaging",
      "Generally low relative cost",
    ],
    cons: [
      "Low stiffness",
      "Limited structural use",
      "Heat and creep limits for load-bearing parts",
    ],
    processes: ["extrusion", "blow", "injection"],
    relativeCost: "low",
    summary:
      "Softer polyethylene suited to flexible packaging more than rigid housings.",
    propertyNotes: [
      "Often selected for flexibility rather than modulus",
      "Barrier and clarity needs may require multilayer constructions",
    ],
    designConsiderations: [
      "Not a first choice for precise rigid mechanical features",
      "Confirm food-contact or regulatory needs with the grade supplier",
    ],
  }),
  mat({
    id: "pet",
    name: "PET",
    full: "Polyethylene Terephthalate",
    family: "plastic",
    desc: "Common polyester for bottles, trays, and fibers; also used in engineering forms.",
    applications: ["Beverage bottles", "Thermoformed trays", "Fibers"],
    pros: [
      "Good clarity in many packaging grades",
      "Useful barrier characteristics for packaging",
      "Broad packaging industry familiarity",
    ],
    cons: [
      "Moisture sensitivity in some processing routes",
      "Not always ideal for thick structural housings",
      "Recycling stream and grade choices vary by region",
    ],
    processes: ["blow", "thermo", "extrusion", "injection"],
    relativeCost: "moderate",
    summary:
      "Packaging-focused polyester with engineering variants for molded and sheet uses.",
    propertyNotes: [
      "Amorphous vs crystalline forms behave differently",
      "Drying and process control matter for molded grades",
    ],
    designConsiderations: [
      "Match process (stretch-blow, thermoform, injection) to geometry",
      "Validate thermal history for dimensional stability",
    ],
  }),
  mat({
    id: "petg",
    name: "PETG",
    full: "Polyethylene Terephthalate Glycol-modified",
    family: "plastic",
    desc: "Tough, easy-to-process thermoplastic used in printing, sheet forming, and clear covers.",
    applications: ["Clear covers", "FDM parts", "Point-of-purchase displays"],
    pros: [
      "Useful toughness",
      "FDM-friendly grades",
      "Sheet grades can be thermoformed",
    ],
    cons: [
      "Surface can scratch",
      "Heat performance is grade-dependent",
      "FDM layer lines may require finishing",
    ],
    processes: ["fdm", "thermo", "cnc", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Glycol-modified PET often chosen for toughness and processability in sheet and print.",
    propertyNotes: [
      "Scratch and heat behavior vary by grade and thickness",
      "Clarity and toughness are typical selection drivers",
    ],
    designConsiderations: [
      "Protect cosmetic faces during forming and trimming",
      "For FDM, plan orientation for strength and appearance",
    ],
  }),
  mat({
    id: "pla",
    name: "PLA",
    full: "Polylactic Acid",
    family: "plastic",
    desc: "Common FDM filament for prototypes and light-duty products.",
    applications: ["Prototypes", "Display models", "Light-duty printed parts"],
    pros: [
      "Easy to print",
      "Wide color availability",
      "No dedicated mold required",
    ],
    cons: [
      "Low heat resistance in many grades",
      "Layer-dependent strength",
      "Post-processing for smooth surfaces",
    ],
    processes: ["fdm"],
    relativeCost: "low",
    summary:
      "Bio-based polyester popular in additive prototyping more than demanding service environments.",
    propertyNotes: [
      "Heat deflection is often a limiting factor for end-use parts",
      "Mechanical performance is strongly process- and orientation-dependent",
    ],
    designConsiderations: [
      "Treat many PLA prints as prototypes unless validated for service",
      "Mind storage humidity for filament quality",
    ],
  }),
  mat({
    id: "pom",
    name: "POM",
    full: "Polyoxymethylene (Acetal)",
    family: "plastic",
    desc: "Low-friction engineering plastic for precision gears, bushings, and snap features.",
    applications: ["Gears", "Bushings", "Precision snap fits"],
    pros: [
      "Good wear/friction characteristics in many grades",
      "Useful dimensional stability for precision parts",
      "Machinable for prototypes and short runs",
    ],
    cons: [
      "Chemical and UV limitations by grade",
      "Can be notch-sensitive",
      "Processing and emissions considerations need controls",
    ],
    processes: ["injection", "cnc", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Engineering acetal family often used where sliding wear and precision matter.",
    propertyNotes: [
      "Homopolymer vs copolymer grades trade heat, toughness, and chemistry",
      "Filled grades alter wear and stiffness — verify datasheets",
    ],
    designConsiderations: [
      "Avoid sharp notches in loaded features",
      "Account for mold shrinkage in tight-tolerance designs",
    ],
  }),
  mat({
    id: "nylon",
    name: "Nylon (PA)",
    full: "Polyamide (e.g. PA6 / PA66 family)",
    family: "plastic",
    desc: "Tough engineering polyamides used in structural and wear components; moisture-sensitive.",
    applications: ["Brackets", "Gears", "Cable management", "SLS/MJF parts"],
    pros: [
      "Good toughness and wear potential",
      "Useful for semi-structural parts",
      "Available in molded, machined, and powder-bed additive forms",
    ],
    cons: [
      "Moisture absorption affects dimensions and properties",
      "UV and some chemical limitations",
      "Drying and process control often required",
    ],
    processes: ["injection", "cnc", "sls", "mjf", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Family of polyamides spanning molded, machined, and additive workflows.",
    propertyNotes: [
      "Conditioned vs dry-as-molded properties can differ significantly",
      "Glass-filled grades raise stiffness but change toughness and warpage",
    ],
    designConsiderations: [
      "Design for moisture-related dimensional change in service",
      "Specify the PA type/grade family early (PA6, PA66, PA12, etc.)",
    ],
  }),
  mat({
    id: "pmma",
    name: "PMMA",
    full: "Polymethyl Methacrylate (Acrylic)",
    family: "plastic",
    desc: "Clear, stiff acrylic for lenses, displays, and cosmetic transparent parts.",
    applications: ["Lenses", "Signage", "Transparent covers"],
    pros: [
      "Excellent optical clarity potential",
      "Good stiffness for clear panels",
      "Attractive gloss surfaces",
    ],
    cons: [
      "More brittle than polycarbonate in many cases",
      "Scratch and solvent sensitivity",
      "Impact events need careful design",
    ],
    processes: ["cnc", "thermo", "injection", "extrusion"],
    relativeCost: "moderate",
    summary:
      "Optical acrylic chosen when clarity and stiffness matter more than extreme toughness.",
    propertyNotes: [
      "Impact-modified acrylics exist but change optics and cost",
      "UV and weathering performance depend on grade and coatings",
    ],
    designConsiderations: [
      "Avoid sharp corners in loaded transparent parts",
      "Protect surfaces during machining and forming",
    ],
  }),
  mat({
    id: "pvc",
    name: "PVC",
    full: "Polyvinyl Chloride",
    family: "plastic",
    desc: "Versatile polymer available in rigid and flexible forms for profiles, fittings, and packaging.",
    applications: ["Profiles", "Pipe fittings", "Cards", "Flexible tubing (plasticized)"],
    pros: [
      "Broad formulation space (rigid to flexible)",
      "Common in building and packaging supply chains",
      "Useful chemical resistance in many environments",
    ],
    cons: [
      "Plasticizers and additives dominate flexible grades",
      "Processing and regulatory constraints vary by use",
      "Heat and outdoor performance depend strongly on formulation",
    ],
    processes: ["extrusion", "injection", "thermo"],
    relativeCost: "low",
    summary:
      "Chlorinated vinyl polymer spanning rigid profiles and plasticized flexible goods.",
    propertyNotes: [
      "Rigid and flexible PVC are effectively different design materials",
      "Regulatory status (medical, food, building) must be checked per grade",
    ],
    designConsiderations: [
      "Specify rigid vs flexible and additive package explicitly",
      "Confirm joining methods (solvent weld, adhesives, mechanical)",
    ],
  }),
  mat({
    id: "pbt",
    name: "PBT",
    full: "Polybutylene Terephthalate",
    family: "plastic",
    desc: "Engineering polyester used in electrical connectors and precise molded components.",
    applications: ["Connectors", "Electrical housings", "Automotive sensors"],
    pros: [
      "Good dimensional stability in many grades",
      "Useful electrical and heat performance for connectors",
      "Often glass-filled for stiffness",
    ],
    cons: [
      "Moisture/conditioning considerations for some grades",
      "Chemical compatibility must be checked",
      "Higher cost than commodity plastics",
    ],
    processes: ["injection", "cnc"],
    relativeCost: "high",
    summary:
      "Engineering polyester frequently specified in electrical and automotive connectors.",
    propertyNotes: [
      "Glass fiber content strongly affects warpage and anisotropy",
      "Flame-retardant packages are grade-specific",
    ],
    designConsiderations: [
      "Orient gates and fibers with warp-critical features in mind",
      "Validate tracking/CTI and flammability needs separately",
    ],
  }),
  mat({
    id: "peek",
    name: "PEEK",
    full: "Polyether Ether Ketone",
    family: "plastic",
    desc: "High-performance thermoplastic for demanding thermal, chemical, and structural environments.",
    applications: [
      "Aerospace brackets",
      "Medical device components (grade-dependent)",
      "High-temp industrial parts",
    ],
    pros: [
      "High-performance thermal/chemical capability in many grades",
      "Excellent for demanding engineering applications",
      "Machinable and moldable in specialized workflows",
    ],
    cons: [
      "Very high relative material cost",
      "Specialized processing",
      "Overkill for many consumer products",
    ],
    processes: ["injection", "cnc", "fdm", "extrusion"],
    relativeCost: "very-high",
    summary:
      "Ultra-performance polymer reserved for environments that justify its cost.",
    propertyNotes: [
      "Filled grades (glass, carbon) change stiffness and wear dramatically",
      "Medical/aerospace approvals are certificate- and grade-specific",
    ],
    designConsiderations: [
      "Confirm temperature, chemicals, and regulatory path before specifying",
      "Budget for material scrap and specialized machining/molding",
    ],
  }),
  mat({
    id: "pei",
    name: "PEI",
    full: "Polyetherimide (e.g. ULTEM™-class materials)",
    family: "plastic",
    desc: "High-temperature amorphous engineering plastic for demanding housings and structural parts.",
    applications: [
      "High-temp housings",
      "Aerospace interiors (grade-dependent)",
      "Electrical components",
    ],
    pros: [
      "Strong heat performance among amorphous plastics",
      "Good strength/stiffness retention at elevated temperature (grade-dependent)",
      "Flame performance options in specialty grades",
    ],
    cons: [
      "High relative cost",
      "Processing can be challenging",
      "Chemical resistance is environment-specific",
    ],
    processes: ["injection", "cnc", "fdm", "extrusion"],
    relativeCost: "very-high",
    summary:
      "High-heat amorphous polymer family used when commodity plastics are insufficient.",
    propertyNotes: [
      "Brand/grade systems differ — treat names as families, not guarantees",
      "Additive-ready filaments exist but anisotropy still applies",
    ],
    designConsiderations: [
      "Dry thoroughly and follow specialty processing guidance",
      "Validate long-term heat aging for the real environment",
    ],
  }),
  mat({
    id: "pps",
    name: "PPS",
    full: "Polyphenylene Sulfide",
    family: "plastic",
    desc: "High-performance semi-crystalline plastic for chemical and thermal durability in industrial parts.",
    applications: [
      "Pump/valve components",
      "Under-hood parts",
      "Electrical insulation components",
    ],
    pros: [
      "Excellent chemical resistance in many grades",
      "High-temperature capability",
      "Dimensional stability when properly designed",
    ],
    cons: [
      "Higher cost",
      "Can be brittle depending on grade and fillers",
      "Specialized molding know-how required",
    ],
    processes: ["injection", "cnc", "extrusion"],
    relativeCost: "very-high",
    summary:
      "Specialty engineering plastic for harsh chemical and thermal service.",
    propertyNotes: [
      "Glass- and mineral-filled grades dominate structural uses",
      "Toughness and weld-line strength need careful design",
    ],
    designConsiderations: [
      "Minimize weld lines in high-stress regions",
      "Engage molders experienced with high-temp polymers",
    ],
  }),
  mat({
    id: "asa",
    name: "ASA",
    full: "Acrylonitrile Styrene Acrylate",
    family: "plastic",
    desc: "UV-capable styrenic often chosen for outdoor housings as an ABS alternative.",
    applications: ["Outdoor housings", "Automotive exterior trim", "Garden equipment"],
    pros: [
      "Better outdoor weathering potential than standard ABS",
      "Good appearance for housings",
      "Familiar processing to ABS in many shops",
    ],
    cons: [
      "Still grade-dependent for UV and impact",
      "Cost typically above commodity styrenics",
      "Not a universal metal/engineering-plastic replacement",
    ],
    processes: ["injection", "extrusion", "thermo", "fdm"],
    relativeCost: "moderate",
    summary:
      "Styrenic outdoor-oriented cousin to ABS for weatherable housings.",
    propertyNotes: [
      "Weathering claims require grade and color validation",
      "Mechanical profile is broadly ABS-like but not identical",
    ],
    designConsiderations: [
      "Validate color hold and impact after outdoor aging tests",
      "Use UV-capable formulations for exterior service",
    ],
  }),
];

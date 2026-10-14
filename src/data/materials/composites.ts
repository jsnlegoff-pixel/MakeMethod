import { mat } from "./_shared";

export const compositeMaterials = [
  mat({
    id: "gfrp",
    name: "GFRP",
    full: "Glass-Fiber Reinforced Polymer (fiberglass composites)",
    family: "composite",
    desc: "Glass-reinforced polymer composites for stiff, corrosion-resistant panels and structures.",
    applications: ["Panels", "Enclosures", "Marine components", "Covers"],
    pros: [
      "High stiffness-to-weight vs many unfilled plastics",
      "Designable laminate architectures",
      "Good corrosion behavior in many environments",
    ],
    cons: [
      "Properties are process- and orientation-dependent",
      "Joining and repair differ from metals",
      "Cosmetic gelcoat/finish quality varies",
    ],
    processes: ["compression", "cnc"],
    relativeCost: "moderate",
    summary:
      "Glass-fiber composites spanning sheet molding compounds to laminated structures.",
    propertyNotes: [
      "Fiber architecture and resin system dominate stiffness/strength",
      "Quoted “composite properties” are not transferable without process context",
    ],
    designConsiderations: [
      "Design with fiber direction and resin system explicit",
      "Plan edge sealing and fastening load spreaders",
    ],
    propertyConfidence: "unverified",
  }),
  mat({
    id: "cfrp",
    name: "CFRP",
    full: "Carbon-Fiber Reinforced Polymer",
    family: "composite",
    desc: "Carbon-fiber composites for high stiffness-to-weight structures when cost allows.",
    applications: ["Aerospace structures", "Performance sporting goods", "Robotics links"],
    pros: [
      "Exceptional stiffness-to-weight potential",
      "Tailorable anisotropy",
      "Premium performance image and capability",
    ],
    cons: [
      "High relative cost",
      "Galvanic corrosion risk with some metals",
      "Specialized design/manufacture required",
    ],
    processes: ["compression", "cnc"],
    relativeCost: "very-high",
    summary:
      "Carbon-fiber polymer composites for weight-critical high-performance parts.",
    propertyNotes: [
      "Laminate schedule, fiber type, and voids control performance",
      "Impact and damage tolerance need explicit evaluation",
    ],
    designConsiderations: [
      "Isolate from aluminum/steel where galvanic coupling is a risk",
      "Design for manufacturable ply drops and inspection",
    ],
    propertyConfidence: "unverified",
  }),
  mat({
    id: "smc",
    name: "SMC",
    full: "Sheet Molding Compound (glass-filled thermoset sheets)",
    family: "composite",
    desc: "Compression-moldable fiber-filled sheet compounds for semi-structural covers and panels.",
    applications: ["Automotive body panels", "Electrical enclosures", "Equipment covers"],
    pros: [
      "Suited to compression molding at volume",
      "Good stiffness for covers/panels",
      "Integrated ribs and features possible",
    ],
    cons: [
      "Surface finish and paint systems need process control",
      "Less isotropic than metals",
      "Tooling investment for production",
    ],
    processes: ["compression"],
    relativeCost: "moderate",
    summary:
      "Moldable composite sheet systems aimed at production covers and panels.",
    propertyNotes: [
      "Fiber length/fill and resin chemistry vary by compound",
      "Mechanical data must come from the compound datasheet and molded plaques",
    ],
    designConsiderations: [
      "Design for compression flow, charge pattern, and knit lines",
      "Engage molders on Class-A surface requirements early",
    ],
    propertyConfidence: "unverified",
  }),
];

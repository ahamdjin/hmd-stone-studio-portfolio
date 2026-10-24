/**
 * HMD Stone content and generated concept imagery.
 *
 * All imagery is AI-generated design inspiration, not photographs of HMD Stone's
 * completed work. Stone textures are conceptual, not exact supplier samples.
 * Do not add addresses, reviews, guarantees, or project claims without verification.
 */
export const BRAND = {
  name: "HMD Stone",
  tagline: "Surfaces with a point of view.",
  contactEmail: "", // Supply a verified HMD Stone address before enabling email submissions.
  phone: "", // Supply a verified phone number before adding click-to-call.
};

export const IMAGES = {
  hero: "/images/generated/01-hero-kitchen.webp",
  detail: "/images/generated/02-stone-edge-detail.webp",
  kitchen: "/images/generated/03-kitchen-statement.webp",
  island: "/images/generated/04-sculpted-island.webp",
  bathroom: "/images/generated/05-bathroom-vanity.webp",
  atmosphere: "/images/generated/06-atmosphere-closing.webp",
  customStonework: "/images/generated/07-custom-stone-fireplace.webp",
  charcoal: "/images/generated/08-charcoal-kitchen.webp",
  installation: "/images/generated/09-installation-craft.webp",
  selection: "/images/generated/10-stone-selection.webp",
  vanityDetail: "/images/generated/11-vanity-detail.webp",
};

export const MATERIAL_TEXTURES = {
  quartz: "/images/generated/12-material-quartz.webp",
  marble: "/images/generated/13-material-marble.webp",
  quartzite: "/images/generated/14-material-quartzite.webp",
  granite: "/images/generated/15-material-granite.webp",
};

export type MaterialId = "quartz" | "marble" | "quartzite" | "granite";

export const MATERIALS: {
  id: MaterialId;
  no: string;
  name: string;
  caption: string;
  mood: string;
  description: string;
  surface: string;
}[] = [
  {
    id: "quartz",
    no: "01",
    name: "Quartz",
    caption: "Refined & versatile",
    mood: "Precision, in every detail.",
    description: "An engineered surface loved for its consistency, broad design possibilities, and straightforward everyday care.",
    surface: "Soft ivory / subtle movement",
  },
  {
    id: "marble",
    no: "02",
    name: "Marble",
    caption: "Expressive & timeless",
    mood: "No two stories alike.",
    description: "Natural veining and depth give marble its singular character. It develops a patina and calls for attentive care.",
    surface: "Warm white / fluid veining",
  },
  {
    id: "quartzite",
    no: "03",
    name: "Quartzite",
    caption: "Natural & dramatic",
    mood: "Made by the earth. Shaped for you.",
    description: "A naturally occurring stone with striking movement and a wide range of appearances, depending on the slab.",
    surface: "Smoky mineral / layered striations",
  },
  {
    id: "granite",
    no: "04",
    name: "Granite",
    caption: "Grounded & distinctive",
    mood: "Beautifully individual.",
    description: "Natural stone with speckled mineral character. Every slab brings its own palette and pattern.",
    surface: "Deep charcoal / crystalline texture",
  },
];

export const SERVICES = [
  {
    no: "01",
    name: "Kitchen countertops",
    description: "From quiet, seamless worktops to an island that becomes the room's centerpiece.",
    detail: "Countertops · Islands · Waterfalls",
  },
  {
    no: "02",
    name: "Bathroom vanities",
    description: "Considered stone surfaces for daily rituals, with the right material and edge details.",
    detail: "Vanities · Backsplashes · Surfaces",
  },
  {
    no: "03",
    name: "Custom stonework",
    description: "Special details, statement surfaces, and solutions designed around your space.",
    detail: "Custom layouts · Feature surfaces",
  },
  {
    no: "04",
    name: "Countertop installation",
    description: "A carefully planned journey from material selection and measurements to finished installation.",
    detail: "Consultation · Measurement · Installation",
  },
];

export const LOOKBOOK = [
  {
    no: "01",
    kicker: "THE GATHERING PLACE",
    title: "Kitchen\nstatement",
    category: "KITCHEN SURFACES",
    image: IMAGES.kitchen,
    alt: "AI-generated design inspiration: ivory stone kitchen and oak cabinetry",
  },
  {
    no: "02",
    kicker: "THE CENTERPIECE",
    title: "Sculpted\nislands",
    category: "KITCHEN ISLANDS",
    image: IMAGES.island,
    alt: "AI-generated design inspiration: sculptural quartzite waterfall island",
  },
  {
    no: "03",
    kicker: "EVERYDAY RITUAL",
    title: "Quiet\nluxury",
    category: "BATHROOM SURFACES",
    image: IMAGES.bathroom,
    alt: "AI-generated design inspiration: marble double vanity",
  },
  {
    no: "04",
    kicker: "THE MATERIAL MATTERS",
    title: "Infinite\npossibility",
    category: "CUSTOM STONEWORK",
    image: IMAGES.customStonework,
    alt: "AI-generated design inspiration: custom quartzite fireplace cladding",
  },
];

export const PROCESS = [
  { no: "01", title: "Discover", detail: "Tell us about your space, your ideas, and the feeling you want to create." },
  { no: "02", title: "Select", detail: "Explore stone, color, finish, and edge details for your project." },
  { no: "03", title: "Plan", detail: "Review measurements, layout, practical considerations, and next steps." },
  { no: "04", title: "Install", detail: "Bring the selected surface into the space with care and attention to the details." },
];

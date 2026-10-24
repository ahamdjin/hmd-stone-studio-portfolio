export interface Project {
  id: string;
  titleTop: string;
  titleMasked: string;
  image: string;
  year: string;
  location: string;
  description: string;
}

/**
 * Re-requests an Unsplash image at a different width. Card thumbnails and the
 * full-bleed project hero need very different sizes on a retina screen.
 */
export const imageAt = (url: string, width: number): string =>
  url.replace(/w=\d+/, `w=${width}`);

/**
 * The version of a photo used inside the card headline letters: blurred, lifted
 * and a little more saturated, so the letters read as a bright glow rather than
 * a tiny photo. The video mask this replaced did the same thing on a canvas
 * (`blur(10px) saturate(140%) brightness(250%)`), but a CSS filter would soften
 * the letter edges too — Unsplash's CDN bakes it into the file instead.
 *
 * Lifting the darks matters most: the cards are black, so any part of a letter
 * that stays near-black breaks the word up.
 *
 * It is requested small on purpose. Blurred pixels carry almost no detail, so
 * 600px costs a third of the crisp version.
 */
export const maskImage = (url: string): string =>
  `${imageAt(url, 600)}&blur=60&bri=25&sat=30`;

export const projects: Project[] = [
  {
    id: "courtyard-house",
    titleTop: "Light &\nVolume",
    titleMasked: "Courtyard\nHouse.",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1600&q=80",
    year: "2024",
    location: "Mexico City",
    description:
      "A family house built around a planted courtyard, so every room borrows daylight from two sides. We designed the structure and the interiors together — pale plaster, oak joinery and a kitchen that opens straight onto the garden.",
  },
  {
    id: "meridian-tower",
    titleTop: "Vertical\nWorkplace",
    titleMasked: "Meridian\nTower.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80",
    year: "2023",
    location: "London",
    description:
      "Twenty-two floors of offices above a public arcade. Our interiors brief covered the lobby, the shared floors and the roof terrace: warm stone underfoot, acoustic felt overhead, and daylight pulled deep into the plan.",
  },
  {
    id: "casa-ferrer",
    titleTop: "Restored\nFaçade",
    titleMasked: "Casa\nFerrer.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=80",
    year: "2023",
    location: "Barcelona",
    description:
      "A listed apartment building brought back into use. We repaired the ornamental façade, then reworked the interiors behind it into eight flats — original tilework kept, services and insulation quietly rebuilt.",
  },
  {
    id: "hollis-street",
    titleTop: "Diagrid\nOffice",
    titleMasked: "Hollis\nStreet.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&q=80",
    year: "2024",
    location: "New York",
    description:
      "A new office block set on the retained base of a 1920s warehouse. The diagrid frame carries the loads at the perimeter, which left the interiors column-free and let us plan the floors around light rather than structure.",
  },
  {
    id: "glasshouse-pavilion",
    titleTop: "Curved\nGlazing",
    titleMasked: "Glasshouse\nPavilion.",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1600&q=80",
    year: "2022",
    location: "Paris",
    description:
      "An events pavilion in a public park, wrapped in curved glazing on a timber frame. Inside, a single room that can be split three ways, with movable oak screens and lighting designed for both daylight and evening use.",
  },
  {
    id: "garden-rooms",
    titleTop: "Three\nBiomes",
    titleMasked: "Garden\nRooms.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
    year: "2023",
    location: "Cornwall",
    description:
      "Three linked glasshouses for a botanical trust, set into a disused clay pit. Lightweight cushions span the roofs; the interiors are planted rooms, with cast-concrete paths and benches we detailed on site.",
  },
  {
    id: "fenchurch-lofts",
    titleTop: "Double\nHeight",
    titleMasked: "Fenchurch\nLofts.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1600&q=80",
    year: "2024",
    location: "London",
    description:
      "Fourteen apartments in the upper floors of a 1980s office tower. The plan widens as it rises, so we gave the top three homes double-height living rooms and interiors finished in lime plaster and blackened steel.",
  },
  {
    id: "the-helix-stair",
    titleTop: "154\nFlights",
    titleMasked: "The Helix\nStair.",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=1600&q=80",
    year: "2022",
    location: "New York",
    description:
      "A public stair and viewing structure at the centre of a new square. Copper-clad steel, 154 flights, and handrails prototyped at full size in the workshop before anything was cut.",
  },
  {
    id: "arts-quarter",
    titleTop: "Concrete\nShells",
    titleMasked: "Arts\nQuarter.",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1600&q=80",
    year: "2023",
    location: "Valencia",
    description:
      "A concert hall and gallery sharing one roof of thin concrete shells. We led the architecture and the interior fit-out: mosaic-lined foyers, a 900-seat auditorium, and back-of-house planned around a single service spine.",
  },
];

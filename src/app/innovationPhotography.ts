export type InnovationPhotoKey = "development" | "quality" | "testing" | "research"
export type InnovationPhoto = { src: string; alt: string; width: number; height: number }

// Original files from the user's ZIP, preserved without cropping or enlargement.
// Provenance is recorded in IMAGE-SOURCES.json and IMAGE_SOURCES.md.
export const innovationPhotography: Record<InnovationPhotoKey, InnovationPhoto> = {
  research: {
    src: "/images/innovation/food-research.jpg",
    alt: "Food research professional examining vegetables in a laboratory",
    width: 1200,
    height: 864,
  },
  quality: {
    src: "/images/innovation/quality-evaluation.jpg",
    alt: "Laboratory professional evaluating dairy ingredients with a pipette",
    width: 1024,
    height: 683,
  },
  testing: {
    src: "/images/innovation/food-testing.jpg",
    alt: "Gloved hands preparing a food testing sample in a petri dish",
    width: 590,
    height: 885,
  },
  development: {
    src: "/images/innovation/ingredient-development.jpg",
    alt: "Gloved hands working with ingredient samples at a research bench",
    width: 234,
    height: 176,
  },
}

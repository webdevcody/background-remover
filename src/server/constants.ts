export const styles = [
  "metallic",
  "polygon",
  "pixelated",
  "clay",
  "gradient",
  "flat",
  "illustrated",
  "minimalistic",
  "hand-drawn",
  "watercolor",
  "isometric",
  "neon",
  "cartoonish",
  "3d",
  "line-art",
  "pop-art",
  "doodle",
  "grunge",
  "sticker",
  "realistic",
  "mosaic",
  "origami",
  "chalkboard",
  "woodcut",
];

export type Style = (typeof styles)[number];

export const shapes = ["circular", "rounded", "square"];

export type Shape = (typeof shapes)[number];

export const colors = [
  "blue",
  "red",
  "orange",
  "purple",
  "yellow",
  "pink",
  "cyan",
  "green",
  "teal",
  "black",
  "lime",
  "maroon",
  "navy",
  "gold",
  "silver",
  "indigo",
  "magenta",
  "olive",
  "aqua",
  "coral",
  "violet",
  "salmon",
  "chartreuse",
];

export const styleTemplate: Record<Style, string> = {
  metallic: `metallic iridescent material, 3D render isometric perspective`,
  polygon: "vector art, symmetrical, digital painting, low poly, artstation",
  pixelated:
    "densely packed pixelated, symmetrical, minimalistic icon, centered, 2d vector art, artstation",
  clay: "cute, 3D clay render, isometric perspective on diffused background, artstation",
  gradient:
    "symmetrical, minimalistic icon, gradient, dark background, artstation, 2d digital vector art, no text, vector art, stock art, digital art, centered, Unreal Engine, Fanart",
  flat: "flat icon design, 2d vector art, minimal colors, sharp edges",
  illustrated:
    "digital illustration, 4k, detailed, trending in artstation, fantasy vivid colors",
  minimalistic: "minimalistic",
  "hand-drawn": "hand drawn",
  watercolor: "watercolor",
  isometric: "isometric",
  neon: "neon",
  cartoonish: "cartoonish",
  "3d": "3d rendered, unreal engine, centered",
  "line-art": "line art, line shading",
  "pop-art": "pop art",
  doodle: "doodle",
  grunge: "grunge",
  sticker: "sticker",
  realistic: "realistic",
  mosaic: "mosaic",
  origami: "origami",
  chalkboard: "chalkboard",
  woodcut: "woodcut style medium",
};

export const TRIAL_CREDITS = 10;

export function getBackgroundColor(foregroundColor: string) {
  return foregroundColor === "black"
    ? ", on light background"
    : ", on dark background";
}

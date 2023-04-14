import chroma from "chroma-js";

type ColorPalette = {
  [key: string]: string;
};

export const generatePalette = (baseColor: string): ColorPalette => {
  const palette: ColorPalette = {};

  // Generate color variations
  const color = chroma(baseColor);
  palette["50"] = color.brighten(2).hex();
  palette["100"] = color.brighten(1.5).hex();
  palette["200"] = color.brighten(1).hex();
  palette["300"] = color.brighten(0.5).hex();
  palette["400"] = color.hex();
  palette["500"] = color.darken(0.5).hex();
  palette["600"] = color.darken(1).hex();
  palette["700"] = color.darken(1.5).hex();
  palette["800"] = color.darken(2).hex();
  palette["900"] = color.darken(2.5).hex();

  return palette;
};

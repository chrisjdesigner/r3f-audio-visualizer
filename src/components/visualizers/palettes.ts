import { Color } from "three";
import { Lut } from "three/examples/jsm/math/Lut";

/**
 * Describes a color palette type
 */
export const COLOR_PALETTE = {
  SR: "sr",
} as const;

type ObjectValues<T> = T[keyof T];
export type ColorPaletteType = ObjectValues<typeof COLOR_PALETTE>;

export const AVAILABLE_COLOR_PALETTES = [
  COLOR_PALETTE.SR,
];

export interface IGradient {
  getAt: (t: number) => Color;
}

const mix = (x: number, y: number, a: number) => {
  if (a <= 0) {
    return x;
  }
  if (a >= 1) {
    return y;
  }
  return x + a * (y - x);
};

export class GradientLinear implements IGradient {
  private colors: Color[];
  constructor(palette: IColorPalette) {
    this.colors = palette.colors.map((c) => new Color(c));
  }

  public getAt = (t: number) => {
    t = Math.min(1, Math.max(0, t));
    const from = Math.floor(t * this.colors.length * 0.9999);
    const to = Math.min(this.colors.length - 1, Math.max(0, from + 1));
    const fc = this.colors[from];
    const ft = this.colors[to];
    const p = (t - from / this.colors.length) / (1 / this.colors.length);
    const res = new Color();
    res.r = mix(fc.r, ft.r, p);
    res.g = mix(fc.g, ft.g, p);
    res.b = mix(fc.b, ft.b, p);
    return res;
  };
}

export interface IColorPalette {
  name: string;
  colors: string[];
  nColors: number;
}

export class ColorPalette implements IColorPalette {
  public readonly name: string;
  public readonly colors: string[];
  public get colorsHex() {
    return this.colors.map((s) => new Color(s).getHex());
  }
  public get nColors() {
    return this.colors.length;
  }

  constructor(name: string, colors: string[]) {
    this.name = name;
    if (colors.length < 2) {
      throw new Error("Not enough colors");
    }
    this.colors = [...colors];
  }

  public buildLut = () => {
    const lut = new Lut();
    lut.addColorMap(
      this.name,
      this.colorsHex.map((hex, i) => [i / (this.nColors - 1), hex])
    );
    lut.setColorMap(this.name);
    return lut;
  };

  public calcBackgroundColor = (norm: number = 0.5) => {
    const gradient = new GradientLinear(this);
    const bkg = gradient.getAt(norm);
    const tmp = { h: 0, s: 0, l: 0 };
    bkg.getHSL(tmp);
    tmp.s = Math.min(tmp.s, 0.5);
    bkg.setHSL(tmp.h, tmp.s, tmp.l);
    return bkg;
  };

  public static getPalette(type: ColorPaletteType) {
    /**
     * Wonderful color combos taken from https://github.com/spite/genuary-2022
     */
    switch (type) {
      case COLOR_PALETTE.SR:
        return new ColorPalette(COLOR_PALETTE.SR, [
          "#FEF6F0",
          "#F47723",
        ]);
      default:
        throw new Error(`Unsupported color palette: ${type}`);
    }
  }
  public static random(
    options: ColorPaletteType[] = AVAILABLE_COLOR_PALETTES
  ): ColorPalette {
    return ColorPalette.getPalette(
      options[Math.floor(Math.random() * options.length)]
    );
  }
}

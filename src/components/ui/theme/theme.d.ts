import { CSSInterpolation, PaletteOptions } from '@mui/material';
import { colors, customShadows } from '.';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'contained-heading': true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    tag: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    customShadows: typeof customShadows;
  }

  interface ThemeOptions {
    colors: typeof colors;
    customShadows: typeof customShadows;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
    darkest?: string;
    color1?: PaletteColor;
    color2?: PaletteColor;
    color3?: PaletteColor;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    A100?: string;
    A200?: string;
    A300?: string;
    A400?: string;
  }
}

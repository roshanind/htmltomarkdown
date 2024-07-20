import { CSSInterpolation, PaletteOptions } from '@mui/material';
import { colors } from '.';

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
  }

  interface ThemeOptions {
    colors: typeof colors;
  }

  interface PaletteColor {
    100?: string;
    200?: string;
  }
}

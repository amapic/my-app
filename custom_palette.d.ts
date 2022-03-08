import {
    Palette as MuiPallete,
    PaletteOptions as MuiPaletteOptions,
    SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
    PaletteColor as MuiPaletteColor
  } from '@mui/material/styles/createPalette';
  
  declare module '@mui/material/styles/createPalette' {
    interface Palette extends MuiPallete {
      neutralShade: {main: string};
    }
  
    interface PaletteOptions extends MuiPaletteOptions {
      neutralShade?: {main: string};
    }

    interface SimplePaletteColorOptions extends MuiSimplePaletteColorOptions {
        prout?: {main: string};
      }

      interface PaletteColor extends MuiPaletteColor {
        prout: {main: string};
      }
  }
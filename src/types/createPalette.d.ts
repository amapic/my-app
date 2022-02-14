// // import "@mui/material/styles/createPalette";
// // declare module "@mui/material/styles/createPalette" {
// //   interface Palette {
// //     brown: PaletteColor;
// //   }
// //   interface PaletteOptions {
// //     brown: PaletteColorOptions;
// //   }
// // }

// import {
//   createTheme,
//   Theme,
//   ThemeProvider,
//   PaletteOptions
// } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';

// declare module '@material-ui/core/styles' {
//   interface SimplePaletteColorOptions {
//     lighter?: string;
//     darker?: string;
//   }

//   interface PaletteColor {
//     lighter?: string;
//     darker?: string;
//   }

//   interface DefaultPaletteOptions extends PaletteOptions {
//     primary?: SimplePaletteColorOptions;
//   }
// }

// const Default = () : DefaultPaletteOptions => {

//   return {
//     primary: {
//       lighter: '#ddd',
//       light: '#ddd',
//       main: '#ddd',
//       dark: '#ddd',
//       darker: '#ddd'
//     },
//   };
// };

import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    brown: PaletteColor;
  }
  interface PaletteOptions {
    brown: PaletteColorOptions;
  }
}
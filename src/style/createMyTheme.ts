import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import createPalette,{PaletteOptions,PaletteColorOptions,PaletteColor} from '@material-ui/core/styles/createPalette';
import red from '@material-ui/core/colors/red';

// declare module '@material-ui/core/styles/CreatePalette' {
//   interface SimplePaletteColorOptions {
//     bar_droite1?: string;
//   }
  
//   interface PaletteColor {
//     bar_droite1: string;
//   }
  
// }

export function createMyPalette(options: PaletteOptions) {
  return createPalette({
    bar_droite1:sdfgs
    ...options,
  })
}

// declare module '@material-ui/core/styles/CreatePalette' {
//   export interface SimplePaletteColorOptions {
//     bar_droite1?: string;
//   }
  
//   export interface PaletteColor {
//     bar_droite1: string;
//   }
//   // allow configuration using `createTheme`
//   // interface ThemeOptions {
//   //    appDrawer ? : {
//   //       width ? : React.CSSProperties['width']
//   //       breakpoint ? : Breakpoint
//   //    }
//   // }
// }

// export  function createMyTheme(options: ThemeOptions) {
//   return createTheme( {
//     palette: {
//       primary: {
//         main: '#ffffff',
//         bar_droite1:'rgb(206,136,87)',
//         bar_droite2:'rgb(5,98,138)',
        
//       },
//       secondary: {
//         main: '#ffffff',
//         second:'rgb(206,136,87)',
//         third:'rgb(154,80,82)',
//         fourth:'rgb(72,145,118)',
//         fifth:'rgb(160,175,82)',
//         sixth:'rgb(104,120,131)',
//         seventh:'rgb(204,182,82)',
//         heigth:'rgb(164,135,105)',
//         bgPaper: 'rgb(33,37,39)',
//         tt:'rgb(5,98,138)',
//         tenth:'rgb(5,98,138)',
//         bar_droite1:'rgb(206,136,87)',
//         bar_droite2:'rgb(5,98,138)',
        
//       },
//       error: {
//         main: red.A400,
//       },
//       background: {
//         default: 'rgb(49,55,62)',
//       }
//     },
//     overrides: {
//       MuiAppBar: {
//         colorPrimary: {
//           backgroundColor: 'rgb(33,37,39)',
//           color:'#ffffff'
//         }
//       },
//       MuiSlider: {
//         markLabel: {
//           top: '20px',
//           fontSize: '1rem',
//           color:'#ffffff'
//         },
//         markLabelActive: {
//           top: '20px',
//           fontSize: '1rem',
//           color:'#ffffff'
//         },
//         root: {
//           margin: '0 2rem 0 0',
//         }
//       },
//       MuiTypography: {
//         body1: {
//           fontSize: '1rem',
//           color:'#ffffff'
//         }
//       },
//       MuiPaper: {
//         root: {
//           backgroundColor:'rgb(33,37,39)',
//           color:'#ffffff'
//         }
//       },
//       MuiLinearProgress:{
//         barColorPrimary: {
//           backgroundColor:'rgb(154,80,82)'
//         }
//       }
//     }
//   })
// }

// export default function createMyTheme(options: ThemeOptions) {
//   return createTheme({
//     couleurPerso: {
//       red
      
//     },
//     ...options,
//   })
// }

// const theme = 
  
//   export default theme;
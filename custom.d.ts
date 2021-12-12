import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles/createTheme';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import createPalette,{SimplePaletteColorOptions,PaletteColor} from '@material-ui/core/styles/createPalette';
// Create a theme instance.
const theme = createTheme( {
  palette: {
    primary: {
      main: '#ffffff'
      
    },
    secondary: {
      main: '#ffffff',
      third:'rgb(154,80,82)',
      fourth:'rgb(72,145,118)',
      fifth:'rgb(160,175,82)',
      sixth:'rgb(104,120,131)',
      seventh:'rgb(204,182,82)',
      heigth:'rgb(164,135,105)',
      bgPaper: 'rgb(33,37,39)',
      tt:'rgb(5,98,138)',
      tenth:'rgb(5,98,138)',
      bar_droite1:'rgb(206,136,87)',
      bar_droite2:'rgb(5,98,138)',
      
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgb(49,55,62)',
    }
  },
  breakpoints:{
    values:{
      xs:0,
      sm: 450,
      md: 700,
      lg: 900,
      xl: 1400
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'rgb(33,37,39)',
        color:'#ffffff'
      }
    },
    MuiSlider: {
      markLabel: {
        top: '20px',
        fontSize: '1rem',
        color:'#ffffff'
      },
      markLabelActive: {
        top: '20px',
        fontSize: '1rem',
        color:'#ffffff'
      },
      root: {
        margin: '0 2rem 0 0',
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1rem',
        color:'#ffffff'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor:'rgb(33,37,39)',
        color:'#ffffff'
      }
    },
    MuiLinearProgress:{
      barColorPrimary: {
        backgroundColor:'#FF8042'
      }
    }
  }
})

interface itemstype {
  max_text: number,
  min_text: number,
  min: string,
  max: string,
  marks: { label: string, value: number }[]
}

export default theme;

// declare module "*.svg" {
//   const content: any;
//   export default content;
// }
// type CustomTheme={
//   [key in keyof typeof theme]:typeof theme[key]
// }

// type CustomPaletteColor={
//   [key in keyof typeof theme.palette.primary]:typeof theme.palette.primary[key]
// }

// type CustomPaletteColor2={
//   [key in keyof typeof theme.palette.secondary]:typeof theme.palette.secondary[key]
// }

// declare module '@material-ui/core/styles/createTheme'{
//   interface Theme extends CustomTheme {}
//   interface ThemeOptions extends CustomTheme {}
//   // interface PaletteColor extends CustomPaletteColor2 {}
//   // interface PaletteColorOptions extends CustomPaletteColor2 {}
//   interface PaletteColorOptions {
//     prouty?:string
// }

// declare module '@material-ui/core/styles/createTheme' {
//   interface Theme {
//     appDrawer: {
//       width: React.CSSProperties['width']
//       breakpoint: Breakpoint
//     }
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     couleurPerso?: {
//       red:string
//     }
//   }
// }

declare module '@material-ui/core/styles/CreatePalette' {
  interface SimplePaletteColorOptions {
    bar_droite1?: string;
  }
  
  interface PaletteColor {
    bar_droite1: string;
    first:string;
    second:string;
    third:string;
  }
  
}

declare module '@material-ui/core/styles' {
  interface Theme {
    status: {
      danger: string;
    },
    prout:string
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  // interface PaletteColor {
  //   light: string;
  //   main: string;
  //   dark: string;
  //   contrastText: string;
  //   first:string;
  // }
}





// export theme

// export default createTheme(theme);

// declare module '@material-ui/core/LinearProgress'{
//   // interface Theme extends CustomTheme {}
//   // interface ThemeOptions extends CustomTheme {}
//   interface LinearProgressProps{
//     color?: 'primary' | 'secondary' | 'secondary.bar_droite1';
//   }
//   // interface PaletteColor extends CustomPaletteColor2 {}
//   // interface PaletteColorOptions extends CustomPaletteColor2 {}
// //   interface PaletteColorOptions {
// //     prouty?:string
// // }
// }


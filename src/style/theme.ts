import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = {
  palette: {
    primary: {
      main: '#ffffff',
      bar_droite1:'rgb(206,136,87)',
      bar_droite2:'rgb(5,98,138)',
      
    },
    secondary: {
      main: '#ffffff',
      second:'rgb(206,136,87)',
      third:'rgb(154,80,82)',
      fourth:'rgb(72,145,118)',
      fifth:'rgb(160,175,82)',
      sixth:'rgb(104,120,131)',
      seventh:'rgb(204,182,82)',
      heigth:'rgb(164,135,105)',
      bgPaper: 'rgb(33,37,39)',
      tt:'rgb(5,98,138)',
      bleu:'rgb(5,98,138)'
      
      
      
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgb(49,55,62)',
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
        backgroundColor:'rgb(154,80,82)'
      }
    }
  }
}as const;

type CustomTheme={
  [key in keyof typeof theme]:typeof theme[key]
}

type CustomPaletteColor={
  [key in keyof typeof theme.palette.primary]:typeof theme.palette.primary[key]
}
type CustomPaletteColor2={
  [key in keyof typeof theme.palette.secondary]:typeof theme.palette.secondary[key]
}

declare module '@material-ui/core/styles/createTheme'{
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
  interface PaletteColor extends CustomPaletteColor {}
  
}
export default createTheme(theme);


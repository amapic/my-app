import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#3f51b5'
      }
    },
    MuiSlider: {
      markLabel: {
        top: '20px',
        fontSize: '1rem'
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1rem'
      }
    },
  }
});

export default theme;
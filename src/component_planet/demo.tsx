import React from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider  } from '@material-ui/core/styles';
// import "./SliderPropTypesOverride";
// import Slider from '@material-ui/core/Slider';

const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    brown: defaultTheme.palette.augmentColor({
      color: {
        main: "#A52A2A"
      },
      name: "brown"
    })
  }
});

export default function Demo() {
  const barColors = [theme.palette.primary.brown,
    theme.palette.secondary.second,
    theme.palette.secondary.third,
    theme.palette.secondary.first];
  return (
    <ThemeProvider theme={theme}>
      {/* <Slider color="brown" /> */}
      yahoo
    </ThemeProvider>
  );
}
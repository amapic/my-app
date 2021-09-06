import React from 'react'

import { withStyles, createStyles, Theme, createTheme } from "@material-ui/core"

const styles = (theme: Theme) => createStyles({
  successMessage: {
    borderColor: theme.palette.success.main
  },

})

// import createMyTheme from './createMyTheme';

// const theme = createMyTheme({ appDrawer: { breakpoint: 'md' },palette:{primary:{main:'#ff0000'}}});

// const theme=createMyTheme({palette:{secondary:{prouty:'#ff000'}}})



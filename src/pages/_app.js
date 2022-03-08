// import App from 'next/app'
import '../index.scss';
import '../App.scss';
import '../style/planet.scss';
import '../style/navbar.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { motion } from 'framer-motion';
import shortid from 'shortid';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    // <React.Fragment>
      <motion.div key={shortid.generate()} initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        },
      }}>
      <Head>
        <title>Dashboard vaccination</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* <ThemeProvider theme={theme}> */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      {/* </ThemeProvider> */}
      </motion.div>
    // </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

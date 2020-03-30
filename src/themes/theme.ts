import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import '@openfonts/ubuntu-condensed_cyrillic';

const ubuntuCondensed = {
  fontFamily: 'Ubuntu Condensed',
  fontStyle: 'normal',
  fontWeight: '400',
};
// palette created with material palette generator https://material.io/inline-tools/color/
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4ed6b8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff', // Complementary color to primary
      contrastText: '#3d4451',
    },
    text: {
      primary: '#3d4451',
      secondary: '#ffffff',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Ubuntu Condensed',
    fontSize: 16,
    h1: {
      fontSize: '3.5rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#3d4451',
      margin: '10px 0 30px',
    },
    h2: {
      fontSize: '2rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#3d4451',
      margin: '20px 0 20px',
    },
    h3: {
      fontSize: '1.6rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#3d4451',
      padding: '5px 0 5px',
    },
    h6: {
      fontSize: '1.2rem',
      lineHeight: '1.2',
      fontWeight: 'bold',
      color: '#3d4451',
      margin: '10px 0 10px',
    },
    body1: {
      fontSize: '1.6rem',
      lineHeight: '1.6',
      color: '#ffffff',
    },
    body2: {
      fontSize: '1.6rem',
      lineHeight: '1.4',
      color: '#3d4451',
      padding: '5px 0 5px',
    },
    button: {
      fontSize: '1rem',
      lineHeight: '1.4',
      color: '#403d51',
    },
    caption: {
      fontSize: '1.2rem',
      lineHeight: '1',
      color: '#000000',
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [ubuntuCondensed],
      },
    },
    MuiInput: {
      underline: {
        '&&&&:hover:before': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);

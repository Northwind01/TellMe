import React from 'react';
import ReactDOM from 'react-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepPurple, pink } from '@material-ui/core/colors';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8561c5',
      main: '#673ab7',
      dark: '#482880',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#000',
    },
  },
  status: {
    danger: 'orange',
  },
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();

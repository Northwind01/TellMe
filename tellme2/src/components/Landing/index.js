import React from 'react';

import Stepper from './stepper';
import Image from '../../assets/img.jpg';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
});

export default function Landing() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <ThemeProvider theme={theme}>
          <Typography color="textSecondary" component="h1" variant="h2" noWrap style={{marginTop: '30%',
                                                          marginLeft: '10%',
                                                          fontWeight: '900',
                                                          letterSpacing: '6'}}>
            Tell Me
          </Typography>
          <Typography paragraph color="textPrimary" component="h1" variant="h5" style={{marginLeft: '10%',
                                                          marginTop: '5%',
                                                          fontWeight: '900',}}>
            Brings your customers into focus
          </Typography>
          <Typography paragraph color="textSecondary" component="h1" variant="h5" style={{marginTop: '-2%',
                                                          marginLeft: '10%'}}>
            using AI and making it easy, effective and fun
          </Typography>
        </ThemeProvider>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={{marginTop: '80px'}}>
            How it works:
          </Typography>
          <Stepper />
        </div>
      </Grid>
    </Grid>
  );
}
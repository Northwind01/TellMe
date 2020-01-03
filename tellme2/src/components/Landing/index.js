import React from 'react';

import Stepper from './stepper';
import Image from './img.jpg';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Landing() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <Typography color="textSecondary" component="h1" variant="h2" noWrap style={{marginTop: '30%',
                                                        marginLeft: '10%',
                                                        fontWeight: '900',
                                                        letterSpacing: '6'}}>
          Tell Me
        </Typography>
        <Typography color="textPrimary" component="h1" variant="h5" style={{margin: '10%',
                                                        marginTop: '5%',}}>
          Bring your customers into focus using AI.
          <br></br>
          Make it easy, effective and fun for both sides!
        </Typography>
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
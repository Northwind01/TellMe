import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import Feedback from './Feedback';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Image from '../../assets/img.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Tell Me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  image: {
    backgroundImage: `url(${Image})`, //'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

class FeedbackPage extends React.Component {
  constructor(props) {
    super(props);

    const { classes } = props;
    this.classes = classes;
  }

  render() {
    return (
      <React.Fragment>
          <CssBaseline />
          <main className={this.classes.image}>
            {/* Hero unit */}
            <Feedback />
          </main>
            {/* Footer */}
          <footer className={this.classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Tell Me
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Bringing customers into focus!
            </Typography>
            <Copyright />
          </footer>
          {/* End footer */}
      </React.Fragment>
    )
  }
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withStyles(styles)
)(FeedbackPage);
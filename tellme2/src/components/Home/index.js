import React from 'react';
import { withAuthorization } from '../Session';
import { compose } from 'recompose';

import FormDialog from './dialog';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      projects: []
    };

    const { classes } = props;
    this.classes = classes;
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .getProjects()
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        let projects = [];
        querySnapshot.forEach((doc) => {
            projects.push({ ...doc.data(), uid: doc.id });
            console.log(this.state);
        });
        this.setState({
          projects: projects.reverse(),
          loading: false,
        });
      });
  };

  render() {
    const {
      projects,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={this.classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={this.classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Your projects
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Create a project to identify your service or product.
              </Typography>
              <div className={this.classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <FormDialog />
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Overview
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={this.classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {projects.map(project => (
                <Grid item key={project.id} xs={12} sm={6} md={4}>
                  <Card className={this.classes.card}>
                    <CardContent className={this.classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.id}
                      </Typography>
                      <Typography>
                        {project.desc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={this.classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withStyles(styles)
)(HomePage);
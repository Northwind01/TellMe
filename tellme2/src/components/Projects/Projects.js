import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProjectList from './ProjectList';
import FormDialog from './FormDialog';

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  header: {
    marginTop: theme.spacing(6),
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
});

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      desc: '',
      loading: false,
      projects: [],
      limit: 5,
    };

    const { classes } = props;
    this.classes = classes;
  }

  componentDidMount() {
    this.onListenForProjects();
  }

  onListenForProjects = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .projects()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let projects = [];
          snapshot.forEach(doc =>
            projects.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            projects: projects.reverse(),
            loading: false,
          });
        } else {
          this.setState({ projects: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateProject = (event, authUser) => {
    this.props.firebase.projects().add({
      id: this.state.id,
      desc: this.state.desc,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ id: '', desc: '' });

    event.preventDefault();
  };

  onEditProject = (project, id, desc) => {
    const { uid, ...projectSnapshot } = project;

    this.props.firebase.project(project.uid).update({
      ...projectSnapshot,
      id,
      desc,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveProject = uid => {
    this.props.firebase.project(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForProjects,
    );
  };

  render() {
    const { projects, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <div className={this.classes.heroContent}>
              <Container maxWidth="sm" className={this.classes.header}>
                <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                  Your projects
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  A project dentifies your service or product for the customer.
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
            {projects && (
              <Container className={this.classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <ProjectList
                  authUser={authUser}
                  projects={projects}
                  onEditProject={this.onEditProject}
                  onRemoveProject={this.onRemoveProject}
                />
              </Container>
            )}  

            {loading && <div>Loading ...</div>}

{/*             {!loading && projects && (
              <Button 
                type="button" 
                onClick={this.onNextPage}
                size="small" 
                color="primary"
              >
                More
              </Button>
            )} */}

            {!projects && <div>You don't have projects yet.</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(styles)
)(Projects);
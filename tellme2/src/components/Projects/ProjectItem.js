import React, { Component } from 'react';

import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(1),
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
  cardContent: {
    flexGrow: 1,
  },
});

class ProjectItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editId: this.props.project.id,
      editDesc: this.props.project.desc,
    };

    const { classes } = props;
    this.classes = classes;
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editId: this.props.project.id,
      editDesc: this.props.project.desc,
    }));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditProject(this.props.project, this.state.editId, this.state.editDesc);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, project, onRemoveProject } = this.props;
    const { editMode, editId, editDesc } = this.state;

    return (
      <Grid item key={project.id} xs={12} sm={6} md={4}>
        <Card className={this.classes.card}>
          <CardContent className={this.classes.cardContent}>
            {editMode ? (
              <div>
                <TextField
                  margin="normal"
                  type="text"
                  fullWidth
                  name="editId"
                  onChange={this.onChange}
                  defaultValue={editId}
                  autoFocus
                  label="Id or name"
                  multiline
                  rowsMax="3"
                />
                <TextField
                  margin="normal"
                  type="text"
                  label="Description"
                  name="editDesc"
                  fullWidth
                  onChange={this.onChange}
                  defaultValue={editDesc}
                  multiline
                  rowsMax="10"
                />
              </div>
            ) : (
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Project {project.id}
                </Typography>
                <Typography noWrap >
                  {project.desc}
                </Typography>
              </div>
            )}
          </CardContent>
          <CardActions >
            {authUser.uid === project.userId && (
              <span>
                {editMode ? (
                  <span>
                    <Button size="small" color="primary" onClick={this.onSaveEditText}>
                      Save
                    </Button>
                    <Button size="small" color="primary" onClick={this.onToggleEditMode}>
                      Reset
                    </Button>
                  </span>
                ) : (
                  <Button 
                    size="small" 
                    color="primary" 
                    onClick={this.onToggleEditMode}
                  >
                    Edit
                  </Button>
                )}     

                {!editMode && (
                  <Button 
                    size="small" 
                    color="primary"
                    type="button"
                    onClick={() => onRemoveProject(project.uid)}
                  >
                    Delete
                  </Button>
                )}

                {!editMode && (
                  <Button  
                    variant="contained"
                    size="small" 
                    color="primary"
                    type="button"
                    className={this.classes.root}
                  >
                    Get feedback
                  </Button>
                )}   
              </span>
            )}
          </CardActions>
        </Card>   
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles)
)(ProjectItem);
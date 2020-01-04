import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogPage() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create new
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <FormDialog handleClose={handleClose}/>
      </Dialog>
    </div>
  );
}

class FormDialogBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      desc: '',
      loading: false,
      projects: [],
      limit: 5,
      error: null,
    };
  }

  onCreateProject = (event, authUser) => {
    this.props.firebase.projects().add({
      id: this.state.id,
      desc: this.state.desc,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ id: '', desc: '' });

    event.preventDefault();
    this.props.handleClose();
  };

  handleClose = () => {
    this.props.handleClose();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { id, desc, error } = this.state;

    const isInvalid = id === '' || desc === '';

    return(
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
            
            <form
              onSubmit={event =>
                this.onCreateProject(event, authUser)
              }
              >
              <DialogContent>
                <DialogContentText>
                  Name and give a short desctiption of your service or product in order for the customer to be able to identify it.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="id"
                  label="Id or name"
                  fullWidth
                  onChange={this.onChange}
                  name="id"
                  value={id}
                />
                <TextField
                  margin="dense"
                  id="desc"
                  name="desc"
                  label="Description"
                  fullWidth
                  onChange={this.onChange}
                  required
                  value={desc}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} 
                        color="primary"
                        >
                  Cancel
                </Button>
                <Button disabled={isInvalid} 
                        color="primary"
                        type="submit"
                >
                  Create
                </Button>
              </DialogActions>
            </form>  
    
            {error && <p>{error.message}</p>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const FormDialog = compose(
  withFirebase,
)(FormDialogBase);

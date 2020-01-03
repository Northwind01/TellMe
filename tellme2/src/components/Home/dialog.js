import React, { Component } from 'react';
import { withRouter, Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

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

const INITIAL_STATE = {
    id: '',
    desc: '',
    error: null,
  };

class FormDialogBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { id, desc } = this.state;
    const createdAt = Date.now;
    this.props.firebase
      .doCreateProject(id, desc, createdAt)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.handleClose()
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
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
      <div>
        <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give a short desctiption of your service or product in order for the customer to be able to identify it.
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
                  onClick={this.onSubmit}>
            Create
          </Button>
        </DialogActions>

        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const FormDialog = compose(
  withRouter,
  withFirebase,
)(FormDialogBase);

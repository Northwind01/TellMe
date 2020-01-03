import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from '@material-ui/core';

const SignOutButton = ({ firebase }) => (
  <Button
    onClick={firebase.doSignOut}
    style={{marginTop: '20px'}}
    >Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
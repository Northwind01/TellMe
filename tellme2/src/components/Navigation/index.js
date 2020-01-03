import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Button } from '@material-ui/core';

const Navigation = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <div style={{position: 'absolute', right: '20px'}}>
      <Button 
          href={ROUTES.LANDING}
          style={{marginTop: '20px'}}
          >Tell Me</Button>
      <Button 
          href={ROUTES.HOME}
          style={{marginTop: '20px'}}
          >Home</Button>
      <Button 
          href={ROUTES.ACCOUNT}
          style={{marginTop: '20px'}}
          >Account</Button>
      <Button 
          href={ROUTES.ADMIN}
          style={{marginTop: '20px'}}
          >Admin</Button>
      <SignOutButton />
    </div>
  );

const NavigationNonAuth = () => (
    <div style={{position: 'absolute', right: '20px'}}>
        <Button 
            href={ROUTES.LANDING}
            style={{marginTop: '20px'}}
            >Landing</Button>
        <Button 
            href={ROUTES.SIGN_IN}
            style={{marginTop: '20px'}}
            >Sign In</Button>
    </div>
);

export default Navigation;
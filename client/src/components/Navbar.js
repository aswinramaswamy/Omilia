import React from 'react';
//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Settings</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
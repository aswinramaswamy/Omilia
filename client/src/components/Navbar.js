import React from 'react';
import Link from 'react-router-dom/Link';
//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/home" >Home</Button>
          <Button color="inherit" component={Link} to="/profile" >Profile</Button>
          <Button color="inherit" component={Link} to="/newPost" >New Post</Button>
          <Button color="inherit" component={Link} to="/delete" >Delete Post</Button>
          <Button color="inherit" component={Link} to="/settings" >Settings</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
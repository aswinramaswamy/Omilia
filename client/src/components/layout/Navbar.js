import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'react-router-dom/Link';
import history from "../../data/history";

//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 20),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;
  const homePath = `/home/${localStorage.getItem('username')}`;
  const profilePath = `/profile/${localStorage.getItem('username')}`;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileClose = () => {
    setAnchorEl(null);
    localStorage.setItem('user', localStorage.getItem('username'));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //context.history.push('/SearchResults/search=' + search);
    history.push('/SearchResults/search=' + search);
    history.go(0);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileClose} component={Link} to={profilePath} >Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/settings">Settings</MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/logout">Log Out</MenuItem>
    </Menu>
  );

  const drawerMenu = (
    <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} anchor='right'>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      <Divider />
      <List>
        <ListItem button component={Link} to={homePath}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
        </ListItem>
      </List>
      <Divider />
          <List>
            <ListItem>
              <ListItemText primary="Post" />
            </ListItem>      
            <ListItem button component={Link} to="/newPost">
              <ListItemIcon><AddBoxIcon /></ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem button component={Link} to="/editPost">
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button component={Link} to="/delete">
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItem>
        <Divider />
        <List>
          <ListItem button component={Link} to="/followTopic">
            <ListItemText primary="Follow Post Topic" />
          </ListItem>
          <ListItem button component={Link} to="/unfollowTopic">
            <ListItemText primary="Unfollow Post Topic" />
          </ListItem>
        </List>
      </List>
      
      </Drawer>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='relative'>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Button className={classes.menuButton} color="inherit" component={Link} to={homePath} variant="text">
            Omilía
          </Button>
          <div className={classes.search}>
            <form className={classes.root} noValidate onSubmit={handleSubmit}>
              <TextField
                id="search"
                name="search"
                type="string"
                className={classes.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={handleChange}
                fullwidth="true"
                size="small"
                />
            </form>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" disabled>
              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" disabled>
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {drawerMenu}
    </div>
  );
}
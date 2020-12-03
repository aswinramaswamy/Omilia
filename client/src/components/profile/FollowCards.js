import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Post from '../layout/Post/Post';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import ProfileCard from './ProfileCard';

function getUser() {
  let user = {};
  console.log(localStorage.getItem('username'));
  /*axios
    .post('/getProfile', localStorage.getItem('username'))
    .then(res => {
      console.log(res.data());
      user = res.data();
    })
    .catch(err => console.log(err));*/
  return user;
}

const user = getUser();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FollowCards(thing) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [topick, setTopick] = React.useState("hello");

  let topicSort = [];
  let topics = [];
  let flag = 0;

  let allFollowers = (thing.allFollowers.length !== 0) ? (
    thing.allFollowers.map((result) => {
      return <ProfileCard key={result.username} />;
    })
  ) : (
      <p>Loading...</p>
  );
  
  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>
        <div className="center">
          {allFollowers}
        </div>
      </TabPanel>
    </div>
  );
}
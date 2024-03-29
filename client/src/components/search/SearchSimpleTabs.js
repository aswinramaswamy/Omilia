import React from 'react';
import PropTypes from 'prop-types';

import User from '../layout/UserDisplay';
import Post from '../layout/Post/Post';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(thing) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(thing.searchResults);
  let allSearchResult = (thing.searchResults !== null) ? (
    thing.searchResults.map((result) => {
      if (result["username"]) {
        return <User user={result.username} />;
      } else {
        return <Post key={result.postID} post={result} />;
      }
    })
    ) : (
        <p>Loading...</p>
    );
  
    let userSearchResult = (thing.searchResults !== null) ? (
      thing.searchResults.map((result) => {
        if (result["username"]) {
          return <User user={result.username} />;
        } else {
          return;
        }
      })
      ) : (
          <p>Loading...</p>
    );
  
    let postSearchResult = (thing.searchResults !== null) ? (
      thing.searchResults.map((result) => {
        if (!result["username"]) {
          return <Post key={result.postID} post={result} />;
        } else {
          return;
        }
      })
      ) : (
          <p>Loading...</p>
      );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Posts" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="center">
          {allSearchResult}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="center">
          {userSearchResult}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="center">
          {postSearchResult}
        </div>
      </TabPanel>
    </div>
  );
}
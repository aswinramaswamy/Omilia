import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import User from '../layout/UserDisplay';
import Post from '../layout/Post/Post';
import history from "../../data/history";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

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

function getPostByTopic(topics) {
  let userSearchResult = (topics.length !== 0) ? (
    topics.map((result) => {
      return <Post key={result.postID} post={result} />;
    })
  ) : (
      <p>Select a Topic</p>
    );
  return userSearchResult;
}

export default function HomeTabs(thing) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [topick, setTopick] = React.useState("hello");
  const [userSearchResult, setUserSearchResult] = React.useState(<h1>Select A Topic</h1>);

  let topicSort = [];

  const handleSubmit = (event) => {
    let newTopicSort = { ...topicSort };
    console.log("handle submit");
    event.preventDefault();
    thing.allPosts.forEach(function (item) {
      if (typeof item.topic !== 'undefined') {
        if (topick === item.topic) {
          topicSort.push(item);
        }
      }
    });
    console.log(topick);
    console.log(topicSort);
    setUserSearchResult(getPostByTopic(topicSort));
    console.log(userSearchResult);
  };

  const handleChangeSearch = (event, newValue) => {
    if (newValue !== null) {
      setTopick(newValue.title);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let allPosts = (thing.allPosts.length !== 0) ? (
    thing.allPosts.map((result) => {
      return <Post key={result.postID} post={result} />;
    })
  ) : (
      <p>Loading...</p>
  );
  
  let postSearchResult = (thing.allPosts !== null) ? (
    thing.allPosts.map((result) => {
      if (!result["username"]) {
        return <Post key={result.postID} post={result} />;
      } else {
        return;
      }
    })
  ) : (
      <p>Loading...</p>
    );

  const top100Films = [
    { title: 'Monty Python and the Holy Grail', year: 1975 }
  ];

  let topics = [];

  let flag = 0;

  function getTopics() {
    thing.allPosts.forEach(function (item) {
      if (typeof item.topic !== 'undefined') {
        for (let i=0; i < topics.length; i++) {
          if (topics[i].title == item.topic) {
            flag = 1;
          }
        }
        if (flag != 1) {
          topics.push({
            title: item.topic
          })
        }
        flag = 0;
      }
    });
    return topics;
  }
  
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="New" {...a11yProps(0)} />
          <Tab label="Topic" {...a11yProps(1)} />
          <Tab label="Relevant" {...a11yProps(2)} />
          <Tab label="Suggested" {...a11yProps(3)} />        
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="center">
          {allPosts}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="center">
          <div className="center">
            <form className={classes.root} onSubmit={handleSubmit}>
            <Autocomplete
              id="combo-box-demo"
              options={getTopics()}
              getOptionLabel={(option) => option.title}
                onChange={handleChangeSearch}
                onSubmit={handleSubmit}
              style={{ width: "inherit" }}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Sort by Topic"
                    style={{
                      width: "inherit"
                    }}
                  />
                }
              />
            </form>
          </div>
          {userSearchResult}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="center">
          {postSearchResult}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="center">
          {postSearchResult}
        </div>
      </TabPanel>
    </div>
  );
}
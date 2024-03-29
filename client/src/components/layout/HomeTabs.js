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

 function getUser() {
   let userNameJSON = { username: localStorage.getItem('username') };
   let user = {}
   //console.log(user.username);
   axios
     .post('/getProfile', userNameJSON)
     .then(res => {
       console.log(res.data);
       user = res.data;
       return user;
     })
     .catch(err => console.error(err));;
}

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
  //let userNameJSON = { username: localStorage.getItem('username') };
  let blockedUsers = [];
  //console.log(user.username);
  /*axios
    .post('/getProfile', userNameJSON)
    .then(res => {
      blockedUsers = res.data.blockedUsers;
      console.log(blockedUsers);
    });*/
    //.catch(err => console.error(err));
    //console.log(blockedUsers);

  let userSearchResult = (topics.length !== 0) ? (
    topics.map((result) => {
      return <Post key={result.postID} post={result} blockedUsers={blockedUsers}/>;
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
  
  //let userNameJSON = { username: localStorage.getItem('username') };
  let blockedUsers = [];
  //console.log(user.username);
  /*axios
    .post('/getProfile', userNameJSON)
    .then(res => {
      blockedUsers = res.data.blockedUsers;
      console.log(blockedUsers);
    })
    .catch(err => console.error(err));*/
  //console.log(blockedUsers);

  let topicSort = [];
  let topics = [];
  let flag = 0;

  console.log(thing);

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
      return <Post key={result.postID} post={result} blockedUsers={blockedUsers}/>;
    })
  ) : (
      <p>Loading...</p>
  );

  function getTopics() {
    thing.allPosts.forEach(function (item) {
      if (typeof item.topic !== 'undefined') {
        for (let i=0; i < topics.length; i++) {
          if (topics[i].title === item.topic) {
            flag = 1;
          }
        }
        if (flag !== 1) {
          topics.push({
            title: item.topic
          })
        }
        flag = 0;
      }
    });
    return topics;
  }

  let relevantPosts = (thing.allPosts.length !== 0) ? (
    thing.allPosts.map(item => {
      if (typeof item !== 'undefined') {
        if (typeof item.likes !== 'undefined') {
          if (typeof item.dislikes !== 'undefined') {
            if (typeof item.body !== 'undefined') {
              if (typeof item.topic !== 'undefined') {
                if (typeof item.commentCount !== 'undefined') {
                  return <Post key={item.postID} post={item} blockedUsers={blockedUsers}/>;
                }
              }
            }
          }
        }
      }
    })
  ) : (
    <p>Loading...</p>
  );

  let suggestedPosts = (thing.allPosts.length !== 0) ? (
    thing.allPosts.map((result) => {
      console.log(result);
      if (typeof result.userHandle !== 'undefined') {
        if (typeof result.commentCount !== 'undefined') {
          if (result.userHandle !== localStorage.getItem('username')) {
            return <Post key={result.postID} post={result} blockedUsers={blockedUsers}/>;
          }
        }
      }
    })
  ) : (
    <p>Loading...</p>
  );
  
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
          {relevantPosts}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="center">
          {suggestedPosts}
        </div>
      </TabPanel>
    </div>
  );
}
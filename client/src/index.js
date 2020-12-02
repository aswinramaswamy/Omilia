import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { SET_AUTHENTICATED } from './redux/types';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./css/theme";
import jwtDecode from "jwt-decode";
import history from "./data/history";
import { logoutUser, getUserData } from './redux/actions/userActions';

import axios from 'axios';

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Import Component
import AuthRoute from "./components/profile/AuthRoute";

//Import Views
import Create from "./views/Create";
import AccountMade from "./views/AccountMade";
import Home from "./views/Home";
import Login from "./views/Login";
import LogOut from "./views/LogOut";
import Delete from "./views/Delete";
import NotFound from "./views/NotFound";
import Settings from "./views/Settings";
import Start from "./views/Start";
import Profile from "./views/Profile";
import ChangeEmail from "./views/ChangeEmail";
import ChangePassword from "./views/ChangePassword";
import ChangeUsername from "./views/ChangeUsername";
import editPost from "./views/EditPost.js";
import SearchResults from "./views/SearchResults";
import followUser from "./views/followUser";
import followTopic from "./views/followTopic";
import unfollowUser from "./views/unfollowUser";
import unfollowTopic from "./views/unfollowTopic";
import editProfile from "./views/editProfile"
import UserProfile from "./views/UserProfile";

import "./css/app.css";
import FullPagePost from "./views/FullPagePost";
import NewPost from "./views/NewPost";
import DeleteAccount from "./views/DeleteAccount";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const logEmail = localStorage.getItem('email');
const logUsername = localStorage.getItem('username');

let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <Router history={history}>
            <div>
            <Switch>
                <AuthRoute exact path="/" component={Start} authenticated={authenticated}/>
                <Route path="/home/:username" component={Home} />
                <AuthRoute path="/create" component={Create} authenticated={authenticated}/>
                <AuthRoute path="/login" component={Login} authenticated={authenticated} />
                <AuthRoute path="/accountMade" component={AccountMade} authenticated={authenticated} />
                <Route path="/logout" component={LogOut} />
                <Route path="/settings" component={Settings} />
                <Route path="/delete" component={Delete} />
                <Route path="/deleteAccount" component={DeleteAccount} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/post" component={FullPagePost} /> 
                <Route path="/post/:postID" component={FullPagePost} />
                <Route path="/ChangeEmail" component={ChangeEmail} />
                <Route path="/ChangePassword" component={ChangePassword} />
                <Route path="/ChangeUsername" component={ChangeUsername} />
                <Route path="/NewPost" component={NewPost} />
                <Route path="/editPost" component={editPost} />
                <Route path="/followUser" component={followUser} /> 
                <Route path="/followTopic" component={followTopic} /> 
                <Route path="/unfollowUser" component={unfollowUser} /> 
                <Route path="/unfollowTopic" component={unfollowTopic} />
                <Route path="/changeProfile" component={editProfile} />
                <Route path="/searchResults/:search" component={SearchResults} />
                <Route path="/users/:username" component={UserProfile} />
                {/* Only useful in development mode */}
                <Route component={NotFound} status={404} />
            </Switch>
            </div>
      </Router>
      </Provider>
    </MuiThemeProvider>,
document.getElementById('root'),
);

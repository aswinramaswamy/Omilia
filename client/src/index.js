import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './css/theme';
import jwtDecode from 'jwt-decode';

//Import Component
import AuthRoute from './components/AuthRoute'

//Import Views
import Create from './views/Create';
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Settings from './views/Settings';
import Start from './views/Start';
import Profile from './views/Profile';
import ChangeEmail from './views/ChangeEmail';

import './css/app.css'
import FullPagePost from './views/FullPagePost';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

let authenticated;
if(token){
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href='/login'
        authenticated=false;
    } else {
        authenticated=true;
    }
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <div>
            <Switch>
                <Route exact path="/" component={Start} />
                <Route path="/home" component={Home} />
                <AuthRoute path="/create" component={Create} authenticated={authenticated}/>
                <AuthRoute path="/login" component={Login} authenticated={authenticated}/>
                <Route path="/settings" component={Settings} />
                <Route path="/profile" component={Profile} />
                <Route path="/post" component={FullPagePost} /> 
                <Route path="/post/:postid" component={FullPagePost} />
                <Route path="/ChangeEmail" component={ChangeEmail} />
                {/* Only useful in development mode */}
                <Route component={NotFound} status={404} />
            </Switch>
            </div>
        </Router>
    </MuiThemeProvider>,
document.getElementById('root'),
);
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Import Views
import Create from './views/Create';
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Settings from './views/Settings';
import Start from './views/Start';
import Profile from './views/Profile';

import './css/app.css'
import FullPagePost from './views/FullPagePost';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: 'white',
            main: '#3C797C',
            dark: 'black',
            contrastText: '#fff'
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <div>
            <Switch>
                <Route exact path="/" component={Start} />
                <Route path="/home" component={Home} />
                <Route path="/create" component={Create} />
                <Route path="/login" component={Login} />
                <Route path="/settings" component={Settings} />
                <Route path="/profile" component={Profile} />
                <Route path="/post" component={FullPagePost} /> 
                <Route path="/post/:postid" component={FullPagePost} />
                {/* Only useful in development mode */}
                <Route component={NotFound} status={404} />
            </Switch>
            </div>
        </Router>
    </MuiThemeProvider>,
document.getElementById('root'),
);
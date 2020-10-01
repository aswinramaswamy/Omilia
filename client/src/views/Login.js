import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo'
import '../css/app.css';

export default class Login extends React.Component {  
    render() {
        return (
            <div class='middle'>
                <Logo/>
                <div class="login-form">
                    <form action="auth" method="POST">
                        <input type="text" name="username" placeholder="Username" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input type="submit" placeholer="Log In"/>
                    </form>
                </div>

                <h2><Link to="feed" class="button">Log In</Link></h2>
                <h4>Don't have an account?<br></br>
                <Link to="create">Register</Link></h4>
            </div>
        )
    }
}
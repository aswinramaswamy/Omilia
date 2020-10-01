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
                <h4>Not a member?</h4>
                <h2><Link to="create" class="button">Create Account</Link></h2>
            </div>
        )
    }
}
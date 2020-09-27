import React from 'react';
import { Link } from 'react-router-dom';

import '../css/app.css';

export default class Login extends React.Component {  
    render() {
        return (
            <div>
            
                <h2><Link to="create" class="button">Create Account</Link></h2>

                <h2><Link to="feed" class="button">Log In</Link></h2>

            </div>
        )
    }
}
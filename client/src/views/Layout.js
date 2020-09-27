import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo'

import '../css/app.css';

export default class Layout extends React.Component {  
    render() {
        return (
            <div>
                <body>
                    
                    <Logo />
                    <h1><Link to="login"><button>Log In</button></Link></h1>
                </body>
            </div>
        )
    }
}
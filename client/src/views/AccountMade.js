import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo'

import '../css/app.css';

export default class Start extends React.Component {  
    render() {
        return (
            <div class='start'>
                <div class='middle'>
                    <Logo />
                    <h1>Account Created Successfully</h1>
                    <h1><Link to="login"><button>Return to Login</button></Link></h1>
                </div>
            </div>
        )
    }
}
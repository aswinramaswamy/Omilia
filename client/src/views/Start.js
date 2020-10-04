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
                    <h1>Omilía</h1>
                    <h1>[ (Greek) ~ <i>To Speak</i> ]</h1>
                    <h1><Link to="login"><button>Log In</button></Link></h1>
                </div>
            </div>
        )
    }
}
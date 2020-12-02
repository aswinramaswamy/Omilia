import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/layout/Logo'

import '../css/app.css';

export default class Start extends React.Component {  
    render() {
        return (
            <div class='start'>
                <div class='middle'>
                    <Logo />
                    <h1>Banned Topics:</h1>
                    <h1>Fuck</h1>
                    <h1>Poop</h1>
                    <h1>Dick</h1>
                    <h1><Link to="Settings"><button>Back to settings</button></Link></h1>
                </div>
            </div>
        )
    }
}
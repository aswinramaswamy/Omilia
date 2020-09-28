import React from 'react';
import logo from '../css/whitelogo.png'

import '../css/app.css';

export default class Logo extends React.Component {
    render() {
        return (
            <img src={logo} alt="Logo" class="image"></img>
        );
    }
}
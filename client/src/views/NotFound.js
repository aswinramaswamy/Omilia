import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';

export default class NotFound extends React.Component {  
    render() {
        return (
            <div>
                <Navbar />
                <h2>not found page</h2>
            </div>
        )
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default class Profile extends React.Component {  
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <h2><Link to="settings" class="button">Edit info</Link></h2>
                <Footer />
            </div>
        )
    }
}
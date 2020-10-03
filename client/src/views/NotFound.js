import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class NotFound extends React.Component {  
    render() {
        return (
            <div>
                <Navbar />
                <Header />
                <Footer />
            </div>
        )
    }
}
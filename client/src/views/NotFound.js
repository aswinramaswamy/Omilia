import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
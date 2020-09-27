import React from 'react';
import '../css/app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Settings extends React.Component {  
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
}
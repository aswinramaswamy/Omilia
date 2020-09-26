import React from 'react';
import './app.css';
import Header from './Header';
import Footer from './Footer';
import Intro from './Intro';

export default class Layout extends React.Component {  
    render() {
        return (
            <div>
                <Header />
                <Footer />
                <Intro />
            </div>
        )
    }
}
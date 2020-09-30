import React from 'react';
import '../css/app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Feed extends React.Component {  
    render() {
        return (
            <div>
                <Header />
                <h2><Link to="Feed" class="button">Confirm Log Out</Link></h2>
                <Footer />
            </div>
        )
    }
}
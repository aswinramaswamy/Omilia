import React from 'react';
import '../css/app.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Delete extends React.Component {  
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
}
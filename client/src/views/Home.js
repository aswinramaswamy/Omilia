import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Home extends React.Component {  
    /*state = {
        posts = null
    }
    componentDidMount(){
        axios.get('/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log(err));
    };*/
    render() {
        let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map(post => <p>{post.body}</p>)
        ) : <p>Loading...</p>
        return (
            <div>
                <Navbar />
                <Header />
                <h2><Link to="LogOut" class="button">Log Out</Link></h2>
                <Footer />
            </div>
        )
    }
}
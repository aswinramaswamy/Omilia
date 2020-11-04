import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
import axios from 'axios';

//Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post';

class Home extends Component {  
    state = {
        posts: null
    }
    componentDidMount(){
        axios
            .get('/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map((post) => <Post post={post}/>)
        ) : (
            <p>Loading...</p>
        );

        return (
            <div>
                <Navbar/>
                <h1><Link to="logout"><button>Log Out</button></Link></h1>
                <h2>TIMELINE</h2>
                <div className="center">
                    {recentPostsMarkup}
                </div>
            </div>
        );
    }
}

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
import axios from 'axios';

//Components
import Navbar from '../components/Navbar';
import Post from '../components/Post';

export default class Home extends React.Component {  
    state = {
        posts: null
    }
    componentDidMount(){
        axios.get('/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log(err));
    };
    render() {
        let recentPostsMarkup = this.state.posts ? (
        this.state.posts.map((post) => <Post post={post.body} />)
        ) : (
            <p>Loading...</p>
        );    
        return (
            <div>
                <Navbar />
                <h1><Link to="logout"><button>Log Out</button></Link></h1>
                <div className="container">
                    {recentPostsMarkup}
                </div>
            </div>
        )
    }
}
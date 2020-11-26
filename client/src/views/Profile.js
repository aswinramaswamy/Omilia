import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post/Post';
import axios from 'axios';


export default class Profile extends React.Component {  
    state = {
        posts: null
    }
    
    componentDidMount(){
        axios
            .get('/userpost/aswin')
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
                <Navbar />
                <h2><Link to="settings" class="button">Edit info</Link></h2>
                <div className="center">
                    {recentPostsMarkup}
                </div>
            </div>
        )
    }
}
import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post/Post';
import BlockUserButton from '../components/layout/BlockUserButton';
import FollowUserButton from '../components/layout/FollowUserButton';
import axios from 'axios';

const yourUserName = localStorage.getItem('username');

export default class Profile extends React.Component {  
    state = {
        posts: null,
        username: null
    }

    componentDidMount() {
        let handle = this.props.match.params.username;
        axios
            .get(`/userpost/${handle}`)
            .then(res => {
                this.setState({
                    posts: res.data,
                    username: handle
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
                <h2>username: {this.state.username}</h2>
                <BlockUserButton yourUserName={yourUserName} username={this.state.username}/>
                <FollowUserButton yourUserName={yourUserName} username={this.state.username}/>
                <div className="center">
                    {recentPostsMarkup}
                </div>
            </div>
        )
    }
}
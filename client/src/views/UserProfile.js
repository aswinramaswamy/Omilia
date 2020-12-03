import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post/Post';
import BlockUserButton from '../components/layout/BlockUserButton';
import FollowUserButton from '../components/layout/FollowUserButton';
import axios from 'axios';

const yourUserName = localStorage.getItem('username');
const noImg = 'no-img.jpg';

export default class Profile extends React.Component {  
    state = {
        posts: null,
        username: null,
        description: null,
        imageUrl: null
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
        axios
            .get('/getProfileInfo', this.state.username)
            .then(res => {
                this.setState({
                    imageUrl: res.picture,
                    description: res.description
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
                <img src={this.state.imageUrl} alt="profile" className="profile-image"></img>
                <h2>username: {this.state.username}</h2>
                <h2>user description: {this.state.description}</h2>
                <BlockUserButton yourUserName={yourUserName} username={this.state.username}/>
                <FollowUserButton yourUserName={yourUserName} username={this.state.username}/>
                <div className="center">
                    {recentPostsMarkup}
                </div>
            </div>
        )
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import FollowersList from '../components/profile/FollowersList';
import FollowingList from '../components/profile/FollowingList';
import Post from '../components/layout/Post/Post';
import axios from 'axios';
import Button from "@material-ui/core/Button";



const logEmail = localStorage.getItem('email');
const logUsername = localStorage.getItem('username');
const user = localStorage.getItem('user');
const noImg = 'no-img.jpg';

export default class Profile extends React.Component {  
    state = {
        posts: null,
        followers: null,
        description: null,
        imageUrl: null,
        username: null
    }

    componentDidMount() {
        let handle = this.props.match.params.username;
        axios
            .get('/getProfileInfo', this.state.username)
            .then(res => {
                this.setState({
                    imageUrl: res.picture,
                    description: res.description
                });
            })
            .catch(err => console.log(err));
        axios
            .get(`/userpost/${user}`)
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
                <img src={this.state.imageUrl} alt="profile" className="profile-image"></img>
                <h2>username: {logUsername}</h2>
                <h2>email: {logEmail}</h2>
                <h2>user description: {this.state.description}</h2>
                <h2><Link to="/settings" class="button">Edit info</Link></h2>
                <div>
                <FollowingList />
                </div>
                <div>
                <FollowersList />
                </div>
                <div className="test">
                <p>{this.state.followers}</p>
                </div>
                <div className="center">
                    {recentPostsMarkup}
                </div>
                )
            </div>)
    }
}
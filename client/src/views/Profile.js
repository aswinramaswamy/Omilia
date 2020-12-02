import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import FollowersList from '../components/profile/FollowersList';
import Post from '../components/layout/Post/Post';
import axios from 'axios';
import Button from "@material-ui/core/Button";



const logEmail = localStorage.getItem('email');
const logUsername = localStorage.getItem('username');
const user = localStorage.getItem('user');



export default class Profile extends React.Component {  
    state = {
        posts: null,
        followers: null
    }

    componentDidMount() {
        let handle = this.props.match.params.username;
        axios
            .get(`/userdata/${user}`)
            .then(res => {
                /*this.setState({
                    
                });*/
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
        axios
            .get(`/followers/${logUsername}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    followers: res.data
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
                <h2>username: {logUsername}</h2>
                <h2>email: {logEmail}</h2>
                <h2><Link to="settings" class="button">Edit info</Link></h2>
                <FollowersList followers={this.state.followers}/>
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
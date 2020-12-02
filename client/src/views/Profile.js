import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Post from '../components/layout/Post/Post';
import axios from 'axios';
import Button from "@material-ui/core/Button";



const logEmail = localStorage.getItem('email');
const logUsername = localStorage.getItem('username');
const user = localStorage.getItem('user');



export default class Profile extends React.Component {  
    state = {
        posts: null,
        description: "",
        picture: null,
        email: "",
        username: user
    }

    handleFollow = (event) => {
        event.preventDefault();
        this.setState({
            yourUserName: "",
            username: "Enter User ID",
            dialogOpen: false,
            loading: true
        });
        const postData = {
            username: localStorage.getItem('user'),
            yourUserName: localStorage.getItem('username')
        }
        console.log(postData)
        axios
            .post('/followUser', { data: postData })
            .then(res => {
                console.log(res.data)
                this.setState({
                    message: "User followed successfully",
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    message: "User could not be found",
                    errors: err.response.data,
                    loading: false
                })
            })
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
    }
    render() {
        let recentPostsMarkup = this.state.posts ? (
            this.state.posts.map((post) => <Post post={post}/>)
            ) : (
                <p>Loading...</p>
            );
            if(user == null || user.localeCompare(logUsername) == 0){
                return (
                <div>
                    <Navbar />
                    <h2>username: {logUsername}</h2>
                    <h2>email: {logEmail}</h2>
                    <h2><Link to="/settings" class="button">Edit info</Link></h2>
                    <div className="center">
                        {recentPostsMarkup}
                    </div>
                </div>
                )
            }
            else{
                var path = "/followUser/username="+user;
                return (
                    <div>
                        <Navbar />
                        <h2>username: {user}</h2>
                        <h2><Button onClick={this.handleFollow}>Follow User</Button></h2>
                        <div className="center">
                            {recentPostsMarkup}
                        </div>
                    </div>
                )
            }
    }
}
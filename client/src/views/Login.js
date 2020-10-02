import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo'
import '../css/app.css';

export default class Login extends React.Component {  
    state = {
        data: null
    };
    
    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    };

    render() {
        return (
            <div class='middle'>
                <Logo/>
                <div class="login-form">
                    <form action="auth" method="POST">
                        <input type="text" name="username" placeholder="Username" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input type="submit" placeholer="Log In"/>
                    </form>
                </div>

                <h2><Link to="feed" class="button">Log In</Link></h2>
                <h4>Don't have an account?<br></br>
                <Link to="create">Register</Link></h4>
                <h2>{this.state.data}</h2>
            </div>
        )
    }
}
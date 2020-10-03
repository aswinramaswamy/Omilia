import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/Logo'
import '../css/app.css';

export default class Login extends React.Component {  
    constructor(props, context) {
        super(props, context);

        this.state = { description: '' };
    }
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get form data out of state
        fetch(this.props.formAction, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: this.state.description})
        });

        this.setState({description: ''});
    }

    render() {
        return (
            <div class='middle'>
                <Logo/>
                <div class="login-form">
                    <form action="auth" method="POST">
                        <input 
                            type="text" 
                            name="username" 
                            value={this.state.value} 
                            onChange={this.onChange} 
                            placeholder="Username"
                            required
                        />
                        <input 
                            type="password" 
                            name="password" 
                            value={this.state.value}
                            onChange={this.onChange}
                            placeholder="Password" 
                            required
                        />
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
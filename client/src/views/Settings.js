import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';



import withStyles from '@material-ui/core/styles/withStyles'
import Logo from '../components/Logo'
import '../css/app.css';
import PropTypes from 'prop-types';
import axios from 'axios';


//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Settings extends React.Component {  
    constructor(){
    super();
    this.state = {
        currentPassword: "",
        newEmail: "",
        errors: {}
    };
    } 
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
  /*  reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

    onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updateEmail(this.state.newEmail).then(() => {
            Alert.alert("Email was changed");
          }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
      }*/

    render() {

        return (
            <div>
                <Navbar />
                <Header />
                <h2><Link to="delete" class="button">Delete Account</Link></h2>
                <form>
                <label>
                Current Password:
                <input type="text" value={this.state.currentPassword} onChange={this.handleChange} onChangeText={(text) => { this.setState({currentPassword: text}) }} />
                New Password
                <input type="text" value={this.state.newEmail} onChangeText={(text) => { this.setState({newEmail: text}) }} />
                </label>
                <input type="submit" value="Submit" />
                </form>
                <Button title="Change Email" />
                <Footer />
            </div>

        )
    }
}




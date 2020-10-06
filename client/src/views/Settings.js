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
                <h2><Link to="delete" class="button">Delete Account</Link></h2>
                <form noValidate onSubmit={this.onChangeEmailPress}>
                  <TextField 
                      id="email" 
                      name="email" 
                      type="email" 
                      label="New Email" 
                      className={classes.textField}
                      helperText={errors.email} 
                      error={errors.email ? true : false} 
                      value={this.state.email} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  <TextField 
                      id="password" 
                      name="password" 
                      type="password" 
                      label="Password" 
                      className={classes.textField}
                      helperText={errors.password} 
                      error={errors.password ? true : false} 
                      value={this.state.password} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  { errors.general && (
                      <Typography variant='h2' className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                      Log in
                      {loading && (
                          <CircularProgress size={20} className={classes.progress}/>
                      )}
                  </Button>
                  <br />
                <Button title="Change Email" />
                </form>
            </div>
        )}
}




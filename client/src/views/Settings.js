import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/Navbar';

import withStyles from '@material-ui/core/styles/withStyles'
import Logo from '../components/Logo'
import PropTypes from 'prop-types';
import axios from 'axios';


//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Settings extends React.Component {  
    constructor(){
      super();
      this.state = {
          currentPassword: "",
          newEmail: "",
          loading: false,
          errors: {}
      };
    } 
    
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeEmailPress = (event) => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    const userData = {
        newEmail: this.state.newEmail,
        currentPassword: this.state.currentPassword
    }
    
    axios
        .post('/changeEmail', userData)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('FBIdToken', `Bearer  ${res.data.token}`);
            this.setState({
                loading: false
            });
            this.props.history.push('/home');
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
}

    render() {
      const { classes } = this.props;
      const { errors, loading } = this.state;

      return (
          <div>
              <Navbar />
              <h2><Link to="delete" class="button">Delete Account</Link></h2>
              <form noValidate onSubmit={this.onChangeEmailPress}>
                  <TextField 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="currentPassword" 
                      label="Current Password" 
                      className={classes.textField}
                      helperText={errors.currentPassword} 
                      error={errors.currentPassword ? true : false} 
                      value={this.state.currentPassword} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  <TextField 
                      id="newEmail" 
                      name="newEmail" 
                      type="newEmail" 
                      label="New Email" 
                      className={classes.textField}
                      helperText={errors.newEmail} 
                      error={errors.newEmail ? true : false} 
                      value={this.state.newEmail} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  { errors.general && (
                      <Typography variant='h2' className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                      Change Email
                      {loading && (
                          <CircularProgress size={20} className={classes.progress}/>
                      )}
                  </Button>
                  <br />
              </form>
          </div>
      )}
}




import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios';



//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadIt
})

class ChangePassword extends React.Component {  
    constructor(){
      super();
      this.state = {
          currentEmail: "",
          username: "",
          currentPassword: "",
          newPassword: "",
          loading: false,
          errors: {}
      };
    } 
    
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangePasswordPress = (event) => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    const userData = {
        currentEmail: this.state.currentEmail,
        username: this.state.username,
        newPassword: this.state.newPassword,
        currentPassword: this.state.currentPassword
    }
    
    axios
        .post('/changePassword', userData)
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
              <form noValidate onSubmit={this.onChangePasswordPress}>
              <TextField 
                      id="currentEmail" 
                      name="currentEmail" 
                      type="currentEmail" 
                      label="Current Email" 
                      className={classes.textField}
                      helperText={errors.currentEmail} 
                      error={errors.currentEmail ? true : false} 
                      value={this.state.currentEmail} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
              <TextField 
                      id="username" 
                      name="username" 
                      type="username" 
                      label="Username" 
                      className={classes.textField}
                      helperText={errors.username} 
                      error={errors.username ? true : false} 
                      value={this.state.username} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
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
                      id="newPassword" 
                      name="newPassword" 
                      type="newPassword" 
                      label="New Password" 
                      className={classes.textField}
                      helperText={errors.newPassword}  
                      error={errors.newPassword ? true : false} 
                      value={this.state.newPassword} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  { errors.general && (
                      <Typography variant='h2' className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                      Change Password
                      {loading && (
                          <CircularProgress size={20} className={classes.progress}/>
                      )}
                  </Button>
                  <br />
              </form>
          </div>
      )}
}

ChangePassword.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChangePassword);



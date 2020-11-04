import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/*class Settings extends React.Component {  
    constructor(){
      super();
      this.state = {
          currentEmail: "",
          username: "",
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
        currentEmail: this.state.currentEmail,
        username: this.state.username,
        newEmail: this.state.newEmail,
        currentPassword: this.state.currentPassword
    }
    
    axios
        .post('/home', userData)
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


onChangeEmailPress = () => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
      }).catch((error) => { console.log(error.message); });
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
*/




export default class Settings extends React.Component {  
    render() {
        return (
            <div>
                <Navbar />
                <h2><Link to="deleteAccount" class="button">Delete Account</Link></h2>
                <h2><Link to="ChangeEmail" class="button">Change Email</Link></h2>
                <h2><Link to="ChangePassword" class="button">Change Password</Link></h2>
            </div>
        )
    }
}



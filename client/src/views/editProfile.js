import React from 'react';
import '../css/app.css';
//Import Components
import Navbar from '../components/layout/Navbar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import axios from 'axios';
import index from '../index.js'

//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadIt
})



class editProfile extends React.Component {  
    constructor(){
      super();
      this.state = {
          username: "",
          picture: "",
          description: "",
          loading: false,
          errors: {}
      };
    } 
    
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeProfilePress = (event) => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    const userData = {
        username: localStorage.getItem('username'),
        picture: this.state.picture,
        description: this.state.description
    }
    console.log(userData)
    axios
        .post('/editProfile', userData)
        .then(res => {
            console.log(res.data)
            this.setState({
                message: "User updated successfully",
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


    render() {
      const { classes } = this.props;
      const { errors, loading } = this.state;

      return (
          <div>
              <Navbar />
              <form noValidate onSubmit={this.onChangeProfilePress}>
                  <TextField 
                      id="picture" 
                      name="picture" 
                      type="picture" 
                      label="Profile Picture" 
                      className={classes.textField}
                      helperText={errors.picture} 
                      error={errors.picture ? true : false} 
                      value={this.state.picture} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  <TextField 
                      id="description" 
                      name="description" 
                      type="description" 
                      label="User Description" 
                      className={classes.textField}
                      helperText={errors.description} 
                      error={errors.description ? true : false} 
                      value={this.state.description} 
                      onChange={this.handleChange} 
                      fullwidth />
                  <br />
                  { errors.general && (
                      <Typography variant='h2' className={classes.customError}>
                          {errors.general}
                      </Typography>
                  )}
                  <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                      Change Profile Picture and/or User Description
                      {loading && (
                          <CircularProgress size={20} className={classes.progress}/>
                      )}
                  </Button>
                  <br />
              </form>
          </div>
      )}
}

editProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(editProfile);



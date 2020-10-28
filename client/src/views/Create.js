import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import Logo from '../components/Logo'
import '../css/app.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.spreadIt
})

class Create extends React.Component {  
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            username: '',
            loading: false,
            errors: {}
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            phone: this.state.phone,
            username: this.state.username
        }
        axios
            .post('/signup', newUserData)
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
            <div className='start'>
                <Grid container className={classes.form} direction='column'>
                    <Grid item sm />
                    <Grid item sm>
                        <div className='middle'>
                        <Logo />
                        <Typography variant='h2' className={classes.pageTitle} >
                            Create Account
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                id="email" 
                                name="email" 
                                type="email" 
                                label="Email" 
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
                            <TextField 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                label="Confirm Password" 
                                className={classes.textField}
                                helperText={errors.confirmPassword} 
                                error={errors.confirmPassword ? true : false} 
                                value={this.state.confirmPassword} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            <TextField 
                                id="phone" 
                                name="phone" 
                                type="text" 
                                label="Phone Number (Optional)" 
                                className={classes.textField}
                                helperText={errors.phone} 
                                error={errors.phone ? true : false} 
                                value={this.state.phone} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            <TextField 
                                id="username" 
                                name="username" 
                                type="text" 
                                label="Username" 
                                className={classes.textField}
                                helperText={errors.username} 
                                error={errors.username ? true : false} 
                                value={this.state.username} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            { errors.general && (
                                <Typography variant='h2' className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                                Create Account
                                {loading && (
                                    <CircularProgress size={20} className={classes.progress}/>
                                )}
                            </Button>
                            <br />
                            <small>Already have an account? Log in <Link to ="/login">here</Link>.</small>
                        </form>
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
    )}
}

Create.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Create);
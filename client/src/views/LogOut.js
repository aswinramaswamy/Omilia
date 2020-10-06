import React from 'react';
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
//import IconButton from '@material-ui/core/IconButton'
//import { logoutUser } from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spreadIt
})

class LogOut extends React.Component {  
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleLogOut = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        axios
            .post('/logout')
            .then(res => {
                console.log(res.data)
                localStorage.removeItem('FBIdToken');
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
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
                            Account Log Out
                        </Typography>
                         <form noValidate onSubmit={this.handleLogOut}>
                            <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                                Are you sure you want to log out?
                                {loading && (
                                    <CircularProgress size={20} className={classes.progress}/>
                                )}
                            </Button>
                            <br />
                        </form>
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
    )}
}

LogOut.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogOut);
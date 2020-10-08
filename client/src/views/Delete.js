import React from 'react';
import '../css/app.css';
<<<<<<< Updated upstream
import Header from '../components/Header';
import Footer from '../components/Footer';
=======
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.spreadIt
})

class Delete extends React.Component {  
    constructor() {
        super();
        this.state = {
            postID: -1,
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
        const postData = {
            postID: this.state.postID
        }
        axios
            .delete('/deletePost', postData)
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
>>>>>>> Stashed changes

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <div className='newpost'>
                <Navbar />
                <Grid container className={classes.form} direction='column'>
                    <Grid item sm />
                    <Grid item sm>
                        <div className='middle'>
                        <Typography variant='h2' className={classes.pageTitle} >
                            Delete Post
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                id="postID" 
                                name="postID" 
                                type="postID" 
                                label="Post ID" 
                                className={classes.textField}
                                helperText={errors.postID}
                                error={errors.postID ? true : false} 
                                value={this.state.postID} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            { errors.general && (
                                <Typography variant='h2' className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button type="submit" variant="contained" color="primary" className={classes.Button} disable={loading}>
                                Post content
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
        )
    }
}

Delete.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Delete);
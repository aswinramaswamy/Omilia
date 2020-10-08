import React from 'react';
import '../css/app.css';
import axios from 'axios';
import PropTypes from 'prop-types';
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

class NewPost extends React.Component {  
    constructor() {
        super();
        this.state = {
            body: "",
            createdAt: new Date().toISOString(),
            dislikes: 0,
            edited: false,
            editedTime: null,
            isAnonymous: false,
            likes: 0,
            postID: Math.random(1000),
            userHandle: "",
            userID: Math.random(1000),
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
        console.log("SUBMITTED\n\n")
        event.preventDefault();
        this.setState({
            loading: true
        });
        const postData = {
            body: this.state.body,
            isAnonymous: this.state.isAnonymous,
            createdAt: new Date().toISOString(),
            dislikes: 0,
            edited: false,
            editedTime: null,
            likes: 0,
            postID: Math.random(1000),
            userHandle: "",
            userID: Math.random(1000),
        }
        axios
            .post('/post', postData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer  ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/post');
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
            <div className='newpost'>
                <Grid container className={classes.form} direction='column'>
                    <Grid item sm />
                    <Grid item sm>
                        <div className='middle'>
                        <Typography variant='h2' className={classes.pageTitle} >
                            Create Post
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                id="body" 
                                name="body" 
                                type="body" 
                                label="Post content" 
                                className={classes.textField}
                                helperText={errors.body} 
                                error={errors.body ? true : false} 
                                value={this.state.body} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            <Switch
                                id="isAnonymous"
                                checked="true"
                                name="isAnonymous" 
                                type="isAnonymous" 
                                label="Post Anonymously?" 
                                size='medium'
                                disabled="false"
                                className={classes.switch}
                                helperText={errors.isAnonymous} 
                                error={errors.isAnonymous ? true : false} 
                                value={this.state.isAnonymous} 
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

NewPost.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewPost);

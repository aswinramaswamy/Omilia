import React from 'react';
import '../css/app.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

import Navbar from '../components/Navbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = (theme) => ({
    ...theme.spreadIt
})

class EditPost extends React.Component {  
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
            postID: -1,
            userHandle: "",
            userID: -1,
            loading: false, 
            errors: {},
            message: "",
            link: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        })
    }

    handleCheck = (event) => {
        this.setState({
            isAnonymous: !this.state.isAnonymous
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        /*headers: {
            'Authorization': `${localStorage.FBIdToken}`,
            'authorization': `${localStorage.FBIdToken}`,
            'Content-Type': 'application/json'
          },*/
        const newPost = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: this.state.body,
            userHandle: this.state.userHandle,
            dislikes: this.state.dislikes,
            likes: this.state.likes,
            edited: true,
            editedTime: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            isAnonymous: this.state.isAnonymous,
            postID: this.state.postID,
            userID: this.state.userID,
            link: this.state.link
          }
        console.log(newPost)
        this.setState({
            loading: true
        });
        //createPost({ data: newPost })
        axios
            .post('/post', { data: newPost })
            .then((res) => {
                this.setState({
                    body: "",
                    message: "Post was successful"
                });
            })
            .catch((err) => {
                this.setState({
                    message: "Post failed to send"
                });
            })
        this.setState({
            loading: false,    
        });
    }

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
                            Create Post
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                multiline
                                rows={4}
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
                            <TextField 
                                id="link" 
                                name="link" 
                                type="link" 
                                label="Link" 
                                className={classes.textField2}
                                helperText={errors.link} 
                                error={errors.link ? true : false} 
                                value={this.state.link} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            <FormControl component="fieldset">
                            <FormGroup>
                            <FormControlLabel
                              control={<Switch 
                                id="isAnonymous"
                                checked={this.state.isAnonymous}
                                name="isAnonymous" 
                                type="isAnonymous" 
                                label="Post Anonymously?" 
                                size='medium'
                                className={classes.switch}
                                helperText={errors.isAnonymous} 
                                error={errors.isAnonymous ? true : false} 
                                value={this.state.isAnonymous} 
                                onClick={this.handleCheck} 
                            fullwidth />}
                              label="Anonymous"
                            />
                            </FormGroup>
                            </FormControl>
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
                        <Typography color="primary" variant='caption' className={classes.pageMessage} value={this.state.message} >
                            {this.state.message}
                        </Typography>
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

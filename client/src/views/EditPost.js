import React from "react";
import '../css/app.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = (theme) => ({
    ...theme.spreadIt
});

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
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            postID: "Enter Post ID",
            dialogOpen: false,
            loading: true
        });
        const postData = {
            postID: this.state.postID
        }
        console.log(postData)
        axios
            .delete(`/deletePost/${this.state.postID}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    message: "Post deleted successfully",
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    message: "Post could not be found",
                    errors: err.response.data,
                    loading: false
                });
            })
        const newPost = {
                /*headers: {
                    'Content-Type': 'application/json'
                },*/
                body: this.state.body,
                userHandle: this.state.userHandle,
                dislikes: this.state.dislikes,
                likes: this.state.likes,
                edited: true,
                editedTime: new Date().toISOString(),
                createdAt: this.state.createdAt,
                isAnonymous: this.state.isAnonymous,
                postID: this.state.postID,
                userID: this.state.userID,
                link: this.state.link
              }
            console.log(newPost)
            this.setState({
                loading: true
            });
        axios
            .post('/post', { data: newPost })
            .then((res) => {
                this.setState({
                    body: "",
                    message: "Post was editted successfully"
                });
            })
            .catch((err) => {
                this.setState({
                    message: "Post failed to send"
                });
            })
    }

    handleClose = (event) => {
        this.setState({
            dialogOpen: false
        });
    }

    handleClickOpen = (event) => {
        this.setState({
            message: "",
            dialogOpen: true
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
                            Edit Post
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
                                id="userHandle" 
                                name="userHandle" 
                                type="userHandle" 
                                label="Username" 
                                className={classes.textField2}
                                helperText={errors.userHandle} 
                                error={errors.userHandle ? true : false} 
                                value={this.state.userHandle} 
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
                                label="Change to Anonymous?" 
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
                            <Button onClick={this.handleClickOpen} variant="contained" color="primary" className={classes.Button} disable={loading}>
                                Edit content
                                {loading && (
                                    <CircularProgress size={20} className={classes.progress}/>
                                )}
                            </Button>
                            <Dialog
                                open={this.state.dialogOpen}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">Edit Post</DialogTitle>
                                    
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You are about to edit your post, are you sure you want to do this?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" onClick={this.handleSubmit} color="primary" className={classes.ButtonYes} autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
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

EditPost.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPost);
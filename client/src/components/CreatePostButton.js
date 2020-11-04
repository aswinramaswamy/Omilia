import React from 'react';
import '../css/app.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';

import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadIt
})

export default class CreatePostButton extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
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
            link: "",
            topic: "",
            loading: false,
            createSubmit: false
        }
    }

    handleOpen = (event) => {
        this.setState({
            dialogOpen: true
        })
    }
    handleClose = (event) => {
        this.setState({
            dialogOpen: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        })
    }

    handleCloseSubmit = (event) => {
        this.setState({
            createSubmit: false,
            dialogOpen: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: this.state.body,
            userHandle: this.state.userHandle,
            dislikes: this.state.dislikes,
            likes: this.state.likes,
            edited: false,
            editedTime: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            isAnonymous: this.state.isAnonymous,
            postID: this.state.postID,
            userID: this.state.userID,
            link: this.state.link,
            topic: this.state.topic
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
                    message: "Post was successful",
                    createSubmit: true,
                    dialogOpen: false,
                    topic: "",
                    link: ""
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
            <div className="createPostButton">
                <Button variant="contained" onClick={this.handleOpen} color="primary">
                    Create Post
                </Button>
                <div className="dialog">
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Grid container className="form" direction='column'>
                            <Grid item sm />
                            <Grid item sm>
                                <div className='middle'>
                                <Typography variant='h2' className="pageTitle" >
                                    Create Post
                                </Typography>
                                <form noValidate onSubmit={this.handleSubmit}>
                                <TextField 
                                    id="topic" 
                                    name="topic" 
                                    type="topic" 
                                    label="Topic" 
                                    className="TextField"
                                    helperText={errors.topic} 
                                    error={errors.topic ? true : false} 
                                    value={this.state.topic} 
                                    onChange={this.handleChange} 
                                fullwidth="true" />
                                <br />
                                <TextField 
                                    multiline
                                    rows={4}
                                    id="body" 
                                    name="body" 
                                    type="body" 
                                    label="Post content" 
                                    className="TextField2"
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
                                    className="TextField3"
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
                                        className="Switch"
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
                                <Typography variant='h2' className="ErrorDisplay">
                                    {errors.general}
                                </Typography>
                            )}
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose} color="primary" fullWidth="true">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" onClick={this.handleSubmit} color="primary" className="ButtonYes" autoFocus fullWidth="true">
                                Post
                            </Button>
                        </DialogActions>
                            <br />
                            </form>
                            <Typography color="primary" variant='caption' className="MessageBox" value={this.state.message} >
                                {this.state.message}
                            </Typography>
                            </div>
                            </Grid>
                            <Grid item sm />
                        </Grid>
                    </Dialog>
                </div>
                <div name="message">
                <Dialog
                        open={this.state.createSubmit}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Grid container className="messagedialoggrid" direction='column'>
                            <Grid item sm />
                            <Grid item sm>
                                <div className='middle'>
                                <Paper className="Paper" backgroundColor='red'>
                                <Typography variant='h2' className="pageTitle" >
                                    <font color='black'>Post Created Successfully</font>
                                </Typography>
                                <br />
                                { errors.general && (
                                    <Typography variant='h2' className="ErrorDisplay">
                                        {errors.general}
                                    </Typography>
                                )}
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Go home? or stay here?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseSubmit} color="primary">
                                    Stay here
                                </Button>
                                <Button component={Link} to="/home" color="primary" className="ButtonHome" autoFocus>
                                    Return home
                                </Button>
                            </DialogActions>
                            <br />
                            </Paper>
                            </div>
                            </Grid>
                            <Grid item sm />
                        </Grid>
                    </Dialog>
                </div>
            </div>
        );
    }
}

CreatePostButton.propTypes = {
    classes: PropTypes.object.isRequired
}

//export default CreatePostButton
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

export default class DeletePostButton extends React.Component {
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
            dialogOpenConfirm: false,
            successDialog: false
        }
    }

    handleOpen = (event) => {
        this.setState({
            dialogOpen: true
        })
    }
    handleClose = (event) => {
        this.setState({
            postID: "",
            dialogOpen: false,
            message: ""
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        })
    }

    handleOpenConfirm = (event) => {
        this.setState({
            dialogOpenConfirm: true
        })
    }

    handleCloseConfirm = (event) => {
        this.setState({
            dialogOpenConfirm: false
        })
    }

    handleCloseSuccess = (event) => {
        this.setState({
            successDialog: false,
            message: "",
            postID: ""
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            postID: "Enter Post ID",
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
                    loading: false,
                    dialogOpen: false,
                    dialogOpenConfirm: false,
                    successDialog: true
                });
            })
            .catch(err => {
                this.setState({
                    message: "Post could not be found",
                    errors: err.response.data,
                    loading: false,
                    dialogOpenConfirm: false
                })
            })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <div className="createPostButton">
                <Button variant="contained" onClick={this.handleOpen} color="primary">
                    Delete Post
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
                    <Grid item sm></Grid>    
                        <div className="middle">
                            <Typography variant='h2' className="pageTitle" >
                                Delete Post
                            </Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                id="postID" 
                                name="postID" 
                                type="postID" 
                                label="Post ID" 
                                className="textField"
                                helperText={errors.postID}
                                error={errors.postID ? true : false} 
                                value={this.state.postID} 
                                onChange={this.handleChange} 
                                fullwidth />
                                <br />
                                { errors.general && (
                                    <Typography variant='h2' className="customError">
                                        {errors.general}
                                    </Typography>
                                )}
                                <Button onClick={this.handleOpenConfirm} variant="contained" color="primary" className="Button" disable={loading}>
                                    Delete content
                                </Button>
                                <Button onClick={this.handleClose} variant="contained" color="primary" className="Button">
                                    Cancel
                                </Button>
                                <Dialog
                                open={this.state.dialogOpenConfirm}
                                onClose={this.handleCloseConfirm}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <Typography variant='h2' className="pageTitle" >
                                    <font color='black'>Confirm Delete?</font>
                                </Typography>
                                    
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You are about to delete a post, are you sure you want to do this?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={this.handleCloseConfirm} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" onClick={this.handleSubmit} color="primary" className="ButtonYes" autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                                </Dialog>
                                <br />
                            </form>
                            <Typography color="primary" variant='caption' className="pageMessage" value={this.state.message} >
                                {this.state.message}
                            </Typography>
                        </div>
                    <Grid item sm />
                    </Grid>
                    </Dialog>
                </div>
                <div name="message">
                <Dialog
                        open={this.state.successDialog}
                        onClose={this.handleCloseSuccess}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Grid container className="messagedialoggrid" direction='column'>
                            <Grid item sm />
                            <Grid item sm>
                                <div className='middle'>
                                <Paper className="Paper" backgroundColor='red'>
                                <Typography variant='h2' className="pageTitle" >
                                    <font color='black'>Post Deleted Successfully</font>
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
                                <Button onClick={this.handleCloseSuccess} color="primary">
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

DeletePostButton.propTypes = {
    classes: PropTypes.object.isRequired
}

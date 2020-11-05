import React from 'react';
import '../css/app.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from '../components/layout/Navbar';

import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.spreadIt
})

class UnfollowTopic extends React.Component {
    constructor() {
        super();
        this.state = {
            yourUserName: "Enter Your Username",
            topic: "Enter topic to unfollow",
            dialogOpen: false,
            message: "",
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
            yourUserName: "Enter Your Username",
            topic: "Enter Topic to unfollow",
            dialogOpen: false,
            loading: true
        });
        const postData = {
            topic: this.state.topic,
            yourUserName: this.state.yourUserName
        }
        console.log(postData)
        axios
            .post('/unfollowTopic', { data: postData })
            .then(res => {
                console.log(res.data)
                this.setState({
                    message: "Topic unfollowed successfully",
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    message: "Topic could not be found",
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    handleClose = (event) => {
        this.setState({
            dialogOpen: false
        })
    }

    handleClickOpen = (event) => {
        this.setState({
            message: "",
            dialogOpen: true
        })
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
                            Unfollow Topic
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField 
                                id="yourUserName" 
                                name="yourUserName" 
                                type="yourUserName" 
                                label="Your UserName" 
                                className={classes.textField}
                                helperText={errors.yourUserName}
                                error={errors.yourUserName ? true : false} 
                                value={this.state.yourUserName} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            <TextField 
                                id="topic" 
                                name="topic" 
                                type="topic" 
                                label="Topic" 
                                className={classes.textField}
                                helperText={errors.topic}
                                error={errors.topic ? true : false} 
                                value={this.state.topic} 
                                onChange={this.handleChange} 
                                fullwidth />
                            <br />
                            { errors.general && (
                                <Typography variant='h2' className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button onClick={this.handleClickOpen} variant="contained" color="primary" className={classes.Button} disable={loading}>
                                Unfollow Topic
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
                                <DialogTitle id="alert-dialog-title">Unfollow Topic</DialogTitle>
                                    
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Unfollow this topic?
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

UnfollowTopic.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UnfollowTopic);
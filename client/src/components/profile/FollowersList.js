import React from 'react';
//import '../css/app.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';

import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import FollowCards from './FollowCards';


const styles = (theme) => ({
    ...theme.spreadIt
})

function ShowFollowers() {
    const username = localStorage.getItem('username');
    var followers;
    followers = null;
    //put get request here when working
    console.log(username);
    // replace br with followcards when able
    let followlist = followers ? (
        followers.map((follower) => <br />)
        ) : (
        <p>You have no followers</p>
    );
    return followlist;
}

export default class FollowersList extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
            body: "",
            loading: false, 
            errors: {},
            loading: false
        }
    }

    handleOpen = (event) => {
        this.setState({
            dialogOpen: true,
            loading: false
        })
    }


    handleClose = (event) => {
        this.setState({
            dialogOpen: false,
            loading: false
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <div className="followerslist">
                <Button variant="contained" onClick={this.handleOpen} color="primary">
                    Followers
                </Button>
                <div className="dialog">
                    <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Grid container className="list" direction='column'>
                            <Grid item sm />
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose} color="primary" fullWidth="true">
                                close
                            </Button>
                        </DialogActions>
                            <br />
                            <div>
                                <ShowFollowers />
                            </div>
                            <br />
                            <Typography color="primary" variant='caption' className="MessageBox" value={this.state.message} >
                                {this.state.message}
                            </Typography>
                        <Grid item sm />
                        </Grid>
                    </Dialog>
                </div>
            </div>
        );
    }
}

FollowersList.propTypes = {
    classes: PropTypes.object.isRequired
}
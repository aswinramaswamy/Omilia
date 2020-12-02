import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { blockUser } from '../../redux/actions/userActions';

const styles = theme => ({
    ...theme.spreadIt
});

class BlockUserButton extends Component{
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    handleBlock = () => {
        const user = {
            yourUserName: this.props.yourUserName,
            username: this.props.username
        }
        this.props.blockUser(user);
        this.setState({ open: false });
    }

    render(){
        const {classes, UI: {loading}} = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={200} thickness={2}/>
        ) : (
            <div>
                <Typography color="primary" variant='body2'>
                    Are you sure you want to block this user?
                </Typography>
                <DialogActions>
                    <Button tip="cancel" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button tip="block user" onClick={this.handleBlock}>
                        Confirm
                    </Button>
                </DialogActions>
            </div>
        );

        return (
            <Fragment>
                <h1><button onClick={this.handleOpen}>
                    Block User
                </button></h1>
                <Dialog
                className={classes.DialogContent}
                open={this.state.open}
                onBackdropClick={this.handleClose}
                maxwidth='lg'
                fullWidth
                >
                    <DialogContent>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

BlockUserButton.propTypes = {
    blockUser: PropTypes.func.isRequired,
    yourUserName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI
})

const mapActionsToProps = {
    blockUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BlockUserButton));
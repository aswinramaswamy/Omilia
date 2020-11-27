import React, { Component, Fragment } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentForm from './CommentForm';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

//Icons
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

//Redux
import { connect } from 'react-redux';
import { getPost } from '../../../redux/actions/dataActions';

const styles = {
    card: {
        marginBottom: 20
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px sold rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    invisibleSeperator: {
        border: 'none',
        margin: 4
    }
};

class PostDialog extends Component{
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postID);
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render(){
        const { classes,
            post: {
                postID,
                body,
                createdAt,
                userHandle,
                commentCount,
                comments
            },
            UI: { loading }
        } = this.props;

        const commentsExist = !(commentCount > 0) ? (
            <div>
                <Typography variant="h6" color="primary">
                        No Comments
                </Typography>
                <hr className={classes.invisibleSeperator}/>
            </div>
        ) : (
            <div>
                <Typography variant="h6" color="primary" align="center">
                        Comments
                </Typography>
                <hr className={classes.invisibleSeperator}/>
            </div>
        );

        const dialogMarkup = loading ? (
            <CircularProgress size={200} thickness={2}/>
        ) : (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" color="primary">
                            {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                    </CardContent>
                </Card>
                <hr className={classes.visibleSeperator}/>
                <CommentForm postID={postID}/>
                {commentsExist}
                <Comments comments={comments}/>
            </div>
        );

        return (
            <Fragment>
                <IconButton tip="openComments" onClick={this.handleOpen}>
                    <CommentOutlinedIcon color="primary"/>
                </IconButton>
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

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    postID: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI
})

const mapActionsToProps = {
    getPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
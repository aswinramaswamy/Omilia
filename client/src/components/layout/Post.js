import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { likePost, unlikePost, dislikePost, undislikePost } from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
        marginBottom: 20
    }
};

let liked = false;
let disliked = false;

class Post extends Component {

    likedPost = () => {
        /*if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.postID === this.props.postID
          )
        )
          return true;
        else return false;*/
        return liked;
      };
      dislikedPost = () => {
        /*if (
          this.props.user.dislikes &&
          this.props.user.dislikes.find(
            (dislike) => dislike.postID === this.props.postID
          )
        )
          return true;
        else return false;*/
        return disliked;
      };
      likePost = () => {
        this.props.likePost(this.props.post.postID);
        liked = true;
      };
      unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
        liked = false;
      };
      dislikePost = () => {
        this.props.dislikePost(this.props.post.postID);
        disliked = true;
      };
      undislikePost = () => {
        this.props.undislikePost(this.props.post.postID);
        disliked = false;
      };
    render() {
        dayjs.extend(relativeTime)
        const { classes, post : { createdAt, body, userHandle, likes, dislikes, commentCount } } = this.props
        const likeButton = this.likedPost() ? (
            <IconButton tip="Undo like" onClick={this.unlikePost}>
              <ArrowUpwardIcon color="primary" />
              <span><Typography>{likes}</Typography></span>
            </IconButton>
          ) : (
            <IconButton tip="Like" onClick={this.likePost}>
              <ArrowUpwardIcon color="secondary" />
              <span><Typography>{likes}</Typography></span>
            </IconButton>
          );
          const dislikeButton = this.dislikedPost() ? (
            <IconButton tip="Undo dislike" onClick={this.undislikePost}>
              <ArrowDownwardIcon color="primary" />
              <span><Typography>{dislikes}</Typography></span>
            </IconButton>
          ) : (
            <IconButton tip="dislike" onClick={this.dislikePost}>
              <ArrowDownwardIcon color="secondary" />
              <span><Typography>{dislikes}</Typography></span>
            </IconButton>
          );
        return (
            <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" color="primary">
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    {likeButton}
                    {dislikeButton}
                    <IconButton>
                        <CommentOutlinedIcon color="primary"/>
                        <span><Typography>{commentCount}</Typography></span>
                    </IconButton>
                </CardActions>
            </Card> 
            
            </div>       
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    undislikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost,
    dislikePost,
    undislikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
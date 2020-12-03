import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { likePost, unlikePost, dislikePost, undislikePost, savePost } from '../../../redux/actions/dataActions';
import PropTypes from 'prop-types';
import PostDialog from './PostDialog';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'

//MUI Icons
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const styles = {
    card: {
        marginBottom: 20
    }
};

class Post extends Component {
  constructor() {
    super();
    this.state = {
        liked: false,
        disliked: false,
        dialogOpen: false,
        block: false,
        saved: false
    }
  } 

    likedPost = () => {
        /*if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.postID === this.props.postID
          )
        )
          return true;
        else return false;*/
        return this.state.liked;
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
        return this.state.disliked;
      };
      savedPost = () => {
        return this.state.saved;
      };

      likePost = () => {
        this.props.likePost(this.props.post.postID);
        this.setState({
          liked: true
        })
      };
      unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
        this.setState({
          liked: false
        })
      };
      dislikePost = () => {
        this.props.dislikePost(this.props.post.postID);
        this.setState({
          disliked: true
        })
      };
      undislikePost = () => {
        this.props.undislikePost(this.props.post.postID);
        this.setState({
          disliked: false
        })
      };
    render() {
        dayjs.extend(relativeTime)
        const {
          classes,
          post : {
            createdAt,
            body,
            userHandle,
            likes,
            dislikes,
            commentCount,
            postID,
            topic,
            file
          },
          blockedUsers
        } = this.props

        if(blockedUsers) {
          if(blockedUsers.includes(userHandle)) {
            this.setState({
              block: true
            })
          }
        }

        const realCommentCount = !(commentCount > 0) ? (
            0
          ) : (
              commentCount
          )

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

          const saveButton = this.savedPost() ? (
            <BookmarkIcon color="primary" />
          ) : (
            <IconButton tip="save" onClick={this.dislikePost}>
              <BookmarkBorderIcon color="primary" />
            </IconButton>
          );

        const postCard = this.state.block ? (
          <Card className={classes.card}>
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        Post was blocked
                    </Typography>
                </CardContent>
            </Card>
        ) : (
          <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" color="primary" component={Link} to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <Typography variant="body1" color="black">
                        topic: {topic}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <div>
                      <a href={file}><img src={file} object-fit='scale-down'></img></a>
                    </div>
                </CardContent>
                <CardActions>
                    {likeButton}
                    {dislikeButton}
                    {saveButton}
                    <PostDialog postID={postID} userHandle={userHandle}/>
                    <Typography>{realCommentCount}</Typography>
                </CardActions>
            </Card>
        );

        return (
            <div>
              {postCard}
            </div>
        )
    }
}

Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    undislikePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    blockedUsers: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost,
    dislikePost,
    undislikePost,
    savePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
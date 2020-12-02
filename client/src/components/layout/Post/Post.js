import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { likePost, unlikePost, dislikePost, undislikePost } from '../../../redux/actions/dataActions';
import PropTypes from 'prop-types';
import PostDialog from './PostDialog';

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography'

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
        block: false
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
            postID
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
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    {likeButton}
                    {dislikeButton}
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
    undislikePost
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
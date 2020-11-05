import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DISLIKE_POST, UNDISLIKE_POST} from '../types';
import axios from 'axios';

//get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/posts')
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
    });
};

//like a post
export const likePost = (postID) => (dispatch) => {
    axios
      .get(`/post/${postID}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

//unlike a post
export const unlikePost = (postID) => (dispatch) => {
    axios
      .get(`/post/${postID}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

//dislike a post
export const dislikePost = (postID) => (dispatch) => {
    axios
      .get(`/post/${postID}/dislike`)
      .then((res) => {
        dispatch({
          type: DISLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

//undislike a post
export const undislikePost = (postID) => (dispatch) => {
    axios
      .get(`/post/${postID}/undislike`)
      .then((res) => {
        dispatch({
          type: UNDISLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
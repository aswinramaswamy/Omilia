import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DISLIKE_POST, UNDISLIKE_POST, SET_POST, LOADING_UI, STOP_LOADING_UI, CLEAR_ERRORS, CREATE_COMMENT, SET_ERRORS} from '../types';
import axios from 'axios';

//get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  /*axios
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
    });*/
};

//get a specific post
export const getPost = (postID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/post/${postID}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
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

//comment on a post
export const createComment = (postID, commentData) => (dispatch) => {
  axios
    .post(`/post/${postID}/comment`, commentData)
    .then(res => {
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

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

  //clear errors
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  
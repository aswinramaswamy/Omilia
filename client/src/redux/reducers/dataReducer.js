import { SET_POSTS, LIKE_POST, UNLIKE_POST, DISLIKE_POST, UNDISLIKE_POST, LOADING_DATA, SET_POST } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case SET_POST:
        return {
          ...state,
          post: action.payload
        };
      case LIKE_POST:
      case UNLIKE_POST:
      case DISLIKE_POST:
      case UNDISLIKE_POST:
        let index = state.posts.findIndex(
          (post) => post.postID === action.payload.postID
        );
        state.posts[index] = action.payload;
        if (state.post.postID === action.payload.postID) {
          state.post = action.payload;
        }
        return {
          ...state
        };
        default:
            return state;
    }
}
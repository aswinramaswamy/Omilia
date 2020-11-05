import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_POST,
    UNLIKE_POST,
    DISLIKE_POST,
    UNDISLIKE_POST
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    dislikes: [],
    notifications: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
        case LIKE_POST:
          return {
            ...state,
            likes: [
              ...state.likes,
              {
                userHandle: state.credentials.handle,
                postID: action.payload.postID
              }
            ]
          };
        case UNLIKE_POST:
          return {
            ...state,
            likes: state.likes.filter(
              (like) => like.postID !== action.payload.postID
            )
          };
          case DISLIKE_POST:
            return {
              ...state,
              dislikes: [
                ...state.dislikes,
                {
                  userHandle: state.credentials.handle,
                  postID: action.payload.postID
                }
              ]
            };
          case UNDISLIKE_POST:
            return {
              ...state,
              dislikes: state.dislikes.filter(
                (dislike) => dislike.postID !== action.payload.postID
              )
            };
      default:
        return state;
    }
  }
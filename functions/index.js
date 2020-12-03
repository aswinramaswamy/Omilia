const functions = require('firebase-functions');

const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');
db.settings({ ignoreUndefinedProperties: true })

const {
  getAllPosts,
  createPost,
  deletePost,
  editPost,
  getPosthandle,
  getPost,
  createComment,
  likePost,
  unlikePost,
  dislikePost,
  undislikePost,
  savePost,
  initFile
} = require('./handlers/posts');
const {
  signup,
  login,
  phoneLogin,
  logout,
  deleteAccount,
  changeEmail,
  changePassword,
  changeUsername,
  getProfile,
  confirmEmail,
  searchUsers,
  followUser,
  followTopic,
  unfollowUser,
  unfollowTopic,
  changeProfile,
  blockUser,
  getFollowers,
  getFollowings,
  getProfileInfo
} = require('./handlers/users');
//const { default: EditPost } = require('../client/src/views/EditPost');

// Post routes
app.get('/posts', getAllPosts);
//app.post('/post', FBAuth, createPost);
app.post('/post', createPost);
app.delete('/deletePost/:postID', deletePost);
app.post('/editPost', editPost);
app.get('/post/:postID', getPost);
app.get('/userpost/:userHandle', getPosthandle);
app.get('/post/:postID/like', likePost);
app.get('/post/:postID/unlike', unlikePost);
app.get('/post/:postID/dislike', dislikePost);
app.get('/post/:postID/undislike', undislikePost);
app.post('/post/:postID/comment', createComment);
app.get('/followers/:username', getFollowers);
app.get('/followings/:username', getFollowings);
app.post('/post/:postID/savePost', savePost);
app.get('/initfile', initFile);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/phoneLogin', phoneLogin);
app.post('/logout', logout);
app.post('/deleteAccount', deleteAccount);
app.post('/changeEmail', changeEmail);
app.post('/changePassword', changePassword);
app.post('/changeUsername', changeUsername);
app.get('/confirmEmail/:username', confirmEmail);
app.post('/searchUsers', searchUsers);
app.post('/followUser/:username', followUser);
app.post('/followTopic', followTopic);
app.post('/unfollowUser/:username', unfollowUser);
app.post('/unfollowTopic', unfollowTopic);
app.post('/editProfile', changeProfile);
app.post('/getProfile', getProfile);
app.post('/blockUser', blockUser);

exports.api = functions.https.onRequest(app);
const functions = require('firebase-functions');

const app = require('express')();
//const FBAuth = require('./util/fbAuth');

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
  undislikePost
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
  searchUsers
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
app.get('/userdata', getProfile);

exports.api = functions.https.onRequest(app);
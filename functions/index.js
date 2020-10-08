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
} = require('./handlers/posts');
const {
  signup,
  login,
  logout,
  deleteAccount,
  changeEmail,
  changePassword,
} = require('./handlers/users');

// Post routes
app.get('/posts', getAllPosts);
//app.post('/post', FBAuth, createPost);
app.post('/post', createPost);
app.delete('/deletePost/:postID', deletePost);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);
app.post('/deleteAccount', deleteAccount);
app.post('/changeEmail', changeEmail);
app.post('/changePassword', changePassword);


exports.api = functions.https.onRequest(app);
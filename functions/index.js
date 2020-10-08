const functions = require('firebase-functions');

const app = require('express')();
//const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');

const {
  getAllPosts,
  createPost,
  deletePost,
} = require('./handlers/posts');
const {
  signup,
  login,
  changeEmail,
} = require('./handlers/users');

// Post routes
app.get('/posts', getAllPosts);
<<<<<<< Updated upstream
app.post('/post', FBAuth, createPost);
=======
//app.post('/post', FBAuth, createPost);
app.post('/post', createPost);
//app.delete('/deletePost', deletePost);
>>>>>>> Stashed changes

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/changeEmail', changeEmail);

exports.api = functions.https.onRequest(app);
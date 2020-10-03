const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllPosts, createPost } = require('./handlers/posts');
const { signup, login } = require('./handlers/users');

//Posts Routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, createPost)

//Users Routes
app.post('/create', signup)
app.post('/login', login)

exports.api = functions.https.onRequest(app);
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const app = require('express')();

const FBAuth = require('./util/fbAuth');
const config = {
  apiKey: "AIzaSyDmKCniMq-cI6agTHXfBChYhVd5KMz2q50",
  authDomain: "omilia-b1cce.firebaseapp.com",
  databaseURL: "https://omilia-b1cce.firebaseio.com",
  projectId: "omilia-b1cce",
  storageBucket: "omilia-b1cce.appspot.com",
  messagingSenderId: "562663553482",
  appId: "1:562663553482:web:56cf975ee7384b816ef733",
  measurementId: "G-DTEP2RK35X"
};


const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

//Get Posts Route
app.get('/posts', (req, res) => {
  db
  .collection('posts')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    let posts = [];
    data.forEach(doc => {
      posts.push({
        postId: doc.id,
        ...doc.data()
      });
    });
    return res.json(posts);
  })
  .catch(err => console.error(err));
})

//Create Posts Route
app.post('/post', (req, res) => {
    const newPost = {
      body: req.body.body,
      userHandle: req.body.userHandle,
      createdAt: new Date().toISOString(),
      edited: false,
      anonymous: false,
      dislikes: 0,
      likes: 0,
      editedTime: new Date().toISOString(),
      postID: -3, 
      userID: -3
    }

    db.collection('posts')
      .add(newPost)
      .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
      });
})

app.delete('/delete', (req, res) => {
  const post = db.doc(`/posts/${req.params.postID}`);
  post.get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Post not found' });
        }
        if (doc.data().userID !== req.userID) {
          return res.status(403).json({error: 'Not authorized user' });
        }
        else {
          return post.delete();
        }
      })
      .then(() => {
        res.json({ message: 'Post succesfully deleted' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      })
})

const { getAllPosts, createPost } = require('./handlers/posts');
const { signup, login } = require('./handlers/users');
//Create Account Route
app.post('/create', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

//Posts Routes
app.get('/posts', getAllPosts)
app.post('/post', FBAuth, createPost)
  // TODO: Validate Data
  let token, userId;

//Users Routes
app.post('/create', signup)
app.post('/login', login)
  db.doc(`/users/${newUser.username}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ username: 'this username is already taken'})
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: 'email is already in use' })
      } else {
        return res.status(500).json({ error: err.code });
      }
    })
})

exports.api = functions.https.onRequest(app);
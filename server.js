/*const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const firebase = require('firebase');

firebase.initializeApp(firebaseConfig);
admin.initializeApp();
//if you are using Realtime Database

admin.firestore()
    .collection('posts')
    .add(newPost)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    })

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
    
//Read data from Firebase
firebase.database().ref('/Users').once('value').then(function(snapshot) { 
  console.log(snapshot.val());
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/create_user', (req, res) => {
  res.get();
});*/
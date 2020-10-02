const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyDmKCniMq-cI6agTHXfBChYhVd5KMz2q50",
  authDomain: "omilia-b1cce.firebaseapp.com",
  databaseURL: "https://omilia-b1cce.firebaseio.com",
  projectId: "omilia-b1cce",
  storageBucket: "omilia-b1cce.appspot.com",
  messagingSenderId: "562663553482",
  appId: "1:562663553482:web:56cf975ee7384b816ef733",
  measurementId: "G-DTEP2RK35X"
}
firebase.initializeApp(firebaseConfig);

//if you are using Realtime Database
const database = firebase.database();

//Write data to Firebase
firebase.database().ref('Users/').set({ 
  "User1": {
    Name: "FirstName LastName",
    Email: "email@email.com",
    Course: "CS 307",
    SomeObject: 50
  },
  "User2": {
    Name: "abc xyc",
    Email: "aabbcc@zzz.com",
    Course: "CS 180",
  }
});
    
//Read data from Firebase
firebase.database().ref('/Users').once('value').then(function(snapshot) { 
  console.log(snapshot.val());
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
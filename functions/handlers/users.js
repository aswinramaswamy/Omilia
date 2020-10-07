const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config)

const { validateSignupData, validateLoginData, validateChangeEmail } = require('../util/validation');

//Change Email
exports.changeEmail = (req, res) => {
  const user = {
    username: req.body.username,
    currentEmail: req.body.currentEmail,
    newEmail: req.body.newEmail,
    currentPassword: req.body.currentPassword
  };

  const { valid, errors } = validateChangeEmail(user);

  if(!valid) return res.status(400).json(errors);
  const userCredentials = {
    username: user.username,
    email: user.email,
    createdAt: new Date().toISOString(),
    userId
  };
  
  db.doc(`/users/${user.username}`).get()
      .then(doc => {
        if (doc.exists) {
            user.reauthenticateWithCredential(userCredentials).then(function() {
            firebase.auth().signInWithEmailAndPassword(user.currentEmail, user.currentPassword)
            var curUser = firebase.auth().currentUser;
            return curUser.updateEmail(user.newEmail)
          })
          .then(function () {
               db.doc(`/users/${user.username}`).update({ email: user.newEmail});
               if (curUser == NULL) {
                return res.status(1).json({ general: 'NULL' });
               }
          })
          .catch(function (error) {
               console.log("Error changing Email", error);
          });
        } else {
          return res.status(1).json({ general: 'oops' });
        }
      })
      .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ general: 'Something went wrong, please try again' });
      })
}

//Create User
exports.signup = (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      username: req.body.username,
    };

    const { valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);
  
    let token, userId;
  
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
          return res.status(500).json({ general: 'Something went wrong, please try again' });
        }
      })
  }

//Log User In
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if(!valid) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(err => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-found
      return res.status(403).json({ general: 'Wrong credentials, please try again' });
    })
}

exports.logout = (req, res) => {
  firebase.auth().signOut();
}

//Delete Account
exports.deleteAccount = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if(!valid) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(err => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-found
      return res.status(403).json({ general: 'Wrong credentials, please try again' });
    })
}
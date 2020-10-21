const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  validateChangeEmail,
} = require("../util/validation");

const { format } = require("mysql");

//Change Email
exports.changeEmail = (req, res) => {
  const user = {
    username: req.body.username,
    currentEmail: req.body.currentEmail,
    newEmail: req.body.newEmail,
    currentPassword: req.body.currentPassword,
  };

  const { valid, errors } = validateChangeEmail(user);

  if (!valid) return res.status(400).json(errors);
  const userCredentials = {
    username: user.username,
    email: user.email,
    createdAt: new Date().toISOString(),
    userId,
  };

  db.doc(`/users/${user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var user1 = firebase.auth().currentUser;
        user1
          .reauthenticateWithCredential(userCredentials)
          .then(function () {
            var curUser = firebase.auth().currentUser;
            return curUser.updateEmail(user.newEmail);
          })
          .then(function () {
            firebase
              .auth()
              .sendPasswordResetEmail(user.newEmail)
              .then(function () {
                // Email sent.
              })
              .catch(function (error) {
                console.log("Error changing Email", error);
              });
            db.doc(`/users/${user.username}`).update({ email: user.newEmail });
            if (curUser == NULL) {
              return res.status(1).json({ general: "NULL" });
            }
          })
          .catch(function (error) {
            console.log("Error changing Email", error);
          });
      } else {
        return res.status(1).json({ general: "oops" });
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    });
};

// Change Password
exports.changePassword = (req, res) => {
  const user = {
    username: req.body.username,
    currentEmail: req.body.currentEmail,
    newPassword: req.body.newPassword,
    currentPassword: req.body.currentPassword,
  };

  const { valid, errors } = validateChangeEmail(user);

  if (!valid) return res.status(400).json(errors);
  const userCredentials = {
    username: user.username,
    email: user.email,
    createdAt: new Date().toISOString(),
    userId,
  };

  db.doc(`/users/${user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var user1 = firebase.auth().currentUser;
        user1
          .reauthenticateWithCredential(userCredentials)
          .then(function () {
            var curUser = firebase.auth().currentUser;
            return curUser
              .updatePassword(user.newPassword)
              .then(function () {
                // Updated.
              })
              .catch(function (error) {
                console.log("Error changing Password", error);
              });
          })
          .then(function () {
            firebase
              .auth()
              .sendPasswordResetEmail(user.newEmail)
              .then(function () {
                // Email sent.
              })
              .catch(function (error) {
                console.log("Error changing Password", error);
              });
          })
          .catch(function (error) {
            console.log("Error changing Password", error);
          });
      } else {
        return res.status(1).json({ general: "oops" });
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    });
};

//Create User
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
    phone: req.body.phone,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId, foundPhone;

  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "this username is already taken" });
      } else {
        db.collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach(function (doc) {
            if (JSON.stringify(doc.data().phone) === JSON.stringify(newUser.phone)) {
              foundPhone = newUser.phone;
              console.log(newUser.phone);
            }
          });
          console.log(foundPhone);
          if (typeof foundPhone === 'undefined') {
            console.log('in the if statement')
            return firebase
              .auth()
              .createUserWithEmailAndPassword(newUser.email, newUser.password);
          }
        })
        .then((data) => {
          console.log(data);
          if (typeof data !== 'undefined') {
            userId = data.user.uid;
            return data.user.getIdToken();
          } else {
            return res.status(401).json({ phone: "this phone number is already in use"}); //actually sends this
          }
        })
        .then((idToken) => {
          if (typeof userId !== 'undefined') {
            token = idToken;
            const userCredentials = {
              username: newUser.username,
              email: newUser.email,
              phone: newUser.phone,
              createdAt: new Date().toISOString(),
              userId,
            };
            db.doc(`/users/${newUser.username}`).set(userCredentials);
          }
        })
        .then(() => {
          if (typeof userId !== 'undefined') {
            return res.status(201).json({ token });
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.code === "auth/email-already-in-use") {
            return res.status(400).json({ email: "email is already in use" });
          } else {
            return res
              .status(500)
              .json({ general: "Something went wrong, please try again" });
          }
        });
      }
    })
};

//Log user in with Phone Number
exports.phoneLogin = (req, res) => {
  const user = {
    phone: req.body.phone,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
};

//Log User In
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-found
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

//Log user out
exports.logout = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-found
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
  firebase.auth().signOut();
};

//Delete Account
exports.deleteAccount = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-found
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
  firebase.auth().signOut();
};

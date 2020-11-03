//Database Shortcut
const { db } = require("../util/admin");

//Firebase Internet Location
const config = require("../util/config");

//For Email Creation
const nodemailer = require("nodemailer");

//Initialize Firebase Code
const firebase = require("firebase");
firebase.initializeApp(config);

//Importing Validation Functions
const {
  validateSignupData,
  validatePhoneLoginData,
  validateLoginData,
  validateChangeEmail
} = require("../util/validation");

const { format } = require("mysql");
const admin = require("../util/admin");

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
  //Sent in from Client
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
    phone: req.body.phone,
  };

  //Checking if Fields are correct
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  //Email Send Function
  function sendVerificationEmail(email, link) {
    //SMTP Config
    var smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'omiliacs307@gmail.com', //Personal Username
        pass: 'Omilia2020CS307' //Personal Password
      }
    }

    //Opening Email Path
    var transporter = nodemailer.createTransport(smtpConfig);

    //Email Customization
    var mailOptions = {
      from: "Omilia@email.com", // sender address
      to: email, // list of receivers
      subject: "Email Verification for your Omilia Account", // Subject line
      text: "Email verification, press here to verify your email: " + link,
      html: "<b>Hello there,<br> Click <a href=" + link + "> here to verify</a></b>" // html body
    };

    //Using an Email Path
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }

      //Closing Email Path
      transporter.close(); // shut down the connection pool, no more messages
    });
  }

  //Creating Temp Variables
  let token, userId, foundPhone;

  //The Promise Chain
  db.doc(`/users/${newUser.username}`) //Access database by document
    .get() //Accesses the user requested, returns the user as a doc
    .then((doc) => { 
      if (doc.exists) { //If user already exists
        return res
          .status(400)
          .json({ username: "this username is already taken" });
      } else { //User does not exist, so make a new one
        //Second Promise Chain to find if the phone number is already taken
        db.collection("users") //Access 'users' collection
        .get() //Access all users and return as 'snapshot' array essentially
        .then((snapshot) => { //Checking every user if the phone number is already taken
          snapshot.forEach(function (doc) {
            if (JSON.stringify(doc.data().phone) === JSON.stringify(newUser.phone)) { //If the phone number is found
              foundPhone = newUser.phone;
            }
          });
          if (typeof foundPhone === 'undefined') { //If the phone number is not found
            var verificationLink = "https://us-central1-omilia-b1cce.cloudfunctions.net/api/confirmEmail/" + newUser.username; //Verification Link Creation
            sendVerificationEmail(newUser.email, verificationLink); //Should send the email
            return firebase //Creates User and Returns the data of the user
              .auth()
              .createUserWithEmailAndPassword(newUser.email, newUser.password);
          }
        })
        .then((data) => {
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
              isEmailVerified: false,
              isPhoneVerified: false,
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

  const { valid, errors } = validatePhoneLoginData(user);

  if (!valid) return res.status(400).json(errors);

  let foundEmail;

  db.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        if (JSON.stringify(doc.data().phone) === JSON.stringify(user.phone)) {
          if (doc.data().isEmailVerified === true) {
            foundEmail = doc.data().email;
          }
        }
      });
      if (typeof foundEmail !== 'undefined') {
        return firebase
          .auth()
          .signInWithEmailAndPassword(foundEmail, user.password);
      }
    })
    .then((data) => {
      if (typeof data !== 'undefined') {
        return data.user.getIdToken();
      } else {
        return new Error; //res.status(401).json({ phone: "incorrect phone number"}); //actually sends this
      }
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

//Log User In
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  db.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        if (JSON.stringify(doc.data().email) === JSON.stringify(user.email)) {
          if (doc.data().isEmailVerified === true) {
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
          } else {
            return res
              .status(403)
              .json({ general: "Email is not found or is not verified, please try again" })
          }
        }
      });
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
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);
  const userCredentials = {
    username: user.username,
    email: user.email,
    createdAt: new Date().toISOString(),
    userId,
  };

  let uid;
  db.doc(`/users/${user.username}`) //Access database by document
    .get() //Accesses the user requested, returns the user as a doc
    .then((doc) => {
      uid = doc.data().userId;
      admin.auth().deleteUser(uid)
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully deleting user', userRecord.toJSON());
        })
        .catch(function(error) {
          console.log('Error deleting user:', error);
          return res.status(503).send("Error deleting user");
        });
    })
  db.collection('users')
    .doc(user.username)
    .delete()
      .then((doc) => { 
        console.log("Successfully deleted user");
        console.log(JSON.stringify(doc));
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
           // delete successful.
          }).catch(function(error) {
            // An error happened.
          });

        return res.status(200).send('account has been deleted'); 
      })
      .catch(err => {
        console.log('Error deleting account', err);
        return response.status(500);
      })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    });
};

//Confirm Email
exports.confirmEmail = (req, res) => {  
  let username = req.params.username;
  //Promise Chain
  db.collection('users')
    .doc(username) //Get the reference for the user document
    .update({ isEmailVerified: true }) //Updating the email to be verified
    .then((doc) => { //
      console.log("Successfully updated user");
      console.log(JSON.stringify(doc));
      return res.status(200).send('Email is validated, please return to Omilia and login.');
    })
    .catch(err => {
      console.log('Error getting document', err);
      return response.status(500);
    }
  );
}

exports.searchUsers = (req, res) => {
  const search = req.body.search;
  let re = new RegExp("[\*\\\$\.\+]");
  if (re.test(search)) {
    return res.status(201).json({ error: characters })
  }
  re = new RegExp("[\w\d]*" + search + "[\w\d]*", "gi");

  db.collection('users')
  .get()
  .then((snapshot) => {
    let users = [];
    snapshot.forEach(function (doc) {
      if (re.test(doc.data().username)) {
        users.push({
          username: doc.data().username
        });
      }
    })
    return res.json(users);
  })
  .catch(err => console.error(err));
}
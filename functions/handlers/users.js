//Database Shortcut
const { db, admin } = require("../util/admin");

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
//const admin = require("../util/admin");


//get userdata
exports.getProfile = (req, res) => {
  const user = {
    username: req.body.username
  }
  db
  .collection('users')
  .doc(user.username)
  .get()
  .then((doc) => {
    localStorage.setItem('user', user.username);
    return res.json(doc.data());
  })
  .catch(err => console.error(err));
}

//get userdata
exports.getProfileInfo = (req, res) => {
  const user = {
    username: req.body.username
  }
  const info = {
    picture: null,
    description: null
  }

  db
  .collection('users')
  .doc(user.username)
  .get()
  .then((doc) => {
    info.picture = doc.data().picture;
    info.description = doc.data().description;
    return res.json(info);
  })
  .catch(err => console.error(err));
}

exports.getFollowers = (req, res) => {
  const user = { 
    username: req.body.username
  }
  db
  .collection('users')
  .doc(user.username)
  .collection('followers')
  .get()
  .then((doc) => {
    let followers = [];
      data.forEach(doc => {
        followers.push({
          username: doc.username,
          ...doc.data()
        });
      });
      return res.json(followers);
  })
  .catch(err => console.error(err));
}

exports.getFollowings = (req, res) => {
  const user = { 
    username: req.body.username
  }
  db
  .collection('users')
  .doc(user.username)
  .collection('following')
  .get()
  .then((doc) => {
    let followings = [];
      data.forEach(doc => {
        followings.push({
          username: doc.username,
          ...doc.data()
        });
      });
      return res.json(followings);
  })
  .catch(err => console.error(err));
}

//Change Username
exports.changeUsername = (req, res) => {
  const user = {
    username: req.body.username,
    currentEmail: req.body.currentEmail,
    newUsername: req.body.newUsername,
    currentPassword: req.body.currentPassword,
  };

  //const { valid, errors } = validateChangeEmail(user);

  //if (!valid) return res.status(400).json(errors);

  //Email Send Function
  function sendVerificationEmail(email) {
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
      to: user.newEmail, // list of receivers
      subject: "Username Change Verification for your Omilia Account", // Subject line
      text: "Email verification, your username has been changed ",
      html: "<b>Hello there,<br> username changed </b>" // html body
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


 /* let uid;
  db.doc(`/users/${user.username}`) //Access database by document
    .get() //Accesses the user requested, returns the user as a doc
    .then((doc) => {
      uid = doc.data().userId;
      admin.auth().updateUser(uid, {
        displayName: user.newUsername
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch(function(error) {
          console.log('Error updating user:', error);
          return res.status(503).send("Error updating username auth");
        });
    })*/
  db.collection('users')
    .doc(user.username)
    .get()
    .then((doc) => {
      if (doc && doc.exists) {
          var data = doc.data();
          // saves the data to 'name'
          db.collection('users').doc(user.newUsername).set(data).then((doc) => {
          db.collection('users').doc(user.username).delete();
          db.collection('users').doc(user.newUsername).update({ username: user.newUsername });
          sendVerificationEmail(user.currentEmail); //Should send the email
          return res.status(200).send('username has been changed'); 
          })
        }
      })
    //.update({ username: user.newUsername })
     /* .then((doc) => { 
        console.log("Successfully updated username");
        console.log(JSON.stringify(doc));
        sendVerificationEmail(user.currentEmail); //Should send the email
        return res.status(200).send('username has been changed'); 
      })*/
      .catch(err => {
        console.log('Error changing username', err);
        return response.status(500);
      })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    });
};

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

  //Email Send Function
  function sendVerificationEmail(email) {
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
      to: user.newEmail, // list of receivers
      subject: "Email Change Verification for your Omilia Account", // Subject line
      text: "Email verification, your email has been changed ",
      html: "<b>Hello there,<br> email changed </b>" // html body
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


  let uid;
  db.doc(`/users/${user.username}`) //Access database by document
    .get() //Accesses the user requested, returns the user as a doc
    .then((doc) => {
      uid = doc.data().userId;
      admin.auth().updateUser(uid, {
        email: user.newEmail
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch(function(error) {
          console.log('Error updating user:', error);
          return res.status(503).send("Error updating email auth");
        });
    })
  db.collection('users')
    .doc(user.username)
    .update({ email: user.newEmail })
      .then((doc) => { 
        console.log("Successfully updated email");
        console.log(JSON.stringify(doc));
        sendVerificationEmail(user.newEmail); //Should send the email
        return res.status(200).send('Email has been changed'); 
      })
      .catch(err => {
        console.log('Error changing email', err);
        return response.status(500);
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
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  };

  //const { valid, errors } = validateChangeEmail(user);

  //if (!valid) return res.status(400).json(errors);
  
  //Email Send Function
  function sendVerificationPassword(email) {
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
      to: user.currentEmail, // list of receivers
      subject: "Password Change Verification for your Omilia Account", // Subject line
      text: "Password verification, your Password has been changed ",
      html: "<b>Hello there,<br> Password changed </b>" // html body
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

  let uid;
  db.doc(`/users/${user.username}`) //Access database by document
    .get() //Accesses the user requested, returns the user as a doc
    .then((doc) => {
      uid = doc.data().userId;
      admin.auth().updateUser(uid, {
        password: user.newPassword
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully updated user', userRecord.toJSON());
          sendVerificationPassword(user.currentEmail); //Should send the email
        })
        .catch(function(error) {
          console.log('Error updating user:', error);
          return res.status(400).send("Error updating password auth");
        });
    })
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
    picture: req.body.picture,
    description: req.body.description,
    userFollows: req.body.userFollows,
    topicFollows: req.body.topicFollows
  };

  const noImg = 'no-img.jpg'

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
            if (JSON.stringify(doc.data().phone) !== JSON.stringify('') && JSON.stringify(doc.data().phone) === JSON.stringify(newUser.phone)) { //If the phone number is found
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
              picture: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
              description: newUser.description,
              isEmailVerified: false,
              isPhoneVerified: false,
              createdAt: new Date().toISOString(),
              userId,
              userFollows: [""],
              topicFollows: [""],
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
  let foundUsername;

  db.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        if (JSON.stringify(doc.data().phone) === JSON.stringify(user.phone)) {
          if (doc.data().isEmailVerified === true) {
            foundEmail = doc.data().email;
            foundUsername = doc.data().username;
          }
        }
      });
      if (typeof foundEmail !== 'undefined') {
        return firebase
          .auth()
          .signInWithEmailAndPassword(foundEmail, user.password)
          .then((data) => {
            return data.user.getIdToken();
          })
          .then((token) => {
            return res.json({ token, email: foundEmail, username: foundUsername });
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
        return res.status(403).json({ general: "Wrong Credentials, please try again"});
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ general: "Wrong credentials, please try again"});
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
                //return res.json({ data: data.user.getIdToken, ...doc.data() });
              })
              .then((token) => {
                return res.json({ token, email: doc.data().email, username: doc.data().username });
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
           firebase.auth().signOut();
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
  let re = new RegExp("[\\\$\+]");
  if (re.test(search)) {
    return res.status(201).json({ error: characters })
  }
  re = new RegExp("[\w\d]*" + search + "[\w\d]*", "gi");

  let results = [];
  db.collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        if (re.test(doc.data().username)) {
          results.push({
            username: doc.data().username
          });
        }
      })
    })
    .catch(err => console.error(err));
  
  db.collection('posts')
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        if (re.test(doc.data().body)) {
          results.push({
            postId: doc.id,
            ...doc.data()
          });
        }
      });
      return res.json(results);
    })
    .catch(err => console.error(err));
}

exports.followUser = (req, res) => {
  const user = {
    yourUserName: req.body.yourUserName,
    username: req.body.username
  };

  const userDocument = db.doc(`users/${user.yourUserName}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    return userDocument.update({ userFollows: admin.firestore.FieldValue.arrayUnion(user.username) });
  })
  .then(() => {
    return res.json( { success: `${user.username} was successfully followed` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.followTopic = (req, res) => {
  const user = {
    yourUserName: req.body.yourUserName,
    topic: req.body.topic
  };

  const userDocument = db.doc(`users/${user.yourUserName}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    return userDocument.update({ topicFollows: admin.firestore.FieldValue.arrayUnion(user.topic) });
  })
  .then(() => {
    return res.json( { success: `${user.topic} was successfully followed` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.unfollowUser = (req, res) => {
  const user = {
    yourUserName: req.body.yourUserName,
    username: req.body.username
  };

  const userDocument = db.doc(`users/${user.yourUserName}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    return userDocument.update({ userFollows: admin.firestore.FieldValue.arrayRemove(user.username) });
  })
  .then(() => {
    return res.json( { success: `${user.username} was successfully unfollowed` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.unfollowTopic = (req, res) => {
  const user = {
    yourUserName: req.body.yourUserName,
    topic: req.body.topic
  };


  const userDocument = db.doc(`users/${user.yourUserName}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    return userDocument.update({ topicFollows: admin.firestore.FieldValue.arrayRemove(user.topic) });
  })
  .then(() => {
    return res.json( { success: `${user.topic} was successfully unfollowed` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.changeProfile = (req, res) => {
  const user = {
    username: req.body.username,
    picture: req.body.picture,
    description: req.body.description,
  };
  
  const userDocument = db.doc(`users/${user.username}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    //this.uploadImage(user,res);
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${user.picture}?alt=media`;
    //db.doc(`users/${user.username}`).update({ picture: imageURL});
    userDocument.update({ picture: imageURL });
    return userDocument.update({ description: user.description });
  })
  .then(() => {
    return res.json( { success: `Picture and Description were successfully updated` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.blockUser = (req, res) =>{
  const user = {
    yourUserName: req.body.yourUserName,
    username: req.body.username
  };

  const userDocument = db.doc(`users/${user.yourUserName}`);
  

  userDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'User does not exist'});
    }
    //increase like count in doc
    return userDocument.update({ blockedUsers: admin.firestore.FieldValue.arrayUnion(user.username) });
  })
  .then(() => {
    return res.json( { success: `${user.username} was successfully blocked` } );
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.uploadImage = (req, res) =>{
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');
  const user = {
    username: req.body.username,
  };

  const busboy = new BusBoy({headers: req.headers});

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname);
    console.log(filename);
    console.log(mimetype);
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${Math.round(Math.random()*10000000)}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = {filepath, mimetype};
    file.pipe(fs.createWriteStream(filepath));
  })
  busboy.on('finish', () => {
    admin.storage().bucket().upload(imageToBeUploaded.filepath, {
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
    .then(() => {
      const imageURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
      db.doc(`users/${user.username}`).update({ picture: imageURL});
    })
    .then(() => {
      return res.json( { success: `Picture was successfully updated` } );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Something went wrong'});
    })
  })
}

const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');

exports.getAllPosts = (req, res) => {
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
}

exports.createPost = (req, res) => {
    if(req.body === '') {
      return res.status(400).json({body: 'Body must not be empty'});
    }
  
    const newPost = {
      body: req.body,
      userHandle: req.userHandle,
      createdAt: new Date().toISOString()
    }
    db.settings({ ignoreUndefinedProperties: true })
    db
      .collection('posts')
      .add(newPost)
      .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
    });
}
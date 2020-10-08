const { db } = require('../util/admin')

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
    if(req.body.body.trim() === '') {
      return res.status(400).json({body: 'Body must not be empty'});
    }
    const newPost = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.body,
      likes: 0,
      dislikes: 0,
      userID: req.userID,
      userHandle: req.userHandle,
      postID: req.postID,
      isAnonymous: req.isAnonymous,
      edited: false
    }
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

exports.deletePost = (req, res) => {
  const postData = {
    headers: {
      'Content-Type': 'application/json'
    },
    postID: req.postID
  }
  db.doc(`/posts/${postData.postID}`).get()
    .then(doc => {
      if (doc.exists) {
          db.doc(`/posts/${postData.postID}`).delete();
      }
      else {
        res.status(404).json({ error: "post does not exist" })
      }
    })
}
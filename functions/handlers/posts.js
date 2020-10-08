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
    const newPost = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.body.data.body,
      likes: 0,
      dislikes: 0,
      userID: req.body.data.userID,
      userHandle: req.body.data.userHandle,
      postID: req.body.data.postID,
      isAnonymous: req.body.data.isAnonymous,
      edited: false,
      editedTime: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    var newID = "unitialized"
    db
      .collection('posts')
      .add(newPost)
      .then((doc) => {
        doc.update({ postID: `${doc.id}` })
        res.json({ message: `document ${doc.id} created successfully` });
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
    });
}

exports.deletePost = (req, res) => {
  const document = db.doc(`/posts/${req.params.postID}`)
  document.get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      else {
        res.json({ message: `document ${doc.id} deleted successfully` });
        return document.delete();
      }
    })
}
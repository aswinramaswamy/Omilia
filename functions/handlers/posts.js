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
          postID: doc.id,
          ...doc.data()
        });
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
}

exports.createPost = (req, res) => {
    const format = /^[a-z]{2}[a-z]+$/;
    if(req.body.data.body.trim() === '') {
      return res.status(400).send({ error: 'Post must contain text content' })
    }
    if(req.body.data.topic.trim() === '') {
      return res.status(400).send({ error: 'Post must include a topic' })
    }
    if(!format.test(req.body.data.topic)) {
      return res.status(400).send({ error: 'Topic must be only lowercase letters' })
    }
    //console.log(firebase.auth().currentUser);
    const newPost = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': req.headers.authorization
      },
      body: req.body.data.body,
      likes: 0,
      dislikes: 0,
      userID: req.headers.authorization,
      userHandle: req.body.data.userHandle,
      postID: req.body.data.postID,
      isAnonymous: req.body.data.isAnonymous,
      edited: false,
      editedTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      link: req.body.data.link,
      topic: req.body.data.topic
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

exports.editPost = (req, res) => {
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
    
  const newPost = {
    /*headers: {
      'Content-Type': 'application/json'
    },*/
    body: req.body.data.body,
    likes: 0,
    dislikes: 0,
    userID: req.body.data.userID,
    userHandle: req.body.data.userHandle,
    postID: req.body.data.postID,
    isAnonymous: req.body.data.isAnonymous,
    edited: true,
    editedTime: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    link: req.body.data.link
  }
  var newID = "unitialized"
  db
    .collection('posts')
    .add(newPost)
    .then((doc) => {
      doc.update({ postID: `${doc.id}` })
      res.json({ message: `document ${doc.id} editted successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
  });
}

exports.getPost = (req, res) => {
    let postData = {}
    db
    .doc(`posts/${req.params.postID}`)
    .get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'Post not found' })
      }
      postData = doc.data();
      postData.postID = doc.id;
      return db
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .where('postID', '==', req.params.postID)
      .get();
    })
    .then(data => {
      postData.comments = [];
      data.forEach(doc => {
        postData.comments.push(doc.data())
      });
      return res.json(postData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    })
}


exports.getPosthandle = (req, res) => {
  db
  .collection('posts')
  .orderBy('createdAt', 'desc')
  .where('userHandle','==',req.params.userHandle)
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

exports.createComment = (req, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({ error: 'Must not be empty'});

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postID: req.params.postID,
    userHandle: req.body.userHandle,
  };

  db
  .doc(`posts/${req.params.postID}`)
  .get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'Post does not exist'});
    }
    if(!doc.data().commentCount) {
      return doc.ref.update({commentCount: 1 });
    }
    return doc.ref.update({commentCount: doc.data().commentCount + 1 });
  })
  .then(() => {
    return db.collection('comments').add(newComment);
  })
  .then(() => {
    res.json(newComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.likePost = (req, res) => {
  const postDocument = db.doc(`posts/${req.params.postID}`);
  
  let postData;

  postDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'Post does not exist'});
    }
    //increase like count in doc
    postData = doc.data();
    postData.postID = doc.id;
    postData.likes++;
    return postDocument.update({ likes: postData.likes });
  })
  .then(() => {
    return res.json(postData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.unlikePost = (req, res) => {
  const postDocument = db.doc(`posts/${req.params.postID}`);
  
  let postData;

  postDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'Post does not exist'});
    }
    //increase like count in doc
    postData = doc.data();
    postData.postID = doc.id;
    postData.likes--;
    return postDocument.update({ likes: postData.likes });
  })
  .then(() => {
    return res.json(postData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.dislikePost = (req, res) => {
  const postDocument = db.doc(`posts/${req.params.postID}`);
  
  let postData;

  postDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'Post does not exist'});
    }
    //increase like count in doc
    postData = doc.data();
    postData.postID = doc.id;
    postData.dislikes++;
    return postDocument.update({ dislikes: postData.dislikes });
  })
  .then(() => {
    return res.json(postData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}

exports.undislikePost = (req, res) => {
  const postDocument = db.doc(`posts/${req.params.postID}`);
  
  let postData;

  postDocument.get()
  .then(doc => {
    if(!doc.exists) {
      return res.status(404).json({ error: 'Post does not exist'});
    }
    //increase like count in doc
    postData = doc.data();
    postData.postID = doc.id;
    postData.dislikes--;
    return postDocument.update({ dislikes: postData.dislikes });
  })
  .then(() => {
    return res.json(postData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
  })
}
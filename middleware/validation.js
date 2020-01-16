// Import Databases
const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

function validateUser() {
  return (req, res, next) => {
    name = {
      name: req.body.name
    }
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing required name field"
      })
    } else {
      req.user = name;
      next();
    }
  }
}

function validateUserId() {
  return (req, res, next) => {
    userDb.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next();
        } else {
          res.status(400).json({ message: 'Invalid user id' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
    });
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "Missing required text field"
      })
    }
    next();
  }
}

function validatePostId() {
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post
          next();
        } else {
          res.status(400).json({ message: 'Invalid post id' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
          message: 'Error retrieving the post',
        });
    });
  }
}

module.exports = {
  validateUser,
  validateUserId,
  validatePost,
  validatePostId
}
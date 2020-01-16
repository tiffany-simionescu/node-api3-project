const db = require('../users/userDb');

function validateUser() {
  return (req, res, next) => {
    name = {
      name: req.body.name
    }
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing User Name"
      })
    } else {
      req.user = name;
      next();
    }
  }
}

function validateUserId() {
  return (req, res, next) => {
    db.findById(req.params.id)
      .then(user => {
        if (user) {
          // res.status(200).json(hub);
          req.user = user
          next();
        } else {
          res.status(404).json({ message: 'User not found' });
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
        message: "Missing post text"
      })
    }
    next();
  }
}

module.exports = {
  validateUser,
  validateUserId,
  validatePost
}
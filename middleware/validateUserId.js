const db = require('../users/userDb');

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

module.exports = {
  validateUserId
}
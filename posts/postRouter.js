const express = require('express');
const postDb = require('./postDb');
const { 
  validatePost,
  validateUser,
  validateUserId
} = require('../middleware/validation');

const router = express.Router({
  mergeParams: true,
});

// END POINT - /:id/posts

router.get('/', validateUserId(), (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  postDb.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;

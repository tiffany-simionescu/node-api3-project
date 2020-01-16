const express = require('express');
const postDb = require('./postDb');
const { 
  validatePost,
  validateUser,
  validateUserId,
  validatePostId
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

router.get('/:id', validateUserId(), validatePostId(), (req, res) => {
  res.json(req.post);
});

router.delete('/:id', validateUserId(), validatePostId(), (req, res) => {
  postDb.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The post has been deleted."
      })
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.put('/:id', validatePost(), validateUserId(), validatePostId(), (req, res) => {
  postDb.update(req.post.id, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

module.exports = router;

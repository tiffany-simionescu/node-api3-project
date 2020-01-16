const express = require('express');
const postDb = require('./postDb');
const { 
  validatePost,
  validateUserId,
  validatePostId
} = require('../middleware/validation');

const router = express.Router({
  mergeParams: true,
});

// GET - /users/:id/posts
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

// GET - /users/:id/posts/:id
router.get('/:id', validateUserId(), validatePostId(), (req, res) => {
  res.json(req.post);
});

// DELETE - /users/:id/posts/:id
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

// PUT - /users//:id/posts/:id
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

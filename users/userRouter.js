const express = require('express');
const postRouter = require('../posts/postRouter');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const { 
  validatePost,
  validateUser,
  validateUserId
} = require('../middleware/validation');

const router = express.Router();

router.use('/:id/posts', postRouter);

// POST - /users
router.post('/', validateUser(), (req, res) => {
  userDb.insert(req.user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

// POST - /users/:id/posts
router.post('/:id/posts', validatePost(), (req, res) => {
  postDb.insert(req.text)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

// GET - /users
router.get('/', (req, res) => {
  userDb.get(req.user)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

// GET - /users/:id
router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user);
});

// DELETE - /users/:id
router.delete('/:id', validateUserId(), (req, res) => {
  userDb.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "User has been deleted."
      })
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

// PUT - /users/:id
router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  userDb.update(req.params.id, req.user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err =>{
      console.error(err);
      next(err);
    })
});

module.exports = router;

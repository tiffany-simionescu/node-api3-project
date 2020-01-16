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


router.post('/', validateUser(), (req, res) => {
  userDb.insert(req.user)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.post('/:id/posts', validatePost(), (req, res) => {
  postDb.insert(req.text)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.get('/', (req, res) => {
  userDb.get(req.user)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

module.exports = router;

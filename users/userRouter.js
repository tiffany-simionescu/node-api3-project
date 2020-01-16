const express = require('express');
const postRouter = require('../posts/postRouter');
const db = require('./userDb');
const { 
  validatePost,
  validateUser,
  validateUserId
} = require('../middleware/validation');

const router = express.Router();

router.use('/:id/posts', postRouter);


router.post('/', validateUser(), (req, res) => {
  db.insert(req.user)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get(req.user)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
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

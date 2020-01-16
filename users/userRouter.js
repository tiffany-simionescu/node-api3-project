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

// // The endpoint '/:id/posts' is taken care of in postRouter

// router.get('/:id/posts', (req, res) => {
//    do your magic!
// });

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

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  userDb.update(req.params.id, req.user)
    .then(data => {
      res.json(data);
    })
    .catch(err =>{
      console.error(err);
      next(err);
    })
});

module.exports = router;

const express = require('express');
const postRouter = require('../posts/postRouter');
const db = require('./userDb');

const router = express.Router();

router.use('/:id/posts', postRouter);


router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the user."
    })
  }

  db.insert(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error(err);
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

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

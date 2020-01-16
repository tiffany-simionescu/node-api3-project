const express = require('express');

// Import Custom Routers
const userRouter = require('./users/userRouter');
// const postRouter = require('./posts/postRouter');

const server = express();

// Logger Middleware
server.use(logger);

// Use Custom Routes
server.use('/users', userRouter);
// server.use('', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} - ${req.url} - ${Date.now()}`);
  next();
}

module.exports = server;

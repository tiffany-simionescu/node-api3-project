const express = require('express');

// Import Custom Routers
const userRouter = require('./users/userRouter');
// const postRouter = require('./posts/postRouter');

const server = express();

// Logger Middleware
server.use(logger);
server.use(express.json());

// Use Custom Routes
server.use('/users', userRouter);

// Error handling for no matched routes
server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found."
  })
})

// Middleware for Error Handling
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later."
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} - ${req.url} - ${Date(Date.now())}`);
  next();
}

module.exports = server;

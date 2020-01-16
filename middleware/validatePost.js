function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "Missing post text"
      })
    }
    next();
  }
}

module.exports = {
  validatePost
}
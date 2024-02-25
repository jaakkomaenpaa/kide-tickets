const jwt = require('jsonwebtoken')
const config = require('./config')

const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user
  }
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}
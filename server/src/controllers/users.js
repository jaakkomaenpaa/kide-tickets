const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, kideAuthToken, password } = req.body

  if (!username || !kideAuthToken || !password) {
    res.status(400).json('Missing a field')
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    kideAuthToken,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(403).json(error.message)
  }
})

module.exports = usersRouter

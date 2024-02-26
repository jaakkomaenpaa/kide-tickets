const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
const mongoUri = config.MONGODB_URI
mongoose.connect(mongoUri)

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/users', middleware.userExtractor, usersRouter)
app.use('/api/login', loginRouter)

app.get('/server-status', (req, res) => {
  res.status(200).json({ message: 'Server is running!' })
})

module.exports = app

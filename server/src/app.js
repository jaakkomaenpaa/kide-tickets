const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/server-status', (req, res) => {
  res.status(200).json({ message: 'Server is running!' })
})

module.exports = app

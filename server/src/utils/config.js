require('dotenv').config()

const PORT = process.env.PORT || 3001
const KIDE_AUTH_URL = 'https://api.kide.app/api/authentication/user'
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  PORT,
  KIDE_AUTH_URL,
  SECRET,
  MONGODB_URI,
}

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  kideAuthToken: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true
  },
  favoriteEventUrls: [
    {
      type: String
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.kideAuthToken
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User

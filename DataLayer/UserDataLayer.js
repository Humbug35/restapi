const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Schema/User');


class UserDataLayer {
  constructor() {
    this.User = null;
    this._loadSchema();
  }
  _loadSchema() {
    this.User = mongoose.model('User')
  }

  getAllUser() {
    return this.User.find()
  }
  getCurrentUser(username) {
    return this.User.findOne({ username: username})
  }

  signUp(body) {
    return this.User.find({ email: body.email, username: body.username })
      .then(user => {
        if(user.length >= 1) {
          return null;
        } else {
          return new User({
            _id: mongoose.Types.ObjectId(),
            username: body.username,
            email: body.email,
            password: body.password
          }).save()
        }
      })
  }
}
module.exports = UserDataLayer;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDataLayer = require('../DataLayer/UserDataLayer');

let userDataLayer = new UserDataLayer();

process.env.SECRET_KEY = 'secret';

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  userDataLayer.getCurrentUser(username)
    .then(user => {
      if(user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if(result) {
            const payload = {
              _id: user._id,
              username: user.username
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 600
            })
            res.json({
              success: true,
              token,
              payload
            })
          } else {
            res.json({
              success: false,
              message: 'Wrong password or username'
            })
          }
        })
      } else {
        res.json({
          success: false,
          message: 'Wrong username or password'
        })
      }
    })
})

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      res.status(500).json({
        success: false,
        message: 'Server Error'
      })
    } else {
      let body;
      if(!req.body.username || '' && !req.body.email || '' && !req.body.password || '') {
          res.status(403).send('Some field is empty')
      } else {
        body = {
          username: req.body.username.toLowerCase(),
          email: req.body.email.toLowerCase(),
          password: hash
        }
      }
      userDataLayer.signUp(body)
       .then(user => {
         if(!user) {
           res.status(409).json({
             success: false,
             message: 'User already exist'
           })
         } else {
           res.status(201).json({
             success: true,
             message: 'Sign Up',
             user
           })
         }
       })
       .catch(() => {
         next()
       })
    }
  })
});

module.exports = router;

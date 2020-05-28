const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  const user = await User.findOne({
    email: req.body.email
  })
  if (user) {
    res.json({
      error: 'User already exsists'
    })
  }
  const hash = await bcrypt.hash(req.body.password, 8)
  userData.password = hash
  User.create(userData)
    .then(user => {
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({
        token: token
      })
    })
    .catch(err => {
      res.send('error' + err)
    })
  
})

users.post('/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  })
  if (!user) {
    res.send('error')
  }

  const isMatch =  bcrypt.compare(req.body.password,user.password)
  
  if (!isMatch) {
    res.send('error')
  }

  let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
    expiresIn: 1440
  })
  res.json({
    token: token
  })
  // User.findOne({
  //     where: {
  //         email: req.body.email
  //     }
  // })
  //     .then(user => {
  //         console.log("Aya")
  //         const isMatch = await bcrypt.compare(req.body.password,user.password)
  //         if(isMatch){
  //             let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
  //                 expiresIn: 1440
  //             })
  //             res.json({ token: token })
  //         }else{
  //             res.send('User does not exist')
  //         }
  //     })
  //     .catch(err =>{
  //         res.send('error'+ err)
  //     })
})
module.exports = users
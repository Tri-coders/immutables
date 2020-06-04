const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require('../email/account')
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
    where: {
      email: req.body.email
    }
  })
  if (user) {
    res.json({
      error: 'User already exsists'
    })
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)
    console.log(hash)
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
  }

})

users.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!user) {
    res.json({error: 'Invalid Crediential email'})
  } else {
    console.log(user.password)
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    console.log(typeof(user.password))
    console.log(isMatch)
    if (!isMatch) {
      console.log(user.password)
      res.json({error: 'Invalid Crediential password'})
    }else{
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 1440
      })
      res.json({
        token: token
      })
    }
  }


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

users.post('/email', (req,res)=>{
  console.log(req.body)
  sendWelcomeEmail(req.body.email, req.body.name, req.body.message)
  res.json({
    message: "Got your feedback"
  })
})
module.exports = users
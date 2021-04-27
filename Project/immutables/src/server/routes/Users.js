const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require('../email/account')
const User = require('../models/User')
users.use(cors())
const fs = require('fs');
const path = require('path');

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
        
        prabodh= user.id.toString()+user.name.toString();
          
        fs.mkdir(path.join(path.resolve(__dirname, '../../../../../Logs FIles'), prabodh), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("Created");
        });
        var ps = require('fs-extra');
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/document_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/document_log.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/planning.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/planning.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/question_switch_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/question_switch_log.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/quiz_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/quiz_log.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/resource_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/resource_log.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/selfAssesment.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/selfAssesment.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/session.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/session.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/topic_switch_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/topic_switch_log.csv'));
        ps.copySync(path.resolve(__dirname,'../../../../../EveryStudentDataFiles/topic_time_log.csv'), path.resolve(__dirname,'../../../../../Logs FIles/'+prabodh+'/topic_time_log.csv'));


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
      console.log("Login ")
      prabodh = user.id.toString()+user.name.toString();
      res.json({
        token: token,
        userName: user.name
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
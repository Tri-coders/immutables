var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({ extended: false })
)


var Users = require('./routes/Users')
var quiz = require('./quiz/quiz')

app.use("/users",Users)
app.use("/quiz",quiz)

app.listen(port, ()=>{
    console.log("server started at "+ port)
})
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
var pdf = require('./pdf/pdf')
var logsApi = require('./logsApi/logsApi')
var selfAssess = require('./selfAssess/selfAssess')
var planning = require('./planning/planning')
var report = require('./report/report')

prabodh = "3prabodh"

app.use("/users",Users)
app.use("/quiz",quiz)
app.use("/pdf",pdf)
app.use("/logsApi",logsApi)
app.use("/inventory", selfAssess)
app.use("/planning",planning)
app.use("/report",report)

app.listen(port, ()=>{
    console.log("server started at "+ port)
})
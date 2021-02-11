const express = require('express')
const logs = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
logs.use(cookieParser());
logs.use(cors())

const fs = require('fs');
const json2csv = require('json2csv')

logs.use(express.static(__dirname+"../../../../../"));
logs.use(express.static(__dirname+"../../../../../Logs Files/"));

const path = require('path');

logs.post('/logsdata', async (req,res)=>{
    console.log(__dirname+"/../../../../../")
    var logs = req.body;
    console.log(logs)
    if(logs[2]=="quiz"){
        console.log(logs.length)
        quiz(logs)
    }else if(logs[0]=="QuizScore"){
        quizScore(logs)
    }else if(logs[0]=="SessionLogs"){
        session(logs)
    }
    res.json({
        msg: "correct"
    })
});

function quiz(logs){
    var data = ""
    for(var i=3;i<logs.length;i+=2){
        
        data+=logs[0]+','
        data+=logs[1]+','
        data+=logs[i][1]+','
        data+=logs[i][0]+','
        if(i+2<logs.length){
            data+=logs[i+2][0]+','
        }else{
            data+="NAN,"
        }
        if(logs[i].length>2){
            var temp=""
            for(var j=2;j<logs[i].length;j++){
                temp+=logs[i][j]+'-'
            }
            data+=temp.slice(0,-1)+","
        }else{
            data+="NAN,"
        }
        data+=logs[i+1]+"\n"
        console.log(data)
    }
    console.log("ALA")
    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs Files/question_switch_log.csv') ,data)
    }catch(err){
        console.log(err)
    }
}

function quizScore(logs){
    var data = ""
    for(var i=1;i<8;i++){
        data+=logs[i]+','
    }
    data+="\n"
    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs Files/quiz_log.csv'), data)
    }catch(err){
        console.log(err)
    }   
}

function session(logs){
    var data = ""
    for(var i=1;i<7;i++){
        data+=logs[i]+','
    }
    data+="\n"
    try{
        fs.appendFileSync('./Logs Files/session.csv',data)
    }catch(err){
        console.log(err)
    }   
}

module.exports = logs
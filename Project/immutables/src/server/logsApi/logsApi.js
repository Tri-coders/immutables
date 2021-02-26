const express = require('express')
const logs = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
logs.use(cookieParser());
logs.use(cors())

const fs = require('fs');
const json2csv = require('json2csv')

logs.use(express.static(__dirname+"../../../../../"));
logs.use(express.static(__dirname+"../../../../../Logs FIles/"));

const path = require('path');
const { resourceUsage } = require('process');

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
    }else if(logs[logs.length-1]=="document"){
        document(logs)
    }else if(logs[logs.length-1]=="Resources"){
        resources(logs)
    }else if(logs[logs.length-1]=="ToicTimeLog"){
        topicTime(logs)
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
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/question_switch_log.csv') ,data)
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
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/quiz_log.csv'), data)
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
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/session.csv'),data)
    }catch(err){
        console.log(err)
    }   
}

function document(logs){
    var data = ""
    for(var i=0;i<logs.length-1;i++){
        for(var j=0;j<logs[0].length;j++){
            data+=logs[i][j]
            data+=","
        }
        data+="\n"
    }
    console.log(data)
    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/document_log.csv'),data)
    }catch(err){
        console.log(err)
    } 

}

function resources(logs){
    var data=""
    for(var i=0;i<logs.length-1;i++){
        for(var j=0;j<logs[0].length;j++){
            data+=logs[i][j]
            data+=","
        }
        data+="\n"
    }

    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/resource_log.csv'),data)
    }catch(err){
        console.log(err)
    } 
}

function topicTime(logs){
    var data=""
    for(var i=0;i<logs.length-1;i++){
        for(var j=0;j<logs[0].length;j++){
            data+=logs[i][j]
            data+=","
        }
        data+="\n"
    }

    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/topic_time_log.csv'),data)
    }catch(err){
        console.log(err)
    } 
}

module.exports = logs
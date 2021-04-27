const express = require('express')
const planning = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
planning.use(cookieParser());
planning.use(cors())


const fs = require('fs');
const json2csv = require('json2csv')

planning.use(express.static(__dirname+"../../../../../"));
planning.use(express.static(__dirname+"../../../../../Logs FIles/"));

const path = require('path');
const { resourceUsage } = require('process');

planning.post('/planning', (req, res)=>{
    var plan = req.body;
    var data = ""
    console.log(plan)
    for(var i=0;i<7;i++){
        if(i==6)
            data+=plan[i]
        else
            data+=plan[i]+','
    
        }
    data+="\n"
    try{
        fs.appendFileSync(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/planning.csv'), data)
    }catch(err){
        console.log(err)
    }   

    res.json({
        msg: "Done"
    })
})



module.exports = planning
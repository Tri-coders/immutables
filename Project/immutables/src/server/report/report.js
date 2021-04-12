const express = require('express')
const report = express.Router()
const cors = require('cors')
report.use(cors())

const csv = require('csv-parser')
const fs = require('fs')

report.use(express.static(__dirname+"../../../../../"));
report.use(express.static(__dirname+"../../../../../Logs FIles/"));


const path = require('path');
report.post('/report',(req,res)=>{
    var data=req.body;
    console.log(req.body)
    if(data[0]=="PBSscore"){
        var ans=[]
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/selfAssesment.csv'))
            .pipe(csv())
            .on('data', (data) => {
                ans.push(data)
            })
            .on('end', () => {
                // console.log(ans);
                var result=[]
                var subcomponent = ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
                var size = [8,4,5,7,10,7,5,6]
                for(var i=0;i<subcomponent.length;i++){
                    result.push(parseInt(ans[0][subcomponent[i]])*100/size[i])
                }
                res.send(result)
            });
    }else if(data[0]=="ResourcesReport"){
        var dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
        var result = []
        console.log("Ala")
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/topic_switch_log.csv'))
            .pipe(csv())
            .on('data', (data) => {
                try{
                    console.log(data['1'])
                    if(data['1'] in dic){
                        result.push(dic[data["1"]])
                    }
                }catch(e){
                    // console.log(e)
                }
            })
            .on('end', () => {
                console.log(result)
                res.send(result)
            });
    }

});

module.exports = report
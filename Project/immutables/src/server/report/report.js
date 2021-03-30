const express = require('express')
const report = express.Router()
const cors = require('cors')
report.use(cors())

const csv = require('csv-parser')
const fs = require('fs')

report.use(express.static(__dirname+"../../../../../"));
report.use(express.static(__dirname+"../../../../../Logs FIles/"));


const path = require('path');
report.get('/report',(req,res)=>{
    var ans=[]
    fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/selfAssesment.csv'))
        .pipe(csv())
        .on('data', (data) => {
            ans.push(data)
        })
        .on('end', () => {
            console.log(ans);
            var result=[]
            var subcomponent = ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
            var size = [8,4,5,7,10,7,5,6]
            for(var i=0;i<subcomponent.length;i++){
                result.push(parseInt(ans[0][subcomponent[i]])*100/size[i])
            }
            res.send(result)
        });

});

module.exports = report
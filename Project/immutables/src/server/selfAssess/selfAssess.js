const express = require('express')
const selfAssess = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
selfAssess.use(cookieParser());
selfAssess.use(cors())

selfAssess.post('/answer', (req,res)=>{
    //console.log(req.body.name)
    var ansArr = req.body.answerArray;

    var decl_know = ansArr[5] + ansArr[10] + ansArr[12] + ansArr[16] + ansArr[17] + ansArr[20] + ansArr[32] + ansArr[46]
    var proc_know = ansArr[3] + ansArr[14] + ansArr[27] + ansArr[33]
    var cond_know = ansArr[15] + ansArr[18] + ansArr[26] + ansArr[29] + ansArr[35]
    var plan = ansArr[4] + ansArr[6] + ansArr[8] + ansArr[22] + ansArr[23] + ansArr[42] + ansArr[45]
    var info = ansArr[9] + ansArr[13] + ansArr[30] + ansArr[31] + ansArr[37] + ansArr[39] + ansArr[41] + ansArr[43] + ansArr[47] + ansArr[48]
    var comp = ansArr[1] + ansArr[2] + ansArr[11] + ansArr[21] + ansArr[28] + ansArr[34] + ansArr[49]
    var debug = ansArr[25] + ansArr[40] + ansArr[44] + ansArr[51] + ansArr[52]
    var eval = ansArr[7] + ansArr[18] + ansArr[24] + ansArr[36] + ansArr[38] + ansArr[49]

    
});

module.exports = selfAssess
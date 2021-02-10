const express = require('express')
const pdf = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
pdf.use(cookieParser());
pdf.use(cors())

pdf.post('/pdfname', (req,res)=>{
    //console.log(req.body.name)
    res.cookie("file_name_to_display", req.body.name); 
    res.json({
        msg: "correct"
    })
});

module.exports = pdf
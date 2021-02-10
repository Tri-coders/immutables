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

pdf.get('/get_file_name', (req, res) => {
    // res.cookie("file_name_to_display", "1.pdf"); 
    // res.clearCookie("file_name_to_display");
    console.log(req.cookies["file_name_to_display"]);
    res.send('{"file_name":"' + req.cookies["file_name_to_display"] + '"}');
});

module.exports = pdf
const express = require('express')
const pdf = express.Router()
const cors = require('cors')
pdf.use(cors())

pdf.post('/pdfname', (req,res)=>{
    console.log(req.body.name)
    res.json({
        msg: "correct"
    })
});


module.exports = pdf
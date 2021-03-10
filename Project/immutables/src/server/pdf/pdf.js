const express = require('express')
const pdf = express.Router()
const cors = require('cors')
var cookieParser = require('cookie-parser');
pdf.use(cookieParser());
pdf.use(cors())

fileSystem = require('fs'),
path = require('path');

pdf.get('/pdfname', (req, res) => {
    var sank = req.query.name;
    console.log(sank)
    var filePath = path.join(__dirname, '../../../../../Material/'+sank);
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
})

pdf.post('/pdfname', (req,res)=>{
    //console.log(req.body.name)
    res.cookie("file_name_to_display", req.body.name); 
    res.json({
        msg: "correct"
    })
});

module.exports = pdf
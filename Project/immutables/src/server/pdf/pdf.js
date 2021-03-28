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

pdf.get('/video', function(req, res) {
    var video_name = req.query.video_name
    console.log("video name", video_name)
    const path_ = path.join(__dirname, '../../../../../Videos/'+video_name);
    const stat = fileSystem.statSync(path_)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fileSystem.createReadStream(path_, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fileSystem.createReadStream(path_).pipe(res)
    }
  });

module.exports = pdf
var express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const fs = require('fs');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/pdf-viewer-master"));
app.use(express.static(__dirname + "/pdf-viewer-master/external"));
app.use(express.static(__dirname + "/pdf-viewer-master/external/pdfjs-2.1.266-dist/web"));
app.use(express.static(__dirname + "/pdf-viewer-master/external/pdfjs-2.1.266-dist/build"));
app.use(express.static(__dirname + "/pdf-viewer-master/external/pdfjs-2.1.266-dist"));
app.use(express.static(__dirname));

app.get('/htmldigilocker', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + "/pdf-viewer-master/external/pdfjs-2.1.266-dist/web/viewer.html");
});

app.get('/get_file_name', (req, res) => {
    // res.cookie("file_name_to_display", "1.pdf"); 
    // res.clearCookie("file_name_to_display");
    console.log(req.cookies["file_name_to_display"]);
    res.send('{"file_name":"' + req.cookies["file_name_to_display"] + '"}');
});

app.get('/get_file_name', (req, res) => {
    // res.cookie("file_name_to_display", "1.pdf"); 
    // res.clearCookie("file_name_to_display");
    console.log(req.cookies["file_name_to_display"]);
    res.send('{"file_name":"' + req.cookies["file_name_to_display"] + '"}');
});

//Port Listenings
app.listen(8085, (req, res) => {
    console.log("Listening on 8085");
});
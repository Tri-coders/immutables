const express = require('express')
const quiz = express.Router()
const cors = require('cors')
quiz.use(cors())

const csv = require('csv-parser')
const fs = require('fs')

quiz.get('/sample2', (req, res) => {
    console.log("enter");
    //console.log(req.body);
    const results = [];

    fs.createReadStream(__dirname + '/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.send(results);
        });
});

module.exports = quiz
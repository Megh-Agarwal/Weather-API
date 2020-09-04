const express = require('express');
const geoCoding = require('./util/geocode.js');

const app = express();

app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send({
            error: "No address query found"
        })
    } else {
        async function start(){
            var weather = await geoCoding(encodeURIComponent(req.query.address));
            res.send({
                weather
            })
        }
        start();
    }
})

app.listen('5000', () => {
	console.log("The server is listening on port 5000")
})
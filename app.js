const express = require('express');
const geoCoding = require('./util/geocode.js');
const port = process.env.PORT || 5000
const app = express();



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req,res) => {
    res.send("Request weather route :)")
})


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

app.listen(port, () => {
	console.log("The server is listening on port 5000")
})
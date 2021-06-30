const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
const fs = require('fs');
const { prependOnceListener } = require('process');
const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/products", function(req,res){
    let rawData = fs.readFileSync('public/productdata.json');
    let products = JSON.parse(rawData);
    res.json(products);
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members:[
          {
            email_address:email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }
        ]
      };

    const jsonData = JSON.stringify(data);
    const url = process.env.MAILCHIMP_URL;

    const options = {
        method: 'POST',
        auth: process.env.MAILCHIMP_CREDENTIALS
      }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/public/success.html");
        } else {
          res.sendFile(__dirname + "/public/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000.");
});

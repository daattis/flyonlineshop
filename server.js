const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/products", function(req,res){
    let rawData = fs.readFileSync('public/productdata.json');
    let products = JSON.parse(rawData);
    res.json(products);
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

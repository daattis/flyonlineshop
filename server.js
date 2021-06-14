const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

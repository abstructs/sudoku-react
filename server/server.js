var express = require('express');
const path = require('path');

var app = express();


app.use('/', express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
    res.sendStatus(200);
});

app.listen(3000, () => { console.log('Listening on port 3000...')});
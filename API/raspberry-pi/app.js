const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.get('/query', (req, res) => {
    let query = req.query;
    let random = parseInt(Math.random()*10);
    const data = {deviceInfo:{}};
    for(let i=1;i<random;i++){
        data['deviceInfo']['device'+i] = parseInt(Math.random()*10)
    }
    res.json(data);
});

app.listen(3001);
/*
 * Brunei-Hackathon v1.0.0 (https://github.com/TitanLi/Brunei-Hackathon)
 * License: Apache License 2.0
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const route = require('./lib/route');

// SerialPort
const Arduino = require('./lib/arduino');
const arduino = new Arduino(process.env.DEVICE_TTY);
arduino.connect();
arduino.enableAutoConnection();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/query/:mac', route.query);
app.get('/localInfo', route.localInfo);
app.get('/devices', route.getDevices);
app.post('/insert', route.insertData);
app.post('/devices', route.postDevices);

app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("App now running on port", process.env.PORT)
    }
});
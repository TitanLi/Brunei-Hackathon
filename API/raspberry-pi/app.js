const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
var port;
var sensorData = {};
function connect() {
    port = new SerialPort('/dev/tty.usbmodem141301', {
        baudRate: 9600
    });

    const parser = new Readline();
    port.pipe(parser);
    // parser.on('data', console.log);
    port.on('open', function () {
        console.log('port open')
        parser.on('data', function (data) {
            console.log(JSON.parse(data));
            sensorData = JSON.parse(data);
        });
    });

    port.on('close', function (err) {
        console.log('close')
    });
}
connect();
setInterval(() => {
    port.get(function (err) {
        if (err) {
            console.log(err);
            sensorData = {};
            connect();
        }
    });
}, 1000);
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.get('/query', (req, res) => {
    let query = req.query;
    const data = {
        deviceInfo:sensorData
    };
    res.json(data);
});

app.listen(3001);
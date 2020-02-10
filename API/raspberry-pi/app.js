const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
let port;
let sensorData = {};
function connect() {
    port = new SerialPort('/dev/ttyACM0', {
        baudRate: 9600
    });

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

    parser.on('data', function (data) {
        console.log(data);
        try {
            sensorData = JSON.parse(data);
        } catch (error) {
            console.log('JSON error');
        }
    });

    port.on('open', function () {
        console.log('port open')
    });

    port.on('close', function (err) {
        console.log('close');
        port.close();
    });
}
connect();
setInterval(() => {
    port.get(function (err) {
        if (err) {
            console.log('Port is not open');
            sensorData = {};
            connect();
        }
    });
}, 4000);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/query', (req, res) => {
    let query = req.query;
    const data = {
        deviceInfo: sensorData
    };
    res.json(data);
});

app.listen(3001);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SerialPort = require("serialport");
const getmac = require('getmac').default;
const color = require('colors');
const ip = require("ip");
const request = require('request');
const Readline = SerialPort.parsers.Readline;
let port;
const deviceSensorData = {};
const cloudIP = '10.20.0.47';

function update(mac, data) {
    deviceSensorData[mac] = data;
}

function handleInsertData(cloudIP,mac,sensorData){
    let postData = {
        "mac": mac,
        "sensorData": sensorData
    };
    ['127.0.0.1',cloudIP].map((IP) => {
        request.post({
            url: `http://${IP}:30001/insert`,
            form: postData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(color.yellow("POST insert API successfully"));
            }
        });
    });
}

function handleDevicesData(cloudIP,ip,mac){
    let postData = {
        "ip": ip,
        "mac": mac
    };
    ['127.0.0.1',cloudIP].map((IP) => {
        request.post({
            url: `http://${IP}:30001/devices`,
            form: postData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(color.yellow("POST devices API successfully"));
            }
        });
    });
}

function connect() {
    port = new SerialPort(
        '/dev/tty.usbmodem141301',
        {
            baudRate: 9600
        },
        function (err) {
            if (err) {
                console.log(color.red('Error: No such file or directory, cannot open /dev/ttyACM0'));
            }
        });

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

    parser.on('data', function (data) {
        console.log(`SerialPort Data => ${data}`);
        try {
            let sensorData = JSON.parse(data);
            handleInsertData(cloudIP,getmac().replace(/:/g, ''),sensorData);
            handleDevicesData(cloudIP,ip.address(),getmac().replace(/:/g, ''));
        } catch (error) {
            console.log(color.red('JSON error'));
        }
    });

    port.on('open', function () {
        console.log(color.green('port open'));
    });

    port.on('close', function (err) {
        console.log(color.green('close'));
        port.close();
    });
}
connect();
setInterval(() => {
    port.get(function (err) {
        if (err) {
            console.log(color.red('Port is not open'));
            let sensorData = {};
            handleInsertData(cloudIP,getmac().replace(/:/g, ''),sensorData);
            connect();
        }
    });
}, 4000);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// postman
app.use(bodyParser.json());
app.use(cors());

app.get('/query/:mac', (req, res) => {
    let mac = req.params.mac;
    let data = [];
    if (!(deviceSensorData[mac] == undefined)) {
        let sensorKey = Object.keys(deviceSensorData[mac]);
        for (let i in sensorKey) {
            data.push({
                name: sensorKey[i],
                value: deviceSensorData[mac][sensorKey[i]]
            });
        }
    }
    res.json(data);
});

app.get('/localInfo', (req, res) => {
    const data = {
        ip: ip.address(),
        mac: getmac().replace(/:/g, '')
    };
    res.json(data);
});

app.post('/insert', (req, res) => {
    let mac = req.body.mac;
    let sensorData = req.body.sensorData;
    update(mac, sensorData);
    // console.log(color.green(`Insert ${mac} successfully`));
    res.json(req.body);
})

const devices = {};
// const devices = [
//     {
//         ip: ip.address(),
//         mac: getmac().replace(/:/g, '')
//     }
// ]
app.get('/devices', (req, res) => {
    let devicesMAC = Object.keys(devices);
    let devicesData = [];
    for (let i in devicesMAC) {
        devicesData.push({
            ip: devices[devicesMAC[i]],
            mac: devicesMAC[i]
        });
    }
    res.json(devicesData);
});

app.post('/devices', (req, res) => {
    let ip = req.body.ip;
    let mac = req.body.mac;
    devices[mac] = ip;
    let insertData = {
        ip: ip,
        mac: mac
    }
    res.json(insertData);
});

app.listen(30001);

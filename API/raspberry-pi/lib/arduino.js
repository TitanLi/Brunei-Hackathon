const SerialPort = require('serialport');
const color = require('colors');
const ip = require('ip');
const getmac = require('getmac').default;
const dotenv = require('dotenv').config();
const handle = require('./handle');
const Readline = SerialPort.parsers.Readline;
const cloudIP = process.env.CLOUD_IP;

class Arduino {
    constructor(device) {
        this.device = device;
    }

    connect() {
        this.port = new SerialPort(
            this.device,
            {
                baudRate: 9600
            },
            function (err) {
                if (err) {
                    console.log(color.red(err));
                }
            });
        const parser = this.port.pipe(new Readline({ delimiter: '\r\n' }));

        parser.on('data', function (data) {
            console.log(`SerialPort Data => ${data}`);
            try {
                let sensorData = JSON.parse(data);
                handle.handleInsertData(cloudIP, getmac().replace(/:/g, ''), sensorData);
                handle.handleDevicesData(cloudIP, ip.address(), getmac().replace(/:/g, ''));
            } catch (error) {
                console.log(color.red('JSON error'));
            }
        });

        this.port.on('open', function () {
            console.log(color.green('port open'));
        });

        this.port.on('close', function (err) {
            console.log(color.green('close'));
            this.port.close();
        });
    }

    enableAutoConnection() {
        setInterval(() => {
            this.port.get((err) => {
                if (err) {
                    console.log(color.red('Port is not open'));
                    let sensorData = {};
                    handle.handleInsertData(cloudIP, getmac().replace(/:/g, ''), sensorData);
                    this.connect();
                }
            });
        }, 4000);
    }
}

module.exports = Arduino;
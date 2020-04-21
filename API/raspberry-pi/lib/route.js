/*
 * Brunei-Hackathon v1.0.0 (https://github.com/TitanLi/Brunei-Hackathon)
 * License: Apache License 2.0
 */
const getmac = require('getmac').default;
const Joi = require('joi');
const ip = require('ip');
const deviceSensorData = {}; // { devicesMAC : sensorDataJSON }
const devices = {}; // { devicesMAC : IP }
module.exports = {
    query: (req, res) => {
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
    },

    localInfo: (req, res) => {
        const data = {
            ip: ip.address(),
            mac: getmac().replace(/:/g, '')
        };
        res.json(data);
    },

    insertData: (req, res) => {
        const schema = Joi.object().keys({
            "mac": Joi.string().required(),
            "sensorData": Joi.object().required()
        });
        Joi.validate(req.body, schema, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 'Insert data error',
                    message: (err.details[0].message.replace(/"/g, '') || "error")
                });
            } else {
                console.log(result);
                let mac = req.body.mac;
                let sensorData = req.body.sensorData;
                deviceSensorData[mac] = sensorData;
                res.json({
                    status: 'successfully'
                });
            }
        });
    },

    getDevices: (req, res) => {
        let devicesMAC = Object.keys(devices);
        let devicesData = [];
        for (let i in devicesMAC) {
            devicesData.push({
                ip: devices[devicesMAC[i]],
                mac: devicesMAC[i]
            });
        }
        res.json(devicesData);
    },

    postDevices: (req, res) => {
        const schema = Joi.object().keys({
            "ip": Joi.string().required(),
            "mac": Joi.string().required()
        });
        Joi.validate(req.body, schema, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 'Insert device error',
                    message: (err.details[0].message.replace(/"/g, '') || "error")
                });
            } else {
                console.log(result);
                let ip = req.body.ip;
                let mac = req.body.mac;
                devices[mac] = ip;
                res.json({
                    status: 'successfully'
                });
            }
        });
    }
}
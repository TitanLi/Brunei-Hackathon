const getmac = require('getmac').default;
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

    insert: (req, res) => {
        let mac = req.body.mac;
        let sensorData = req.body.sensorData;
        deviceSensorData[mac] = sensorData;
        res.json({
            status:'successfully'
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
        let ip = req.body.ip;
        let mac = req.body.mac;
        devices[mac] = ip;
        res.json({
            status:'successfully'
        });
    }
}
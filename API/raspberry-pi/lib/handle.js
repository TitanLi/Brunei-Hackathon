const request = require('request');
const color = require('colors');
const handleInsertData = function (cloudIP, mac, sensorData) {
    let postData = {
        'mac': mac,
        'sensorData': sensorData
    };
    ['127.0.0.1', cloudIP].map((IP, index) => {
        request.post({
            url: `http://${IP}:30001/insert`,
            form: postData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (index == 0) {
                    console.log(color.yellow('POST Local Insert API Successfully'));
                } else {
                    console.log(color.yellow('POST Cloud Insert API Successfully'));
                }
            }
        });
    });
}

const handleDevicesData = function (cloudIP, ip, mac) {
    let postData = {
        'ip': ip,
        'mac': mac
    };
    ['127.0.0.1', cloudIP].map((IP, index) => {
        request.post({
            url: `http://${IP}:30001/devices`,
            form: postData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (index == 0) {
                    console.log(color.yellow('POST Local devices API Successfully'));
                } else {
                    console.log(color.yellow('POST Cloud devices API Successfully'));
                }
            }
        });
    });
}

module.exports = {
    handleInsertData: handleInsertData,
    handleDevicesData: handleDevicesData
}
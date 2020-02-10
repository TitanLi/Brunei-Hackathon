//Docker control device
//sudo docker run -tid --device=/dev/ttyACM0 node bash
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
var port;
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
            connect();
        }
    });
}, 1000);
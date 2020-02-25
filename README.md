# Brunei-Hackation
## universal internet of things (IoT) platform

[![universal internet of things (IoT) platform](https://github.com/TitanLi/Brunei-Hackathon/blob/master/picture/video.png)](https://www.youtube.com/watch?v=2yLvn0ezpGU)
## Base on Ubuntu
### Install NodeJS
```shell
$ sudo apt-get update
$ sudo apt-get install build-essential libssl-dev
$ sudo curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
$ source ~/.profile
$ nvm install 10
$ nvm alias default 10
```
---
## Base on Raspberry pi 4
### Install OS
Raspbian OS:[https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
> macOS
```shell
$ sudo diskutil list
$ sudo diskutil unmountDisk /dev/diskN
$ sudo dd bs=1m if=path_of_your_image.img of=/dev/rdiskN conv=sync
$ sudo diskutil eject /dev/rdiskN
```

### Enable SSH
> As of the November 2016 release, Raspbian has the SSH server disabled by default. It can be enabled manually from the desktop

Method 1:

1. Launch Raspberry Pi Configuration from the Preferences menu
2. Navigate to the Interfaces tab
3. Select Enabled next to SSH
4. Click OK

or

Method 2:

```shell
$sudo systemctl enable ssh
$ sudo systemctl start ssh
```

### Install NodeJS
```shell
$ git clone https://github.com/creationix/nvm.git ~/.nvm
# $ cd ~/.nvm && git checkout v5.9.0
$ source ~/.nvm/nvm.sh
$ sudo vim ~/.bashrc
# 新增
source ~/.nvm/nvm.sh

$ nvm install 10
$ nvm alias default 10
```

### Install pm2
```shell
$ npm install -g pm2
```

### Git Clone Project
```shell
$ git clone https://github.com/TitanLi/Brunei-Hackation.git
```

### Run API Service
```shell
$ cd Brunei-Hackation/API/raspberry-pi
$ npm install
$ pm2 start app.js --name "API-Service"
```

### Run ReactJS APP
```shell
$ cd Brunei-Hackation/frontend/iot
$ npm install
$ pm2 start node_modules/react-scripts/scripts/start.js --name "web-service"
```
---

## API Doc
### 1. Add Device Information
#### API:
| Method |  URL   |
|--------|--------|
|  POST  |http://127.0.0.1:30001/devices|

#### Description:
You can call API to create a device to cloud, then you can through a browser search [http://127.0.0.1:30002](http://127.0.0.1:30002) watch device on Web Dashboard.

#### Request Parameters
Params:
| Params | Type |Description |   example    |
|--------|------|------------|--------------|
|  ip    |String|Device IP address|"192.168.0.29"|
|  mac   |String|Device media access control<br>address (MAC address)|"fa163e970e44"|
example:
```json
{
    "ip": "192.168.0.29",
    "mac": "fa163e970e44"
}
```
#### API Response
Params:
| Params | Type |   example    |
|--------|------|--------------|
|status  |String|"successfully"|

example:
```json
{
    "status": "successfully"
}
```

### 2. Get List of Registered Devices
#### Description:
You can get a list of registered devices through the API.

#### API:
| Method |  URL   |
|--------|--------|
|  GET   |http://127.0.0.1:30001/devices|

#### Request Parameters
None

#### API Response
Params:
| Params | Type |Description |   example    |
|--------|------|------------|--------------|
|  ip    |String|Device IP address|"192.168.0.29"|
|  mac   |String|Device media access control<br>address (MAC address)|"fa163e970e44"|
example:
```json
[
    {
        "ip": "192.168.0.29",
        "mac": "fa163e970e44"
    },
    {
        "ip": "192.168.0.30",
        "mac": "fa163e970e45"
    }
]
```

### 3. Update Device Sensor Data
#### Description
You can update the sensor data through the registered mac address. Then search [http://127.0.0.1:30002](http://127.0.0.1:30002) through your browser, select the mac address of the device to view the data.

#### API
| Method |  URL   |
|--------|--------|
|  POST  |http://127.0.0.1:30001/insert |

#### Request Parameters
Params:
|  Params      | Type      |Description|   example                            |
|--------------|-----------|-----------|--------------------------------------|
|  mac         |String     |Device media access control<br>address (MAC address)|"fa163e970e44"|
|  sensorData  |JSON Object|Arduino sensor data<br>JSON key is the sensor name<br>JSON value is the sensor value|{<br>&nbsp;&nbsp;"humidity": "41",<br>&nbsp;&nbsp;"temperature": "27"<br>}|

JSON Object:
```json
{
  "Key1" : "Value1",
  "Key2" : "Value2"
}
```

> Annotation:<br>
> The sensorData parameter is a JSON Object whose "Key" is the name of the sensor and "Value" is the value of the sensor.


example:
```json
{
    "mac": "fa163e970e44",
    "sensorData": {
        "humidity": "41",
        "temperature": "27"
    }
}
```

#### API Response
example:
```json
{
    "status": "successfully"
}
```

### 4. Get Device Sensor Data
Description:
You can get the sensor data from the registered mac address.

#### API
| Method |     URL    |
|--------|------------|
|  GET   |http://127.0.0.1:30001/query/:mac |

#### Description
You can get the sensor data from the registered mac address.

#### Request Parameters
Params:
| Params | Type |Description|   example    |
|--------|------|-----------|--------------|
|  mac   |String|The MAC above the Raspberry pi4 <br>is the same as the WiFi SSID|"fa163e970e44"|

#### API Response
Params:
| Params | Type |Description|   example    |
|--------|------|-----------|--------------|
|  name  |String|Sensor name|"humidity"    |
|  value |String|Sensor data|"41"          |
example:
```json
[
    {
        "name": "humidity",
        "value": "41"
    },
    {
        "name": "temperature",
        "value": "27"
    }
]
```

### 5. GET Device Local Information
#### Description
You can get the host IP and MAC information by this API

#### API
| Method |     URL    |
|--------|------------|
|  GET   |http://127.0.0.1:30001/localInfo  |

#### Request Parameters
None

#### API Response
Params:
| Params | Type |Description |   example    |
|--------|------|------------|--------------|
|  ip    |String|Device IP address|"192.168.0.29"|
|  mac   |String|Device media access control<br>address (MAC address)|"fa163e970e44"|
example:
```json
{
    "ip": "192.168.0.29",
    "mac": "fa163e970e44"
}
```

## Error handle
Error message
```shell
TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type undefined
```
handle method
```shell
$ rm -rf node_modules
$ rm package-lock.json
$ vim package.js ("react-scripts": "3.x.x" to "react-scripts": "^3.4.0")
$ npm install
```
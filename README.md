# Brunei-Hackation

## Raspberry pi 4
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

## API Doc
### GET Device Data
GET: /query/:mac

#### Request
Params:
| Params | Type |  example   |
|--------|------|------------|
|  mac   |String|fa163e970e44|

#### Response
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

### GET Device Local Information
GET: /localInfo

#### Response
example:
```json
{
    "ip": "192.168.0.29",
    "mac": "fa163e970e44"
}
```

### Update Sensor Data
POST: /insert

#### request
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

#### response
example:
```json
{
    "status": "successfully"
}
```

### Get Device List
Get: /devices

#### response
example:
```json
[
    {
        "ip": "192.168.0.29",
        "mac": "fa163e970e44"
    }
]
```

### Add Device Information
POST: /devices

#### request
example:
```json
{
    "ip": "192.168.0.29",
    "mac": "fa163e970e44"
}
```

#### response
example:
```json
{
    "status": "successfully"
}
```
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
```

### Run ReactJS APP
```shell
$ echo "PORT=30002" > .env
$ pm2 start node_modules/react-scripts/scripts/start.js --name "my-app"
```
/*
 * Brunei-Hackathon v1.0.0 (https://github.com/TitanLi/Brunei-Hackathon)
 * License: Apache License 2.0
 */
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Device from './component/Device';
import MacList from './component/MacList';
// import axios from "axios";
import './App.css';

function DeviceList(props) {
    const deviceInfo = props.deviceInfo;
    const devicesList = deviceInfo.map((obj, index) => (
        <Device key={index} name={obj.name} data={obj.value}></Device>
    ))
    return devicesList;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceInfo: [],
            open: false,
            localIP: '',
            localMac: '',
            selectMac: '',
            macList: []
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleSelectMac = this.handleSelectMac.bind(this);
    };

    componentDidMount() {
        setInterval(
            function () {
                // console.log(this.state.selectMac);
                fetch(`http://${window.location.hostname}:30001/query/${this.state.selectMac}`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(res => res.json())
                    .then(
                        (data) => {
                            this.setState({
                                deviceInfo: data
                            });
                        },
                        (error) => {
                            console.log(error)
                            this.setState({
                                deviceInfo: []
                            });
                        }
                    )
            }.bind(this), 1000
        );

        setInterval(
            function () {
                // console.log(this.state.selectMac);
                fetch(`http://${window.location.hostname}:30001/devices`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(res => res.json())
                    .then(
                        (data) => {
                            let newMAC = [];
                            for (let i in data) {
                                newMAC.push(data[i].mac)
                            }
                            this.setState({
                                macList: newMAC
                            });
                        },
                        (error) => {
                            console.log(error)
                            this.setState({
                                macList: []
                            });
                        }
                    )
            }.bind(this), 1000
        );

        fetch(`http://${window.location.hostname}:30001/localInfo`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    let IP = data.ip;
                    let MAC = data.mac;
                    this.setState({
                        localIP: IP,
                        localMac: MAC,
                        selectMac: MAC
                    });
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        localIP: '',
                        localMac: ''
                    });
                }
            )
    }

    handleDrawerOpen() {
        console.log("open");
        this.setState({ open: true });
    };

    handleDrawerClose() {
        console.log("close")
        this.setState({ open: false });
    };

    handleSelectMac(event) {
        // 取得List
        const selectMac = event.currentTarget.getAttribute('value');
        console.log(selectMac);
        const copy = selectMac.concat();
        this.setState({ selectMac: copy });
    }

    render() {
        const deviceInfo = this.state.deviceInfo;
        return (
            <div>
                <AppBar position="relative">
                    <Toolbar className="toolbar">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                        // className={clsx("menuButton", this.state.open && "hide")}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                            Dashboard (Local Info ip:{this.state.localIP} mac:{this.state.localMac})
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    // variant="persistent"
                    anchor="left"
                    open={this.state.open}
                >
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Divider />
                    <MacList mac={this.state.macList} handleSelectMac={this.handleSelectMac} />
                </Drawer>

                <Container >
                    <Grid container className="root" justify="center">
                        <Typography component="h1" variant="h5" color="inherit" noWrap>
                            Select Mac:{this.state.selectMac}
                        </Typography>
                    </Grid>
                    <Grid container className="root" justify="center">
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <DeviceList deviceInfo={deviceInfo}></DeviceList>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div >
        );
    }
}

export default App;

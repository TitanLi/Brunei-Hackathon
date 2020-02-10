import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Device from './component/Device';
// import axios from "axios";
import './App.css';

function DeviceList(props) {
    const deviceInfo = props.deviceInfo;
    const deviceName = props.deviceName;
    const listDevices = deviceName.map((value, index) => (
        <Device key={index} name={value} data={deviceInfo[value]}></Device>
    ))
    return listDevices;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceInfo: [],
            name: []
        }
    };

    componentDidMount() {
        setInterval(
            function () {
                fetch("http://127.0.0.1:3001/query", {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                    .then(res => res.json())
                    .then(
                        (data) => {
                            // console.log(`deviceInfo : ${data}`);
                            const deviceInfo = data.deviceInfo;
                            const name = Object.keys(deviceInfo);
                            this.setState({
                                deviceInfo: data.deviceInfo,
                                name: name
                            });
                        },
                        (error) => {
                            console.log(error)
                            this.setState({
                                deviceInfo: [],
                                name: []
                            });
                        }
                    )
            }.bind(this), 1000
        );

    }

    render() {
        const deviceInfo = this.state.deviceInfo;
        const deviceName = this.state.name;
        return (
            <div>
                <AppBar position="relative">
                    <Toolbar className="toolbar">
                        {/* <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                            Dashboard
                    </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="xm">
                    <Grid container className="root" justify="center">
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <DeviceList deviceInfo={deviceInfo} deviceName={deviceName}></DeviceList>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default App;

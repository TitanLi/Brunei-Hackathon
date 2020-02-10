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
    const deviceName = props.deviceName;
    const devicesList = deviceName.map((value, index) => (
        <Device key={index} name={value} data={deviceInfo[value]}></Device>
    ))
    return devicesList;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceInfo: [],
            name: [],
            open: false
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
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

    handleDrawerOpen() {
        console.log("open");
        this.setState({ open: true });
    };

    handleDrawerClose() {
        console.log("close")
        this.setState({ open: false });
    };

    render() {
        const deviceInfo = this.state.deviceInfo;
        const deviceName = this.state.name;
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
                            Dashboard
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
                    <MacList mac={['Inbox', 'Starred', 'Send email', 'Drafts']} />
                </Drawer>

                <Container >
                    <Grid container className="root" justify="center">
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <DeviceList deviceInfo={deviceInfo} deviceName={deviceName}></DeviceList>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div >
        );
    }
}

export default App;

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function Device(props) {
    return (
        <Grid item xs={12} sm={4}>
            <Paper className="paper" elevation={4} align="center>">
                <Grid container justify="center">
                    <Grid item xs={12} sm={12}>
                        <Box p={2} fontSize={20} bgcolor="secondary.main" color="primary.contrastText">
                            {props.name}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Box className="data" p={7} color="primary.main" align="center" >
                            {props.data}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Device;
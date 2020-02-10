import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

function MacList(props) {
    const mac = props.mac;
    const macItem = mac.map((text, index) => (
        <ListItem button key={text}>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    ));
    const macList = <List>{macItem}</List>;
    return macList;
}

export default MacList;
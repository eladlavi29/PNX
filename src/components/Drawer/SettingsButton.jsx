import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export default function SettingsButton(){
    return(
    <div>
        <List>
            <ListItem key={'Settings'} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                <SettingsRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={'Settings'} />
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
    </div>
    );
}
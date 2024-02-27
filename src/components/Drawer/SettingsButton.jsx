import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const drawerWidth = 240;    

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function SettingsButton({switch1, setSwitch1}){
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return(
    <div>
        <List>
            <ListItem key={'Settings'} disablePadding>
            <ListItemButton onClick={handleDrawerOpen}>
            <ListItemIcon>
            <SettingsRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary= "Settings" />
            </ListItemButton>

                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                    position: 'absolute',
                    left: 0
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >   
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <FormControlLabel control={<Switch checked={switch1} onChange={setSwitch1} sx = {{left: 10}}/>} label=".    Ulman's Electricity" />
                    <Divider /> 
                </Drawer>
            </ListItem>
        </List>
        <Divider />
    </div>
    );
}
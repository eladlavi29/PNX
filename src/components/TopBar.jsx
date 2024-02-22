import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DrawerButton from '../components/DrawerButton'
import DBWindowButton from '../components/DBWindowButton'

export default function MenuAppBar({sendResponse}) {
  const [switch1, setSwitch1] = React.useState(false);

  const updateSwitch1 = (event) => {
    setSwitch1(event.target.checked);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <DrawerButton switch1={switch1} setSwitch1={updateSwitch1}/>

          <DBWindowButton sendResponse={sendResponse} switch1={switch1}/>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DrawerButton from '../components/DrawerButton'
import DBWindowButton from '../components/DBWindowButton'

export default function MenuAppBar({insertedQueryJson, switch1, updateSwitch1, setDBWindowOpen}) {
  return (
    <Box sx={{ width: "100vw"}}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <DrawerButton insertedQueryJson={insertedQueryJson} switch1={switch1} setSwitch1={updateSwitch1}/>

          <DBWindowButton setDMWindowOpen={setDBWindowOpen}/>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
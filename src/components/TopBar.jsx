import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DrawerButton from '../components/DrawerButton'

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <DrawerButton />

        <IconButton   
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"          
        sx= {{position: "absolute", right: 0}}   
        >
        <AirplanemodeActiveIcon sx={{fontSize: 40}}/>
        </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
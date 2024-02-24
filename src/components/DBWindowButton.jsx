import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

import IconButton from '@mui/material/IconButton';

export default function DBWindowButton({setDMWindowOpen}) {
  const theme = useTheme();

  const handleWindowOpen = () => {
    setDMWindowOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton   
        color="inherit"          
        sx= {{position: "absolute", right: 5, top: 2}}   
        onClick={handleWindowOpen}>
        <AirplanemodeActiveIcon sx={{fontSize: 40}}/>
        </IconButton>
    </Box>
  );
}
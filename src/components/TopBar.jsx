import * as React from 'react';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DrawerButton from '../components/DrawerButton'
import DBWindowButton from '../components/DBWindowButton'

export default function MenuAppBar({insertedQueryJson, switch1, updateSwitch1, barSpeed, updateBarSpeed, setDBWindowOpen, DBWindowOpen, setHeatMapData, setShowHeatMap, setFlights,setMarkerMapData, setShowMarkerMap, allParams, params, setParams}) {
  return (
    <Box sx={{ width: "100vw"}}>
      <AppBar position="static" color="primary">
        <Toolbar>
        {/* <Typography
            variant="h4"
            fontFamily={'"Segoe UI"'}
            fontWeight={"bold"}
            color={"white"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute"
            }}
          >
            LionFish
          </Typography> */}
          <DrawerButton insertedQueryJson={insertedQueryJson} 
          switch1={switch1} setSwitch1={updateSwitch1} 
          barSpeed={barSpeed} updateBarSpeed={updateBarSpeed}
          setHeatMapData={setHeatMapData} setShowHeatMap={setShowHeatMap} setFlights={setFlights} setMarkerMapData={setMarkerMapData} setShowMarkerMap={setShowMarkerMap} allParams={allParams} params={params} setParams={setParams}/>

          <DBWindowButton setWindowOpen={setDBWindowOpen} windowOpen={DBWindowOpen}/>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
import * as React from "react";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DrawerButton from "../components/DrawerButton";
import DBWindowButton from "../components/DBWindowButton";

export default function MenuAppBar({
  insertedQueryJson,
  switch1,
  updateSwitch1,
  barSpeed,
  updateBarSpeed,
  setDBWindowOpen,
  DBWindowOpen,
  setHeatMapData,
  setShowHeatMap,
  setFlights,
  setMarkerMapData,
  query_num,
  setQuery_num,
  setQueriesDict,
  QueriesDict,
  setShowMarkerMap,
  allParams,
  params,
  setParams,
}) {
  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ position: "relative" }}>
          <DrawerButton
            insertedQueryJson={insertedQueryJson}
            switch1={switch1}
            setSwitch1={updateSwitch1}
            barSpeed={barSpeed}
            updateBarSpeed={updateBarSpeed}
            setHeatMapData={setHeatMapData}
            setShowHeatMap={setShowHeatMap}
            setFlights={setFlights}
            setMarkerMapData={setMarkerMapData}
            query_num={query_num}
            setQuery_num={setQuery_num}
            setQueriesDict={setQueriesDict}
            QueriesDict={QueriesDict}
            setShowMarkerMap={setShowMarkerMap}
            allParams={allParams}
            params={params}
            setParams={setParams}
          />
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography
              variant="h4"
              fontFamily={'"Segoe UI"'}
              fontWeight={"bold"}
              color={"white"}
            >
              LionFish
            </Typography>
          </Box>
          <DBWindowButton
            setWindowOpen={setDBWindowOpen}
            windowOpen={DBWindowOpen}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

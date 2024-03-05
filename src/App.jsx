import * as React from 'react';
import Mapkpitz from "./components/Mapkpitz/Mapkpitz";
import TopBar from "./components/TopBar"
import {useState, useMemo, useEffect} from "react";
import axios from 'axios';
import DateSlider from './components/DateSlider.jsx';
import { Button } from '@mui/material';
import MultiFlightTable from './components/MultiPlaneTable.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {CalculateFlights, CalculateDateRange} from './components/CalculateFlights.jsx'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  const [switch1, setSwitch1] = useState(false);
  // boolean to open and close the plane data table
  const [DBWindowOpen, setDBWindowOpen] = useState(false);
  const [insertedQueryJson, setInsertedQueryJson] = useState();
  // boolean to determine whether a heatmap should be shown
  const [showHeatMap, setShowHeatMap] = useState(false);
  // list of lists in the format [lat, long, strngth]. this is the data for the heatmap
  const [heatMapData, setHeatMapData] = useState([[(32 * Math.PI) / 180.0, (34.75 * Math.PI) / 180.0, 10]])
  // list of names of params to display
  const [displayParams, setDisplayParams] = useState(['tele_rpm', 'tele_altitude', 'tele_fuel_kilo', 'packet', 'tele_pp_lat', 'tele_pp_long', 'tele_heading'])
  // mode of the playbar
  const [mode, setMode] = useState('ABS')
  // fids and dates of flights to display
  const [flights, setFlights] = useState({1: [new Date("2024-01-14T23:40:06"), new Date("2024-01-15T00:40:01")], 2: [new Date("2024-01-17T09:07:51"), new Date("2024-01-17T09:25:44")]})
  // position of playbar (circle thing in the playbar), time selected by playbar
  const [position, setPosition] = useState(0)
  // start and end date (in seconds) of all flights combined
  const [dateRange, setDateRange] = useState([new Date("2023-02-11T11:23:00"), new Date("2023-02-12T19:43:00")])
  // dictionary with plane data for the map
  const [mapData, setMapData] = useState({});
  // const [mapData, setMapData] = useState({
  //   1: {
  //     "tele_pp_lat": 0.55320939623658449857,
  //     "tele_pp_long": 0.60976575284746381467, 
  //     "tele_heading": 25
  //   }, 
  //   2: {
  //     "tele_pp_lat": 0.55120939623658449857,
  //     "tele_pp_long": 0.60876575284746381467,
  //     "tele_heading": 69
  //   }
  // });

  useEffect(() => {CalculateFlights(flights, position, mode, setMapData, client, displayParams, dateRange)}, [flights, position, mode, setMapData])
  useEffect(() => {CalculateDateRange(flights, setDateRange)}, [flights])

  const updateSwitch1 = (event) => {
    setSwitch1(event.target.checked);
  }

  const memoMap = useMemo(
    () => <Mapkpitz mapData={mapData} showHeatMap={showHeatMap} heatMapData={heatMapData}/>,
    [showHeatMap, heatMapData, mapData]
  );

  return (
    <>
    <TopBar insertedQueryJson={setInsertedQueryJson} 
        switch1={switch1} updateSwitch1={updateSwitch1} setDBWindowOpen={setDBWindowOpen} DBWindowOpen={DBWindowOpen} setHeatMapData={setHeatMapData}/>
    <ApolloProvider client={client}>
      {memoMap}
      
      <MultiFlightTable params={displayParams} flights={flights} position={position} mode={mode} show={DBWindowOpen} mapData={mapData}/>
    </ApolloProvider>
    <DateSlider
        value={position}
        setValue={setPosition}
        start={dateRange[0]}
        end={dateRange[1]}
        mode={mode}
        setMode={setMode}
        show={DBWindowOpen}
      />
    </>
  );
}

export default App;


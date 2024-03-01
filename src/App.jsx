import * as React from 'react';
import Mapkpitz from "./components/Mapkpitz/Mapkpitz";
import TopBar from "./components/TopBar"
import {useState, useMemo} from "react";
import axios from 'axios';
import DateSlider from './components/DateSlider.jsx';
import { Button } from '@mui/material';
import MultiFlightTable from './components/MultiPlaneTable.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});
import Map from "./components/Map";
import TopBar from "./components/TopBar"  

function App() {
  const [switch1, setSwitch1] = useState(false);
  // boolean to open and close the plane data table
  const [DBWindowOpen, setDBWindowOpen] = useState(false);
  const [insertedQueryJson, setInsertedQueryJson] = useState();
  // boolean to determine whether a heatmap should be shown
  const [showHeatMap, setShowHeatMap] = useState(true);
  // list of lists in the format [lat, long, strngth]. this is the data for the heatmap
  const [heatMapData, setHeatMapData] = useState([[32, 34.75, 10]])
  // list of names of params to display
  const [displayParams, setDisplayParams] = useState(['tele_rpm', 'tele_heading', 'tele_altitude', 'tele_fuel_kilo', 'packet'])
  // mode of the playbar
  const [mode, setMode] = useState('ABS')
  // fids of flights to display
  const [flights, setFlights] = useState([1, 2])
  // position of playbar (circle thing in the playbar), time selected by playbar
  const [position, setPosition] = useState(0)
  // start and end date (in seconds) of all flights combined
  const [dateRange, setDateRange] = useState([new Date("2023-02-11T11:23:00"), new Date("2023-02-12T19:43:00")])
  // dictionary with plane data for the map
  const [mapData, setMapData] = useState({
    707: {
      "TELE_PP_LAT": 0.55320939623658449857,
      "TELE_PP_LONG": 0.60976575284746381467, 
      "TELE_HEADING": 25
    }, 
    606: {
      "TELE_PP_LAT": 0.55120939623658449857,
      "TELE_PP_LONG": 0.60876575284746381467,
      "TELE_HEADING": 69
    }
  });

  const updateSwitch1 = (event) => {
    setSwitch1(event.target.checked);
  }

  const memoMap = useMemo(
    () => <Mapkpitz mapData={mapData} showHeatMap={showHeatMap} heatMapData={heatMapData}/>,
    [showHeatMap, mapData, heatMapData]
  );

  return (
    <>
    <TopBar insertedQueryJson={setInsertedQueryJson} 
        switch1={switch1} updateSwitch1={updateSwitch1} setDBWindowOpen={setDBWindowOpen} DBWindowOpen={DBWindowOpen}/>
    <ApolloProvider client={client}>
      {memoMap}
      <MultiFlightTable params={displayParams} flights={flights} position={position} mode={mode} show={DBWindowOpen}/>
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


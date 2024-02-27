import * as React from 'react';
import Mapkpitz from "./components/Mapkpitz/Mapkpitz";
import TopBar from "./components/TopBar"
import {useState} from "react";
import axios from 'axios';

function App() {
  const [mapData, setMapData] = React.useState({
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

  const [switch1, setSwitch1] = useState(false);

  const updateSwitch1 = (event) => {
    setSwitch1(event.target.checked);
  }

  const [DBWindowOpen, setDBWindowOpen] = useState(false);
  const updateDBWindowOpen = (open) => {
    setDBWindowOpen(open);
  }

  const [insertedQueryJson, setInsertedQueryJson] = useState();
  //Transform insertedQueryJson to query and run it on the DB

  return (
    <>
    <TopBar insertedQueryJson={setInsertedQueryJson} 
        switch1={switch1} updateSwitch1={updateSwitch1} setDBWindowOpen={setDBWindowOpen}/>
    {DBWindowOpen && true /* Best Friends' Component instead of true */}
    <Mapkpitz mapData={mapData}/>
    </>
  );
}

export default App;


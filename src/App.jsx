import * as React from 'react';
import Mapkpitz from "./components/Mapkpitz/Mapkpitz";
import TopBar from "./components/TopBar"
import {useState} from "react";
import axios from 'axios';

function App() {
  const [GQLResponse, setGQLResponse] = useState(false);
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
  const sendGQLResponse = (response) => {
    setGQLResponse(response);
  }

  return (
    <>
      <TopBar sendResponse={sendGQLResponse}/>
      <Mapkpitz mapData={mapData}/>
    </>
  );
}

export default App;


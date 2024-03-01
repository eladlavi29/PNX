import * as React from 'react';
import Map from "./components/Map";
import TopBar from "./components/TopBar"  

function App() {
  const [MapData, setMapData] = React.useState(false);

  const sendMapData = (response) => {
    setMapData(response);
  }

  const [switch1, setSwitch1] = React.useState(false);

  const updateSwitch1 = (event) => {
    setSwitch1(event.target.checked);
  }

  const [DBWindowOpen, setDBWindowOpen] = React.useState(false);
  const updateDBWindowOpen = (open) => {
    setDBWindowOpen(open);
  }

  const [insertedQueryJson, setInsertedQueryJson] = React.useState();
  //Transform insertedQueryJson to query and run it on the DB
  const updateInsertedQueryJson = (json) => {
    setInsertedQueryJson(json);
  }
  console.log(insertedQueryJson);

  return (
    <div>
      <Map>
      <TopBar insertedQueryJson={updateInsertedQueryJson} 
        switch1={switch1} updateSwitch1={updateSwitch1} setDBWindowOpen={setDBWindowOpen}/>
      </Map>
      {DBWindowOpen && true /* Best Friends' Component instead of true */}
    </div>
  );
}

export default App;


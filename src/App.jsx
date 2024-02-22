import * as React from 'react';
import Map from "./components/Map";
import TopBar from "./components/TopBar"

function App() {
  const [GQLResponse, setGQLResponse] = React.useState(false);

  const sendGQLResponse = (response) => {
    setGQLResponse(response);
  }

  return (
    <div>
      <Map>
      <TopBar sendResponse={sendGQLResponse}/>
      </Map>
    </div>
  );
}

export default App;


import * as React from 'react';
import axios from 'axios';

export function getQueryTypes() {
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
  axios.get('http://localhost:8000/api2/getTypes/')
    .then(response => {
      setTypes(response.data.query_types);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return types;
}

export function getQueriesOfType(type) {
  //const [queries, setQueries] = React.useState([]);
  //const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
  axios.get('http://localhost:8000/api2/getQueriesOfType/')
  });
  // React.useEffect(() => {
  //   axios.get('http://localhost:8000/api2/getTypes/')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   }, []);

  return ["Tininie_1", "Tininie_2"];
}

export function getInputParams(query){
    if(query == '')
        return [];

    return [query + "_param1", query + "_param2"]
}

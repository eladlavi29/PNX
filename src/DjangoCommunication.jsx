import * as React from 'react';
import axios from 'axios';

export function getQueryTypes() {
  // const [types, setTypes] = React.useState([]);

  // React.useEffect(() => {
  // axios.get('http://localhost:8000/api2/getTypes/')
  //   .then(response => {
  //     setTypes(response.data.query_types);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }, []);

  //return types;

  return ['Heat Map', 'Marker Map', 'Tininie'];
}

export function getQueriesOfType(type) {

  // const [queries, setQueries] = React.useState();

  // const response = (axios.post('http://localhost:8000/api2/getQueriesOfType/', {type:type}));
  // response.then((response) => {response &&
  //   setQueries(response.data.queries.map(query => query.name))}
  // );

  // console.log(queries);
  switch(type){
    case 'Heat Map':
      return ['HeatMap_1', 'HeatMap_2']
    
    case 'Marker Map':
      return ['MarkerMap_1', 'MarkerMap_2']
  }

  return ['Tininie1', 'Tininie2'];
}

export function getInputParams(query){
    if(query == '')
        return [];

    return [query + "_param1", query + "_param2"]
}

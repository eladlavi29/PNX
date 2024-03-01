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

    return [query + "_param1", query + "_param2", query + "_param3"]
}

function queryNameToQueryTemplate(query){
  //Format:
  //for param in 
  //{region, dateFrom, dateTo, timeFrom, timeTo} U {sepcificParam | specificParam is in getInputParams(query)}
  //$param$ will be replaced with the given input param
  const param1 = 'param1: %' + query + "_param1%,"  
  const param2 = 'param2: %' + query + "_param2%,"
  const param3 = 'param3: %' + query + "_param3%,"

  return param1 + " " + param2 + " " + param3 + " region: %region%, from date: %fromDate%, to date: %toDate%, from time: %fromTime%, to time: %toTime%"
}

function replaceEmptyParamWithValue(paramNames, paramVals, template){
  for (let i = 0; i < paramNames.length; i++) {
    const regex = new RegExp('%' + paramNames[i] + '%', 'g');

    template = template.replace(regex, paramVals[i]);
  }

  return template;
}

export function getFinalQuery(jsonParams){

  const template = queryNameToQueryTemplate(jsonParams.query);

  const paramNames = getInputParams(jsonParams.query).concat(["region", "fromDate", "toDate", "fromTime", "toTime"]);
  
  let inputParamsVals = getInputParams(jsonParams.query).map((param) => (
    jsonParams[param]
  ));

  const paramVals = inputParamsVals.concat([jsonParams.region, jsonParams.dateFrom, 
    jsonParams.dateTo, jsonParams.timeFrom, jsonParams.timeTo]);

  console.log(paramVals);

  return replaceEmptyParamWithValue(paramNames, paramVals, template);//queryNameToQueryTemplate(query);
}



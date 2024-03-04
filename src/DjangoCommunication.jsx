import * as React from 'react';
import axios from 'axios';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});


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
      return ['HeatMap_1', 'HeatMap_2', 'RPM_FOR_FID']
    
    case 'Marker Map':
      return ['MarkerMap_1', 'MarkerMap_2']
  }

  return ['Tininie1', 'Tininie2'];
}

export function getInputParams(query){
    if(query == '')
        return [];

    switch(query){
      case 'RPM_FOR_FID':
        return ['fid']
    }
    

    return ([query + "_param1", query + "_param2", query + "_param3"].concat(["region", "fromDate", "toDate", "fromTime", "toTime"]));
}

function queryNameToQueryTemplate(query){
  //Format:
  //for param in 
  //{region, dateFrom, dateTo, timeFrom, timeTo} U {sepcificParam | specificParam is in getInputParams(query)}
  //$param$ will be replaced with the given input param
  
  switch(query){
    case 'RPM_FOR_FID':
      let built_query = `query try1 {
        heat_map(query: "select tele_pp_lat as lat,tele_pp_long as lon,tele_rpm as strength from fast_params where fid=%fid% and tele_pp_lat!=0 and tele_pp_long!=0") {lat lon strength}
      }`
      return built_query
  }

  let param_list = getInputParams(query)
  let str = ""
  for(i=0; i<param_list.length; i++){
    str += param_list[i]+": %"+param_list[i]+"%,"
  }

  return str + " region: %region%, from date: %fromDate%, to date: %toDate%, from time: %fromTime%, to time: %toTime%"
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

  const paramNames = getInputParams(jsonParams.query)
  
  let paramVals = getInputParams(jsonParams.query).map((param) => (
    jsonParams[param]
  ));

  console.log(paramVals);

  return replaceEmptyParamWithValue(paramNames, paramVals, template);
}

function fix_data_structure(data, query_name){
  switch(query_name){
    case 'RPM_FOR_FID':
      let res =  ((data["data"])["heat_map"]).map((dict) => (
        (dict["lat"],dict["lon"],dict["strength"])
      ));
      return res;
  }

  return null
}


export async function exeQuery(jsonParams){
  let query = getFinalQuery(jsonParams)

  console.log(query)

  const {data, error} = await client.query({
    query: query
  })
  if (error) {
      console.error('Error executing query: ', error);
      return;
  }

  console.log(data)

  let res = fix_data_structure(data)
  
  console.log(res)
}



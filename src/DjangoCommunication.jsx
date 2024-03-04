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

  return ['Heat Map', 'Marker Map', 'Tininie', 'Plane'];
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
      return ['MarkerMap_1', 'MarkerMap_2', 'START_END_FOR_FID']
    
    case 'Plane':
      return ['Plane_1']
  }

  return ['Tininie1', 'Tininie2'];
}

export function getInputParams(query){
    if(query == '')
        return [];

    switch(query){
      case 'RPM_FOR_FID':
        return ['fid']
      
      case 'Plane_1':
        return ['fid']
      
      case 'START_END_FOR_FID':
        return ['fid']
    }
    

    return ([query + "_param1", query + "_param2", query + "_param3"].concat(["region", "fromDate", "toDate", "fromTime", "toTime"]));
}

function queryNameToQueryTemplate(query, paramVals){
  //Format:
  //for param in 
  //{region, dateFrom, dateTo, timeFrom, timeTo} U {sepcificParam | specificParam is in getInputParams(query)}
  //$param$ will be replaced with the given input param
  
  switch(query){
    case 'RPM_FOR_FID':
      let built_query = gql`query{
        heat_map(query: "select tele_pp_lat as lat,tele_pp_long as lon,tele_rpm as strength from fast_params where fid=${paramVals[0]} and tele_pp_lat!=0 and tele_pp_long!=0") {lat lon strength}
      }`
      return built_query

    case 'Plane_1':
      let built_query_1 = gql`query{
        heat_map(query: "select tele_pp_lat as lat,tele_pp_long as lon,tele_rpm as strength from fast_params where fid=${paramVals[0]} and tele_pp_lat!=0 and tele_pp_long!=0") {lat lon strength}
      }`
      return built_query_1

    case 'START_END_FOR_FID':
      let built_query_2 = gql`query{
        marker_map(query: "(select fast_params.tele_pp_lat as lat,fast_params.tele_pp_long as lon,'start' as content from fast_params,flight_to_fid where fast_params.fid=${paramVals[0]} and flight_to_fid.fid=${paramVals[0]} and fast_params.tele_pp_lat!=0 and fast_params.tele_pp_long!=0 order by packet asc limit 1) UNION ALL (select fast_params.tele_pp_lat as lat,fast_params.tele_pp_long as lon,'end' as content from fast_params,flight_to_fid where fast_params.fid=${paramVals[0]} and flight_to_fid.fid=${paramVals[0]} and fast_params.tele_pp_lat!=0 and fast_params.tele_pp_long!=0 order by packet desc limit 1)") {
          lat lon content
        }
}`
      return built_query_2
      
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
  let paramVals = getInputParams(jsonParams.query).map((param) => (
    jsonParams[param]
  ));

  console.log(paramVals);
  
  return queryNameToQueryTemplate(jsonParams.query, paramVals);
}

function fix_data_structure(data, query_name){
  switch(query_name){
    case 'RPM_FOR_FID':
      let res =  (data["heat_map"]).map((dict) => (
        ([dict["lat"],dict["lon"],dict["strength"]])
      ));
      return res;

    case 'Plane_1':
      let res1 =  (data["heat_map"]).map((dict) => (
        ([dict["lat"],dict["lon"],dict["strength"]])
      ));
      return res1;

    case 'START_END_FOR_FID':
      return  [(data["marker_map"])]
      
  }

  return null
}


export async function exeQuery(query, query_name, func){
  const {data, error} = await client.query({
    query: query
  })
  if (error) {
      console.error('Error executing query: ', error);
      return;
  }

  console.log("DATA: ", data)

  let res = fix_data_structure(data, query_name)
  
  console.log("RES: ", res)

  console.log(func)

  func(res)
}



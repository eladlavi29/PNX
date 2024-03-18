import * as React from 'react';
import axios from 'axios';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

import queries_dict from "./queries.json";

export function getTypeofQuery(q_name) {
  return ((queries_dict['queries'])[q_name])['type'];
}

export function getQueryTypes() {
  return Object.keys(queries_dict['types']);
}

export function getQueriesOfType(type) {
  return (queries_dict['types'])[type];
}

export function getInputParams(query_name){
  return ((queries_dict['queries'])[query_name])['params']
}

export function getInputParamsTypes(query_name){
  return ((queries_dict['queries'])[query_name])['params_types']
}

function queryNameToQueryTemplate(query_name, paramVals){  
  let template =  ((queries_dict['queries'])[query_name])['template']
  let paramNames = getInputParams(query_name)
  let res = replaceEmptyParamWithValue(paramNames, paramVals, template)

  console.log("XXXXXXXXXXXXXXXXXXXXXX")
  console.log("paramNames: ", paramNames)
  console.log("paramVals: ", paramVals)
  console.log("template: ", template)
  console.log("res: ", res)
  console.log("YYYYYYYYYYYYYYYYYYYYYY")
  
  return res
}

function replaceEmptyParamWithValue(paramNames, paramVals, template){
  for (let i = 0; i < paramNames.length; i++) {
    template = template.replaceAll('$' + paramNames[i] + '$', paramVals[i]);
  }

  return template;
}

export function getFinalQuery(jsonParams){
  let paramVals = getInputParams(jsonParams.query).map((param) => (
    jsonParams[param]
  ));

  console.log("paramVals: ", paramVals);
  
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
      let dict = (data["get_flights"])[0]

      let d_start = new Date('1970-01-01 00:00:00');
      d_start.setSeconds(d_start.getSeconds() + Math.floor(dict["start"]/1000));
      
      let d_end = new Date('1970-01-01 00:00:00');
      d_end.setSeconds(d_end.getSeconds() + Math.floor(dict["end"]/1000));
      let fid_1 = dict["fid"]
      var obj = {};
      obj[fid_1] = [d_start,d_end];
      
      return obj

    case 'START_END_FOR_FID':
      return  [(data["marker_map"])]
      
  }

  return null
}


export async function exeQuery(query, query_name, func){
  const {data, error} = await client.query({
    query: gql(query)
  })
  if (error) {
      console.error('Error executing query: ', error);
      return;
  }

  console.log("DATA: ", data)

  let res = fix_data_structure(data, query_name)
  
  console.log("RES: ", res)

  if(func!=null){
    func(res)
  }

  return true
}


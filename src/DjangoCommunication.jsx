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


export function deleteQuery(index, type, setDict, currDict, setData){
  console.log("deleteQuery")
  console.log("currDict: ", currDict)
  console.log("index: ", index)

  var copy = {...currDict};
  delete ((copy[type])[index]) 

  console.log("copy: ", copy)

  setDict(copy)

  switch(type){
    case 'Plane':
      var res_dict = {}
      for(var key in copy['Plane'])
      {
        var curr_dict = (copy['Plane'])[key]
        for(var inn_key in curr_dict)
        {
          res_dict[inn_key] = curr_dict[inn_key]
        }
      }
      setData(res_dict)
    

    case 'Marker Map':
      console.log("deleteQuery- MARKER MAP")
      let res1 = []

      for(var key in copy['Marker Map'])
      {
        res1 = res1.concat((copy['Marker Map'])[key])
      }
      console.log("res1: ", res1)
      setData(res1)
      console.log("res1: ", res1)
    
    
    case 'Heat Map':
      setData([])
  }
}


function fix_data_structure(data, query_type, setDict, currDict, query_num, setQuery_num){
  switch(query_type){
    case 'Heat Map':
      let res =  (data["heat_map"]).map((dict) => (
        ([dict["lat"],dict["lon"],dict["strength"]])
      ));
      return res;

    case 'Plane':
      let dict = (data["get_flights"])[0]

      let d_start = new Date(dict['start']);
      console.log("actual date: ", new Date(dict["start"]))
      // d_start.setSeconds(d_start.getSeconds() + Math.floor(dict["start"]/1000));
      
      let d_end = new Date(dict['end']);
      // d_end.setSeconds(d_end.getSeconds() + Math.floor(dict["end"]/1000));
      let fid_1 = dict["fid"]
      
      var obj={}
      obj[fid_1] = [d_start,d_end];

      var tag = query_num
      setQuery_num(query_num+1)

      console.log("tag: ", tag)

      var copy = {...currDict};
      (copy['Plane'])[tag] = obj // a dict that represents the query
      setDict(copy)

      console.log("copy: ", copy)

      var res_dict = {}
      for(var key in copy['Plane'])
      {
        var curr_dict = (copy['Plane'])[key]
        for(var inn_key in curr_dict)
        {
          res_dict[inn_key] = curr_dict[inn_key]
        }
      }

      console.log("res_dict: ", res_dict)

      return res_dict

    case 'Marker Map':
      var curr_list = [(data["marker_map"])]
      var tag = query_num
      setQuery_num(query_num+1)

      console.log("tag: ", tag)

      var copy = {...currDict};
      (copy['Marker Map'])[tag] = curr_list
      setDict(copy)

      console.log("copy: ", copy)

      let res1 = []

      for(var key in copy['Marker Map'])
      {
        res1 = res1.concat((copy['Marker Map'])[key])
      }

      console.log("res1: ", res1)

      return res1
      
  }

  return null
}


export async function exeQuery(query, query_type, setData, setDict, currDict, query_num, setQuery_num){
  const {data, error} = await client.query({
    query: gql(query)
  })
  if (error) {
      console.error('Error executing query: ', error);
      return;
  }

  console.log("DATA: ", data)

  let res = fix_data_structure(data, query_type, setDict, currDict, query_num, setQuery_num)
  
  console.log("RES: ", res)

  if(setData!=null){
    setData(res)
  }

  return true
}


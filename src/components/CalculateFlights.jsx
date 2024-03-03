import React from 'react';
import {useMemo, useEffect, useState} from 'react'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import {format} from 'date-fns';

async function CalculateFlights(flights, position, mode, setMapData, client, params) {
    if (mode === 'REL') {
        for (let flight in flights) {
            //console.log(flight)
            let start = flights[flight][0].getTime()
            let end = flights[flight][1].getTime()
            let fid = flight;
            let time = new Date(start + (position / 100) * (end - start))
            console.log(time)
            if (client) {
                const {data, error} = await client.query({
                    query: gql`
                        query{
                            row_by_time(fid: ${fid}, time: "${time}") {
                                params(names: [${params.map(param => {return '"' + param + '"'})}]) {
                                    name
                                    value
                                }
                            }
                        }`
                    })
                if (error) {
                    console.error('Error fetching launches:', error);
                    return;
                }
                console.log(data)
            }
            
            console.log('hello')
            //console.log(data) 
        }
    }
}

export default CalculateFlights;
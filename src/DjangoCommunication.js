export function getQueryTypes() {
    return ["Heat Map", "Marker Map", "Tininie"];
}

export function getQueriesOfType(type) {
    switch(type){
        case "Heat Map": 
            return ["HeatMap_1", "HeatMap_2"]
        case "Marker Map": 
            return ["MarkerMap_1", "MarkerMap_2"]
    }

    return ["Tininie_1", "Tininie_2"];
}

export function getInputParams(query){
    if(query == '')
        return [];

    return [query + "_param1", query + "_param2"]
}

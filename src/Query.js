import {getInputParams} from '../src/DjangoCommunication';

export default class Query {
    constructor(query, type) {
        this.query = query;
        this.type = type;
        this.inputParams = NaN;
        if(query != '')
            this.inputParams = Array(getInputParams(query).length).fill();
    }
}

import * as d3 from 'd3';

class Data {
    constructor() {
        this._nodes = [];
        this._links = [];
    }

    nodes() {
        return this._nodes;
    }

    links() {
        return this._links;
    }

    load(spec) {
        console.log('load',spec.url)
        return new Promise((resolve, reject) => {
        d3.json(spec.url)
        .then(function (data) {
            this._nodes = data.nodes
            this._links = data.links
            console.log(this._nodes,this._links)
            resolve(this)
        }.bind(this)).catch(function (error) {
            reject(error);
        })
            }
        );
    }
}

export default Data;
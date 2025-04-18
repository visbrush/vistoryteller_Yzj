import Data from './loaddata';
import Visualization from './visualization';
import Display from './display';

class AutoVis {
    constructor() {
        this._container = document.createElement("div");
        //this._paragraph = document.createElement("p");
        this._data = new Data();
        this._vis = new Visualization();
        this._display = new Display();
        this._spec = {
            "chart": {
                "type": "neighborin"
            },
            "fact": {
                "type": ["neighbor"],
                "subspace": [
                ],
                "breakdown": [{}],
                "measure": [{ "field": "Napoleon", "aggregate": "in" }],
                "focus": [
                    {
                        "node": "MmeMagloire"
                    }
                ]
            },
            "data": {
                "url": "http://localhost:3000/spreadsheets/graph.json"
            }
        }
    }

    container(value) {
        if (!value) {
            return this._container;
        }
        this._container = value;
    }

    paragraph(value) {
        if (!value) {
            return this._paragraph;
        }
        this._paragraph = value;
    }

    load(spec) {
        this._spec = spec;
    }

    shouldShowCaption(value) {
        if (!value) {
            return this._shouldShowCaption;
        }
        this._shouldShowCaption = value;
    }

    generate() {
        // STEP 0: parse specification
        console.log(this._spec)
        let spec = this._spec;
        let dataspec = spec.data ? spec.data : {};
        let factspec = spec.fact ? spec.fact : {};
        let chartspec = spec.chart ? spec.chart : {};
        console.log(factspec, chartspec, dataspec)
        // STEP 1: data
        this._data.load(dataspec)
            .then((data) => {
                // STEP 3: generate caption and setup visualization
                this._vis.nodes(data.nodes());
                this._vis.links(data.links());
                this._vis.fact(factspec)
                //this._vis.container(this.container())
                //console.log(this._vis)
                return this._vis.load(spec);
            })
            .then((vis) => {
                // STEP 4: display
                console.log(this.container())
                this._display.container(this.container());
                //this._display.paragraph(this.paragraph());
                this._display.vis(vis);
                this._display.render();
                // if (this.shouldShowCaption()) {
                //     this._display.showCaption();
                // }
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

}

export default AutoVis;
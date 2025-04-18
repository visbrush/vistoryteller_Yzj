import ChartType from './visualization/charttype';
import { Neighborin, Neighborout, AccessibilityOut, AccessibilityIn, Connectivity } from '../vis/charts';

//在visualization里面调用chart，chart return一张图
class Visualization {
    constructor() {
        this._fact = {}
        this._width = 0;
        this._height = 0;
        this._nodes = {}
        this._links = {}
        this._container = "";
        this._type = ChartType.VERTICAL_BAR_CHART;
        this._duration = 0;
        this._chart = {};
        //this._caption = "";
        //this._showSuggestion = false; // When true, it will show the suggestion that whether the chart supports the data.
    }

    fact(value) {
        if (!value) {
            return this._fact;
        }
        this._fact = value;
        console.log(this._fact)
    }

    width(value) {
        if (!value) {
            return this._width;
        }
        this._width = value;
    }

    height(value) {
        if (!value) {
            return this._height;
        }
        this._height = value;
    }


    nodes(value) {
        if (!value) {
            return this._nodes;
        }
        this._nodes = value;
    }

    links(value) {
        if (!value) {
            return this._links;
        }
        this._links = value;
    }

    chart(value) {
        if (!value) {
            return this._chart;
        }
        this._chart = value;
    }

    container(value) {
        if (!value) {
            return this._container;
        }
        this._container = value;
    }

    // caption(value) {
    //     if (!value) {
    //         return this._caption;
    //     }
    //     this._caption = value;
    // }

    // style() {
    //     return this._style;
    // }

    // showSuggestion() {
    //     return this._showSuggestion
    // }

    load(spec) {
        console.log(spec)
        this._width = spec.width ? spec.width : 0;
        this._height = spec.height ? spec.height : 0;
        //this._style = spec.style;
        this._type = spec.chart.type;
        this._duration = spec.duration ? spec.duration : 0;
        //this._showSuggestion = spec.showSuggestion ? spec.showSuggestion : false;
        console.log(this)
        return new Promise((resolve, reject) => {
            try {
                let fact = this.fact();
                let chart = this._type2chart(this._type);
                console.log('11', chart)
                chart.height(this._height);
                console.log('11')
                chart.width(this._width);
                chart.nodes(this._nodes)
                chart.links(this._links)
                chart.subspace(fact.subspace);
                chart.measure(fact.measure);
                chart.breakdown(fact.breakdown);
                chart.focus(fact.focus);
                chart.duration(this._duration);
                console.log(chart)
                //chart.showSuggestion(this._showSuggestion);
                this.chart(chart);
                resolve(this);
            } catch (error) {
                reject(error);
            }
        });
    }


    _type2chart(type) {
        console.log(type)
        switch (type) {
            case ChartType.NEIGHBORIN:
                return new Neighborin();
            case ChartType.NEIGHBOROUT:
                return new Neighborout()
            case ChartType.ACCESSIBILITYIN:
                return new AccessibilityIn();
            case ChartType.ACCESSIBILITYOUT:
                return new AccessibilityOut();
            case ChartType.CONNECTIVITY:
                return new Connectivity();
            default: return
        }
    }
}

export default Visualization;
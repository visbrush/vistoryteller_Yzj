import Annotator from './annotator';
import Color from '../../visualization/color';
import { LineChart} from '../../charts';


const COLOR = new Color();

/**
 * @description An annotator for drawing seasonality line.
 * 
 * @class
 * @extends Annotator
 */
class Seasonality extends Annotator {
    /**
     * @description Annotate targeted elements with contour.
     * 
     * @param {Chart} chart src/vis/charts/chart.js
     * @param {Array} target It describes the data scope of the annotation, which is defined by a list of filters: [{field_1: value_1}, ..., {field_k, value_k}]. By default, the target is the entire data.
     * @param {{color: string}} style Style parameters of the annotation.
     * @param {{delay: number, duration: number}} animation Animation parameters of the annotation.
     * 
     * @return {void}
     */
    annotate(chart, target, style, animation) {
        let svg = chart.svg();
        // filter for elements that meet the conditions(`target`）
        console.log('target')
        console.log(target)

        // 0 代表没有找到任何一个端点，1代表找到了左端点，2代表找到了右端点
        var flag=0;

        // target 是两个端点 
        let focus_elements = svg.selectAll(".mark")
            .filter(function (d) {
                if (target.length === 0) {
                    return false
                }
                for (const item of target) {
                    if (d[item.field] === item.value) {
                        console.log('flag')
                        console.log(flag)
                        flag=flag+1
                        return true
                    } else {
                        continue
                    }
                }
                if (flag===1) return true
                return false
            });
        console.log('focus_elements')
        console.log(focus_elements)
        // return if the focus defined in the spec does not exist
        if (focus_elements.empty()) return;

        // now only support linechart/barchart/scatterplot/unitvis
        if (!(chart instanceof LineChart )) return;

        // step 1: get all focused elements position
        let positions = [];
        focus_elements.nodes().forEach(one_element => {
            let data_x, data_y;
            const nodeName = one_element.nodeName;
            if (nodeName === "circle") {
                data_x = parseFloat(one_element.getAttribute("cx"));
                data_y = parseFloat(one_element.getAttribute("cy"));
            } else if (nodeName === "rect") {
                data_x = parseFloat(one_element.getAttribute("x")) + parseFloat(one_element.getAttribute("width")) / 2;
                data_y = parseFloat(one_element.getAttribute("y"));
            }
            if (data_x && data_y) {
                positions.push([data_x, data_y]);
            }
        })

        if(positions.length < 2) return;
        let x1,x2,y1,y2;
        x1=positions[0][0];
        y1=positions[0][1];
        x2=positions[1][0];
        y2=positions[1][1];

        const s_width = style['stroke-width'] ?? 2;
        const s_dasharray = style["stroke-dasharray"] ? style["stroke-dasharray"] : "8, 4";
        const s_linecap = style["stroke-linecap"] ? style["stroke-linecap"] : "butt";

        // step 4: draw line
        if ("type" in animation && animation["type"] === "wipe") {
            svg.append("line")
                .attr("class", "seasonality")
                .attr("x1", x1)
                .attr("x2", x2)
                .attr("y1", y1)
                .attr("y2", y2)
                .attr("stroke-width", s_width)
                .attr("stroke-linecap", s_linecap)
                .attr("stroke-dasharray", s_dasharray)
                .attr("stroke", () => {
                    if ("color" in style) {
                        return style["color"];
                    } else {
                        return COLOR.ANNOTATION;
                    }
                })
                .transition()
                .duration('duration' in animation ? animation['duration']: 0)
                .attr("x2", x2)
                .attr("y2", y2)
        } else {
            for (let i = 0; i < positions.length - 1; i++) {
                const point1 = positions[i];
                const point2 = positions[i + 1];
              
                const x1 = point1[0];
                const y1 = point1[1];
                const x2 = point2[0];
                const y2 = point2[1];
                svg.append("line")
                    .attr("class", "seasonality")
                    .attr("x1", x1)
                    .attr("x2", x2)
                    .attr("y1", y1)
                    .attr("y2", y2)
                    .attr("stroke-width", s_width)
                    .attr("stroke-linecap", s_linecap)
                    .attr("stroke-dasharray", s_dasharray)
                    .attr("stroke", () => {
                        if ("color" in style) {
                            return style["color"];
                        } else {
                            return COLOR.ANNOTATION;
                        }
                    })
                    .attr("opacity", 0)
                    .transition()
                    .duration('duration' in animation ? animation['duration']: 0)
                    .attr("opacity", 1);
            }
        }
    }

    /**
     * @description Compute least squares on given data points.
     * 
     * @param {Array} points positions of points to draw a regression line
     * @returns {{m: number, b: number}} params of the least squares results {m: gradient, b: intercept}
     */
    getLeastSquares(points) {
        let ret = {}

        let sumX = 0
        let sumY = 0
        let sumXY = 0
        let sumXSq = 0
        let N = points.length

        for (let i = 0; i < N; ++i) {
            sumX += points[i][0]
            sumY += points[i][1]
            sumXY += points[i][0] * points[i][1]
            sumXSq += points[i][0] * points[i][0]
        }

        ret.m = ((sumXY - sumX * sumY / N)) / (sumXSq - sumX * sumX / N)
        ret.b = sumY / N - ret.m * sumX / N

        return ret;
    }
}

export default Seasonality;
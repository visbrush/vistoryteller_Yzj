import Color from '../../visualization/color';
import Annotator from './annotator'

const COLOR = new Color();

/**
 * @description An annotator for filling color.
 * 
 * @class
 * @extends Annotator
 */
class Partialrect extends Annotator {

    /**
     * @description Fill target marks with color.
     * 
     * @param {Chart} chart src/vis/charts/chart.js
     * @param {Array} target It describes the data scope of the annotation, which is defined by a list of filters: [{field_1: value_1}, ..., {field_k, value_k}]. By default, the target is the entire data.
     * @param {{color: string}} style Style parameters of the annotation.
     * @param {{delay: number, duration: number}} animation Animation parameters of the annotation.
     * 
     * @return {void}
     */
    annotate(chart, target, style, animation) {
        console.log('target')
        console.log(target)

        let svg = chart.svg();
        let mark = svg.selectAll(".mark")
        let focus_elements=[]
        for (const item of target) {
            let focus_element = mark.filter(function (d) {
                if (target.length === 0) {
                    return false
                }
                else if(d[item.field] === item.value){
                    return true
                }
            }
            )
            focus_elements.push(focus_element)
        }
        
        console.log(focus_elements)
        if (focus_elements.length===0) return;

        // step 1: get all focused elements position
        let positions = [];
        let rectwidths = [];
        for (const item of focus_elements) {
            item.nodes().forEach(one_element => {
                let data_x, data_width;
                const nodeName = one_element.nodeName;
                console.log(one_element)
                if (nodeName === "rect") {
                    data_x = parseFloat(one_element.getAttribute("x"));
                    data_width = parseFloat(one_element.getAttribute("width"));
                } 
                if (data_x) {
                    positions.push(data_x);
                    rectwidths.push(data_width)
                }
            })
        }
        console.log(positions,rectwidths)

        let y_lower_bound, y_upper_bound
        let y_axis_path = svg.selectAll('.axis_y').select(".domain");
        let y_axis_bbox = y_axis_path.node().getBBox();
        y_lower_bound = y_axis_bbox.y;
        y_upper_bound = y_lower_bound + y_axis_bbox.height;
        console.log(y_lower_bound,y_upper_bound)

        const rectWidth = positions[1]-positions[0]
        const rectHeight = y_upper_bound-y_lower_bound
        console.log(rectWidth,rectHeight)
        console.log(animation)
        console.log(COLOR)

        let xstart=positions[0]
        svg.append("rect")
            .attr("class", "partialrect")
            .attr("x", xstart)
            .attr("y", 0)
            .attr('width', rectWidth+rectwidths[1])
            .attr('height', rectHeight)
            .attr("fill", () => {
                if ("color" in style) {
                    return style["color"];
                } else {
                    return COLOR.ANNOTATION;
                }
            })
            .attr("opacity", 0)
            .transition()
            .duration('duration' in animation ? animation['duration']: 0)
            .attr("opacity", 0.5);
        

    }
}

export default Partialrect
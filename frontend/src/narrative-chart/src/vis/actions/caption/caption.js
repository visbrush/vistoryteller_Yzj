import * as d3 from 'd3';
import Color from '../../visualization/color';

const COLOR = new Color();
/**
 * @description A class for adding caption with fade animation
 * 
 * @class
 */
class Caption {
    /**
     * @description Add the caption at the bottom of chart
     * 
     * @param {vis} visualization src/vis/visualization.js
     * @param {{text: text, font-size:font-size}} style Style parameters of the caption.
     * @param {{delay: number, duration: number}} animation Animation parameters of the caption.
     * 
     * 
     * @return {void}
     */

    makecaption(vis, style, animation) {

        let Wscaleratio = vis.width() / 640
        let Hscaleratio = vis.height() / 640

        let svg = d3.select(vis.container()).select("svg")

        let words = style.text.split(" ").filter(d => d !== "");

        //let textsize = style['font-size'] ? style['font-size'] : 16* Math.min(Wscaleratio,Hscaleratio)
        let textsize =  74* Math.min(Wscaleratio,Hscaleratio)
        


        let textcolor = style['font-color'] ? style['font-color'] : COLOR.TEXT

        let captionbackgroundmargin = {
            left: Wscaleratio * 50,
            top: Hscaleratio * 75
        }


        let captionbackgroundearea = {
            width: Wscaleratio * 610
        }

        let captionpadding = {
            left: style['left-padding']?? 0,
            top: style['top-padding']?? 0
        }


        let captiontransform = {
            left: 0 + (captionpadding.left), 
            top: 65 + (captionpadding.top)
        }



        let captionContent = svg.append("g").attr("id","captionContent")

        let virtualE = captionContent.append("text")
            .attr("font-family", style['font-family'] ?? 'Arial-Regular')
            .attr("font-weight", style['font-weight'] ?? "normal")
            .attr("font-style", style['font-style'] ?? "normal")
            .attr("font-size", textsize)
            .text(words[0]);

        let textE = captionContent.append("text")
            .attr("id", "captionText")
            .attr("dominant-baseline", "central")
            .attr("transform", "translate(" + captiontransform.left + "," + (Hscaleratio * captiontransform.top) + ")")
            .attr("font-family", style['font-family'] ?? 'Arial-Regular')
            .attr("font-weight", style['font-weight'] ?? "normal")
            .attr("font-style", style['font-style'] ?? "normal")
            .attr("font-size", textsize)
            .attr("fill", textcolor)

        let position
        switch (style.position) {
            case 'top-left':
                position = Wscaleratio*30
                textE.attr("text-anchor", "start")
                break;
            case 'top-center':
                position = "50%"
                textE.attr("text-anchor", "middle")
                break;
            case 'top-right':
                position = Wscaleratio*610
                textE.attr("text-anchor", "end")
                break;
            default:
                position = Wscaleratio*30
                textE.attr("text-anchor", "start")
        }


    console.log('virtualE',virtualE)
        let maxWidth = 0
        let lineHeight = 30
        if (virtualE.node()!=null){
            maxWidth = Math.max(virtualE.node().getComputedTextLength(), Wscaleratio*590);
            lineHeight = virtualE.node().getBBox().height * 0.9;
        }
        else{
            maxWidth =  Wscaleratio*590;
        }
        let maxHeight = 60 * Hscaleratio ;
        let line = '';
        let rowCount = 0;
        const maxRow = textsize > 14* Math.min(Wscaleratio,Hscaleratio) ? 2 : 3;

        for (let n = 0; n < words.length; n++) {
            let testLine = line + ' ' + words[n];
            /*  Add line in testElement */
            if (rowCount === maxRow - 1) {
                virtualE.text(testLine + "…");
            } else {
                virtualE.text(testLine);
            }
            
            /* Messure textElement */
            let testWidth = 30;
            if (virtualE.node()!=null){
                testWidth = virtualE.node().getComputedTextLength();
            }

            let testHeight =  30
            if(virtualE.node()){
                testHeight = virtualE.node().getBBox().height
            }
        

            if (testWidth > maxWidth) {
                if (rowCount === maxRow - 1) {//最后一行还有文字没显示
                    line += "…";
                    break;
                } 
                else if (testHeight > maxHeight/maxRow){
                    line += "…";
                    break;
                }
                else {//new row
                    textE.append("tspan")
                        .attr("id", "caption1stline")
                        .attr("x", position)
                        .attr("dy", lineHeight)
                        .text(line)
                    line = words[n];
                    rowCount++;
                }
            } else {
                line = testLine;
            }
        }

        textE.append("tspan")
            .attr("id", document.getElementById('caption1stline') ? "caption2ndline" : "caption1stline")
            .attr("x", position)
            .attr("dy", lineHeight)
            .text(line)
        virtualE.remove();



        // if animation is activated
        if (animation.duration !== -1) {
            switch (animation.type) {
                case 'wipe':
                    let bbox = 20
                    if(textE.node()){
                        bbox = textE.node().getBBox();
                    }
                     
                    

                    captionContent.append("defs")
                        .attr("class", "caption_defs")
                        .append("clipPath")
                        .attr("id", "clip_caption")
                        .append("rect")
                        .attr('x', 0.8 * bbox.x)
                        .attr('y', 0.9 * captionbackgroundmargin.top)
                        .attr("width", 0)
                        .attr("height", 1.3 * bbox.height);


                    captionContent.attr("clip-path", "url(#clip_caption)");
                    
                    captionContent.selectAll("#clip_caption rect")
                        .attr("width", 0)
                        .transition()
                        .duration('duration' in animation ? animation['duration'] : 0)
                        .ease(d3.easeLinear)
                        .attr("width", 1.2 * captionbackgroundearea.width);                    

                    break;

                case 'typewritter':

                    d3.select('#caption1stline')
                        .transition()
                        .duration(animation.duration / 2)
                        .tween("text", function () {

                            var newText = document.getElementById('caption1stline').textContent;
                            var textLength = newText.length;
                            return function (t) {
                                this.textContent = newText.slice(0,
                                    Math.round(t * textLength));
                            }
                        })

                    if (document.getElementById('caption2ndline')) {

                        d3.select('#caption2ndline')
                            .attr("fill-opacity", 0)
                            .transition()
                            .delay(animation.duration / 2.1) /*  2.1 is for more coherent transcation between 1st line and 2nd line */
                            .duration(0)
                            .attr("fill-opacity", 1)
                            .transition()
                            .duration(animation.duration / 2)
                            .tween("text", function () {

                                var newText = document.getElementById('caption2ndline').textContent;
                                var textLength = newText.length;
                                return function (t) {
                                    this.textContent = newText.slice(0,
                                        Math.round(t * textLength));
                                }
                            })
                    }
                    break;

                default:
                    textE.selectAll("tspan")
                        .attr("fill-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1)

                    break;
            }
        }

    }
}

export default Caption
import * as d3 from 'd3';
import Color from '../../visualization/color';

const COLOR = new Color();

/**
 * @description A class for adding title 
 * 
 * @class
 */
class Title {
    /**
     * @description Add the title at the top of chart
     * 
     * @param {vis} visualization src/vis/visualization.js
     * @param {{text: text, font-size:font-size}} style Style parameters of the title.
     * @param {{delay: number, type: string}} animation Animation parameters of the title.
     * 
     * 
     * @return {void}
     */

     maketitle(vis, style, animation) {

        let Wscaleratio = vis.width() / 640
        let Hscaleratio = vis.height() / 640
        
        let bannerarea = {
            width : vis.width(),
            height: 70 * Math.min(Wscaleratio,Hscaleratio)
        }


        let titleborderpadding = {
            left: style['left-padding']?? 2,
            top: style['top-padding']?? 2
        }

        let titleborderarea= {
            width : Wscaleratio * (600 + titleborderpadding.left*2)
        }


        let titlebordermargin = {
            left: Wscaleratio * 20,
            top: Hscaleratio * 10
        }


        let titlebackgroundearea= {
            width : Wscaleratio * (600 + titleborderpadding.left*2)
        }

        let titlebackgroundmargin= {
            left: Wscaleratio * 20,
            top: Hscaleratio * 10
        }

        let titleposition = {
            left: Wscaleratio * 30, 
            center: "50%", 
            right: Wscaleratio * 610
        }

        let titletransform = {
            left: -2 + (titleborderpadding.left), 
            top: 6 + (titleborderpadding.top)
        }


        let svg = d3.select(vis.container()).select("svg")

        let words = style.text.split(" ").filter(d => d !== "");

        let textsize = style['font-size']?? 20* Math.min(Wscaleratio,Hscaleratio)

        let textcolor = style['font-color']?? COLOR.TITLE

        let titleContent = svg.append("g").attr("id","titleContent")
        
    
        let virtualE = titleContent.append("text")
            .attr("font-family", style['font-family']?? 'Arial-Regular')
            .attr("font-weight",  style['font-weight']?? "bold")
            .attr("font-style",  style['font-style']?? "normal")
            .attr("font-size", textsize)
            .text(words[0]);
        
        
        let maxWidth = Math.max(virtualE.node().getComputedTextLength(), Wscaleratio* (595-titleborderpadding.left*2));

        let maxHeight = 56 * Hscaleratio ;
        

        const lineHeight = virtualE.node().getBBox().height * 0.9;
        const maxRow = textsize > 16 * Math.min(Wscaleratio,Hscaleratio) ? 2: 3;
    
        let backgroundimage 
        let backgroundcolor 
        //  title embellishment

        // 1. banner section background-image
        if (style["background-image"]){
            let defs = titleContent.append('svg:defs');

            defs.append("svg:pattern")
                .attr("id", "text-backgroundimage")
                .attr("width", 1)
                .attr("height", 1)
                .attr("patternUnits", "objectBoundingBox")
                .append("svg:image")
                .attr("xlink:href", style["background-image"])
                .attr("preserveAspectRatio", "xMidYMid slice") 
                .attr("width", bannerarea.width)
                .attr("height", bannerarea.height)
                .attr("x", 0)
                .attr("y", 0);
            backgroundimage = "url(#text-backgroundimage)"
            
            titleContent.append("g")
                .attr("id","textBack")
                .append("rect")
                .attr("width", bannerarea.width)
                .attr("height", bannerarea.height)
                .attr("fill", backgroundimage)
        }

        

            
        let textE = titleContent.append("g") 
            .attr("id","titleText")
            .append("text")
            .attr("dominant-baseline", "Alphabetic")
            .attr("transform", "translate(" + titletransform.left + "," + titletransform.top + ")")
            .attr("font-family", style['font-family']?? 'Arial-Regular')
            .attr("font-weight",  style['font-weight']?? "bold")
            .attr("font-style",  style['font-style']?? "normal")
            .attr("font-size", textsize)
            .attr("filter", backgroundcolor)
            .attr("fill", textcolor)
            
                

        
        // setting the text position in the title
        let position
        switch(style.position){
            case 'top-left':
                position = titleposition.left
                textE.attr("text-anchor", "start")
                break; 
            case 'top-center':
                position = titleposition.center
                textE.attr("text-anchor", "middle")
                break; 
            case 'top-right':
                position = titleposition.right
                textE.attr("text-anchor", "end")
                break; 
            default:
                position = titleposition.left
                textE.attr("text-anchor", "start") 
            }
        


        let line = '';
        let rowCount = 0;
        

        for (let n = 0; n < words.length; n++) {
            let testLine = line + ' ' + words[n];
            /*  Add line in testElement */
            if(rowCount === maxRow - 1){
                virtualE.text(testLine+ "…");
            }else{
                virtualE.text(testLine);
            }
           
            /* Messure textElement */
            let testWidth = virtualE.node().getComputedTextLength();
            let testHeight = virtualE.node().getBBox().height

            if (testWidth > maxWidth) {
                if(rowCount === maxRow - 1){//最后一行还有文字没显示
                    line += "…";
                    break;
                }
                else if (testHeight > maxHeight/maxRow){
                    line += "…";
                    break;
                }
                else{//new row
                    textE.append("tspan")
                        .attr("id","title1stline")
                        .attr("x", position)
                        .attr("dy", lineHeight)
                        .text(line)

                    line = words[n];
                    rowCount ++;
                }
            } else {
                line = testLine;
            }
        }
        
        textE.append("tspan")
            .attr("id", document.getElementById('title1stline') ? "title2ndline" : "title1stline")
            .attr("x", position)
            .attr("dy", lineHeight)
            .text(line)


        virtualE.remove();

        // 2. title section background color
        if (style["background-color"]){
            d3.select("#titleText")
                .insert("g", "text")
                .attr("id","titleBackGrnd")
                .append("rect")
                .attr("width", titlebackgroundearea.width)
                .attr("height", textE.node().getBBox().height + titleborderpadding.top*2)
                .attr("transform", "translate(" + titlebackgroundmargin.left + "," + titlebackgroundmargin.top + ")")
                .attr("fill", style["background-color"]);
            }
        
        // 3. title section border
        if (style["border-color"] || style["border-width"]){   
            titleContent.append("g")
            .attr("id","titleBorder")
            .append("rect")
            .attr("width", titleborderarea.width)
            .attr("height", textE.node().getBBox().height + titleborderpadding.top*2)
            .attr("transform", "translate(" + titlebordermargin.left + "," + titlebordermargin.top + ")")
            .attr("stroke", style["border-color"]??  "black")
            .attr("stroke-width", style["border-width"]?? 2)
            .attr("fill-opacity",0)
        }

        // 4. divide-line border
        if (style["divide-line-width"] || style["divide-line-color"]){    
            titleContent.append("line")
            .attr("id","divideLine")
            .attr("stroke", style["divide-line-color"]??  "black")
            .attr("stroke-width", style["divide-line-width"]?? 2)
            .attr("x1", textE.node().getBBox().x)
            .attr("y1", 15 + textE.node().getBBox().height)
            .attr("x2", textE.node().getBBox().x + textE.node().getBBox().width)
            .attr("y2", 15 +  textE.node().getBBox().height);     
        }

        // if animation is activated
        if(animation.duration !==-1){
            switch (animation.type) {
                case 'wipe':
                    let bbox = textE.node().getBBox();
                    

                    titleContent.append("defs")
                        .attr("class", "title_defs")
                        .append("clipPath")
                        .attr("id", "clip_title")
                        .append("rect")
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr("width", 0)
                        .attr("height", Math.max(1.3 * bbox.height,bannerarea.height));


                    titleContent.attr("clip-path", "url(#clip_title)");
                    
                    titleContent.selectAll("#clip_title rect")
                        .attr("width", 0)
                        .transition()
                        .duration('duration' in animation ? animation['duration'] : 0)
                        .ease(d3.easeLinear)
                        .attr("width", Math.max(1.2 * bbox.height,bannerarea.width));                    

                    break;
                

                case 'typewritter':

                    d3.select("#titleBorder")
                        .attr("stroke-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("stroke-opacity", 1);

                    d3.select("#titleBackGrnd")
                        .attr("fill-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1);

                    d3.select("#textBack")
                        .attr("fill-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1);

                    d3.select("#divideLine")
                        .attr("stroke-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("stroke-opacity", 1);

                    d3.select('#title1stline')
                        .transition()
                        .duration(animation.duration/2)
                        .tween("text", function () {
                            
                            var newText = document.getElementById('title1stline').textContent;
                            var textLength = newText.length;
                            return function (t) {
                                this.textContent = newText.slice(0,
                                                   Math.round( t * textLength) );
                            }                            
                        })
                    
                    if(document.getElementById('title2ndline')){

                        d3.select('#title2ndline')
                            .attr("fill-opacity", 0)
                            .transition()
                            .delay(animation.duration/2.1) /*  2.1 is for more coherent transcation between 1st line and 2nd line */
                            .duration(0)                            
                            .attr("fill-opacity", 1)
                            .transition()
                            .duration(animation.duration/2)
                            .tween("text", function () {

                                var newText = document.getElementById('title2ndline').textContent;
                                var textLength = newText.length;
                                return function (t) {
                                    this.textContent = newText.slice(0,
                                                    Math.round( t * textLength) );
                                }                            
                            })
                    }
                    break;

                default:

                    d3.selectAll('#titleText tspan')
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1)
                        
                    d3.select("#titleBorder")
                        .attr("stroke-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("stroke-opacity", 1);

                    d3.select("#textBack")
                        .attr("fill-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1);

                    d3.select("#titleBackGrnd")
                        .attr("fill-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("fill-opacity", 1);

                    d3.select("#divideLine")
                        .attr("stroke-opacity", 0)
                        .transition()
                        .duration(animation.duration)
                        .attr("stroke-opacity", 1);
                        
                        break;
            }
    
        
    }
}
    
    
    
}

export default Title
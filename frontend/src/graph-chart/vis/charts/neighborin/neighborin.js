import * as d3 from "d3";
import Chart from '../../../vis/chart.js'

const CONTOLOGY='#FFE899'
const CACTION='#9FB1FF'
const Chighlightaction = "#3E7AFF"
const Chighlightontology = "#FBD347"
const Chighlightpath ="#5F7AF5"
const Cstrokeontology  = "#FEF6DA"
const Cstrokeaction= "#D8E4FF"

class Neighborin extends Chart{
    constructor() {
        super();
        this._x = "";
        this._y = "";
    }
    display(){
        console.log(this._measure[0].field)
        const width = 600;
        const height = 600;
        const links = this._links;
        const nodes = this._nodes;
        const measurefield = this._measure[0].field
        var focuscx = ''
        var focuscy = ''
        let containerSelector = this._container
        
        let svg = d3.select(this.container())
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        //箭头
        svg.append("defs")
            .append("marker")
            .attr("id", "arrow")
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 46)
            .attr("refY", 0)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", Chighlightpath);

        // Specify the color scale.
        const myColor = d3.scaleOrdinal().domain([1,2])
                        .range([CACTION, CONTOLOGY])
        const highlightColor = d3.scaleOrdinal().domain([1,2])
                        .range([Chighlightaction, Chighlightontology])
        const highlightStrokeColor = d3.scaleOrdinal().domain([1,2])
                        .range([Cstrokeaction, Cstrokeontology])

        // Create a simulation with several forces.
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => {return d.id}))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked)
            .on("end", () => {
                // 这里执行你的操作
                console.log("力导向图加载结束");
                // 调用你的自定义函数xx
                halo(focuscx,focuscy)
            });

        // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
            .selectAll()
            .data(links)
            .join("line")
            .attr("id",d=> "line"+d.source.id+d.target.id)
            .attr("stroke", (d,i)=>{
                if(d.target.id == measurefield){
                    return Chighlightpath
                }
                return "#D8D9F0"})
            .attr("stroke-opacity", 0.6)
            .attr('marker-end',(d,i)=>{
                if(d.target.id == measurefield){
                    return'url(#arrow)'
                }
            })

        const node = svg.append("g")
            .attr('id', 'nodeg')
            .selectAll()
            .data(nodes)
            .join("circle")
            .attr("r", (d,i)=>{
                console.log(d)
                if(d.id==measurefield)return 6//16
                return 6
            })
            .attr("id",d=> "circle"+d.id)
            .attr("stroke", d =>{if(d.id == measurefield) 
                return highlightStrokeColor(d.group)
                return "#fff"})
            .attr("stroke-width", d=>{
                if(d.id == measurefield)
                return 1.5//12
                return 1.5})
            .attr("fill", d => {
                if(d.id == measurefield)return highlightColor(d.group)
                return myColor(d.group)
            });


        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => {
                    if(d.id==measurefield) focuscx = d.x; return d.x
                    return d.x})
                .attr("cy", d => {
                    if(d.id==measurefield) focuscy = d.y; return d.y
                    return d.y});
        }
        
        const NT = calNeighborTarget(measurefield,links,nodes)
        NT.filter((obj) => { 
            d3.selectAll("#circle"+obj[0].id).
            style("stroke-opacity", 1).
            style("stroke", highlightStrokeColor(obj[0].group))
            .attr("fill",highlightColor(obj[0].group))
        })

        
    
        return svg.node();
    }
    
}

//neighborin
const calNeighborTarget = (focus,links,nodes) =>{
    let neighborSource = [];
    for (var i=0; i < links.length; i++ ){
        if (links[i].target.id === focus){
            var node = nodes.filter((obj)=>{
                return obj.id == links[i].source.id
            })
            neighborSource.push(node)
        }
    }
    return neighborSource
}

const halo = (focuscx,focuscy) =>{
    d3.selectAll("#nodeg")
    .append("circle")
    .style('cx',focuscx)
    .style('cy',focuscy)
    .attr('r',13)
    .attr("stroke", 'rgba(227, 245, 255, 0.59)')
    .attr("stroke-width", 12)
    .attr('fill','none')
}


//neighborout
const calNeighborSource = (nodes,links) =>{
    let neighborSource = [];
    for (var i=0; i < nodes.length; i++ ){
      var id = nodes[i].id;
      neighborSource[id] = links.filter(function(d){
        return d.target == id;
      }).map(function(d){
        return d.source;
      })
    }
}

export default Neighborin

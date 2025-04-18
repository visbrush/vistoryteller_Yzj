import * as d3 from "d3";
import Chart from '../../../vis/chart.js'
const CONTOLOGY = '#FFE899'
const CACTION = '#9FB1FF'
const Chighlightaction = "#3E7AFF"
const Chighlightontology = "#FBD347"
const Chighlightpath = "#5F7AF5"
const Cstrokeontology = "#FEF6DA"
const Cstrokeaction = "#D8E4FF"



class AccessibilityOut extends Chart {
    constructor() {
        super();
        this._x = "";
        this._y = "";
    }
    display() {
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
            .attr("refX", 22)
            .attr("refY", 0)
            .attr("orient", "auto-start-reverse")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", Chighlightpath);

        // scale.
        const myColor = d3.scaleOrdinal().domain([1, 2])
            .range([CACTION, CONTOLOGY])
        const highlightColor = d3.scaleOrdinal().domain([1, 2])
            .range([Chighlightaction, Chighlightontology])
        const highlightStrokeColor = d3.scaleOrdinal().domain([1, 2])
            .range([Cstrokeaction, Cstrokeontology])

        // 力导向图
        d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => { return d.id }))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked)
            .on("end", () => {
                // 这里执行你的操作
                console.log("力导向图加载结束");
                // 调用你的自定义函数xx
                halo(focuscx, focuscy)
            });

        // link
        const link = svg.append("g")
            .selectAll()
            .data(links)
            .join("line")
            .attr("id", d => "line" + d.source.id + d.target.id)
            .attr("stroke", (d, i) => {
                if (d.source.id === measurefield) {
                    return Chighlightpath
                }
                return "#D8D9F0"
            })
            .attr("stroke-opacity", 0.6)
            .attr('marker-end', (d, i) => {
                if (d.source.id === measurefield) {
                    return 'url(#arrow)'
                }
            })
            

        //node
        const node = svg.append("g")
            .attr('id', 'nodeg')
            .selectAll()
            .data(nodes)
            .join("circle")
            .attr("r", (d, i) => {
                if (d.id === measurefield) return 10
                return 6
            })
            .attr("id", d => "circle" + d.id)
            .attr("stroke", d => {
                if (d.id === measurefield)
                    return highlightStrokeColor(d.group)
                return "#fff"
            })
            .attr("stroke-width", d => {
                if (d.id === measurefield)
                    return 1.5
                return 1.5
            })
            .attr("fill", d => {
                if (d.id === measurefield) return highlightColor(d.group)
                return myColor(d.group)
            });

        // 在节点上添加节点名称文本
        node.append("title")
            .text(d => d.id);

        // 鼠标悬浮时显示节点名称
        node.on("mouseover", function (d) {
            d3.select(containerSelector)
                .append("div")
                .attr("class", "tooltip")
                .html(d.id);
        })
            .on("mouseout", function () {
                // 鼠标移出时移除节点名称显示
                d3.select(containerSelector)
                    .select(".tooltip")
                    .remove();
            });


        //新连接线和节点的位置
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => {
                    if (d.id === measurefield) focuscx = d.x; return d.x
                })
                .attr("cy", d => {
                    if (d.id === measurefield) focuscy = d.y; return d.y
                });
        }

        const reachableNodes = findReachableNodes(measurefield, links, nodes)
        console.log(reachableNodes, "reachableNodes")

        reachableNodes.filter((obj) => {
            d3.selectAll("#circle" + obj[0].id)
                .style("stroke-opacity", 1)
                .style("stroke", highlightStrokeColor(obj[0].group))
                .attr("fill", highlightColor(obj[0].group))
        })
        const reachableNodeIds = reachableNodes.map(node => node[0].id);

        // 遍历连接来绘制箭头
        link.each(function (d) {
            const sourceId = d.source.id;
            const targetId = d.target.id;
            // 如果源节点和目标节点都在 reachableNodeIds 中，表示这条连接在可达路径上
            if (reachableNodeIds.includes(sourceId) && reachableNodeIds.includes(targetId)) {
                // 在连接上添加箭头
                d3.select(this)
                    .attr("stroke", Chighlightpath)
                    .attr("marker-end", "url(#arrow)");
            }
        });

        return svg.node();
    }
}

function findReachableNodes(startNodeId, links, nodes) {
    const visited = new Set();
    const stack = [startNodeId];
    const reachableNodes = [];

    while (stack.length > 0) {
        const currentNodeId = stack.pop();
        if (!visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            reachableNodes.push(nodes.filter(node => node.id === currentNodeId));
            const neighbors = links
                .filter(link => link.source.id === currentNodeId)
                .map(link => {
                    return link.target;
                });
            // 将邻居节点加入堆栈
            const neighborIds = neighbors.map(neighbor => neighbor.id);
            stack.push(...neighborIds);
        }
    }
    return reachableNodes
}

//光圈
const halo = (focuscx, focuscy) => {
    d3.selectAll(".halo").remove();
    d3.selectAll("#nodeg")
        .append("circle")
        .style('cx', focuscx)
        .style('cy', focuscy)
        .attr('r', 13)
        .attr("stroke", 'rgba(227, 245, 255, 0.59)')
        .attr("stroke-width", 12)
        .attr('fill', 'none')
        .attr('class', 'halo'); 
}


export default AccessibilityOut;
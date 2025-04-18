import * as d3 from "d3";
import Chart from '../../../vis/chart.js'
const CONTOLOGY = '#FFE899'
const CACTION = '#9FB1FF'
const Chighlightaction = "#3E7AFF"
const Chighlightontology = "#FBD347"
const Chighlightpath = "#5F7AF5"
const Cstrokeontology = "#FEF6DA"
const Cstrokeaction = "#D8E4FF"
const Big = require('big.js');

class Connectivity extends Chart {
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
                drawPath(forwardConnections);
                drawPath(backwardConnections);
                drawSideCurve(forwardConnections);
                drawSideCurve(backwardConnections)
            });

        // link
        const link = svg.append("g")
            .selectAll()
            .data(links)
            .join("line")
            .attr("id", d => "line" + d.source.id + d.target.id)
            .attr("stroke", "#D8D9F0")
            .attr("stroke-opacity", 0.6)


        //node
        const node = svg.append("g")
            .attr('id', 'nodeg')
            .selectAll()
            .data(nodes)
            .join("circle")
            .attr("r", (d, i) => {
                if (d.id === measurefield[0] || d.id === measurefield[1]) return 10
                return 6
            })
            .attr("id", d => "circle" + d.id)
            .attr("stroke", d => {
                if (d.id === measurefield[0] || d.id === measurefield[1])
                    return highlightStrokeColor(d.group)
                return "#fff"
            })
            .attr("stroke-width", d => {
                if (d.id === measurefield[0] || d.id === measurefield[1])
                    return 1.5
                return 1.5
            })
            .attr("fill", d => {
                if (d.id === measurefield[0] || d.id === measurefield[1]) return highlightColor(d.group)
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
        //获取从node1指向node2的路径
        const forwardConnections = findAllConnections(measurefield[0], measurefield[1], links, nodes)
        //获取从node2指向node1的路径
        const backwardConnections = findAllConnections(measurefield[1], measurefield[0], links, nodes)
        console.log("path:", forwardConnections, backwardConnections)

        //获取路径上的所有节点高亮
        const oneDimensionalArray = [];
        for (const innerArray of forwardConnections) {
            for (const obj of innerArray) {
                oneDimensionalArray.push(obj);
            }
        }
        for (const innerArray of backwardConnections) {
            for (const obj of innerArray) {
                oneDimensionalArray.push(obj);
            }
        }
        const uniqueArray = [...new Set(oneDimensionalArray)];//去重
        const passedArray = uniqueArray.filter(node => node.id !== measurefield[0] && node.id !== measurefield[1]);//去掉头尾节点
        const sideArray = uniqueArray.filter(node => node.id === measurefield[0] || node.id !== measurefield[1]);//头尾节点

        //路径上的节点，高亮并放大
        passedArray.filter((obj) => {
            d3.selectAll("#circle" + obj.id)
                .style("stroke-opacity", 2)
                .style("stroke", highlightStrokeColor(obj.group))
                .attr("r", 10)
                .attr("fill", highlightColor(obj.group))
        })

        //两边的头节点，高亮并放大
        sideArray.filter((obj) => {
            d3.selectAll("#circle" + obj.id)
                .style("stroke-opacity", 2)
                .style("stroke", "fff")
                .attr("r", 10)
                .attr("fill", highlightColor(obj.group))

        })

        // 高亮路径
        link.each(function (d) {
            // 如果源节点和目标节点都在 reachableNodeIds 中，表示这条连接在可达路径上
            if (uniqueArray.includes(d.source) && uniqueArray.includes(d.target)) {
                d3.select(this)
                    .attr("stroke", Chighlightpath)
            }
        });

        // 在路径外画上外边框
        function drawPath(paths) {
            for (const path of paths) {
                // 遍历路径中的节点
                let lineGroup = svg.append("g").attr("id", "pathFrame"); // 创建一个组元素用于存放线条
                if (path.length === 2) {
                    const p = getParallel(path[0], path[1])
                    const { x1a, y1a, x2a, y2a, x1b, y1b, x2b, y2b } = p
                    lineGroup.append("line")
                        .attr("x1", x1a)
                        .attr("y1", y1a)
                        .attr("x2", x2a)
                        .attr("y2", y2a)
                        .attr("stroke", "#5F7AF5")
                        .attr("stroke-width", 2);

                    lineGroup.append("line")
                        .attr("x1", x1b)
                        .attr("y1", y1b)
                        .attr("x2", x2b)
                        .attr("y2", y2b)
                        .attr("stroke", "#5F7AF5")
                        .attr("stroke-width", 2);

                } else if (path.length > 2) {
                    const startNode = getParallel2(path[0], path[1])
                    var { x1a: startAx, y1a: startAy, x1b: startBx, y1b: startBy } = startNode
                    for (let i = 0; i < path.length - 1; i++) {
                        const tmpNode = path[i + 1];
                        const preNode = path[i];
                        let endAx, endAy, endBx, endBy;
                        if (i + 2 < path.length) {
                            const nextNode = path[i + 2];
                            const endCoordinates = getEndCoordinates(preNode, tmpNode, nextNode);
                            ({ endAx, endAy, endBx, endBy } = endCoordinates);
                        } else {
                            const endNode = getParallel2(tmpNode, preNode);
                            ({ x1b: endAx, y1b: endAy, x1a: endBx, y1a: endBy } = endNode);
                        }

                        lineGroup.append("line")
                            .attr("x1", startAx)
                            .attr("y1", startAy)
                            .attr("x2", endAx)
                            .attr("y2", endAy)
                            .attr("stroke", "#5F7AF5")
                            .attr("stroke-width", 2);

                        lineGroup.append("line")
                            .attr("x1", startBx)
                            .attr("y1", startBy)
                            .attr("x2", endBx)
                            .attr("y2", endBy)
                            .attr("stroke", "#5F7AF5")
                            .attr("stroke-width", 2);


                        startAx = endAx
                        startAy = endAy
                        startBx = endBx
                        startBy = endBy
                    }
                }
            }
        }

        //在路径的两头绘制弧线
        function drawSideCurve(paths) {
            for (const path of paths) {
                const pathLength = path.length
                if (pathLength >= 2) {
                    const startNode = getParallel2(path[0], path[1])
                    var { x1a: startAx, y1a: startAy, x1b: startBx, y1b: startBy } = startNode
                    const pathData1 = `M${startAx},${startAy} A 15 15 0 1 0 ${startBx} ${startBy}`;
                    const lineGroup = d3.select("#pathFrame");
                    lineGroup.append("path")
                        .attr("d", pathData1)
                        .attr("stroke", "#5F7AF5")
                        .attr("stroke-width", 2)
                        .attr("fill", "transparent");

                    const endNode = getParallel2(path[pathLength - 1], path[pathLength - 2])
                    var { x1a: endAx, y1a: endAy, x1b: endBx, y1b: endBy } = endNode
                    const pathData2 = `M${endAx},${endAy} A 15 15 0 1 0 ${endBx} ${endBy}`;
                    lineGroup.append("path")
                        .attr("d", pathData2)
                        .attr("stroke", "#5F7AF5")
                        .attr("stroke-width", 2)
                        .attr("fill", "transparent");
                }
            }

        }


        return svg.node();
    }
}

//查找所有的链接路径
function findAllConnections(node1, node2, links, nodes) {
    const paths = [];
    function findPaths(currentNode, currentPath) {
        if (currentNode === node2) {
            // 找到一条路径，将其添加到结果中
            paths.push(currentPath.slice());
            return;
        }
        // 遍历当前节点的出边
        for (const link of links) {
            if (link.source.id === currentNode) {
                const nextNode = link.target;
                // 防止循环
                if (!currentPath.includes(nextNode)) {
                    currentPath.push(nextNode);
                    findPaths(nextNode.id, currentPath);
                    currentPath.pop();
                }
            }
        }
    }
    findPaths(node1, nodes.filter(node => node.id === node1)); // 开始深度优先搜索
    return paths;
}

function getEndCoordinates(preNode, tmpNode, nextNode) {
    console.log(preNode, tmpNode, nextNode, "打印坐标")
    const parallelCoordinates1 = getParallel(tmpNode, nextNode);
    const { x1a, y1a, x2a, y2a, x1b, y1b, x2b, y2b } = parallelCoordinates1;
    const parallelCoordinates2 = getParallel(preNode, tmpNode);
    const { x1a: x0a, y1a: y0a, x2a: x1A, y2a: y1A, x1b: x0b, y1b: y0b, x2b: x1B, y2b: y1B } = parallelCoordinates2;
    const intersectionP1 = getIntersection(x0a, y0a, x1A, y1A, x1a, y1a, x2a, y2a)
    const intersectionP2 = getIntersection(x0b, y0b, x1B, y1B, x1b, y1b, x2b, y2b)
    const endAx = intersectionP1[0]
    const endAy = intersectionP1[1]
    const endBx = intersectionP2[0]
    const endBy = intersectionP2[1]
    console.log("现在的点", tmpNode.id, endAx, endAy, endBx, endBy)
    console.log(x1a, y1a, x2a, y2a, x1b, y1b, x2b, y2b)


    return { endAx, endAy, endBx, endBy }
}

//返回求两侧平行线的坐标
function getParallel(tmpNode, nextNode) {
    const offset = 15;
    const x1 = tmpNode.x;
    const y1 = tmpNode.y;
    const x2 = nextNode.x;
    const y2 = nextNode.y;
    // 计算两点之间的直线角度
    const angle = Math.atan2(y2 - y1, x2 - x1);
    // 计算平行线的四个端点坐标
    const x1a = x1 + offset * Math.sin(angle);
    const y1a = y1 - offset * Math.cos(angle);

    const x2a = x2 + offset * Math.sin(angle);
    const y2a = y2 - offset * Math.cos(angle);

    const x1b = x1 - offset * Math.sin(angle);
    const y1b = y1 + offset * Math.cos(angle);

    const x2b = x2 - offset * Math.sin(angle);
    const y2b = y2 + offset * Math.cos(angle);

    return { x1a, y1a, x2a, y2a, x1b, y1b, x2b, y2b }
}
//返回求两侧平行线的坐标
function getParallel2(tmpNode, nextNode) {
    const offset = 15;
    const x1 = tmpNode.x;
    const y1 = tmpNode.y;
    const x2 = nextNode.x;
    const y2 = nextNode.y;
    // 计算两点之间的直线角度
    const angle = Math.atan2(y2 - y1, x2 - x1);
    // 计算平行线的四个端点坐标
    const x1a = x1 + offset * Math.sin(angle);
    const y1a = y1 - offset * Math.cos(angle);
    const x1b = x1 - offset * Math.sin(angle);
    const y1b = y1 + offset * Math.cos(angle);

    return { x1a, y1a, x1b, y1b }
}

//获取两条直线交点坐标
function getIntersection(x0, y0, x1, y1, x1_, y1_, x2, y2) {
    // 计算线段 1 的斜率和截距
    const m1 = Big(y1).minus(y0).div(x1 - x0);
    const b1 = Big(y0).minus(m1.times(x0));

    // 计算线段 2 的斜率和截距
    const m2 = Big(y2).minus(y1_).div(x2 - x1_);
    const b2 = Big(y1_).minus(m2.times(x1_));

    // 如果两条线段平行（斜率相等），则没有交点
    if (m1.eq(m2)) {
        return [];
    } else {
        // 计算交点的 x 坐标
        const intersectionX = Big(b2).minus(b1).div(m1.minus(m2));
        // 使用其中一个方程来计算交点的 y 坐标
        const intersectionY = m1.times(intersectionX).plus(b1);
        return [intersectionX.toFixed(), intersectionY.toFixed()];
    }
}
export default Connectivity;
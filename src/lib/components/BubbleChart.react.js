import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class BubbleChart extends Component {
    constructor(props) {
        super(props);
        this.renderChart = this.renderChart.bind(this);
        this._renderChartCalled = false;
        this.renderBubbles = this.renderBubbles.bind(this);
        // this.renderLegend = this.renderLegend.bind(this);
    }

    componentDidMount() {
        this.svg = ReactDOM.findDOMNode(this);
        
        this.renderChart();
    }

    componentDidUpdate() {
        const {
            width,
            height,
        } = this.props;
        if (width !== 0 && height != 0) {
            this.renderChart();
        }
    }



    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <svg width={width} height={height} />
        )
    }

    renderChart() {
        const {
            overflow,
            data,
            height,
            width,
            padding,
            // setProps
        } = this.props;
        // console.log(this.props)

        // Reset the svg element to a empty state.
        this.svg.innerHTML = '';
        // Allow bubbles overflowing its SVG container in visual aspect if props(overflow) is true.

        this.svg.style.overflow = "hidden";

        const bubblesWidth = width;
        const bubblesHeight = height;
        const color = d3.scaleOrdinal(d3.schemeCategory20c);

        const pack = d3.pack()
            .size([bubblesWidth, bubblesHeight])
            .padding(padding);

        // Process the data to have a hierarchy structure;
        const root = d3.hierarchy({ children: data })
            .sum(function (d) { return d.value; })
            .sort(function (a, b) { return b.value - a.value; })
            .each((d) => {
                if (d.data.label) {
                    d.label = d.data.label;
                    d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
                }
            });

        // Pass the data to the pack layout to calculate the distribution.
        const nodes = pack(root).leaves();


        // Call to the function that draw the bubbles.
        this.renderBubbles(bubblesWidth, bubblesHeight, nodes, color);

    }

    renderBubbles(width, height, nodes, color) {
        const {
            data,
            valueFont,
            labelFont,
            setProps,
        } = this.props;


        const tooltip = d3.select(this.svg).append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        var mouseover = function (d) {
            d3.select(this).style("stroke-width", 5);
            tooltip
                .style("opacity", 1)
        }
        var mousemove = function (d) {
            tooltip
                .html('<u>' + d.key + '</u>' + "<br>" + d.value + " inhabitants")
                .style("left", (d3.mouse(this)[0] + 20) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
        }
        var mouseleave = function (d) {
            d3.select(this).style('stroke-width', 0);
            tooltip
                .style("opacity", 0)
        }

        const bubbleChart = d3.select(this.svg).append("g")
            .attr("class", "bubble-chart")

        // const tooltip = d3.select(this.)
        const node = bubbleChart.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .on("click", function (d) {
                if (typeof setProps === 'function') {
                    setProps({ selectedNode: d.label })
                }
                
            })
            

        node.append("circle")
            .attr("id", function (d) { return d.id; })
            .attr("r", function (d) { return d.r - (d.r * .04); })
            .style("fill", function (d) { return d.data.color ? d.data.color : color(nodes.indexOf(d)); })
            .attr('stroke', "black")
            .style('stroke-width', 0)
            .style("z-index", 1)
            .on('mouseover', mouseover)
            .on('mouseout', mouseleave)
            .on("mousemove", mousemove)
            

        node.append("clipPath")
            .attr("id", function (d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function (d) { return "#" + d.id; });

        node.append("text")
            .attr("class", "value-text")
            .style("font-size", `${valueFont.size}px`)
            .attr("clip-path", function (d) { return "url(#clip-" + d.id + ")"; })
            .style("font-weight", (d) => {
                return valueFont.weight ? valueFont.weight : 600;
            })
            .style("font-family", valueFont.family)
            .style("fill", () => {
                return valueFont.color ? valueFont.color : '#000';
            })
            .style("stroke", () => {
                return valueFont.lineColor ? valueFont.lineColor : '#000';
            })
            .style("stroke-width", () => {
                return valueFont.lineWeight ? valueFont.lineWeight : 0;
            })
            .text(function (d) { return d.value; });

        node.append("text")
            .attr("class", "label-text")
            .style("font-size", `${labelFont.size}px`)
            .attr("clip-path", function (d) { return "url(#clip-" + d.id + ")"; })
            .style("font-weight", (d) => {
                return labelFont.weight ? labelFont.weight : 600;
            })
            .style("font-family", labelFont.family)
            .style("fill", () => {
                return labelFont.color ? labelFont.color : '#000';
            })
            .style("stroke", () => {
                return labelFont.lineColor ? labelFont.lineColor : '#000';
            })
            .style("stroke-width", () => {
                return labelFont.lineWeight ? labelFont.lineWeight : 0;
            })
            .text(function (d) {
                return d.label;
            });


        // Center the texts inside the circles.
        d3.selectAll(".label-text").attr("x", function (d) {
            const self = d3.select(this);
            const width = self.node().getBBox().width;
            return -(width / 2);
        })
            .style("opacity", function (d) {
                const self = d3.select(this);
                const width = self.node().getBBox().width;
                d.hideLabel = width * 1.05 > (d.r * 2);
                return d.hideLabel ? 0 : 1;
            })
            .attr("y", function (d) {
                return labelFont.size / 2
            })
            .attr('pointer-events','none')

        // Center the texts inside the circles.
        d3.selectAll(".value-text").attr("x", function (d) {
            const self = d3.select(this);
            const width = self.node().getBBox().width;
            return -(width / 2);
        })
            .attr("y", function (d) {
                if (d.hideLabel) {
                    return valueFont.size / 3;
                } else {
                    return -valueFont.size * 0.5;
                }
            })
        .attr('pointer-events','none')

        node.append("title")
            .text(function (d) { return d.label; });


    }


}

BubbleChart.defaultProps = {
    width: 1000,
    height: 800,
    padding: 0,
    valueFont: {
        family: 'Arial',
        size: 16,
        color: '#fff',
        weight: 'bold',
    },
    labelFont: {
        family: 'Arial',
        size: 11,
        color: '#fff',
        weight: 'normal',
    },

};

BubbleChart.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    data: PropTypes.arrayOf(
        PropTypes.shape(
            {
                text: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired
            }
        )
    ),
    id: PropTypes.string,
    setProps: PropTypes.func,
    data: PropTypes.arrayOf(
        PropTypes.shape(
            {
                label: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired
            }
        )
    ),
    overflow: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
    showLegend: PropTypes.bool,
    valueFont: PropTypes.shape({
        family: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        weight: PropTypes.string,
    }),
    labelFont: PropTypes.shape({
        family: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        weight: PropTypes.string,
    }),
    selectedNode: PropTypes.string,
};

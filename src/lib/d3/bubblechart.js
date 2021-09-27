import * as d3 from 'd3';
import { sortedLastIndexOf } from 'lodash';

const dflts = {
    width: 600,
    height: 500,
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
    }
};

export default class BubbleChartD3 {
    constructor(el, figure, onChange) {
        const self = this;
        self.update = self.update.bind(self);
        self._update = self._update.bind(self);

        self.svg = d3.select(el).append('svg');
        // self.bubblechart = d3.select(self.svg).append('')
        // self.root = d3.hierarchy();
        // console.log("self.root = d3.hierarchy();")
        self.color = d3.scaleOrdinal(d3.schemeCategory20c);
        // self.pack = d3.pack();

        self.figure = {}
        self.onChange = onChange;
        self.initialized = false;
        self._promise = Promise.resolve();
        self.update(figure);
    }

    update(figure) {
        const self = this;
        self._promise = self._promise.then(() => self._update(figure));
    }

    _update(figure) {
        const self = this;
        const oldFigure = self.figure;
        const width = figure.width || dflts.width;
        const height = figure.height || dflts.height;
        const padding = figure.padding || dflts.padding;
        const valueFont = figure.valueFont || dflts.valueFont;
        const labelFont = figure.labelFont || dflts.labelFont;
        const { data } = figure;
        const selectedNode = figure.selectedNode || '';

        console.log("construct new figure")
        const newFigure = self.figure = {
            width,
            height,
            padding,
            valueFont,
            labelFont,
            data,
            selectedNode,
        };


        const setSize = () => {
            console.log("sizechange");
            self.svg
                .style("width", width)
                .style('height', height)
        }


        let retVal = Promise.resolve();

        const change = diff(oldFigure, newFigure);
        if (!change) { console.log("no change"); return retVal; }


        const dataChange = change.data || change.padding;
        const sizeChange = change.width || change.height;

        if (sizeChange) { setSize(); }

        if (dataChange) {
            const pack = d3.pack().size([width, height]).padding(padding)
            const root = d3.hierarchy({ children: data })
                .sum(function (d) { return d.value; })
                .sort(function (a, b) { return b.value - a.value; })
                .each((d) => {
                    if (d.data.label) {
                        d.label = d.data.label;
                        d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
                    }
                });

            const nodes = pack(root).leaves();

            const bubbleChart = self.svg.append('g').attr('class', 'bubble-chart')

            const node = bubbleChart.selectAll('.node')
                .data(nodes)
                .enter().append('g')
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            // .on("click", function (d) {
            //     this.props;
            //     if (typeof this.props.setProps !== 'undefined') {
            //         // this.props.setProps({selectedNode: d.label})
            //     }
            // });

            node.append("circle")
                .attr("id", function (d) { return d.id; })
                .attr("r", function (d) { return d.r - (d.r * .04); })
                .style("fill", function (d) { return d.data.color ? d.data.color : self.color(nodes.indexOf(d)); })
                .attr('stroke', "black")
                .style('stroke-width', 0)
                .style("z-index", 1)
                .on('mouseover', function (d) {
                    d3.select(this).style("stroke-width", 5);
                })
                .on('mouseout', function (d) {
                    d3.select(this).style('stroke-width', 0);
                });

            node.append("clipPath")
                .attr("id", function (d) { return "clip-" + d.id; })
                .append("use")
                .attr("xlink:href", function (d) { return "#" + d.id; });

            console.log(node);


        }


        return retVal;
    }
};

function diff(oldObj, newObj) {
    const V = 'Version';
    const out = {};
    let hasChange = false;
    for (const key in newObj) {
        if (key.substr(key.length - V.length) === V) { continue; }

        if (typeof newObj[key] === 'object') {
            if (newObj[key + V]) {
                if (newObj[key + V] !== oldObj[key + V]) {
                    out[key] = 1;
                    hasChange = true;
                }
            }
            else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
                out[key] = 1;
                hasChange = true;
            }
        }
        else if (oldObj[key] !== newObj[key]) {
            out[key] = 1;
            hasChange = true;
        }
    }
    return hasChange && out;
}
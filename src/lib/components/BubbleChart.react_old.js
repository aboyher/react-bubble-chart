import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import BubbleChartD3 from "../d3/bubblechart";

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class BubbleChart extends Component {
    componentDidMount() {
        this.bubblechart = new BubbleChartD3(this.el, this.props, figure => {
            const {setProps} = this.props;
            const {selectedNode} = figure;

            if (setProps) { setProps({selectedNode});}
            else { this.setState({selectedNode});}
        });
    }

    componentDidUpdate() {
        this.bubblechart.update(this.props);
    }

    render() {
        return <div id={this.props.id} ref={el => {this.el = el}} />;
    }
}

BubbleChart.defaultProps = {
    
    width: 1000,
    height: 800,
    padding: 3,
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
    // data: PropTypes.arrayOf(
    //     PropTypes.shape(
    //         { 
    //             text: PropTypes.string.isRequired, 
    //             value: PropTypes.number.isRequired 
    //         }
    //     )
    // ),
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
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
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
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import BubbleChartD3 from "../d3/bubblechart";

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class BubbleChart extends Component {
    componentDidMount() {
        this.bubblechart = new BubbleChartD3(this.el, this.props, figure => {
            const {setProps} = this.props;
            const {selectedNode} = figure;

            if (setProps) { setProps({selectedNode});}
            else { this.setState({selectedNode});}
        });
    }

    componentDidUpdate() {
        this.bubblechart.update(this.props);
    }

    render() {
        return <div id={this.props.id} ref={el => {this.el = el}} />;
    }
}

BubbleChart.defaultProps = {
    
    width: 1000,
    height: 800,
    padding: 3,
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
    // data: PropTypes.arrayOf(
    //     PropTypes.shape(
    //         { 
    //             text: PropTypes.string.isRequired, 
    //             value: PropTypes.number.isRequired 
    //         }
    //     )
    // ),
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
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
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

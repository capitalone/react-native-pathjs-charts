import LineChart from './Line.js';

var StockLine = require('paths-js/stock');

export default class StockLineChart extends LineChart {
    constructor(props) {
        super(props, StockLine);
    }
}


StockLineChart.defaultProps =   {
    options: {
        width: 600,
        height: 600,
        color: '#2980B9',
        margin: {top: 40, left: 60, bottom: 50, right: 20},
        animate: {
            type: 'delayed',
            duration: 200,
            fillTransition:3
        },
        axisX: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'bottom',
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                bold: true,
                color: '#34495E'
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                bold: true,
                color: '#34495E'
            }
        }
    }
}
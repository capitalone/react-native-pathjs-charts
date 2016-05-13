import React, {View}  from 'react-native'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg'
import _ from 'lodash';
import Options from './options.js';
import fontAdapt from './fontAdapter.js';
import styleSvg from './styleSvg';

var Stock = require('paths-js/stock');
import Axis from './Axis'

export default class Scatterplot extends React.Component {
    constructor(props) {
        super(props);
    }
    getMaxAndMin(chart, key,scale) {
        var maxValue;
        var minValue;
        _.each(chart.curves, function (serie) {
            var values = _.map(serie.item, function (item) {
                return item[key]
            });

            var max = _.max(values);
            if (maxValue === undefined || max > maxValue) maxValue = max;
            var min = _.min(values);
            if (minValue === undefined || min < minValue) minValue = min;
        });
        return {
            minValue: minValue,
            maxValue: maxValue,
            min:scale(minValue),
            max:scale(maxValue)
        }
    }
    onEnter(index,event) {
        this.props.data[0][index].selected = true;
        this.setState({data: this.props.data});
    }
    onLeave(index,event){
        this.props.data[0][index].selected = false;
        this.setState({data:this.props.data});
    }

    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<Text>{noDataMsg}</Text>);

        var options = new Options(this.props);

        var palette = this.props.palette || ["#3E90F0", "#7881C2", "#707B82"];
        var accessor = function (key) {
            return function (x) {
                return x[key];
            }
        };
        var chart = Stock({
            data: this.props.data,
            xaccessor: accessor(this.props.xKey),
            yaccessor: accessor(this.props.yKey),
            width: options.chartWidth,
            height: options.chartHeight,
            closed: false
        });

        var chartArea = {
            x:this.getMaxAndMin(chart,this.props.xKey,chart.xscale),
            y:this.getMaxAndMin(chart,this.props.yKey,chart.yscale),
            margin:options.margin
        };

        var textStyle = fontAdapt(options.label);
        var colors = styleSvg({},options);

        // {item.selected?<text style={textStyle} transform="translate(15, 5)" text-anchor="start">{item.title}</text>:null}

        var points = _.map(chart.curves, function (c, i) {
            return _.map(c.line.path.points(),function(p,j) {
                var item = c.item[j];

                let render = <G key={'k' + j} x={p[0]} y={p[1]}>
                    <Circle {...colors} cx={0} cy={0} r={options.r || 5} fillOpacity={1} />
                </G>;

                return render
            },this)
        },this);

        return (<Svg width={options.width} height={options.height}>
            <G x={options.margin.left} y={options.margin.top}>
                { points }
                <Axis scale={chart.xscale} options={options.axisX} chartArea={chartArea} />
                <Axis scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
            </G>
        </Svg>);
    }
}


Scatterplot.defaultProps= {
    xKey:'',
    yKey:'',
    options: {
        width: 600,
        height: 600,
        margin: {top: 40, left: 60, bottom: 30, right: 30},
        fill: "#2980B9",
        stroke: "#3E90F0",
        animate: {
            type: 'delayed',
            duration: 200,
            fillTransition:3
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            bold: true,
            color: '#34495E'
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

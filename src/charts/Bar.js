import React from 'react'
import {View}  from 'react-native'
import Svg,{ G, Line, Path, Text } from 'react-native-svg'
import Colors from '../pallete/colors';
import Options from '../component/options'
import fontAdapt from '../fontAdapter'
import Axis from '../component/Axis'
import _ from 'lodash'

var Bar = require('paths-js/bar');

function cyclic(coll, i) {
    return coll[i % coll.length];
}
function identity(key) {
    return function (x) {
        return x[key];
    }
};
function color(key) {
    return function (x) {
        return x[key];
    }
};

export default class BarChart extends React.Component
{
    constructor(props){
        super(props);
        this.state = {finished: true};
    }
    color(i) {
        var color = this.props.options.color;
        if (!_.isString(this.props.options.color)) color = color.color;
        var pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i));
    }
    getMaxAndMin(values, scale) {
        var maxValue = 0;
        var minValue = 0;

        var max = _.max(values);
        if (max > maxValue) maxValue = max;
        var min = _.min(values);
        if (min < minValue) minValue = min;

        return {
            minValue: minValue,
            maxValue: maxValue,
            min: scale(minValue),
            max: scale(maxValue)
        }
    }
    //componentWillReceiveProps(nextProps) {
    //    if (this.props.data !== nextProps.data) this.setState({ finished:false});
    //}
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<Text>{noDataMsg}</Text>);

        var options = new Options(this.props);
        var accessor = this.props.accessor || identity(this.props.accessorKey);

        var chart = Bar({
            data: this.props.data,
            gutter: this.props.options.gutter || 10,
            width: options.chartWidth,
            height: options.chartHeight,
            accessor: accessor
        });

        var values = _.map(chart.curves, function (curve) {
            return accessor(curve.item);
        });

        var chartArea = {x: {minValue: 0, maxValue: 200, min: 0, max: options.chartWidth}, y: this.getMaxAndMin(values, chart.scale),
          margin:options.margin};

        // var sec = options.animate.fillTransition || 0;
        // var fillOpacityStyle = {fillOpacity:this.state.finished?1:0,transition: this.state.finished?'fill-opacity ' + sec + 's':''};

        var textStyle = fontAdapt(options.axisX.label);

        var lines = chart.curves.map(function (c, i) {
            var color = this.color(i % 3);
            var stroke = Colors.darkenColor(color);
            return (
                <G key={"lines" + i}>
                    <Path  d={ c.line.path.print() } stroke={stroke} fill={color}/>
                    {options.axisX.showLabels ?
                        <G x={options.margin.left} y={options.margin.top}>
                        <Text fontFamily={textStyle.fontFamily}
                        fontSize={textStyle.fontSize} fontWeight={textStyle.fontWeight} fontStyle={textStyle.fontStyle}
                        fill={textStyle.fill} x={c.line.centroid[0]} y={chartArea.y.min + 25} rotate={45} textAnchor="middle">{c.item.name}</Text></G>
                        :null}
                </G>
            )
        }, this);

        let returnValue = <Svg width={options.width} height={options.height}>
                            <G x={options.margin.left} y={options.margin.top}>
                              <Axis scale={chart.scale} options={options.axisY} chartArea={chartArea} />
                              <G x={options.margin.left * -1 } y={options.margin.top * -1}>
                              {lines}
                              </G>
                            </G>
                          </Svg>;

        return returnValue
    }
};

BarChart.defaultProps ={
    accessorKey:'',
    options: {
        width: 600,
        height: 600,
        margin: {top: 20, left: 20, bottom: 50, right: 20},
        color: '#2980B9',
        gutter: 20,
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
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

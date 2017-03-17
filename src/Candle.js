/**
 * @file 蜡烛图
 * @author liuliang<liuliang@kavout.com>
 */

import React, {Component} from 'react';
import {Text as ReactText, View} from 'react-native';
import Svg, {
    G,
    Path,
    Text,
    Circle,
    Line,
    Rect,
    Use
} from 'react-native-svg';
import {
    util,
    option
} from './utils';
import { CandleItem } from './components';
import _ from 'lodash';
import Axis from './Axis';
import bar from './Bar';
import {minOrMax} from './Ops';

export default class CandleChart extends Component {

    static defaultProps = {
        accessorKey: '',
        options: {
            width: 600,
            height: 600,
            barWidth: 5,
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
                min: false,
                max: false,
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
    getFillAndStrokeInfo(i) {
        return {
            fill: i & 1 ? '#009900' : '#E93030',
            stroke: i & 1 ? '#009900' : '#E93030',
            strokeWidth: 0.5
        };
    }
    getRange(values, scale, {min = -Infinity, max = Infinity} = {}) {
        let {axisY: {max: maxValue = 0, minValue = 0}} = this.props.options;
        let isEqualInfinity = (a, b) => a === Infinity && b === -Infinity;

        if (isEqualInfinity(max, min)) {
            for (let value of values) {
                if (value > maxValue) {
                    maxValue = value;
                }
                else if (value < minValue) {
                    minValue = value;
                }
            }
        }
        else {
            minValue = min;
            maxValue = max;
        }
        return {
            minValue: minValue,
            maxValue: maxValue,
            min: scale(minValue),
            max: scale(maxValue)
        };
    }
    render() {
        const noDataMsg = this.props.noDataMessage || 'No data available';
        if (this.props.data === undefined) {
            return (
                <ReactText>
                    {noDataMsg}
                </ReactText>
            );
        }

        let options = option(this.props);
        let accessor = this.props.accessor || util.identity(this.props.accessorKey);

        let chartConfig = {
            gutter: this.props.options.gutter || 10,
            width: options.chartWidth,
            height: options.chartHeight,
            accessor: accessor,
            barWidth: this.props.options.barWidth
        };

        let chartAreaConfig = {
            x: {
                minValue: 0,
                maxValue: 200,
                min: 0,
                max: options.chartWidth
            },
            margin: options.margin
        };

        let stockChartYAxis = {
            min: 20,
            max: 40
        };

        let stockChart = bar(Object.assign({
            data: this.props.data.stock,
            min: this.props.options.axisY.min || undefined,
            max: this.props.options.axisY.max || undefined
        }, stockChartYAxis, chartConfig));

        let volumeChart = bar(Object.assign({
            data: this.props.data.volume,
            min: this.props.options.axisY.min || undefined,
            max: this.props.options.axisY.max || undefined
        }, chartConfig));

        let stockValues = stockChart.curves.map((curve) => accessor(minOrMax(curve.item, (v1, v2) => v2.v - v1.v)));
        let volumeValues = volumeChart.curves.map((curve) => accessor(minOrMax(curve.item, (v1, v2) => v2.v - v1.v)));

        let stockChartArea = Object.assign({
            y: this.getRange(stockValues, stockChart.scale, stockChartYAxis)
        }, chartAreaConfig);
        let volumeChartArea = Object.assign({
            y: this.getRange(volumeValues, volumeChart.scale)
        }, chartAreaConfig);

        let stockLines = (
                stockChart.curves.map(function (curve, i) {
                    let {
                        fill,
                        stroke,
                        strokeWidth
                    } = this.getFillAndStrokeInfo(i);
                    return (
                        <G key={'lines' + i}>
                            {curve.lines.map((v, k) =>
                                <Path
                                    key={`${i}-${k}`}
                                    d={v.path.print()}
                                    stroke={stroke}
                                    fill={fill}
                                    strokeWidth={strokeWidth}
                                />)
                            }
                        </G>
                    );
                }, this)
            );

        let volumeLines = (
                volumeChart.curves.map(function (curve, i) {
                    let {
                        fill,
                        stroke,
                        strokeWidth
                    } = this.getFillAndStrokeInfo(i);
                    return (
                        <G key={'lines' + i}>
                            {curve.lines.map((v, k) =>
                                <Path
                                    key={`${i}-${k}`}
                                    d={v.path.print()}
                                    stroke={stroke}
                                    fill={fill}
                                    strokeWidth={strokeWidth}
                                />)
                            }
                        </G>
                    );
                }, this)
            );

        return (<View>
                    <CandleItem
                        options={options}
                        chart={stockChart}
                        chartArea={stockChartArea}
                        lines={stockLines}
                        axisYOptions={Object.assign({
                            isSetAxisYLabelFillFunction(i, length) {
                                return i >= length / 2 ? '#009900' : '#FF3030';
                            },
                            stockChartYAxis,
                            tickValues: [
                                {value: 20},
                                {value: 25},
                                {value: 30},
                                {value: 35},
                                {value: 40}
                            ]
                        }, options.axisY)}
                        axisXOptions={Object.assign({
                            min: 0,
                            max: 60,
                            tickValues: [
                                {value: 1},
                                {value: 10},
                                {value: 19},
                                {value: 28},
                                {value: 37},
                                {value: 46},
                                {value: 55}
                            ],
                            showLabels: false
                        }, options.axisX)}
                    />
                    <CandleItem
                        options={options}
                        chart={volumeChart}
                        chartArea={volumeChartArea}
                        lines={volumeLines}
                        axisYOptions={Object.assign({
                            labelFunction(label) {
                                return String(label).slice(0, 2);
                            }
                        }, options.axisY)}
                        axisXOptions={Object.assign({
                            min: 0,
                            max: 60,
                            tickValues: [
                                {value: 1},
                                {value: 10},
                                {value: 19},
                                {value: 28},
                                {value: 37},
                                {value: 46},
                                {value: 55}
                            ],
                            showLabels: true
                        }, options.axisX)}
                    />
                </View>);
    }
}

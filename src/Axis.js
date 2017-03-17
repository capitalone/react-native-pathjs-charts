/**
 * @file 蜡烛图坐标轴
 * @author liuliang<liuliang@kavout.com>
 */

import React, {Component} from 'react';
import {
    Circle,
    G,
    Path,
    Text
} from 'react-native-svg';

import {util} from './utils';
import _ from 'lodash';
import pathjs from './Path';

class AxisStruct {

    constructor(scale, options, chartArea, horizontal, curves) {
        this.scale = scale;
        this.options = options;
        this.chartArea = chartArea;
        this.margin = chartArea.margin;
        this.horizontal = horizontal;
        this.curves = curves;
    }

    static calcStepSize(range, targetSteps) {
        const tempStep = range / targetSteps;
        const mag = Math.floor(Math.log(tempStep) / Math.log(10));
        const magPow = Math.pow(10, mag);
        let magMsd = Math.round(tempStep / magPow + 0.5);

        if (magMsd > 5.0) {
            magMsd = 10.0;
        }
        else if (magMsd > 2.0) {
            magMsd = 5.0;
        }
        else if (magMsd > 1.0) {
            magMsd = 2.0;
        }

        return magMsd * magPow;
    }

    static getTickValues(axis, tickCount) {
        const tickStep = AxisStruct.calcStepSize((axis.maxValue - axis.minValue), tickCount);
        return _.range(axis.minValue, axis.maxValue + 1, tickStep);
    }

    axis() {
        const horizontal = this.horizontal;
        const xAxis = this.chartArea.x;
        const yAxis = this.chartArea.y;
        const currentAxis = horizontal ? xAxis : yAxis;
        const tickInterval = this.options.tickCount || 10;
        const ticks = util.isSetValue(this.options.tickValues)
        && this.options.tickValues.length !== 0 ? _.map(this.options.tickValues, function (v) {
            return v.value;
        }) : AxisStruct.getTickValues(currentAxis, tickInterval);
        const fixed = this.options.zeroAxis ? this.scale(0) : horizontal ? yAxis.min : xAxis.min;
        const start = {x: horizontal ? xAxis.min : fixed, y: horizontal ? fixed : yAxis.min};
        const end = {x: horizontal ? xAxis.max : fixed, y: horizontal ? fixed : yAxis.max};
        const tailLength = Number(this.options.tailLength || 10);
        const margin = this.margin;

        if (util.isSetValue(margin)) {
            if (horizontal) {
                start.x += (margin.left - tailLength) || 0;
                start.y += margin.top || 0;
                end.x += (margin.left) || 0;
                end.y += margin.top || 0;
            }
            else {
                start.x += margin.left || 0;
                start.y += (margin.top + tailLength) || 0;
                end.x += margin.left || 0;
                end.y += (margin.top - tailLength) || 0;
            }
        }
        // if(!horizontal) console.log(ticks);
        return {
            item: currentAxis,
            path: pathjs().moveto(start).lineto(end).closepath(),
            ticks: ticks,
            lines: ticks.map((c, i) => {
                const scaleBase = isNaN(c) ? i : c;
                const lineStart = {
                    x: horizontal ? this.curves[c].centroid + margin.left : xAxis.min + margin.left,
                    y: horizontal ? yAxis.min + margin.top : this.scale(scaleBase) + margin.top
                };
                const lineEnd = {
                    x: horizontal ? lineStart.x : xAxis.max + margin.left,
                    y: horizontal ? yAxis.max + (margin.top - tailLength) : lineStart.y
                };
                return pathjs().moveto(lineStart).lineto(lineEnd);
            }, this)
        };
    }
}

export default class Axis extends Component {

    render() {
        const {
            chartArea,
            options,
            scale,
            curves
        } = this.props;

        const horizontal = {top: true, bottom: true}[options.orient];
        const axis = new AxisStruct(scale, options, chartArea, horizontal, curves).axis();

        let textAnchor = 'start';
        let xy = [0, 0];
        switch (options.orient) {
            case 'top': {
                textAnchor = 'middle';
                xy = [0, -5];
                break;
            }
            case 'bottom': {
                textAnchor = 'middle';
                xy = [0, 5];
                break;
            }
            case 'left': {
                textAnchor = 'end';
                xy = [-5, -10];
                break;
            }
            case 'right': {
                textAnchor = 'start';
                xy = [5, 5];
                break;
            }
        }

        const textStyle = util.fontAdapt(options.label);

        const ticks = _.map(axis.ticks, function (c, i) {
            let label = horizontal ? curves[c].item[0].name
                : util.isSetValue(options.labelFunction) ? options.labelFunction.call(this, c) : c;
            let {length} = axis.ticks;
            let scaleBase = isNaN(c) ? i : c;
            let gxy = horizontal ? [curves[c].centroid, chartArea.y.min] : [chartArea.x.min, scale(scaleBase)];

            const createText = () => (
                <Text
                    x={horizontal ? 0 : xy[0]}
                    y={horizontal ? 0 : xy[1]}
                    fontFamily={textStyle.fontFamily}
                    fontSize={textStyle.fontSize}
                    fontWeight={textStyle.fontWeight}
                    fontStyle={textStyle.fontStyle}
                    fill={options.isSetAxisYLabelFillFunction ? options.isSetAxisYLabelFillFunction(i, length)
                        : textStyle.fill}
                    textAnchor={textAnchor}>
                    {label}
                </Text>
            );
            const createReturnValue = () => (
                <G key={i} x={gxy[0]} y={gxy[1]}>
                    {options.showTicks && <Circle r="2" cx="0" cy="0" stroke="grey" fill="grey" />}
                    {options.showLabels && createText()}
                </G>
            );

            return createReturnValue();
        });

        const gridlines = options.showLines ? _.map(axis.lines, function (c, i) {
            return (
                <Path
                    key={'gridLines' + i}
                    d={c.print()}
                    stroke="#EDEDED"
                    strokeWidth={1}
                    fill="none" />
                );
        }) : [];
        let offset = {
            x: chartArea.margin.left * -1,
            y: chartArea.margin.top * -1
            // x: 0,
            // y: 0
        };

        const createPath = () => (
            <Path
                d={axis.path.print()}
                stroke="#EDEDED"
                strokeWidth={1}
                fill="none" />
        );
        const createV = () => (
            <G>
                <G x={offset.x} y={offset.y}>
                    {options.showAxis && createPath()}
                </G>
                {ticks}
                <G x={offset.x} y={offset.y}>
                    {gridlines}
                </G>
            </G>
        );

        return createV();
    }
}

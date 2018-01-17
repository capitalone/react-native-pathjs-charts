/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

import React, { Component } from 'react';
import { Text as ReactText, View, PanResponder } from 'react-native';
import Svg, { G, Path, Rect, Text, Circle, Line } from 'react-native-svg';
import { Colors, Options, cyclic, fontAdapt } from './util';
import Axis from './Axis';
import GridAxis from './GridAxis';
import _ from 'lodash';

export default class LineChart extends Component {
  constructor(props, chartType) {
    super(props);
    this.chartType = chartType;
    this.state = { userPressing: false};
  }

  _calcDataPoint(evt) {
    let posX = evt.nativeEvent.locationX;
    let posY = evt.nativeEvent.locationY;
    posX -= this.props.options.margin.left;
    posY -= this.props.options.margin.top;

    let chartWidth = this.props.options.width;

    posX = Math.max(posX, 0);
    posX = Math.min(posX, chartWidth);
    // map the datapoint index with the gesture:
    let curPos = Math.min(posX / chartWidth, 1);

    // create a 'focus' line
    let curPosX = posX;
    this.curPos = curPos;
    this.setState({curPos});
    this.setState({curPosX});
    this.setState({chartStartY: 0});
    this.setState({chartEndY: this.props.options.height});
  }

  componentWillMount() {
    this._panResponder = {};
    if (!this.props.options.interaction) {return;}
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {

        this.setState({userPressing: true});
        this._calcDataPoint(evt)

        if (this.props.panHandlerStart) {
          this.props.panHandlerStart(this.curPos);
        }
      },

      onPanResponderMove: (evt, gestureState) => {

        this._calcDataPoint(evt);
        if (this.props.panHandlerMove) {
          this.props.panHandlerMove(this.curPos);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {

        this._calcDataPoint(evt);
        if (this.props.panHandlerEnd) {
          this.props.panHandlerEnd(this.curPos);
        }

        this.setState({userPressing: false});
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,


      onPanResponderTerminate: (evt, gestureState) => {

        this._calcDataPoint(evt);
        if (this.props.panHandlerEnd) {
          this.props.panHandlerEnd(this.curPos);
        }

        this.setState({userPressing: false});
      },

      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  getMaxAndMin(chart, key, scale, chartMin, chartMax) {
    let maxValue;
    let minValue;
    _.each(chart.curves, function(serie) {
      let values = _.map(serie.item, function(item) {
        return item[key];
      });

      let max = _.max(values);
      if (maxValue === undefined || max > maxValue) maxValue = max;
      let min = _.min(values);
      if (minValue === undefined || min < minValue) minValue = min;

      maxValue = chartMax > maxValue ? chartMax : maxValue;
      minValue = chartMin < minValue ? chartMin : minValue;
    });

    return {
      minValue: minValue,
      maxValue: maxValue,
      min: scale(minValue),
      max: scale(maxValue),
    };
  }

  color(i) {
    let color = this.props.options.color;
    if (!_.isString(this.props.options.color)) color = color.color;
    let pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
    return Colors.string(cyclic(pallete, i));
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available';
    if (this.props.data === undefined) return <ReactText>{noDataMsg}</ReactText>;

    let options = new Options(this.props);

    let accessor = function(key) {
      return function(x) {
        return x[key];
      };
    };

    let chart = this.chartType({
      data: this.props.data,
      xaccessor: accessor(this.props.xKey),
      yaccessor: accessor(this.props.yKey),
      width: options.chartWidth,
      height: options.chartHeight,
      closed: false,
      min: options.min,
      max: options.max,
    });

    let chartArea = {
      x: this.getMaxAndMin(chart, this.props.xKey, chart.xscale),
      y: this.getMaxAndMin(chart, this.props.yKey, chart.yscale, options.min, options.max),
      margin: options.margin,
    };

    let showAreas = typeof this.props.options.showAreas !== 'undefined'
      ? this.props.options.showAreas
      : true;
    let strokeWidth = typeof this.props.options.strokeWidth !== 'undefined'
      ? this.props.options.strokeWidth
      : '1';
    let strokeDasharray = typeof this.props.options.strokeDasharray !== 'undefined'
      ? this.props.options.strokeDasharray
      : [];
    let strokeOpacity = typeof this.props.options.strokeOpacity !== 'undefined'
      ? this.props.options.strokeOpacity
      : 1;
    let lines = _.map(
      chart.curves,
      function(c, i) {
        const strokeWidthForCurve =
          (typeof strokeWidth === 'function' && strokeWidth(c, i)) || strokeWidth;
        const strokeDasharrayForCurve =
          (typeof strokeDasharray === 'function' && strokeDasharray(c, i)) || strokeDasharray;
        const strokeOpacityForCurve =
          (typeof strokeOpacity === 'function' && strokeOpacity(c, i)) || strokeOpacity;
        return (
          <Path
            key={'lines' + i}
            d={c.line.path.print()}
            stroke={this.color(i)}
            strokeWidth={strokeWidthForCurve}
            strokeOpacity={strokeOpacityForCurve}
            fill="none"
            strokeDasharray={strokeDasharrayForCurve}
          />
        );
      }.bind(this)
    );

    // gesture line here
    let gestureLine = null;
    let color = 'white';
    let width = 1;
    if (this.props.options.cursorLine ) {
      if (this.props.options.cursorLine.stroke)
        color = this.props.options.cursorLine.stroke;
      if (this.props.options.cursorLine.strokeWidth) {
        width =this.props.options.cursorLine.strokeWidth;
      }
    }
    if (this.state.userPressing
      && this.props.options.interaction) {
      gestureLine = <Line
        x1={this.state.curPosX}
        y1={this.state.chartStartY}
        x2={this.state.curPosX}
        y2={this.state.chartEndY}
        stroke={color}
        strokeWidth={width}

      />
    }

    let areas = null;

    let showPoints = typeof this.props.options.showPoints !== 'undefined'
      ? this.props.options.showPoints
      : false;
    let points = !showPoints
      ? []
      : _.map(
          chart.curves,
          function(c, graphIndex) {
            return _.map(
              c.line.path.points(),
              function(p, pointIndex) {
                let render = null;
                if (
                  (typeof showPoints === 'function' && showPoints(graphIndex, pointIndex)) ||
                  (typeof showPoints === 'boolean' && showPoints)
                ) {
                  return (
                    <G key={'k' + pointIndex} x={p[0]} y={p[1]}>
                      {typeof this.props.options.renderPoint === 'function'
                        ? this.props.options.renderPoint(graphIndex, pointIndex)
                        : <Circle
                            fill={this.color(graphIndex)}
                            cx={0}
                            cy={0}
                            r={this.props.options.pointRadius || 5}
                            fillOpacity={1}
                          />}
                    </G>
                  );
                }
              }.bind(this)
            );
          }.bind(this)
        );

    if (showAreas) {
      areas = _.map(
        chart.curves,
        function(c, i) {
          if (
            (typeof showAreas === 'function' && showAreas(c, i)) ||
            typeof showAreas === 'boolean'
          )
            return (
              <Path
                key={'areas' + i}
                d={c.area.path.print()}
                fillOpacity={0.5}
                stroke="none"
                fill={this.color(i)}
              />
            );

          return null;
        }.bind(this)
      );
    }

    let textStyle = fontAdapt(options.label);
    let regions;
    if (this.props.regions != 'undefined') {
      let styling = typeof this.props.regionStyling != 'undefined' ? this.props.regionStyling : {};
      let labelOffsetAllRegions = typeof styling.labelOffset != 'undefined'
        ? styling.labelOffset
        : {};

      regions = _.map(
        this.props.regions,
        function(c, i) {
          let x, y, height, width, y1, y2, labelX, labelY;

          let labelOffset = typeof c.labelOffset != 'undefined' ? c.labelOffset : {};
          let labelOffsetLeft = typeof labelOffsetAllRegions.left != 'undefined'
            ? typeof labelOffset.left != 'undefined' ? labelOffset.left : labelOffsetAllRegions.left
            : 20;
          let labelOffsetTop = typeof labelOffsetAllRegions.top != 'undefined'
            ? typeof labelOffset.top != 'undefined' ? labelOffset.top : labelOffsetAllRegions.top
            : 0;
          let fillOpacity = typeof styling.fillOpacity != 'undefined'
            ? typeof c.fillOpacity != 'undefined' ? c.fillOpacity : styling.fillOpacity
            : 0.5;

          y1 = chart.yscale(c.from);
          y2 = chart.yscale(c.to);

          x = 0;
          y = y1;
          height = y2 - y1;
          width = chartArea.x.max;

          labelX = labelOffsetLeft;
          labelY = y2 + labelOffsetTop;

          let regionLabel = typeof c.label != 'undefined'
            ? <Text
                fontFamily={textStyle.fontFamily}
                fontSize={textStyle.fontSize}
                fontWeight={textStyle.fontWeight}
                fontStyle={textStyle.fontStyle}
                fill={textStyle.fill}
                textAnchor="middle"
                x={labelX}
                y={labelY}
              >
                {c.label}
              </Text>
            : null;

          return (
            <G key={'region' + i}>
              <Rect
                key={'region' + i}
                x={x}
                y={y}
                width={width}
                height={height}
                fill={c.fill}
                fillOpacity={fillOpacity}
              />
              {regionLabel}
            </G>
          );
        }.bind(this)
      );
    }

    let returnValue = (
      <View width={options.width} height={options.height} {...this._panResponder.panHandlers}>
        <Svg width={options.width} height={options.height}>
          <G x={options.margin.left} y={options.margin.top}>
            <GridAxis key="grid-x" scale={chart.xscale} options={options.axisX} chartArea={chartArea} />
            <GridAxis key="grid-y" scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
            {regions}
            {areas}
            {lines}
            {points}
            {gestureLine}
            <Axis key="axis-x" scale={chart.xscale} options={options.axisX} chartArea={chartArea} />
            <Axis key="axis-y" scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
          </G>
        </Svg>
      </View>
    );

    return returnValue;
  }
}

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

import React, {Component} from 'react'
import {Text as ReactText}  from 'react-native'
import Svg,{ Circle, G } from 'react-native-svg'
import { Options, styleSvg } from './util'
import Axis from './Axis'
import _ from 'lodash'
import 'babel-polyfill'

const Stock = require('paths-js/stock')

export default class Scatterplot extends Component {

  static defaultProps = {
    xKey:'',
    yKey:'',
    options: {
      width: 600,
      height: 600,
      margin: {top: 40, left: 60, bottom: 30, right: 30},
      fill: '#2980B9',
      stroke: '#3E90F0',
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

  getMaxAndMin(chart, key,scale) {
    let maxValue
    let minValue
    _.each(chart.curves, function (serie) {
      let values = _.map(serie.item, function (item) {
        return item[key]
      })

      let max = _.max(values)
      if (maxValue === undefined || max > maxValue) maxValue = max
      let min = _.min(values)
      if (minValue === undefined || min < minValue) minValue = min
    })
    return {
      minValue: minValue,
      maxValue: maxValue,
      min:scale(minValue),
      max:scale(maxValue)
    }
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    const options = new Options(this.props)
    const accessor = function (key) {
      return function (x) {
        return x[key]
      }
    }

    const chart = Stock({
      data: this.props.data,
      xaccessor: accessor(this.props.xKey),
      yaccessor: accessor(this.props.yKey),
      width: options.chartWidth,
      height: options.chartHeight,
      closed: false
    })

    const chartArea = {
      x:this.getMaxAndMin(chart,this.props.xKey,chart.xscale),
      y:this.getMaxAndMin(chart,this.props.yKey,chart.yscale),
      margin:options.margin
    }

    const colors = styleSvg({},options)
    const points = _.map(chart.curves, function (c) {
      return _.map(c.line.path.points(),function(p,j) {
        let render = <G key={'k' + j} x={p[0]} y={p[1]}>
                    <Circle {...colors} cx={0} cy={0} r={options.r || 5} fillOpacity={1} />
                </G>

        return render
      },this)
    },this)

    return (<Svg width={options.width} height={options.height}>
            <G x={options.margin.left} y={options.margin.top}>
                { points }
                <Axis scale={chart.xscale} options={options.axisX} chartArea={chartArea} />
                <Axis scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
            </G>
        </Svg>)
  }
}

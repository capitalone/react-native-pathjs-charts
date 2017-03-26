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
import Svg,{ G, Path, Line, Text} from 'react-native-svg'
import { Options, identity, styleSvg, fontAdapt } from './util'
const Radar = require('paths-js/radar')
import 'babel-polyfill'

function accessKeys(keys) {
  let a = {}
  for (let i in keys) {
    let key = keys[i]
    a[key] = identity(key)
  }
  return a
}

export default class RadarChart extends Component
{

  static defaultProps = {
    options: {
      width: 600,
      height: 600,
      margin: {top: 20, left: 20, right: 20, bottom: 20},
      r: 300,
      max: 150,
      rings: 3,
      fill: '#2980B9',
      stroke: '#2980B9',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition:3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        bold: true,
        color: '#34495E'
      }
    }
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    const options = new Options(this.props)

    const x = options.chartWidth / 2
    const y = options.chartHeight / 2
    const radius = Math.min(x, y)

    const center = this.props.center || [x, y]

    const keys = Object.keys(this.props.data[0])
    const chart = Radar({
      center: this.props.center || [x, y],
      r: this.props.options.r || radius,
      data: this.props.data,
      accessor: this.props.accessor || accessKeys(keys),
      max: this.props.options.max,
      rings: this.props.options.rings
    })
    const self = this
    const colors = styleSvg({}, self.props.options)
    const colorsFill = self.props.options.fill
    const curves = chart.curves.map(function (c, i) {
      const color = colorsFill instanceof Array ? colorsFill[i] : colorsFill;
      return (<Path key={i} d={c.polygon.path.print()} fill={color} fillOpacity={0.6} />)
    })

    const length = chart.rings.length
    const rings = chart.rings.map(function (r, i) {
      if (i !== length - 1 ){
        return (<Path key={'rings'+i} d={r.path.print()} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity} fill='none' />)
      }
    })

    const textStyle = fontAdapt(options.label)

    const labels = chart.rings[length - 1].path.points().map(function (p, i) {
      return (
              <G key={'label' + i}>
                  <Line x1={p[0]} y1={p[1]} x2={center[0]} y2={center[1]} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity}/>
                  <Text
                      fontFamily={textStyle.fontFamily}
                      fontSize={textStyle.fontSize}
                      fontWeight={textStyle.fontWeight}
                      fontStyle={textStyle.fontStyle}
                      fill={textStyle.fill}
                      textAnchor="middle" x={Math.floor(p[0])} y={Math.floor(p[1])}>{keys[i]}
                  </Text>
              </G>
            )
    })

    return (
      <Svg width={options.width} height={options.height}>
          <G x={options.margin.left} y={options.margin.top}>
              {labels}
              <G x={options.margin.left * -1} y={options.margin.top * -1}>
                  {rings}
                  {curves}
              </G>
          </G>
      </Svg>
    );
  }
}

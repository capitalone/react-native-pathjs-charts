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
*/

import React, {Component} from 'react'
import { Circle, G, Path, Text } from 'react-native-svg'
import { fontAdapt } from './util'
import _ from 'lodash'
const Pathjs = require('paths-js/path')

class AxisStruct {

  constructor(scale, options, chartArea, horizontal) {
    this.scale = scale
    this.options = options
    this.chartArea = chartArea
    this.margin = chartArea.margin
    this.horizontal = horizontal
  }

  static calcStepSize(range, targetSteps)
  {
    const tempStep = range / targetSteps
    const mag = Math.floor(Math.log(tempStep) /  Math.log(10))
    const magPow = Math.pow(10, mag)
    let magMsd = Math.round(tempStep / magPow + 0.5)

    if (magMsd > 5.0)
      magMsd = 10.0
    else if (magMsd > 2.0)
      magMsd = 5.0
        else if (magMsd > 1.0)
          magMsd = 2.0

    return magMsd * magPow
  }

  static getTickValues(axis, tickCount) {
    const tickStep = AxisStruct.calcStepSize((axis.maxValue - axis.minValue),tickCount)
    return _.range(axis.minValue, axis.maxValue + 1,tickStep)
  }

  axis() {

    const horizontal = this.horizontal
    const xAxis = this.chartArea.x
    const yAxis = this.chartArea.y
    const currentAxis = horizontal?xAxis:yAxis
    const tickInterval = this.options.tickCount || 10
    const ticks = this.options.tickValues !== undefined && this.options.tickValues.length !== 0? _.map(this.options.tickValues,function(v){return v.value }):AxisStruct.getTickValues(currentAxis, tickInterval)
    const fixed = this.options.zeroAxis?this.scale(0):horizontal?yAxis.min:xAxis.min
    const start = {x: horizontal?xAxis.min:fixed, y: horizontal?fixed:yAxis.min}
    const end = {x:horizontal?xAxis.max:fixed,y: horizontal?fixed:yAxis.max}

    const margin = this.margin
    if (margin !== undefined){
      if (horizontal){
        start.x -= margin.left || 0
        end.x += margin.right || 0
      }
      else {
        start.y += margin.bottom || 0
        end.y -= margin.top || 0
      }
    }

    return {
      item: currentAxis,
      path: Pathjs().moveto(start).lineto(end).closepath(),
      ticks: ticks,
      lines: ticks.map(c => {
        const lineStart = {x: horizontal ? this.scale(c) : xAxis.min, y: horizontal ? yAxis.min : this.scale(c)}
        return Pathjs().moveto(lineStart).lineto(horizontal ? lineStart.x : xAxis.max, horizontal ? yAxis.max : lineStart.y)
      },this)
    }
  }
}

export default class Axis extends Component {

  render() {
    const { chartArea, options, scale } = this.props
    const horizontal = options.orient ==='top' || options.orient ==='bottom'

    const axis = new AxisStruct(scale,options,chartArea,horizontal).axis()

    let textAnchor = 'start'
    if (options.orient === 'top' || options.orient === 'bottom') textAnchor = 'middle'
    if (options.orient === 'left') textAnchor = 'end'
    if (options.orient === 'right') textAnchor = 'start'

    let xy = [0,0]
    if (options.orient === 'top')  xy = [0,-5]
    if (options.orient === 'bottom') xy = [0,5]
    if (options.orient === 'left')  xy = [-5,-10]
    if (options.orient === 'right')  xy = [5,5]

    const textStyle = fontAdapt(options.label)

    const ticks =_.map(axis.ticks, function (c, i) {
      const label = options.labelComponent !== undefined? React.cloneElement(options.labelComponent,{value:c}) : c
      let gxy = horizontal ? [scale(c),chartArea.y.min]:[chartArea.x.min,scale(c)]

      let returnValue = <G key={i} x={gxy[0]} y={gxy[1]}>

                {options.showTicks &&
                  <Circle r="2" cx="0" cy="0" stroke="grey" fill="grey" />
                }

                {options.showLabels &&
                  <Text x={xy[0]} y={xy[1]}
                        fontFamily={textStyle.fontFamily}
                        fontSize={textStyle.fontSize}
                        fontWeight={textStyle.fontWeight}
                        fontStyle={textStyle.fontStyle}
                        fill={textStyle.fill}
                        textAnchor={textAnchor}>
                        {label.toString()}
                  </Text>}
            </G>

      return returnValue
    })


    const gridLines = options.showLines ? _.map(axis.lines, function (c, i) {
      return (
               <Path key={'gridLines' + i} d={c.print()} strokeOpacity={0.5} stroke="#3E90F0" fill="none"/>
            )
    }) : []

    let offset = {
      x: chartArea.margin.left * -1,
      y: chartArea.margin.top * -1
    }

    let returnV = <G>
              <G x={offset.x} y={offset.y}>
                {options.showAxis ? <Path d={axis.path.print()} strokeOpacity={0.5} stroke="#3E90F0" strokeWidth={3} fill="none"/> : null}
              </G>
              {ticks}
              <G x={offset.x} y={offset.y}>
                {gridLines}
              </G>
            </G>

    return returnV

  }
}

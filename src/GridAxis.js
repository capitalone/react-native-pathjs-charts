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

import React, { Component } from 'react'
import { G, Path } from 'react-native-svg'
import _ from 'lodash'
import { AxisStruct } from './Axis'

export default class GridAxis extends Component {

  render() {
    const { chartArea, options, scale } = this.props
    const horizontal = options.orient ==='top' || options.orient ==='bottom'

    const axis = new AxisStruct(scale,options,chartArea,horizontal).axis()

    if (typeof options.gridColor !== 'string') {
      options.gridColor = '#3E90F0'
    }

    if (typeof options.opacity !== 'number') {
      options.opacity = 0.5
    }

    const gridLines = options.showLines ? _.map(axis.lines, function (c, i) {
      return (
               <Path key={'gridLines' + i} d={c.print()} strokeOpacity={options.opacity} stroke={options.gridColor} fill="none"/>
            )
    }) : []

    let offset = {
      x: chartArea.margin.left * -1,
      y: chartArea.margin.top * -1
    };

    let returnV = <G x={offset.x} y={offset.y}>
      {gridLines}
    </G>;

    return returnV

  }
}

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
import 'react-native'
import React from 'react'
import StockLine from '../../StockLine'
import renderer from 'react-test-renderer'

let data = [
  [{
    "x": 0,
    "y": 47782
  }, {
    "x": 1,
    "y": 48497
  }, {
    "x": 2,
    "y": 77128
  }, {
    "x": 3,
    "y": 73413
  }]
]
let options = {
  width: 250,
  height: 250,
  color: '#2980B9',
  margin: {
    top: 10,
    left: 35,
    bottom: 30,
    right: 10
  },
  animate: {
    type: 'delayed',
    duration: 200
  },
  axisX: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'bottom',
    tickValues: [],
    labelFunction: ((v) => {
      let d = moment('2016-10-08 14:00','YYYY-MM-DD HH:mm')
      return d.add((v * 2),'hours').format('MM/DD/YY[\n]h:mm A')
    }),
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    }
  },
  axisY: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'left',
    tickValues: [],
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    }
  }
}

it('renders an example chart correctly', () => {
  let tree = renderer.create(
    <StockLine data={data}
      options={options}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

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

'use strict'

import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import { Radar } from 'react-native-pathjs-charts'

class RadarChartBasic extends Component {
  render() {
    let data = [{
      "speed": 74,
      "balance": 29,
      "explosives": 40,
      "energy": 40,
      "flexibility": 30,
      "agility": 25,
      "endurance": 44
    }]

    let options = {
      width: 290,
      height: 290,
      margin: {
        top: 20,
        left: 20,
        right: 30,
        bottom: 20
      },
      r: 150,
      max: 100,
      fill: "#2980B9",
      stroke: "#2980B9",
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    }
    
    return (
      <View>
        <Radar data={data} options={options} />
      </View>
    )
  }
}

export default RadarChartBasic;

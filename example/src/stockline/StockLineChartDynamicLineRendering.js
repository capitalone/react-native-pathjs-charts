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

'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Circle } from 'react-native-svg';

import { StockLine } from 'react-native-pathjs-charts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class StockLineChartDynamicLineRendering extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `StockLine - Dynamic Line Rendering`,
  });
  render() {
    const data = [
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
      }, {
        "x": 4,
        "y": 58257
      }, {
        "x": 5,
        "y": 40579
      }, {
        "x": 6,
        "y": 72893
      }, {
        "x": 7,
        "y": 60663
      }, {
        "x": 8,
        "y": 15715
      }, {
        "x": 9,
        "y": 40305
      }, {
        "x": 10,
        "y": 68592
      }, {
        "x": 11,
        "y": 95664
      }, {
        "x": 12,
        "y": 17908
      }, {
        "x": 13,
        "y": 22838
      }],
      [{
        "x": 0,
        "y": 132189
      }, {
        "x": 1,
        "y": 61705
      }, {
        "x": 2,
        "y": 154976
      }, {
        "x": 3,
        "y": 81304
      }, {
        "x": 4,
        "y": 172572
      }, {
        "x": 5,
        "y": 140656
      }, {
        "x": 6,
        "y": 148606
      }, {
        "x": 7,
        "y": 53010
      }, {
        "x": 8,
        "y": 110783
      }, {
        "x": 9,
        "y": 196446
      }, {
        "x": 10,
        "y": 117057
      }, {
        "x": 11,
        "y": 186765
      }, {
        "x": 12,
        "y": 174908
      }, {
        "x": 13,
        "y": 75247
      }, {
        "x": 14,
        "y": 192894
      }, {
        "x": 15,
        "y": 150356
      }],
      [{
        "x": 0,
        "y": 125797
      }, {
        "x": 1,
        "y": 256656
      }, {
        "x": 2,
        "y": 222260
      }, {
        "x": 3,
        "y": 265642
      }, {
        "x": 4,
        "y": 263902
      }, {
        "x": 5,
        "y": 113453
      }, {
        "x": 6,
        "y": 289461
      }, {
        "x": 7,
        "y": 293850
      }, {
        "x": 8,
        "y": 206079
      }, {
        "x": 9,
        "y": 240859
      }, {
        "x": 10,
        "y": 152776
      }, {
        "x": 11,
        "y": 297282
      }, {
        "x": 12,
        "y": 175177
      }, {
        "x": 13,
        "y": 169233
      }, {
        "x": 14,
        "y": 237827
      }, {
        "x": 15,
        "y": 242429
      }, {
        "x": 16,
        "y": 218230
      }, {
        "x": 17,
        "y": 161511
      }, {
        "x": 18,
        "y": 153227
      }]
    ];
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
      },
      strokeWidth: 2,

      showAreas: (curve: number, index: number) => index === 0,

      showPoints: (graphIndex: number, pointIndex: number) =>
        graphIndex === 1 && pointIndex === data[1].length - 1,
      renderPoint: () => [
        <Text
          key="valueLegend"
          fontFamily="Arial"
          fontSize={14}
          fontWeight="normal"
          fill="#101010"
          textAnchor="middle"
          x={0}
          y={20}
        >
          {data[1][data[1].length - 1].y}
        </Text>,
        <Circle key="light" fill='#34495E' cx={0} cy={0} r={10} fillOpacity={0.5} />,
        <Circle key="full" fill='#34495E' cx={0} cy={0} r={7} fillOpacity={1} />,
      ],

      strokeDasharray: (curve: number, index: number) => (index === 2 ? [5] : []),
      strokeOpacity: (curve: number, index: number) => (index === 2 ? 0.3 : 1),
    };

    return (
      <View style={styles.container}>
        <StockLine data={data} options={options} xKey='x' yKey='y' />
      </View>
    );
  }
}

export default StockLineChartDynamicLineRendering;

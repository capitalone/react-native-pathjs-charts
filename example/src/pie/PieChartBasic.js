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
import { View, Text, StyleSheet } from 'react-native';

import { Pie } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class PieChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Pie - Basic`,
  });
  render() {
    let data = [{
      "name": "Washington",
      "population": 7694980
    }, {
      "name": "Oregon",
      "population": 2584160
    }, {
      "name": "Minnesota",
      "population": 6590667,
      "color": {'r':223,'g':154,'b':20}
    }, {
      "name": "Alaska",
      "population": 7284698
    }]

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View style={styles.container}>
        <Pie data={data}
          options={options}
          accessorKey="population"
          margin={{top: 20, left: 20, right: 20, bottom: 20}}
          color="#2980B9"
          pallete={
            [
              {'r':25,'g':99,'b':201},
              {'r':24,'g':175,'b':35},
              {'r':190,'g':31,'b':69},
              {'r':100,'g':36,'b':199},
              {'r':214,'g':207,'b':32},
              {'r':198,'g':84,'b':45}
            ]
          }
          r={50}
          R={150}
          legendPosition="topLeft"
          label={{
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            color: '#ECF0F1'
          }}
          />
      </View>
    )
  }
}

export default PieChartBasic;

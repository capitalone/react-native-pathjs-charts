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

import { Tree } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class TreeChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Tree - Basic`,
  });
  render() {
    let data = {
      "name": "Root",
      "children": [{
        "name": "Santa Catarina",
        "children": [{
          "name": "Tromp"
        }, {
          "name": "Thompson"
        }, {
          "name": "Ryan"
        }]
      }, {
        "name": "Acre",
        "children": [{
          "name": "Dicki"
        }, {
          "name": "Armstrong"
        }, {
          "name": "Nitzsche"
        }]
      }]
    }

    let options = {
      margin: {
        top: 20,
        left: 50,
        right: 80,
        bottom: 20
      },
      width: 200,
      height: 200,
      fill: "#2980B9",
      stroke: "#3E90F0",
      r: 2,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E'
      }
    }

    return (
      <View style={styles.container}>
        <Tree data={data} options={options}  />
      </View>
    )
  }
}

export default TreeChartBasic;

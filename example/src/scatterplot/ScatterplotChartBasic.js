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

import { Scatterplot } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class ScatterplotChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Scatterplot - Basic`,
  });
  render() {
    let data = [
      [{
        "title": "Amapá",
        "rating": 4.47,
        "episode": 0
      }, {
        "title": "Santa Catarina",
        "rating": 3.3,
        "episode": 1
      }, {
        "title": "Minas Gerais",
        "rating": 6.46,
        "episode": 2
      }, {
        "title": "Amazonas",
        "rating": 3.87,
        "episode": 3
      }, {
        "title": "Mato Grosso do Sul",
        "rating": 2.8,
        "episode": 4
      }, {
        "title": "Mato Grosso do Sul",
        "rating": 2.05,
        "episode": 5
      }, {
        "title": "Tocantins",
        "rating": 7.28,
        "episode": 6
      }, {
        "title": "Roraima",
        "rating": 5.23,
        "episode": 7
      }, {
        "title": "Roraima",
        "rating": 7.76,
        "episode": 8
      }, {
        "title": "Amazonas",
        "rating": 2.26,
        "episode": 9
      }, {
        "title": "Mato Grosso do Sul",
        "rating": 2.46,
        "episode": 10
      }, {
        "title": "Santa Catarina",
        "rating": 7.59,
        "episode": 11
      }, {
        "title": "Acre",
        "rating": 3.74,
        "episode": 12
      }, {
        "title": "Amapá",
        "rating": 5.03,
        "episode": 13
      }, {
        "title": "Paraíba",
        "rating": 4.16,
        "episode": 14
      }, {
        "title": "Mato Grosso",
        "rating": 0.81,
        "episode": 15
      }, {
        "title": "Rio de Janeiro",
        "rating": 3.01,
        "episode": 16
      }, {
        "title": "Rio de Janeiro",
        "rating": 0,
        "episode": 17
      }, {
        "title": "Distrito Federal",
        "rating": 5.46,
        "episode": 18
      }, {
        "title": "São Paulo",
        "rating": 9.71,
        "episode": 19
      }, {
        "title": "Mato Grosso",
        "rating": 7.9,
        "episode": 20
      }, {
        "title": "Tocantins",
        "rating": 4.2,
        "episode": 21
      }, {
        "title": "Amapá",
        "rating": 6,
        "episode": 22
      }, {
        "title": "Paraná",
        "rating": 7.99,
        "episode": 23
      }, {
        "title": "Mato Grosso do Sul",
        "rating": 1.07,
        "episode": 24
      }, {
        "title": "Tocantins",
        "rating": 1.42,
        "episode": 25
      }, {
        "title": "Paraná",
        "rating": 5.94,
        "episode": 26
      }, {
        "title": "Maranhão",
        "rating": 3.17,
        "episode": 27
      }, {
        "title": "Maranhão",
        "rating": 1.58,
        "episode": 28
      }, {
        "title": "Rondônia",
        "rating": 6.12,
        "episode": 29
      }, {
        "title": "Roraima",
        "rating": 7.28,
        "episode": 30
      }, {
        "title": "Mato Grosso",
        "rating": 4.74,
        "episode": 31
      }, {
        "title": "Roraima",
        "rating": 1.47,
        "episode": 32
      }, {
        "title": "Alagoas",
        "rating": 9,
        "episode": 33
      }, {
        "title": "Amazonas",
        "rating": 0.43,
        "episode": 34
      }, {
        "title": "Mato Grosso do Sul",
        "rating": 8.61,
        "episode": 35
      }, {
        "title": "Tocantins",
        "rating": 0.6,
        "episode": 36
      }, {
        "title": "Maranhão",
        "rating": 9.62,
        "episode": 37
      }, {
        "title": "Rio de Janeiro",
        "rating": 4.79,
        "episode": 38
      }, {
        "title": "Santa Catarina",
        "rating": 7.71,
        "episode": 39
      }, {
        "title": "Piauí",
        "rating": 3.83,
        "episode": 40
      }, {
        "title": "Pernambuco",
        "rating": 8.19,
        "episode": 41
      }, {
        "title": "Bahia",
        "rating": 6.98,
        "episode": 42
      }, {
        "title": "Minas Gerais",
        "rating": 4.52,
        "episode": 43
      }]
    ]

    let options = {
      width: 290,
      height: 290,
      r: 2,
      margin: {
        top: 20,
        left: 40,
        bottom: 30,
        right: 30
      },
      fill: "#2980B9",
      stroke: "#3E90F0",
      animate: {
        type: 'delayed',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E'
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
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View style={styles.container}>
        <Scatterplot data={data} options={options} xKey="episode" yKey="rating" />
      </View>
    )
  }
}

export default ScatterplotChartBasic;

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

'use strict'

import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

import { AssetDebtBarChart } from 'react-native-pathjs-charts'

class AssetDebtBarChartCustomized extends Component {
  render() {
    let chartData = [
      {
        label: "Asset1",
        value: 100,
        color: "#00F"
      },
      {
        label: "Debt1",
        value: -100,
        color: "#F00"
      },
      {
        label: "Asset2",
        value: 200,
        color: "#00F"
      },
      {
        label: "Asset3",
        value: 150,
        color: "#00F"
      },
      {
        label: "Debt2",
        value: -1,
        color: "#F00"
      },
    ]

    const chartProperties = {
      data: chartData,
      width: 250,
      barHeight: 20,
      barGap: 15,
      barMinVisibleWidth: 1,
      barMinValueForBarVisibility: 50,
      scaleMax: 550,
      scaleIncrement: 250,
      scaleLabelFormat: (value) => {
        var start = '$'
        if (value < 0) {
          start = '-$'
        }

        var n = Math.abs(value)

        return start + n.toString();
      },
    }

    return (
      <View>
        <AssetDebtBarChart {...chartProperties} />
      </View>
    )
  }
}

export default AssetDebtBarChartCustomized;

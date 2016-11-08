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

class AssetDebtBarChartBasic extends Component {
  render() {
    let chartData = [
      {
        label: "Asset1",
        value: 100,
      },
      {
        label: "Debt1",
        value: -100,
      },
      {
        label: "Asset2",
        value: 200,
      },
      {
        label: "Asset3",
        value: 150,
      },
    ]

    const chartProperties = {
      data: chartData,
      width: 250,
    }

    return (
      <View>
        <AssetDebtBarChart {...chartProperties} />
      </View>
    )
  }
}

export default AssetDebtBarChartBasic;

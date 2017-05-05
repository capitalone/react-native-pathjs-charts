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
import { AppRegistry, Text, StyleSheet, View, Button } from 'react-native'
import { StackNavigator} from 'react-navigation';
import SideMenu from 'react-native-side-menu'

import BarChartColumnBasic from './bar/BarChartColumnBasic'

import PieChartBasic from './pie/PieChartBasic'

import StockLineChartBasic from './stockline/StockLineChartBasic'
import StockLineChartStaticTickLabels from './stockline/StockLineChartStaticTickLabels'
import StockLineChartDynamicTickLabels from './stockline/StockLineChartDynamicTickLabels'

import SmoothLineChartBasic from './smoothline/SmoothLineChartBasic'
import SmoothLineChartRegions from './smoothline/SmoothLineChartRegions'
import SmoothLineChartRegionsExtended from './smoothline/SmoothLineChartRegionsExtended'

import ScatterplotChartBasic from './scatterplot/ScatterplotChartBasic'

import RadarChartBasic from './radar/RadarChartBasic'

import TreeChartBasic from './tree/TreeChartBasic'

import Home from './Home'
import 'babel-polyfill'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'RNPC Example App',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          style={styles.container}
          onPress={() => navigate('BarChartColumnBasic')}
          title="Bar (Column) - Basic"
        />
        <Button
          onPress={() => navigate('PieChartBasic')}
          title="Pie - Basic"
        />
        <Button
          onPress={() => navigate('StockLineChartBasic')}
          title="StockLine - Basic"
        />
        <Button
          onPress={() => navigate('StockLineChartStaticTickLabels')}
          title="StockLine - Static Labels"
        />
        <Button
          onPress={() => navigate('StockLineChartDynamicTickLabels')}
          title="StockLine - Dynamic Labels"
        />
        <Button
          onPress={() => navigate('SmoothLineChartBasic')}
          title="SmoothLine - Basic"
        />
        <Button
          onPress={() => navigate('SmoothLineChartRegions')}
          title="SmoothLine - Regions"
        />
        <Button
          onPress={() => navigate('SmoothLineChartRegionsExtended')}
          title="SmoothLine - Regions Extended"
        />
        <Button
          onPress={() => navigate('ScatterplotChartBasic')}
          title="Scatterplot - Basic"
        />
        <Button
          onPress={() => navigate('RadarChartBasic')}
          title="Radar - Basic"
        />
        <Button
          onPress={() => navigate('TreeChartBasic')}
          title="Tree - Basic"
        />
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  BarChartColumnBasic: { screen: BarChartColumnBasic },
  PieChartBasic: { screen: PieChartBasic },
  StockLineChartBasic: { screen: StockLineChartBasic },
  StockLineChartStaticTickLabels: { screen: StockLineChartStaticTickLabels },
  StockLineChartDynamicTickLabels: { screen: StockLineChartDynamicTickLabels },
  SmoothLineChartBasic: { screen: SmoothLineChartBasic },
  SmoothLineChartRegions: { screen: SmoothLineChartRegions },
  SmoothLineChartRegionsExtended: { screen: SmoothLineChartRegionsExtended },
  ScatterplotChartBasic: { screen: ScatterplotChartBasic },
  RadarChartBasic: { screen: RadarChartBasic },
  TreeChartBasic: { screen: TreeChartBasic },
});

AppRegistry.registerComponent('App', () => App);
export default App;

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
import { Text, StyleSheet, View, Navigator } from 'react-native'
import SideMenu from 'react-native-side-menu'

import Menu from './Menu'

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

class App extends Component {
  state = {
    isOpen: false,
    selectedItem: 'Home',
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  };

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    this.refs.navigator.replace({name:item})
  };

  renderScene(route, navigator) {
    //For some annoying reason, the view has to be here instead of around
    //navigator for correct display, something to figure out a fix for later
    switch (route.name) {
      case 'BarChartColumnBasic':
        return <View style={styles.container}><BarChartColumnBasic /></View>
      case 'PieChartBasic':
        return <View style={styles.container}><PieChartBasic /></View>
      case 'StockLineChartBasic':
        return <View style={styles.container}><StockLineChartBasic /></View>
      case 'StockLineChartStaticTickLabels':
        return <View style={styles.container}><StockLineChartStaticTickLabels /></View>
      case 'StockLineChartDynamicTickLabels':
        return <View style={styles.container}><StockLineChartDynamicTickLabels /></View>
      case 'SmoothLineChartBasic':
        return <View style={styles.container}><SmoothLineChartBasic /></View>
      case 'SmoothLineChartRegions':
        return <View style={styles.container}><SmoothLineChartRegions /></View>
      case 'SmoothLineChartRegionsExtended':
        return <View style={styles.container}><SmoothLineChartRegionsExtended /></View>
      case 'ScatterplotChartBasic':
        return <View style={styles.container}><ScatterplotChartBasic /></View>
      case 'RadarChartBasic':
        return <View style={styles.container}><RadarChartBasic /></View>
      case 'TreeChartBasic':
        return <View style={styles.container}><TreeChartBasic /></View>
      default:
        return <View style={styles.container}><Home /></View>
    }
  };

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)}/>;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
        bounceBackOnOverdraw={false}>
          <Navigator
            style={{flex:1}}
            initialRoute={{name:'Home'}}
            renderScene={this.renderScene}
            ref="navigator"
          />
      </SideMenu>
    );
  }
}

export default App;

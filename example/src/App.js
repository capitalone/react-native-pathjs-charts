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
import { Text, StyleSheet, View, Navigator } from 'react-native'
import SideMenu from 'react-native-side-menu'

import Menu from './Menu'

import Home from './Home'
import AssetDebtBarChartBasic from './BarCharts/AssetDebtBarChartBasic'
import AssetDebtBarChartCustomized from './BarCharts/AssetDebtBarChartCustomized'
import Everything from './Everything'

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
    switch (route.name) {
      case 'AssetDebtBarChartBasic':
        return <View style={styles.container}><AssetDebtBarChartBasic /></View>
      case 'AssetDebtBarChartCustomized':
        return <View style={styles.container}><AssetDebtBarChartCustomized /></View>
      case 'Everything':
        return <View style={styles.container}><Everything /></View>
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

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
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#e7e7e7',
    padding: 20,
    paddingTop: 40,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  subitem: {
    fontSize: 12,
    fontWeight: '300',
    paddingTop: 5,
    paddingLeft: 20,
  },
});

class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text
          onPress={() => this.props.onItemSelected('Home')}
          style={styles.item}>
          Home
        </Text>

        <Text style={styles.item}>
          AssetDebtBarChart
        </Text>
        <Text
          onPress={() => this.props.onItemSelected('AssetDebtBarChartBasic')}
          style={styles.subitem}>
          Basic
        </Text>
        <Text
          onPress={() => this.props.onItemSelected('AssetDebtBarChartCustomized')}
          style={styles.subitem}>
          Customized
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Everything')}
          style={styles.item}>
          Old ScrollView Example
        </Text>
      </ScrollView>
    );
  }
}

export default Menu;

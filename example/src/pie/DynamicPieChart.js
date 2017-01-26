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
import { View, Text, Navigator, StyleSheet, TextInput } from 'react-native';

import { Pie } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  chartContainer: {
  },
  dynInputsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  dynInputs: {
    alignItems: 'center',
  },
  dynTextInputLabel: {
    width: 70
  },
  dynTextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    width: 30
  },
});

class DynamicPieChartExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      val1: 10,
      val2: 80,
    };
  }

  render() {
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
        <View style={styles.chartContainer}>
          <Pie
            data={[
              { name: 'Value 1', value: this.state.val1 },
              { name: 'Value 2', value: this.state.val2 }
            ]}
            accessorKey='value'
            options={options}
          />
        </View>
        <View style={styles.dynInputsContainer}>
          <View style={styles.dynInputs}>
            <Text style={styles.dynTextInputLabel}>Option 1</Text>
            <TextInput
              style={styles.dynTextInput}
              multiline = {false}
              onChangeText={(value) => this.setState({ val1: parseInt(value) || 0 })}
            />
          </View>
          <View style={styles.dynInputs}>
            <Text style={styles.dynTextInputLabel}>Option 2</Text>
            <TextInput
              style={styles.dynTextInput}
              multiline = {false}
              onChangeText={(value) => this.setState({ val2: parseInt(value) || 0})}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default DynamicPieChartExample;

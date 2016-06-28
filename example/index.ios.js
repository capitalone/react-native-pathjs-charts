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

import React from 'react'
import {AppRegistry, ScrollView, View } from 'react-native'
import {Bar,StockLine,SmoothLine,Scatterplot,Radar,Tree,Pie} from 'react-native-pathjs-charts'
import sampleData from './data'

class example extends React.Component {
  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor:'#F5FCFF'}} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
        <Bar data={sampleData.bar.data} options={sampleData.bar.options} accessorKey='v'/>
        <Pie
          data={sampleData.pie.data}
          options={sampleData.pie.options}
          accessorKey="population" />
        <StockLine data={sampleData.stockLine.data} options={sampleData.stockLine.options} xKey='x' yKey='y' />

        <SmoothLine data={sampleData.smoothLine.data} options={sampleData.smoothLine.options} xKey='x' yKey='y' />
        <View style={{marginTop:20,marginBottom:20}}>
          <Scatterplot data={sampleData.scatterplot.data} options={sampleData.scatterplot.options} xKey="episode" yKey="rating" />
        </View>
        <Radar data={sampleData.radar.data} options={sampleData.radar.options} />




        <Tree data={sampleData.tree.data} options={sampleData.tree.options}  />
      </ScrollView>)
  }
}

AppRegistry.registerComponent('example', () => example)

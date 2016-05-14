import React, {AppRegistry, Component, ScrollView, View } from 'react-native'
import {Bar,StockLine,SmoothLine,Scatterplot,Radar,Tree,Pie} from 'react-native-pathjs-chart'
import sampleData from './data'

class rnexample extends Component {
    render() {
        return (
          <ScrollView style={{flex:1,backgroundColor:'#F5FCFF'}} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
            <Bar data={sampleData.bar.data} options={sampleData.bar.options} accessorKey='v'/>

              <Pie data={sampleData.pie.data} options={sampleData.pie.options} accessorKey="population" />
              <StockLine data={sampleData.stockLine.data} options={sampleData.stockLine.options} xKey='x' yKey='y' />
              <Bar data={sampleData.bar.data} options={sampleData.bar.options} accessorKey='v'/>
              <SmoothLine data={sampleData.smoothLine.data} options={sampleData.smoothLine.options} xKey='x' yKey='y' />
              <View style={{marginTop:20,marginBottom:20}}>
                <Scatterplot data={sampleData.scatterplot.data} options={sampleData.scatterplot.options} xKey="episode" yKey="rating" />
              </View>
              <Radar data={sampleData.radar.data} options={sampleData.radar.options} />
              <Tree data={sampleData.tree.data} options={sampleData.tree.options}  />

          </ScrollView>
        );
    }
}

AppRegistry.registerComponent('rnexample', () => rnexample);

/*

*/

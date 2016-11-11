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

import React,{Component,PropTypes} from 'react'
import {Text as ReactText, View}  from 'react-native'
import Svg,{ G, Path, Rect, Line, Text } from 'react-native-svg'

defaultScaleLabelFormat = function(value) {
  var start = ''
  if (value < 0) {
    start = '-'
  }

  var n = Math.abs(value)

  var ranges = [
    { divider: 1e18 , suffix: 'P' },
    { divider: 1e15 , suffix: 'E' },
    { divider: 1e12 , suffix: 'T' },
    { divider: 1e9 , suffix: 'G' },
    { divider: 1e6 , suffix: 'M' },
    { divider: 1e3 , suffix: 'K' }
  ];

  for (var i = 0; i < ranges.length; i++) {
    if (n >= ranges[i].divider) {
      return start + (n / ranges[i].divider).toString() + ranges[i].suffix;
    }
  }
  return start + n.toString();
}

const propTypes = {
  dataLabelKey: PropTypes.string,
  dataValueKey: PropTypes.string,
  dataColorKey: PropTypes.string,
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  positiveColors: PropTypes.array,
  negativeColors: PropTypes.array,
  barHeight: PropTypes.number,
  barGap: PropTypes.number,
  barMinVisibleWidth: PropTypes.number,
  barMinValueForBarVisibility: PropTypes.number,
  barLabelFontSize: PropTypes.number,
  scale: PropTypes.array,
  scaleMax: PropTypes.number,
  scaleIncrement: PropTypes.number,
  scaleLabelFormat: PropTypes.func,
};

const defaultProps = {
  dataLabelKey: 'label',
  dataValueKey: 'value',
  dataColorKey: 'color',
  data: [],
  width: 0,
  height: 0,
  positiveColors: ['#0F0','#0A0','#060'],
  negativeColors: ['#F00','#A00','#600'],
  barHeight: 15,
  barGap: 10,
  barMinVisibleWidth: 0,
  barMinValueForBarVisibility: 0,
  barLabelFontSize: 12,
  scale: [],
  scaleMax: 0,
  scaleIncrement: 0,
  scaleLabelFormat: defaultScaleLabelFormat,
};

class AssetDebtBarChart extends Component {

  getAbsMaxOf(array, propName) {
      var max = 0;
      var maxItem = null;
      for(var i=0; i<array.length; i++) {
          var item = array[i];
          var absValue = Math.abs(item[propName])
          if(absValue > max) {
              max = absValue
              maxItem = item;
          }
      }
      return maxItem;
  }

  getScaleMax(pad) {
    if(this.props.scaleMax > 0) {
      return this.props.scaleMax;
    }

    var maxDataValue = Math.abs(this.getAbsMaxOf(this.props.data, this.props.dataValueKey)[this.props.dataValueKey])
    var digits = Math.round(maxDataValue).toString().length
    var roundTo = 1;

    for(var i = 1; i < digits; i++) {
      roundTo = roundTo*10
    }

    var scaleMax = Math.ceil(maxDataValue/roundTo)*roundTo

    if(pad){
      return scaleMax+roundTo
    }

    return scaleMax;
  }

  getScale() {
    if (this.props.scale.length > 0) {
      return this.props.scale;
    }

    var scale = new Array()
    var scaleValue = 0
    var scaleMax = this.getScaleMax(true)
    var scaleVisibleMax = this.getScaleMax(false)
    var scaleIncrement = this.props.scaleIncrement
    var absMaxValue = Math.round(this.getAbsMaxOf(this.props.data, this.props.dataValueKey)[this.props.dataValueKey])
    if (scaleIncrement == 0) {
      scaleIncrement = Math.round(scaleVisibleMax / 2)
    }
    for(scaleValue = 0; scaleValue < scaleMax; scaleValue=scaleValue+scaleIncrement) {
      scale.push(scaleValue)
      if(scaleValue != 0) {
        scale.push(-1*scaleValue)
      }
    }
    return scale;
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'

    let options = this.props;
    let dataCount = this.props.data.length || 1

    let titleHeight = 20
    let axisStart = 25

    let height = options.height
    if (height == 0) {
      height = (dataCount*(options.barHeight+options.barGap))+axisStart+options.barGap
    }

    if (this.props.data === undefined || this.props.data.length == 0) return (
      <View style={{width:options.width,height:height,justifyContent:'center',alignItems:'center'}}>
        <ReactText>{noDataMsg}</ReactText>
      </View>
    )

    let barStart=(options.barGap/2)+axisStart

    let svgWidth=options.width
    let svgHeight=height

    let halfWidth = Math.round(svgWidth/2)

    let scaleMax = this.getScaleMax(true)

    let bars = this.props.data.map((item, index) => {
      let value = item[options.dataValueKey]
      let align = 1
      let textAnchor = 'end'
      if (value < 0) {
        align = -1
        textAnchor = 'start'
      }
      let percent = Math.abs(value)/scaleMax
      let barWidth = Math.round((halfWidth-1)*percent)
      if (Math.abs(value) <= options.barMinValueForBarVisibility && barWidth < options.barMinVisibleWidth) {
        barWidth = options.barMinVisibleWidth
      }

      let color = (value >= 0) ? options.positiveColors[index%options.positiveColors.length] : options.negativeColors[index%options.negativeColors.length]

      if (item[options.dataColorKey]) {
        color = item[options.dataColorKey]
      }

      let barX = halfWidth+0.5
      if (align < 0) {
        barX = halfWidth - barWidth
      }

      let barY = barStart+((options.barHeight+options.barGap)*index)

      return (
        <G key={'barlabel'+index}>
          <Text x={halfWidth-(6*align)} y={barY} dy={-0.1*(options.barLabelFontSize)} textAnchor={textAnchor} fill='#999' fontSize={options.barLabelFontSize}>{item[options.dataLabelKey]}</Text>
          <Rect x={barX} y={barY} width={barWidth} height={options.barHeight} fill={color}/>
        </G>
      )
    })

    let scales = this.getScale().map((item, index) => {
      let percent = item/scaleMax
      let labelX = Math.round(halfWidth-1+((halfWidth-1)*percent))
      let scaleLabel = options.scaleLabelFormat(item)
      return (
        <Text key={'scalelabel'+index} x={labelX} y='0' textAnchor='middle' fill='#555' font-size='15'>{scaleLabel}</Text>
      )
    })

    return (
      <View style={{width:options.width,height:height}}>
        <Svg width={svgWidth} height={svgHeight}>
          <Line x1="0" y1={titleHeight} x2={svgWidth} y2={titleHeight} stroke="#bbb" stroke-width="4"/>
          {scales}
          <Line x1={halfWidth} y1={axisStart} x2={halfWidth} y2={svgHeight-options.barGap} stroke="#999" stroke-width="1"/>
          {bars}
        </Svg>
      </View>
    )
  }
}

AssetDebtBarChart.propTypes = propTypes;
AssetDebtBarChart.defaultProps = defaultProps;

export default AssetDebtBarChart;

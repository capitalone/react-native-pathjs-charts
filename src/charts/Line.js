import React,{Component} from 'react'
import {Text as ReactText}  from 'react-native'
import Svg,{ G, Path } from 'react-native-svg'
import { Colors, Options, cyclic } from '../util'
import Axis from '../component/Axis'
import _ from 'lodash'

export default class LineChart extends Component {

  constructor(props, chartType) {
    super(props)
    this.chartType = chartType
  }

  getMaxAndMin(chart, key,scale) {
    let maxValue = 0
    let minValue = 0
    _.each(chart.curves, function (serie) {
      let values = _.map(serie.item, function (item) {
        return item[key]
      })

      let max = _.max(values)
      if (maxValue === undefined || max > maxValue) maxValue = max
      let min = _.min(values)
      if (minValue === undefined || min < minValue) minValue = min
    })

    return {
      minValue: minValue,
      maxValue: maxValue,
      min:scale(minValue),
      max:scale(maxValue)
    }
  }

  color(i) {
    let color = this.props.options.color
    if (!_.isString(this.props.options.color)) color = color.color
    let pallete = this.props.pallete || Colors.mix(color || '#9ac7f7')
    return Colors.string(cyclic(pallete, i))
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    let options = new Options(this.props)

    let accessor = function (key) {
      return function (x) {
        return x[key]
      }
    }

    let chart = this.chartType({
      data: this.props.data,
      xaccessor: accessor(this.props.xKey),
      yaccessor: accessor(this.props.yKey),
      width: options.chartWidth,
      height: options.chartHeight,
      closed: false
    })

    let chartArea = {
      x:this.getMaxAndMin(chart,this.props.xKey,chart.xscale),
      y:this.getMaxAndMin(chart,this.props.yKey,chart.yscale),
      margin:options.margin
    }

    let lines = _.map(chart.curves, function (c, i) {
      return <Path key={'lines' + i} d={ c.line.path.print() } stroke={ this.color(i) } fill="none"/>
    }.bind(this))
    let areas = _.map(chart.curves, function (c, i) {
      return <Path key={'areas' + i} d={ c.area.path.print() } fillOpacity={0.5} stroke="none" fill={ this.color(i) }/>
    }.bind(this))

    let offset = {
      x: chartArea.margin.left * -1,
      y: chartArea.margin.top * -1
    }

    let returnValue = <Svg width={options.width} height={options.height}>
                  <G x={options.margin.left} y={options.margin.top}>
                      <G x={offset.x} y={offset.y}>
                        { areas }
                        { lines }
                      </G>
                      <Axis key="x" scale={chart.xscale} options={options.axisX} chartArea={chartArea} />
                      <Axis key="y" scale={chart.yscale} options={options.axisY} chartArea={chartArea} />
                  </G>
              </Svg>

    return returnValue
  }
}

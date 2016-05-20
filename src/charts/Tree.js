import React, {Component} from 'react'
import {Text as ReactText}  from 'react-native'
import Svg,{ Circle, G, Path, Text } from 'react-native-svg'
import { Options, styleSvg, fontAdapt } from '../util'
import _ from 'lodash'
const Tree = require('paths-js/tree')

function children(x) {
  if(x.collapsed) {
    return []
  }
  else {
    return x.children || []
  }
}

export default class TreeChart extends Component {

  static defaultProps = {
    options: {
      margin: {top: 20, left: 50, right: 80, bottom: 20},
      width: 600,
      height: 600,
      fill: '#2980B9',
      stroke: '#3E90F0',
      r: 5,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        bold: true,
        fill: '#34495E'
      }
    }
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    const options = new Options(this.props)
    const tree = Tree({
      data: this.props.data,
      children: children,
      width: options.chartWidth,
      height: options.chartHeight
    })
    const colors = styleSvg({},options)
    const curves = _.map(tree.curves,function (c,i) {
      return <Path key={'curves_' + i} d={ c.connector.path.print() } fill="none" stroke={colors.stroke} strokeOpacity={colors.strokeOpacity} />
    })

    const fillOpacityStyle = 1
    const textStyle = fontAdapt(options.label)
    const r = options.r || 5
    const nodes = _.map(tree.nodes,function (n,index) {

      let text

      if (children(n.item).length > 0) {
        text = <Text style={textStyle} x={-10} y={-10} textAnchor="end">{ n.item.name }</Text>
      } else {
        text = <Text style={textStyle} x={10} y={-10} textAnchor="start">{ n.item.name }</Text>
      }

      return (<G key={'tree_' + index} x={n.point[0]} y={n.point[1]}>
                  <Circle fillOpacity={fillOpacityStyle} {...colors} r={r} cx="0" cy="0" />
                  { text }
              </G>)
    })

    return (
            <Svg width={options.width} height={options.height}>
                <G x={options.margin.left} y={options.margin.top}>
                    <G x={0} y={0}>
                    { curves }

                    { nodes }
                    </G>
                </G>
            </Svg>
        )
  }
}

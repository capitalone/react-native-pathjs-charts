import React from 'react'
import {View, Text as ReactText}  from 'react-native'
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg'
import Colors from '../pallete/colors';
import Options from '../component/options'
import fontAdapt from '../fontAdapter'
import Axis from '../component/Axis'
import _ from 'lodash'
var Pie = require('paths-js/pie');

function cyclic(coll, i) { return coll[i % coll.length]; }
function identity(key) { return function (x) {return x[key];}};
function color(key) { return function (x) {return x[key];}};

export default class PieChart extends React.Component
{
    color(i) {
        var color = this.props.options.color;
        if (color && !_.isString(color)) color = color.color;
        var pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i)); }


    get defaultRange() {
        return _.map(Array(this.props.data && this.props.data.length),function(){return 0});
    }

    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>);

        var options = new Options(this.props);

        var x = options.chartWidth / 2;
        var y = options.chartHeight / 2;

        var radius = Math.min(x, y);

        var chart = Pie({
            center: this.props.options.center || [0,0],
            r: this.props.options.r || radius /2,
            R: this.props.options.R || radius,
            data: this.props.data,
            accessor: this.props.accessor || identity(this.props.accessorKey)
        });

        var textStyle = fontAdapt(options.label);

        var slices = chart.curves.map( (c, i) => {
            var fill = this.color(i);
            var stroke = Colors.darkenColor(fill);
            return (
                <G key={ i } x={x - options.margin.left} y={y - options.margin.top}>
                    <Path d={c.sector.path.print() } stroke={stroke} fill={fill} fillOpacity={1}  />
                    <G x={options.margin.left} y={options.margin.top}>
                      <Text fontSize={textStyle.fontSize}
                            fontWeight={textStyle.fontWeight}
                            fontStyle={textStyle.fontStyle}
                            fill={textStyle.fill}
                            textAnchor="middle"
                            x={c.sector.centroid[0]}
                            y={c.sector.centroid[1]}>{ c.item.name }</Text>
                    </G>
                </G>
            )
        });

        let returnValue = <Svg width={options.width} height={options.height}>
            <G x={options.margin.left} y={options.margin.top}>
                { slices }
            </G>
          </Svg>;

        return returnValue
    }
};
PieChart.defaultProps = {
    options: {
        margin: {top: 20, left: 20, right: 20, bottom: 20},
        width: 600,
        height: 600,
        color: '#2980B9',
        r: 100,
        R: 200,
        legendPosition: 'topLeft',
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            bold: true,
            color: '#ECF0F1'
        }
    }
}

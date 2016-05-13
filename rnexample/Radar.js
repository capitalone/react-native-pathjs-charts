import React, {View}  from 'react-native'
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
import _ from 'lodash';
import Options from './options';
import fontAdapt from './fontAdapter';
import styleSvg from './styleSvg';

var Radar = require('paths-js/radar');

function identity(key) {
    return function (x) {
        return x[key];
    }
};
function accessKeys(keys) {
    var a = {};
    for (var i in keys) {
        var key = keys[i];
        a[key] = identity(key);
    }
    return a;
}

export default class RadarChart extends React.Component
{
    constructor(props){
        super(props)
    }
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<Text>{noDataMsg}</Text>);

        var options = new Options(this.props);

        var x = options.chartWidth / 2;
        var y = options.chartHeight / 2;
        var radius = Math.min(x, y);

        var center = this.props.center || [x, y];

        var keys = Object.keys(this.props.data[0]);
        var chart = Radar({
            center: this.props.center || [x, y],
            r: this.props.options.r || radius,
            data: this.props.data,
            accessor: this.props.accessor || accessKeys(keys),
            max: this.props.options.max
        });
        var self = this;
        var colors = styleSvg({}, self.props.options);
        var curves = chart.curves.map(function (c, i) {
            return (<Path key={i} d={c.polygon.path.print()} fill={colors.fill} fillOpacity={colors.fillOpacity}/>)
        });

        var length = chart.rings.length;
        var rings = chart.rings.map(function (r, i) {
            if (i !== length - 1 ){
                return (<Path key={"rings"+i} d={r.path.print()} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity} />)
            }
        });

        var textStyle = fontAdapt(options.label);

        var labels = chart.rings[length - 1].path.points().map(function (p, i) {
            return (
              <G key={"label" + i}>
                  <Line x1={p[0]} y1={p[1]} x2={center[0]} y2={center[1]} stroke={colors.stroke} strokeOpacity={colors.strokeOpacity}/>
                  <Text style={textStyle} textAnchor="middle" x={Math.floor(p[0])} y={Math.floor(p[1])}>{keys[i]}</Text>
              </G>
            )
        });

        let returnValue = <Svg width={options.width} height={options.height}>
                    <G x={options.margin.left} y={options.margin.top}>
                        {labels}
                        <G fill="none" stroke="none">
                            { rings }
                            <G opacity="0.6">
                                {curves}
                            </G>
                        </G>
                    </G>
                </Svg>;

        return returnValue
    }
};

RadarChart.defaultProps =    {
    options: {
        width: 600,
        height: 600,
        margin: {top: 20, left: 20, right: 20, bottom: 20},
        r: 300,
        max: 150,
        fill: "#2980B9",
        stroke: "#2980B9",
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition:3
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            bold: true,
            color: '#34495E'
        }
    }
}

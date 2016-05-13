import React, {View}  from 'react-native'
import Svg,{
    Circle as circle,
    Ellipse as ellipse,
    G as g,
    LinearGradient as lineargradient,
    RadialGradient as radialgradient,
    Line as line,
    Path as path,
    Polygon as polygon,
    Polyline as polyline,
    Rect as rect,
    Symbol as symbol,
    Text as text,
    Use as use,
    Defs as defs,
    Stop as stop
} from 'react-native-svg'
import _ from 'lodash';
import Options from '../component/Options.js';
import fontAdapt from '../fontAdapter.js';
import styleSvg from '../styleSvg.js';

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
        this.state = {finished:true};
    }
    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

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
            return (<path key={ i } d={ c.polygon.path.print()} fill={ colors.fill } fillOpacity={colors.fillOpacity}/>)
        });

        //var rings = chart.rings.map(function(r, i) {
        //    return (<path key={ i } d={ r.path.print() } stroke={ self.props.stroke } />)
        //});
        var length = chart.rings.length;

        var rings = chart.rings.map(function (r, i) {
            if (i !== length - 1) {
                return (<path key={ "rings" + i } d={ r.path.print() } stroke={ colors.stroke } strokeOpacity={colors.strokeOpacity}/>)
            }
        });
        //
        var textStyle = fontAdapt(options.label);

        var labels = chart.rings[length - 1].path.points().map(function (p, i) {
            return (
                <g  key={"label" + i}>
                    <line x1={p[0]} y1={p[1]} x2={center[0]} y2={center[1]}  stroke={ colors.stroke } strokeOpacity={colors.strokeOpacity}/>
                    <text style={textStyle} textAnchor="middle" transform={"translate(" + Math.floor( p[0]) + "," + Math.floor( p[1]) + ")"}>{keys[i]}</text>
                </g>
            )
        });
        return (<svg ref="vivus" width={options.width} height={options.height}>
                    <g transform={"translate(" + options.margin.left + "," + options.margin.top + ")"}>
                        {labels}
                        <g fill="none" stroke="none">
                            { rings }
                            <g opacity="0.6">
                                {this.state.finished?curves:null}
                            </g>
                        </g>
                    </g>
                </svg>
        )
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

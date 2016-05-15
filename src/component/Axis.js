import React from 'react' 
import {View}  from 'react-native'
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
import _ from 'lodash'

var Pathjs = require('paths-js/path');

class AxisStruct {

    constructor(scale, options, chartArea, horizontal) {
        this.scale = scale;
        this.options = options;
        this.chartArea = chartArea;
        this.margin = chartArea.margin;
        this.horizontal = horizontal;
    }

    static calcStepSize(range, targetSteps)
    {
        // calculate an initial guess at step size
        var tempStep = range / targetSteps;

        // get the magnitude of the step size
        var mag = Math.floor(Math.log(tempStep) /  Math.log(10));
        var magPow = Math.pow(10, mag);

        // calculate most significant digit of the new step size
        var magMsd = Math.round(tempStep / magPow + 0.5);

        // promote the MSD to either 1, 2, or 5
        if (magMsd > 5.0)
            magMsd = 10.0;
        else if (magMsd > 2.0)
            magMsd = 5.0;
        else if (magMsd > 1.0)
            magMsd = 2.0;

        return magMsd * magPow;
    }

    static getTickValues(axis, tickCount) {
        var tickStep = AxisStruct.calcStepSize((axis.maxValue - axis.minValue),tickCount);
        return _.range(axis.minValue, axis.maxValue + 1,tickStep);
    }

    axis() {

        var horizontal = this.horizontal;
        var xAxis = this.chartArea.x;
        var yAxis = this.chartArea.y;
        var currentAxis = horizontal?xAxis:yAxis;
        var tickInterval = this.options.tickCount || 10;
        var ticks = this.options.tickValues !== undefined && this.options.tickValues.length !== 0? _.map(this.options.tickValues,function(v){return v.value }):AxisStruct.getTickValues(currentAxis, tickInterval);
        var fixed = this.options.zeroAxis?this.scale(0):horizontal?yAxis.min:xAxis.min;
        var start = {x: horizontal?xAxis.min:fixed, y: horizontal?fixed:yAxis.min};
        var end = {x:horizontal?xAxis.max:fixed,y: horizontal?fixed:yAxis.max};

        var margin = this.margin;
        if (margin !== undefined){
            if (horizontal){
                start.x -= margin.left || 0;
                end.x += margin.right || 0;
            }
            else {
                start.y += margin.bottom || 0;
                end.y -= margin.top || 0;
            }
        }

        return {
            item: currentAxis,
            path: Pathjs().moveto(start).lineto(end).closepath(),
            ticks: ticks,
            lines: ticks.map(c => {
                var lineStart = {x: horizontal ? this.scale(c) : xAxis.min, y: horizontal ? yAxis.min : this.scale(c)};
                return Pathjs().moveto(lineStart).lineto(horizontal ? lineStart.x : xAxis.max, horizontal ? yAxis.max : lineStart.y);
            },this)
        };
    }
}

export default class Axis extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let { chartArea, options, scale } = this.props
        var horizontal = options.orient ==="top" || options.orient ==="bottom";

        var axis = new AxisStruct(scale,options,chartArea,horizontal).axis();

        var textAnchor = "start";
        if (options.orient === "top" || options.orient === "bottom") textAnchor = "middle";
        if (options.orient === "left") textAnchor = "end";
        if (options.orient === "right") textAnchor = "start";

        var xy = [0,0];
        if (options.orient === "top")  xy = [0,-5];
        if (options.orient === "bottom") xy = [0,5];
        if (options.orient === "left")  xy = [-5,-10];
        if (options.orient === "right")  xy = [5,5];

        var textStyle = fontAdapt(options.label);

        var ticks =_.map(axis.ticks, function (c, i) {
            var label = options.labelComponent !== undefined? React.cloneElement(options.labelComponent,{value:c}) : c;
            let gxy = horizontal ? [scale(c),chartArea.y.min]:[chartArea.x.min,scale(c)];

            let returnValue = <G key={i} x={gxy[0]} y={gxy[1]}>

                {options.showTicks &&
                  <Circle r="2" cx="0" cy="0" stroke="grey" fill="grey" />
                }

                {options.showLabels &&
                  <Text x={xy[0]} y={xy[1]}
                        fontFamily={textStyle.fontFamily}
                        fontSize={textStyle.fontSize}
                        fontWeight={textStyle.fontWeight}
                        fontStyle={textStyle.fontStyle}
                        fill={textStyle.fill}
                        textAnchor={textAnchor}>
                        {label.toString()}
                  </Text>}
            </G>;

            return returnValue;
        });


        var gridLines = options.showLines ? _.map(axis.lines, function (c, i) {
            return (
               <Path key={"gridLines" + i} d={c.print()} strokeOpacity={0.5} stroke="#3E90F0" fill="none"/>
            )
        }) : [];

        let offset = {
          x: chartArea.margin.left * -1,
          y: chartArea.margin.top * -1
        }

        let returnV = <G>
              <G x={offset.x} y={offset.y}>
                {options.showAxis ? <Path d={axis.path.print()} strokeOpacity={0.5} stroke="#3E90F0" strokeWidth={3} fill="none"/> : null}
              </G>
              {ticks}
              <G x={offset.x} y={offset.y}>
                {gridLines}
              </G>
            </G>;

        return returnV;

    }
}

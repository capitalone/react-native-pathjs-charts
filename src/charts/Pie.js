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
import Colors from '../pallete/Colors.js';
import Animate from '../animate.js';
import _ from 'lodash';
import Options from '../component/Options.js'
import fontAdapt from '../fontAdapter.js';

var Pie = require('paths-js/pie');

function cyclic(coll, i) { return coll[i % coll.length]; }
function identity(key) { return function (x) {return x[key];}};
function color(key) { return function (x) {return x[key];}};

export default class PieChart extends React.Component
{
    constructor(props)
    {
        super(props);
        this.animateState = Animate.Mixin.animateState;
        this.state = {
            expanded:this.defaultRange,
            finished:true
        };
    }
    get defaultRange() {
        return _.map(Array(this.props.data && this.props.data.length),function(){return 0});
    }
    translate(p) { return "translate(" + p[0] + "," + p[1] + ")" }

    move(point, perc) {
        return this.translate([point[0] * perc / 3, point[1] * perc / 3]);
    }
    //
    //grad(i) { return "grad-" + i }
    //
    //fill(i) { return "url(#grad-" + i  +")" }

    color(i) {
        var color = this.props.options.color;
        if (!_.isString(this.props.options.color)) color = color.color;
        var pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
        return Colors.string(cyclic(pallete, i)); }

    lighten(i) {
        var color = this.props.options.color;
        if (!_.isString(this.props.options.color)) color = color.color;
        var pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
        return Colors.string(Colors.lighten(cyclic(pallete, i))); }


    expand(i) {
        var self = this;

        return function() {
            var target = self.defaultRange;
            target[i] = 1;
            self.animateState({ expanded: target });
            //self.setState({ expanded: target });
        };
    }

    render() {
        var noDataMsg = this.props.noDataMessage || "No data available";
        if (this.props.data === undefined) return (<span>{noDataMsg}</span>);

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

        var self = this;
        var coefficients = this.state.expanded;
        var sec = options.animate.fillTransition || 0;
        var fillOpacityStyle = {fillOpacity:this.state.finished?1:0,transition: this.state.finished?'fill-opacity ' + sec + 's':''};

        var textStyle = fontAdapt(options.label);

        var slices = chart.curves.map(function(c, i) {
            var fill = self.color(i);
            var stroke = Colors.darkenColor(fill);
            return (
                <g key={ i } transform={ self.move(c.sector.centroid, coefficients[i]) }>
                    <path onClick={ self.expand(i) } style={fillOpacityStyle} d={ c.sector.path.print() } stroke={stroke} fill={fill} />
                    <text style={textStyle} textAnchor="middle" transform={ self.translate(c.sector.centroid) }>{ c.item.name }</text>
                </g>
            )
        });
        var selected = _.find(this.props.data, function(c, i) {
            return coefficients[i] === 1;
        });

        var legendClassName = "legend " + options.legendPosition;

        var table = selected ?
            <div className={legendClassName}>
                <h4>{ selected.name }</h4>
                <p><span className="label label-info">{ selected.population }</span></p>
            </div> : null



        return(
            <div className="pie">
                <svg ref="vivus" width={options.width} height={options.height}>
                    <g transform={"translate(" + (options.margin.left + x) + "," + (options.margin.top + y) + ")"}>
                        { slices }
                    </g>
                </svg>
            { table }
            </div>
        )}
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

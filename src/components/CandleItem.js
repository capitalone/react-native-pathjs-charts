/**
 * @file 蜡烛子图
 * @author liuliang<liuliang@kavout.com>
 */

import React, {Component} from 'react';
import {Text as ReactText, View} from 'react-native';
import Svg, {
    G
} from 'react-native-svg';
import Axis from '../Axis';

export default class CandleItemChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            isHoverCovered: false,
            isHoverCoveredRight: false
        };
    }

    onPressIn(e) {
        // const screenWidth = Dimensions.get('window').width;

        this.setState({
            isHover: true,
            isHoverCovered: true,
            isHoverCoveredRight: true
            // isHoverCoveredLeft: e.nativeEvent.pageX < (tooltipWidth / 2 + 10),
            // isHoverCoveredRight: e.nativeEvent.pageX + tooltipWidth / 2 + 20 > screenWidth
        });
    }

    onPressOut(e) {
        this.setState({
            isHover: false,
            isHoverCovered: false,
            isHoverCoveredRight: false
        });
    }

    render() {

        const {
            options,
            chart,
            axisYOptions,
            axisXOptions,
            chartArea,
            lines
        } = this.props;

        return (
                <Svg width={options.width} height={options.height}>
                    <G x={options.margin.left} y={options.margin.top}>
                        <Axis
                            scale={chart.scale}
                            options={axisYOptions}
                            chartArea={chartArea}

                        />
                        <Axis
                            scale={chart.scale}
                            options={axisXOptions}
                            chartArea={chartArea}
                            curves={chart.curves}
                        />
                        {lines}
                    </G>
                </Svg>
        );
    }
}

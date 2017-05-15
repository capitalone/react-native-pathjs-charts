import React, {
    Component
} from 'react';

import {
    PanResponder
} from 'react-native';

import Svg, {
    Path,
    Text,
    G,
    Line,
    Polyline
} from 'react-native-svg';

class PanExample extends Component {
    static title = 'Bind PanResponder on the SVG Shape';

    constructor() {
        super(...arguments);
        this.state = {
            x: 0,
            y: 0,
            hover: false
        };
    }

    componentWillMount = () => {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._alwaysTrue,
            onMoveShouldSetPanResponder: this._alwaysTrue,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
    };

    _previousLeft = 0;

    _previousTop = 0;

    _alwaysTrue = () => true;

    _handlePanResponderMove = (e, gestureState) => {
        this.setState({
            x: this._previousLeft + gestureState.dx,
            y: this._previousTop + gestureState.dy
        });
    };

    _handlePanResponderGrant = () => {
        this.root.setNativeProps({
            opacity: 0.5
        });
    };

    _handlePanResponderEnd = (e, gestureState) => {
        this.root.setNativeProps({
            opacity: 1
        });
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    };


    render () {
        return <Svg
            height="200"
            width="200"
        >
            <G
                ref={ele => {this.root = ele;}}
                x={this.state.x}
                y={this.state.y}
            >
                <Path
                    d="M50,5L20,99L95,39L5,39L80,99z"
                    stroke={'black'}
                    fill={'red'}
                    strokeWidth="6"
                    scale="0.8"
                    {...this._panResponder.panHandlers}
                />
                <Text fontSize="20" fontWeight="bold" fill="blue" textAnchor="middle" x="40" y="80">STAR</Text>
            </G>
        </Svg>;
    }
}

const icon = <Svg
    height="20"
    width="20"
>
    <G strokeWidth="1" stroke="#ccc" fill="#ccc">
        <Line x1="4" y1="5" x2="16" y2="5" />
        <Polyline points="6,2 4,5 6,8" />
        <Line x1="10" y1="1" x2="10" y2="5" />
        <Polyline points="14,2 16,5 14,8" />
        <Polyline points="7,3 10,1 13,3" />
    </G>
    <Path fill="#fff" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d={`M6.2,9.4
          c0,0,0-0.1,0-0.2c0-0.2,0.1-0.3,0.1-0.4c0.2-0.4,0.5-0.7,1-0.7c0.3,0,0.5,0,0.6,0h0.1v0.7V10 M8.1,8.8c0,0,0-0.1,0-0.2
	c0-0.2,0.1-0.3,0.1-0.4c0.2-0.4,0.5-0.7,1-0.7c0.3,0,0.5,0,0.6,0h0.1v1.9 M10.1,7.5v-2c0,0,0-0.1,0-0.2c0-0.2,0.1-0.3,0.1-0.4
	c0.2-0.4,0.5-0.6,0.9-0.7c0.4,0,0.7,0.2,0.9,0.7C12,5,12,5.2,12,5.4c0,0.1,0,0.1,0,0.2v6c1.4-1.8,2.4-1.8,2.8,0.1
	c-1.7,1.5-2.9,3.7-3.4,6.4l-5.8,0c-0.2-0.6-0.5-1.4-0.7-2.5c-0.3-1-0.5-2.5-0.6-4.5l0-0.8c0-0.1,0-0.1,0-0.2c0-0.2,0.1-0.3,0.1-0.4
	c0.2-0.4,0.5-0.7,1-0.7c0.3,0,0.5,0,0.6,0l0.1,0v0.5c0,0,0,0,0,0l0,1.1l0,0.2 M6.2,10.9l0-0.4`}/>
</Svg>;

const samples = [
    PanExample
];

const scroll = false;

export {
    icon,
    samples,
    scroll
};

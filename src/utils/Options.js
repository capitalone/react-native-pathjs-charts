/**
 * @file 蜡烛图工具函数Options入口
 * @author liuliang<liuliang@kavout.com>
 */

export default function (props) {
    let {options = {}} = props;
    delete props.options;

    let option = Object.assign({
        legendPosition: 'topLeft',
        axisY: {},
        axisX: {},
        margin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        stroke: '#FFFFFF',
        fill: '#FFFFFF',
        r: 0,
        R: 0,
        label: {},
        animate: {},
        min: 0,
        max: 0,
        width: 400,
        height: 400,
        chartWidth: 0,
        chartHeight: 0
    }, options, props);

    // 更新chartWidth以及chartHeight
    option.chartHeight = option.height;
    option.chartWidth = option.width;
    // 更新width以及height
    option.width = option.margin.left + option.margin.right + option.chartWidth;
    option.height = option.margin.top + option.margin.bottom + option.chartHeight;

    return option;
}

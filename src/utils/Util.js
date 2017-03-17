/**
 * @file 蜡烛图工具函数
 * @author liuliang<liuliang@kavout.com>
 */

import _ from 'lodash';

export const cyclic = (coll, i) => {
    return coll[i % coll.length];
};
export const identity = (key) => {
    return function (x) {
        return x[key];
    };
};

export const styleSvg = (style = {}, sourceProps) => {
    if (sourceProps === undefined) {
        return style;
    }
    if (sourceProps.fill) {
        style.fill = _.isString(sourceProps.fill) ? sourceProps.fill : sourceProps.fill.color;
        style.fillOpacity = sourceProps.fill.alpha ? sourceProps.fill.alpha / 100 : 1;
    }
    if (sourceProps.stroke) {
        style.stroke = _.isString(sourceProps.stroke) ? sourceProps.stroke : sourceProps.stroke.color;
        style.strokeOpacity = sourceProps.stroke.alpha ? sourceProps.stroke.alpha / 100 : 1;
    }
    if (sourceProps.strokeWidth)        {
        style.strokeWidth = sourceProps.strokeWidth;
    }
    return style;
};

export const fontAdapt = (fontProps) => {

    const fill = fontProps.color ? (_.isString(fontProps.color) ? fontProps.color : fontProps.color.color)
                : fontProps.fill;
    return {
        fontFamily: fontProps.fontFamily,
        fontSize: fontProps.fontSize,
        fontWeight: fontProps.fontWeight ? 'bold' : 'normal',
        fontStyle: fontProps.fontStyle ? 'italic' : 'normal',
        fill: fill
    };
};

export const isSetValue = (v) => typeof v !== 'undefined';

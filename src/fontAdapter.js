import React, {StyleSheet}  from 'react-native'
import _ from 'lodash';

export default function fontAdapt(fontProps) {
    var style = StyleSheet.create({});
    if (fontProps === undefined) return style;
    style = _.omit(fontProps,['color','bold','italic','underline']);
    if (fontProps.color) style['fill'] = _.isString(fontProps.color)?fontProps.color:fontProps.color.color;
    if (fontProps.bold) style['fontWeight'] = 'bold';
    if (fontProps.italic) style['fontStyle'] = 'italic';
    if (fontProps.underline) style['borderBottom'] = '1px dashed #999';
    return style;
}

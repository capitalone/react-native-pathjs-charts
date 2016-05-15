import _ from 'lodash'

export default function fontAdapt(fontProps) {

    //_.isString(fontProps.color)?fontProps.color:fontProps.color.color
    // if (fontProps.underline) {
    //   style['borderBottomWidth'] = 1
    //   style['borderColor'] = '#999'
    // }
    const fill = fontProps.color ? (_.isString(fontProps.color) ? fontProps.color : fontProps.color.color ) : fontProps.fill

    return {
      fontFamily: fontProps.fontFamily,
      fontSize: fontProps.fontSize,
      fontWeight: fontProps.fontWeight ? 'bold' : 'normal',
      fontStyle: fontProps.fontStyle ? 'italic' : 'normal' ,
      fill: fill
    }
}

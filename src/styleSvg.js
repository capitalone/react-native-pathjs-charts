import _ from 'lodash';

export default function styleSvg(style, sourceProps) {

	if (style === undefined) style = {};
	if (sourceProps === undefined) return style;
	
	if (sourceProps.fill) {
		style.fill = _.isString(sourceProps.fill)?sourceProps.fill:sourceProps.fill.color;
		style.fillOpacity = !!sourceProps.fill.alpha? sourceProps.fill.alpha/100:1;
	}
	if (sourceProps.stroke) {
		style.stroke = _.isString(sourceProps.stroke)?sourceProps.stroke:sourceProps.stroke.color;
		style.strokeOpacity =!!sourceProps.stroke.alpha? sourceProps.stroke.alpha/100:1;
	}
	if (sourceProps.strokeWidth) style.strokeWidth = sourceProps.strokeWidth;
	return style;
}


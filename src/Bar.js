/**
 * @file 蜡烛图底层实现
 * @author liuliang<liuliang@kavout.com>
 */

import linear from './Linear';
import rectangle from './Rectangle';
import {id, enhance} from './Ops';

export default function ({
    data,
    accessor = id,
    width,
    height,
    min = 0,
    max = 0,
    gutter = 10,
    offset = [0, 0],
    barWidth,
    compute}) {
    let groups = [];
    let minUnset = !min;
    let maxUnset = !max;
    let [offX] = offset;
    let candleWidth = 0.5;

    for (let [i, d] of data.entries()) {
        for (let [j, el] of d.entries()) {
            if (groups[j] == null) {
                groups[j] = [];
            }
            let val = accessor(el);
            if (minUnset && (val < min)) {
                min = val;
            }
            if (maxUnset && (val > max)) {
                max = val;
            }
            groups[j][i] = val;
        }

    }

    let n = data[0].length;
    let scale = linear([min, max], [height, 0]);
    barWidth = barWidth || (width - (n - 1) * gutter) / n;
    let curves = [];
    for (let [i, d] of data.entries()) {
        // let curve = {lines: null, index: 0, group: i, item: d, centroid: 0};
        let shift = (barWidth + gutter) * i + offX;
        let xCenterPoint = 0;
        let reactangles = [];
        let left = 0;
        let right = 0;
        let top = 0;
        let bottom = 0;
        for (let j = 0, length = d.length, half = length / 2; j < length; j += 2) {
            left = j <  half ? shift : xCenterPoint;
            right = j < half ? shift + barWidth : xCenterPoint + candleWidth;
            top = scale(groups[j][i]);
            bottom = scale(groups[j + 1][i]);
            reactangles.push(
                rectangle({
                    left,
                    right,
                    top,
                    bottom
                })
            );
            xCenterPoint = (shift * 2 + barWidth) / 2;
        }
        let curve = {
            lines: reactangles.reverse(),
            index: 0,
            group: i,
            item: d,
            centroid: xCenterPoint
        };
        curves.push(enhance(compute, curve));
    }
    return {curves, scale};
}

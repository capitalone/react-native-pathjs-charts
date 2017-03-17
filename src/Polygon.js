/**
 * @file 蜡烛图polygon函数
 * @author liuliang<liuliang@kavout.com>
 */

import path from './Path';
import {average} from './Ops';

export default function ({points, closed}) {
    let {length: l} = points;
    let [head] = points;
    let tail = points.slice(1, l + 1);
    let paths = tail.reduce(
        (pt, p) => pt.lineto(...p),
        path().moveto(...head)
    );

    return {
        path: closed ? paths.closepath() : paths,
        centroid: average(points)
    };
}

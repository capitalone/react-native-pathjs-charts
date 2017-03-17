/**
 * @file 蜡烛图rectangle函数
 * @author liuliang<liuliang@kavout.com>
 */

import polygon from './Polygon';

export default function ({
        left,
        right,
        top,
        bottom
    }, closed = true) {
    return polygon({
        points: [
            [right, top],
            [right, bottom],
            [left, bottom],
            [left, top]
        ],
        closed
    });
}

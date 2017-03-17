/**
 * @file 蜡烛图linear
 * @author liuliang<liuliang@kavout.com>
 */

let linear = function ([a, b], [c, d]) {
    let f = (x) => c + (d - c) * (x - a) / (b - a);
    f.inverse = () => linear([c, d], [a, b]);
    return f;
};

export default linear;

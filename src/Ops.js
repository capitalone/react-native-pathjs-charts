/**
 * @file 蜡烛图Ops函数
 * @author liuliang<liuliang@kavout.com>
 */

let sum = (xs) => xs.reduce((a, b) => a + b, 0);

let min = (xs) => xs.reduce((a, b) => Math.min(a, b));

let max = (xs) => xs.reduce((a, b) => Math.max(a, b));

let minOrMax = (xs, comparator = (a, b) => a - b) => xs.reduce(function (a, b) {
    return comparator(a, b) >= 0 ? b : a;
});

let sumBy = (xs, f) => xs.reduce((a, b) => a + f(b), 0);

let minBy = (xs, f) => xs.reduce((a, b) => Math.min(a, f(b)), Infinity);

let maxBy = (xs, f) => xs.reduce((a, b) => Math.max(a, f(b)), -Infinity);

let plus = ([a, b], [c, d]) => [a + c, b + d];

let minus = ([a, b], [c, d]) => [a - c, b - d];

let times = (k, [a, b]) => [k * a, k * b];

let length = ([a, b]) => Math.sqrt(a * a + b * b);

let sumVectors = (xs) => xs.reduce(plus, [0, 0]);

let average = (points) => times((1 / points.length), points.reduce(plus));

let onCircle = (r, angle) => times(r, [Math.sin(angle), -Math.cos(angle)]);

let enhance = (compute = {}, curve) => {
    for (let [key, val] of Object.entries(compute)) {
        curve[key] = val(curve.index, curve.item, curve.group);
    }
    return curve;
};

let range = (a, b, inclusive) => {
    let result = [];
    for (let i = a; i < b; i++) {
        result.push(i);
    }
    if (inclusive) {
        result.push(b);
    }
    return result;
};

let mapObject = (obj, f) => {
    let result = [];
    for (let k of Object.keys(obj)) {
        let v = obj[k];
        result.push(f(k, v));
    }
    return result;
};

let pairs = (obj) =>
    mapObject(obj, (k, v) => [k, v]);

let id = (x) => x;

export {sum, min, max, minOrMax, sumBy, minBy, maxBy, plus, minus, times, id,
length, sumVectors, average, onCircle, enhance, range, mapObject, pairs};

export default {sum, min, max, minOrMax, sumBy, minBy, maxBy, plus, minus, times, id,
    length, sumVectors, average, onCircle, enhance, range, mapObject, pairs};

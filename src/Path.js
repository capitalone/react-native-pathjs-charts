/**
 * @file 蜡烛图path函数
 * @author liuliang<liuliang@kavout.com>
 */

import _ from 'lodash';

export default function path(instructions = []) {

    let push = (arr, el) => [...arr, el];

    let areEqualPoints = ([a1, b1], [a2, b2]) => (a1 === a2) && (b1 === b2);

    let trimZeros = (string) => {
        return parseFloat(string) + '';
    };

    let round = (number, digits) => {
        const str = number.toFixed(digits);
        return trimZeros(str);
    };

    let printInstrunction = ({ command, params }) => {
        let numbers = params.map((param) => round(param, 6));
        return `${ command } ${ numbers.join(' ') }`;
    };

    let point = ({ command, params }, [prevX, prevY]) => {
        switch (command) {
            case 'M':
                return [params[0], params[1]];
            case 'L':
                return [params[0], params[1]];
            case 'H':
                return [params[0], prevY];
            case 'V':
                return [prevX, params[0]];
            case 'Z':
                return null;
            case 'C':
                return [params[4], params[5]];
            case 'S':
                return [params[2], params[3]];
            case 'Q':
                return [params[2], params[3]];
            case 'T':
                return [params[0], params[1]];
            case 'A':
                return [params[5], params[6]];
        }
    };

    let verbosify = (keys, f) =>
        function (...arg) {
            let a = arg[0];
            let args = (_.isPlainObject(a)) ? keys.map((k) => a[k]) : arg;
            return f.apply(null, args);
        };

    let plus = (instruction) => path(push(instructions, instruction));

    return ({
        moveto: verbosify(['x', 'y'], (x, y) =>
            plus({
                command: 'M',
                params: [x, y]
            })
        ),
        lineto: verbosify(['x', 'y'], (x, y) =>
            plus({
                command: 'L',
                params: [x, y]
            })
        ),
        hlineto: verbosify(['x'], (x) =>
            plus({
                command: 'H',
                params: [x]
            })
        ),
        vlineto: verbosify(['y'], (y) =>
            plus({
                command: 'V',
                params: [y]
            })
        ),
        closepath() {
            return plus({
                command: 'Z',
                params: []
            });
        },
        curveto: verbosify(['x1', 'y1', 'x2', 'y2', 'x', 'y'], (x1, y1, x2, y2, x, y) =>
            plus({
                command: 'C',
                params: [x1, y1, x2, y2, x, y]
            })
        ),
        smoothcurveto: verbosify(['x2', 'y2', 'x', 'y'], (x2, y2, x, y) =>
            plus({
                command: 'S',
                params: [x2, y2, x, y]
            })
        ),
        qcurveto: verbosify(['x1', 'y1', 'x', 'y'], (x1, y1, x, y) =>
            plus({
                command: 'Q',
                params: [x1, y1, x, y]
            })
        ),
        smoothqcurveto: verbosify(['x', 'y'], (x, y) =>
            plus({
                command: 'T',
                params: [x, y]
            })
        ),
        arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
            ({rx, ry, xrot, largeArcFlag, sweepFlag, x, y}) =>
            // 注意.eslintrc允许参数最大个数为6个，所以只要用解构来跳过
                plus({
                    command: 'A',
                    params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
                })
        ),
        print() {
            return instructions.map(printInstrunction).join(' ');
        },
        toString() {
            return this.print();
        },
        points() {
            let ps = [];
            let prev = [0, 0];
            for (let instruction of instructions) {
                let p = point(instruction, prev);
                prev = p;
                if (p) {
                    ps.push(p);
                }
            }
            return ps;
        },
        instructions() {
            return instructions.slice(0, instructions.length);
        },
        connect(path) {
            let ps = this.points();
            let last = ps[ps.length - 1];
            // console.log(path);
            let first = path.points()[0];
            let newInstructions = path.instructions().slice(1);
            if (!areEqualPoints(last, first)) {
                newInstructions.unshift({
                    command: 'L',
                    params: first
                });
            }
            return path(this.instructions().concat(newInstructions));
        }
    });
}

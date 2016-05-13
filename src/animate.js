import React from 'react';

    function interpolate(a, b, t) {
        if (Array.isArray(b)) {
            return b.map(function(x, i) {
                return interpolate(a[i], x, t);
            });
        }
        if (typeof b === 'object') {
            var res = {}, k;
            for (var k in b) {
                // No need to check hasOwnProperty,
                // we are working with object literals
                res[k] = interpolate(a[k], b[k], t);
            }
            return res;
        }
        if (typeof b === 'number') {
            return a + (b - a) * t;
        }
        return a;
    }

    function copy(obj) {
        var res = {}, k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                res[k] = obj[k];
            }
        }
        return res;
    }

    var s = 1.70158;

    var easingTypes = {
        linear: function(t) {
            return t;
        },
        easeInQuad: function (t) {
            return t * t;
        },
        easeOutQuad: function (t) {
            return -t * (t - 2);
        },
        easeInOutQuad: function (t) {
            return (t < 1/2) ? (2 * t * t) : (-2 * t * t + 4 * t - 1);
        },
        easeInElastic: function (t) {
            var q = t - 1;
            return -Math.pow(2, 10 * q) * Math.sin((2 * q / 0.3 - 0.5) * Math.PI);
        },
        easeOutElastic: function (t) {
            return Math.pow(2, -10 * t) * Math.sin( (2 * t / 0.3 - 0.5)* Math.PI) + 1;
        },
        easeInOutElastic: function (t) {
            var q = 2 * t - 1;
            if (t < 1/2) return -0.5 * Math.pow(2, 10 * q) * Math.sin((q / 0.225 - 0.5) * Math.PI);
            else return Math.pow(2,-10 * q) * Math.sin((q / 0.225 - 0.5) * Math.PI) * 0.5 + 1;
        },
        easeInBack: function (t) {
            return t * t * ((s + 1) * t - s);
        },
        easeOutBack: function (t) {
            var q = t - 1;
            return q * q * ((s + 1) * q + s) + 1;
        },
        easeInOutBack: function (t) {
            var r = s * 1.525;
            if (t < 1 / 2) return 2 * t * t * ((r + 1) * 2 * t - r)
            else {
                var q = t - 1;
                return 2 * q * q * ((r + 1) * 2 * q + r) + 1;
            }
        },
        easeInBounce: function (t) {
            return 1 - easingTypes.easeOutBounce(1 - t);
        },
        easeOutBounce: function (t) {
            var q = 2.75 * t;
            var l = 7.5625;
            if (q < 1) { return l * t * t }
            else if (q < 2) {
                var p = t - 1.5 / 2.75;
                return l * p * p + 0.75;
            }
            else if (q < 2.5) {
                var p = t - 2.25 / 2.75;
                return l * p * p + 0.9375;
            }
            else {
                var p = t - 2.625 / 2.75;
                return l * p * p + 0.984375;
            }
        },
        easeInOutBounce: function (t) {
            return (t < 1/2) ?
            easingTypes.easeInBounce(2 * t) / 2 :
            (easingTypes.easeOutBounce(2 * t - 1) + 1) / 2;
        }
    };

    /*
     *
     * TERMS OF USE - EASING EQUATIONS
     *
     * Open source under the BSD License.
     *
     * Copyright © 2001 Robert Penner
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     * Redistributions of source code must retain the above copyright notice, this list of
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list
     * of conditions and the following disclaimer in the documentation and/or other materials
     * provided with the distribution.
     *
     * Neither the name of the author nor the names of contributors may be used to endorse
     * or promote products derived from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     * OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     */

    export default {
        easing: easingTypes,
        Mixin: {
            animateState: function (target, options) {
                options = options || {};
                var start = Date.now();
                var initialState = copy(this.state);
                var duration = options.duration || 500;
                var easing = options.easing || easingTypes.easeInOutQuad;
                var self = this;

                function updateState() {
                    var t = Math.min(Date.now() - start, duration) / duration;
                    self.setState(interpolate(initialState, target, easing(t)));

                    if (t < 1) {
                        requestAnimationFrame(updateState);
                    }
                    else {
                        if (options.done) options.done();
                    }
                }

                requestAnimationFrame(updateState);
            }
        }
    };
class Colors {
    cut(x) {
        return Math.min(255, Math.floor(Math.abs(x)));
    }

    multiply(factor) {
        return function (c) {
            return {
                r: this.cut(factor * c.r),
                g: this.cut(factor * c.g),
                b: this.cut(factor * c.b)
            };
        }.bind(this);
    }

    average(c1, c2) {
        return {
            r: this.cut((c1.r + c2.r) / 2),
            g: this.cut((c1.g + c2.g) / 2),
            b: this.cut((c1.b + c2.b) / 2)
        };
    }

    lighten(c){return this.multiply(1.2)(c)};
    darken(c){return this.multiply(0.8)(c)};
    darkenColor(c) {return this.string(this.darken(this.hexToRgb(c)))}

    mix(color1) {
        var c1 = this.hexToRgb(color1);
        var c2 = this.multiply(0.5)(c1);
        var c3 = this.average(c1, c2);
        return [this.lighten(c1), c1, this.darken(c1), this.lighten(c3), c3, this.darken(c3), this.lighten(c2), c2, this.darken(c2)];
    }

    string(c) {
        return this.rgbToHex(Math.floor(c.r),Math.floor(c.g),Math.floor(c.b));
        //return "rgb(" + (Math.floor(c.r)) + "," + (Math.floor(c.g)) + "," + (Math.floor(c.b)) + ")";
    }
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

};
const colour = new Colors();
export default colour;

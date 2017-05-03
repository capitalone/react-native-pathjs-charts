/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

import _ from 'lodash'

export const cyclic = (coll, i) => { return coll[i % coll.length] }
export const identity = (key) => { return function (x) { return x[key] }}
export const color = (key) => { return function (x) { return x[key] } }

export const styleSvg = (style = {}, sourceProps) => {
  if (sourceProps === undefined) return style

  if (sourceProps.fill) {
    style.fill = _.isString(sourceProps.fill) ? sourceProps.fill : sourceProps.fill.color
    style.fillOpacity = sourceProps.fill.alpha ? sourceProps.fill.alpha/100 : 1
  }
  if (sourceProps.stroke) {
    style.stroke = _.isString(sourceProps.stroke) ? sourceProps.stroke : sourceProps.stroke.color
    style.strokeOpacity = sourceProps.stroke.alpha ? sourceProps.stroke.alpha/100 : 1
  }
  if (sourceProps.strokeWidth)
    style.strokeWidth = sourceProps.strokeWidth
  return style
}

export const fontAdapt = (fontProps) => {

  const fill = fontProps.color ? (_.isString(fontProps.color) ? fontProps.color : fontProps.color.color ) : fontProps.fill

  return {
    fontFamily: fontProps.fontFamily,
    fontSize: fontProps.fontSize,
    rotate: fontProps.rotate || 0,
    fontWeight: fontProps.fontWeight ? 'bold' : 'normal',
    fontStyle: fontProps.fontStyle ? 'italic' : 'normal' ,
    fill: fill
  }
}

class colours {
  cut(x) {
    return Math.min(255, Math.floor(Math.abs(x)))
  }

  multiply(factor) {
    return function (c) {
      return {
        r: this.cut(factor * c.r),
        g: this.cut(factor * c.g),
        b: this.cut(factor * c.b)
      }
    }.bind(this)
  }

  average(c1, c2) {
    return {
      r: this.cut((c1.r + c2.r) / 2),
      g: this.cut((c1.g + c2.g) / 2),
      b: this.cut((c1.b + c2.b) / 2)
    }
  }

  lighten(c){return this.multiply(1.2)(c)}
  darken(c){return this.multiply(0.8)(c)}
  darkenColor(c) {return this.string(this.darken(this.hexToRgb(c)))}

  mix(color1) {
    const c1 = this.hexToRgb(color1)
    const c2 = this.multiply(0.5)(c1)
    const c3 = this.average(c1, c2)
    return [this.lighten(c1), c1, this.darken(c1), this.lighten(c3), c3, this.darken(c3), this.lighten(c2), c2, this.darken(c2)]
  }

  string(c) {
    return this.rgbToHex(Math.floor(c.r),Math.floor(c.g),Math.floor(c.b))
        //return "rgb(" + (Math.floor(c.r)) + "," + (Math.floor(c.g)) + "," + (Math.floor(c.b)) + ")";
  }
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }
  componentToHex(c) {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
  }
}
export const Colors = new colours()

export class Options {

  constructor(props) {
    this.props = props
    this.options =  props.options || {}
    this.chartWidth = props.width || this.options.width || 400
    this.chartHeight = props.height || this.options.height || 400
    this.width = this.chartWidth + (this.margin.right || 0) +  (this.margin.left || 0)
    this.height = this.chartHeight + (this.margin.top || 0) + (this.margin.bottom || 0)
    this.min = props.min || this.options.min
    this.max = props.max || this.options.max
  }
  get legendPosition(){ return this.props.legendPosition || (this.props.options && this.props.options.legendPosition) || 'topLeft'}
  get axisX() {return this.props.axisX || (this.props.options && this.props.options.axisX) || {}}
  get axisY() {return this.props.axisY || (this.props.options && this.props.options.axisY) || {}}
  get margin(){return this.props.margin || (this.props.options && this.props.options.margin) || {}}
  get stroke(){return this.props.stroke || (this.props.options && this.props.options.stroke)}
  get fill(){return this.props.fill || (this.props.options && this.props.options.fill)}
  get r(){return this.props.r || (this.props.options && this.props.options.r)}
  get R(){return this.props.R || (this.props.options && this.props.options.R)}
  get label(){return this.props.label || (this.props.options && this.props.options.label) || {}}
  get animate() {return this.props.animate || (this.props.options && this.props.options.animate) || {}}
}

react-native-pathjs-charts
=======================

[![npm version](https://badge.fury.io/js/react-native-pathjs-charts.svg)](https://badge.fury.io/js/react-native-pathjs-charts)
[![](https://img.shields.io/badge/react--native--svg-4.5.0-blue.svg)](https://www.npmjs.com/package/react-native-svg)
[![](https://img.shields.io/badge/react--native-0.41-orange.svg)](https://facebook.github.io/react-native/)
[![](https://img.shields.io/badge/android--ff69b4.svg)](http://developer.android.com/sdk/index.html)
[![](https://img.shields.io/badge/ios--red.svg)](https://developer.apple.com/xcode/)
[![](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

This library is a cross-platform (iOS/Android) library of charts/graphs using [react-native-svg](https://github.com/magicismight/react-native-svg) and [paths-js](https://github.com/andreaferretti/paths-js) based on the excellent work done by Roman Samec in the [react-pathjs-chart](https://github.com/rsamec/react-pathjs-chart) library. The project is an early attempt at providing a ubiquitous solution for charts & graphs for React Native that offer a unified view across devices.

Components include Pie charts, Bar charts, Smoothline charts, Stockline charts, Scatterplots, Tree graphs and Radar graphs. Since Paths-Js makes no assumptions about rendering, this library is perfect for using SVG path objects to render custom charts easily.

This library is in its early stages, but I welcome contributors who would like to help make this the charting solution for React Native. Many of our mobile experiences need to create dashboards. Up to now, we've only been seeing libraries that are native bridges. Wouldn't it be great to have a cross platform solution that just worked?

![](https://github.com/capitalone/react-native-pathjs-charts/wiki/images/chart-screenshots.png)

## Installation

To add the library to your React Native project:

```
npm install react-native-pathjs-charts --save
react-native link react-native-svg
```

For further information on usage, see the [docs](http://www.capitalone.io/react-native-pathjs-charts/)


## Current Features

+ Pie, Bar, Smoothline, Stockline, Scatterplot, Tree and Radar graphs
+ Configuration of format, labels, colors, axis, ticks, lines
+ No touch support (yet)
+ No animations (yet)
+ Chart information configurable based on data parameters which specify which variables are accessors
+ Rendering works on iOS/Android
+ No native dependencies for linking (except linking required by [react-native-svg](https://github.com/magicismight/react-native-svg))

## Example Application

To run the example application (from a cloned repo):

```
cd example
npm install
react-native link react-native-svg
react-native run-ios
# or
react-native run-android
```

### Developing and Testing With The Example App

As you are working on changing src files in this library and testing those changes against the example app, it is necessary to copy files to example/node_modules/react-native-pathjs-charts each time a change is made. To automate this, a `sync-rnpc` script has been added that will create a background process to watch for src file changes and automatically copy them. To enable this:

```
cd example
npm run sync-rnpc
```

## Todo

For this library to really shine, there are a lot of improvements to be made. Here are some of my top ideas:
+ Add basic animations to draw the charts
+ Add touch functionality (as the react-native-svg library adds touch features)
+ Add the ability to absolutely position regular React-Native views in relation to SVG chart elements
+ More chart types
+ More axis controls (to control scale)
+ Add View component support to allow custom components instead of message when no data appears
+ Events
+ More documentation, information on configuration
+ Extended examples
+ Bug fixing, unit testing, cleanup
+ CICD pipeline with confirmed build success


## Contributing

Contributors:
We welcome your interest in Capital One’s Open Source Projects (the “Project”). Any Contributor to the project must accept and sign a CLA indicating agreement to the license terms. Except for the license granted in this CLA to Capital One and to recipients of software distributed by Capital One, you reserve all right, title, and interest in and to your contributions; this CLA does not impact your rights to use your own contributions for any other purpose.

[Link to CLA](https://docs.google.com/forms/d/19LpBBjykHPox18vrZvBbZUcK6gQTj7qv1O5hCduAZFU/viewform)

This project adheres to the [Open Source Code of Conduct](http://www.capitalone.io/codeofconduct/). By participating, you are expected to honor this code.

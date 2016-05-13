Chart library
=======================

These component offers react components - charts (Pie,Bar,SmoothLine,StockLine,Scatterplot,Tree,Radar) using [paths-js](https://github.com/andreaferretti/paths-js).

It is based on clone of these examples from [path-js](https://github.com/andreaferretti/paths-js-react-demo) and is extended so that it is easier to use it.

+   configuration of formats, labels, colors, axis, ticks, lines, animations, ...
+   support for chart animation - using vivus [vivus](https://github.com/maxwellito/vivus)
+   instead of accessor function you can use string key to determine the accessor key in data
+   server rendering
+   wrapped to be used by package managers (npm, bower) or standalone package

## Demo & Examples

[Live demo](http://rsamec.github.io/react-pathjs-chart/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use this component is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-pathjs-chart.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-pathjs-chart --save
```


## Usage



```
import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';

<Pie data={data} options={options} accessorKey="population"  />
<Bar data={data} options={options} accessorKey="value" />
<SmoothLine data={data} options={options} xKey="x" yKey="y"/>
<StockLine data={data} options={options} xKey="x" yKey="y"/>
<Scatterplot data={data} options={options} xKey="episode" yKey="rating" />
<Tree data={treeData} options={options}  />
<Radar data={activity} options={options} />

```

### Properties

+   data - chart data to visualize
+   accessor keys
    +   Pie,Bar - __accessorKey__ 
    +   SmoothLine,StockLine,Scatterplot - __xKey__, __yKey__
+   options - visual configuration of chart, enables to configure  formats, labels, colors, axis, ticks, lines, animations, ...
+   noDataMessage - message to show if no data or empty data are specified

### Notes



### License

MIT. Copyright (c) 2015 Roman Samec


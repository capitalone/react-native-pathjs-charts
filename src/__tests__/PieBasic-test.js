import 'react-native'
import React from 'react'
import Pie from '../Pie'
import renderer from 'react-test-renderer'
import { diffJson } from 'diff'

let data = [{
  "name": "Washington",
  "population": 7694980
}, {
  "name": "Oregon",
  "population": 2584160
}, {
  "name": "Minnesota",
  "population": 6590667,
  "color": {'r':223,'g':154,'b':20}
}, {
  "name": "Alaska",
  "population": 7284698
}]

let options = {
  margin: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
  },
  width: 350,
  height: 350,
  color: '#2980B9',
  r: 50,
  R: 150,
  legendPosition: 'topLeft',
  animate: {
    type: 'oneByOne',
    duration: 200,
    fillTransition: 3
  },
  label: {
    fontFamily: 'Arial',
    fontSize: 8,
    fontWeight: true,
    color: '#ECF0F1'
  }
}

it('renders using options property correctly', () => {
  let tree = renderer.create(
    <Pie data={data}
      options={options}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders using flattened properties correctly', () => {
  let tree = renderer.create(
    <Pie data={data}
      options={options}
      r={10} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('contains expected diff between flattened vs non-flattened option usage', () => {
  let treeUsingOptionsProp = renderer.create(
    <Pie data={data}
      options={options}/>
  ).toJSON()

  let treeUsingFlattenedProps = renderer.create(
    <Pie data={data}
      options={options}
    r={10}/>
  ).toJSON()

  let jsonDiff = diffJson(treeUsingOptionsProp, treeUsingFlattenedProps)

  const expectedRemoveCount = 4
  const expectedAddCount = 4
  var actualRemoveCount = 0
  var actualAddCount = 0

  jsonDiff.forEach((part) => {
    if (part.removed && part.value.trim()
          === '"d": "M NaN NaN A 150 150 0 0 1 NaN NaN L NaN NaN A 50 50 0 0 0 NaN NaN Z ",') {
      actualRemoveCount++
    }
    if (part.added && part.value.trim()
          === '"d": "M NaN NaN A 150 150 0 0 1 NaN NaN L NaN NaN A 10 10 0 0 0 NaN NaN Z ",') {
      actualAddCount++
    }
  })
  expect(actualRemoveCount).toBe(expectedRemoveCount)
  expect(actualAddCount).toBe(expectedAddCount)

})

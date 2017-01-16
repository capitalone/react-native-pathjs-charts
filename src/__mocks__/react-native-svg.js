import React from 'react'


// const rnsvg = jest.genMockFromModule('react-native-svg');
// module.exports = rnsvg;

export default function(props) {
  return (
    <view mockedComponent="svg-component" {...props}>
      {props.children}
    </view>
  )
}

export const Rect = (props) => {
  return (
    <view mockedComponent="svg-Rect" {...props} />
  )
}

export const Path = (props) => {
  return (
    <view mockedComponent="svg-Path" {...props} >
      {props.children}
    </view>
  )
}

export const G = (props) => {
  return (
    <view mockedComponent="svg-G" {...props}>
      {props.children}
    </view>
  )
}

export const Svg = (props) => {
  return (
    <view mockedComponent="svg-Svg" {...props} >
      {props.children}
    </view>
  )
}

export const Text = (props) => {
  return (
    <view mockedComponent="svg-Text" {...props} >
      {props.children}
    </view>
  )
}

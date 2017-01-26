import React from 'react'

export default function({ children }) {
  return (
    <view mockedComponent="svg-component">
      {children}
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
    <view mockedComponent="svg-Path" {...props} />
  )
}

export const G = ({ children }) => {
  return (
    <view mockedComponent="svg-G">
      {children}
    </view>
  )
}

export const Svg = (props) => {
  return (
    <view mockedComponent="svg-Svg" {...props} />
  )
}

export const Text = (props) => {
  return (
    <view mockedComponent="svg-Text" {...props} />
  )
}

export const Circle = (props) => {
  return (
    <view mockedComponent="svg-Circle" {...props} />
  )
}

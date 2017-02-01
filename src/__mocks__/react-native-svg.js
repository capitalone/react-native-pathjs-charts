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

export const Circle = (props) => {
  return (
    <view mockedComponent="svg-Circle" {...props} />
  )
}

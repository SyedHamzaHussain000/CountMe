import { View, Text } from 'react-native'
import React from 'react'
type props = {
    height: number;
}
const LineBreak = ({height}:props) => {
  return (
    <View style={{height:height}}/>
  )
}

export default LineBreak
import { View, Text } from 'react-native'
import React from 'react'
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import AppColors from '../../utils/Other/AppColors'

const Line = () => {
  return (
    <View style={{width:responsiveWidth(90), alignSelf:'center', backgroundColor:AppColors.WHITE, height:1}}/>
  )
}

export default Line
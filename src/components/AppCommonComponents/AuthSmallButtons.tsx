import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions'
import AppColors from '../../utils/Other/AppColors'

type props = {
  logo?: any
}

const AuthSmallButtons = ({logo}:props) => {
  return (
    <TouchableOpacity  style={{height:responsiveHeight(7), width:responsiveHeight(7), backgroundColor:AppColors.WHITE, borderRadius:200, alignItems:'center', justifyContent:'center'}}>
        <Image source={logo} style={{height:responsiveHeight(3), width:responsiveHeight(3), resizeMode:'contain'}}/>
    </TouchableOpacity>
  )
}

export default AuthSmallButtons
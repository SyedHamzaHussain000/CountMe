import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AppImages from '../assets/images/AppImages'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AppColors from '../utils/Other/AppColors'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize } from '../utils/Other/Responsive_Dimensions'


const BackButtonWithHeader = () => {

    const nav = useNavigation()
  return (
    <View style={{flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=> nav.goBack()}>
            <Ionicons
            name={"arrow-back-circle-outline"}
            size={responsiveFontSize(5)}
            color={AppColors.WHITE}
            />
        </TouchableOpacity>
      <Image source={AppImages.MainHeaderIcon} style={{height:120, width:120, resizeMode:'contain'}}/>
      <View/>
    </View>
  )
}

export default BackButtonWithHeader
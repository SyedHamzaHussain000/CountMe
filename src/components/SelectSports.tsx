import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../utils/Other/Responsive_Dimensions'
import AppText from './AppCommonComponents/AppText'
import AppColors from '../utils/Other/AppColors'

type props = {
    title?: string,
    bgColour?: string, 
    onPress? : () => void,
    isSelected?: boolean
}
const SelectSports = ({bgColour,title, onPress, isSelected}: props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{padding:10, height:responsiveHeight(13), width:responsiveWidth(44),borderRadius:10, backgroundColor:bgColour, alignItems:'center',  }}>
        <View style={{height:responsiveHeight(2), width:responsiveHeight(2),alignSelf:'flex-end', borderWidth:1, borderColor: AppColors.WHITE, borderRadius:200, backgroundColor: isSelected ? AppColors.WHITE : 'transparent' }}/>
        <View style={{alignItems:'center', justifyContent:'center',height:responsiveHeight(6),}}>
        <AppText title={title} textSize={2} textColor={AppColors.WHITE}/>
        </View>
    </TouchableOpacity>
  )
}

export default SelectSports
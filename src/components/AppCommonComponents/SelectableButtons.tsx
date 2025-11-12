import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppText'
import AppColors from '../../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions';
type props = {
    title?: string;
    value?: string;
    handlePress?: () => void;
    width?: any
}
const SelectableButtons = ({title, value, handlePress, width}:props) => {
  return (

    <TouchableOpacity onPress={handlePress} >
    <LinearGradient
          colors={[
            value == title  ? AppColors.PRIMARY : AppColors.WHITE,
            value == title  ? AppColors.SECONDARY : AppColors.WHITE,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{paddingHorizontal:20,  borderWidth:1, borderRadius:200, paddingVertical:10, width:responsiveWidth(width), alignItems:'center' }}
        >
        <AppText title={title} textSize={2} textColor={value == title ? AppColors.WHITE: AppColors.BLACK}/>
    </LinearGradient>
    </TouchableOpacity>
  )
}

export default SelectableButtons
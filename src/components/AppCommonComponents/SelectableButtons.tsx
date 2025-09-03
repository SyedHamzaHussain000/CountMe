import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppText'
import AppColors from '../../utils/Other/AppColors';
type props = {
    title?: string;
    value?: string;
    handlePress?: () => void;
}
const SelectableButtons = ({title, value, handlePress}:props) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{paddingHorizontal:20, borderWidth:1, borderRadius:200, paddingVertical:5, backgroundColor: value == title ? AppColors.PRIMARY: AppColors.WHITE}}>
        <AppText title={title} textSize={2} textColor={value == title ? AppColors.WHITE: AppColors.BLACK}/>
    </TouchableOpacity>
  )
}

export default SelectableButtons
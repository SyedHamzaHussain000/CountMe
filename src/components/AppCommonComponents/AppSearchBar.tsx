import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import { SvgXml } from 'react-native-svg'
import Appsvgicon from '../../assets/icons/Appsvgicon'
import AppColors from '../../utils/Other/AppColors'

type props = {
    placeHolder?: string,
    color? :any 
}

const AppSearchBar = ({color = AppColors.WHITE,placeHolder}:props) => {
  return (
    <View style={{flexDirection:'row', width:responsiveWidth(90), alignSelf:'center', borderBottomWidth:1, paddingBottom:10, borderBottomColor:color, alignItems:'center', gap:10}}>
        <SvgXml xml={Appsvgicon.Search} />
        <TextInput
        placeholder={placeHolder}
        style={{width:responsiveWidth(60), color: color}}
        placeholderTextColor={color}
        
        />
    </View> 
  )
}

export default AppSearchBar
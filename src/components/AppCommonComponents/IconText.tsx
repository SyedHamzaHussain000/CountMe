import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppText'
import AppColors from '../../utils/Other/AppColors'

type props = {
    Icon?:any,
    title?: string,
    titleColour?: any,
    textFontWeight?: any
}
const IconText = ({Icon,title, titleColour, textFontWeight}: props) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
        
        {
            Icon
        }
      <AppText title={title} textSize={2} textColor={titleColour} textFontWeight={textFontWeight}/>
    </View> 
  )
}

export default IconText
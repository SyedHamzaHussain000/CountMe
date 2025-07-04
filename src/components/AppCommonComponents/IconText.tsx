import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppText'
import AppColors from '../../utils/Other/AppColors'

type props = {
    Icon?:any,
    title?: string,
    titleColour?: any
}
const IconText = ({Icon,title, titleColour}: props) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
        
        {
            Icon
        }
      <AppText title={title} textSize={2} textColor={titleColour}/>
    </View> 
  )
}

export default IconText
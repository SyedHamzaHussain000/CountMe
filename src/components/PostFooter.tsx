import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppCommonComponents/AppText'


type icons = {
    Counts?: any,
    icon?: any,
    iconTwo?:any
    onPress?: () => void;
}
const PostFooter = ({Counts,icon, iconTwo, onPress}:icons) => {
  return (
    <TouchableOpacity onPress={onPress} style={{paddingHorizontal:15, paddingVertical:7, borderWidth:1, borderRadius:200, flexDirection:'row', alignItems:'center', gap:5}}>
        {
            icon
        }
        {
            iconTwo ? (
                
                    iconTwo
                
            ):(

                <AppText title={Counts} textSize={1.5} />
            )
        }
    </TouchableOpacity>
  )
}

export default PostFooter
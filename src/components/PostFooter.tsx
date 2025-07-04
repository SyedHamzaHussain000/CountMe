import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppCommonComponents/AppText'


type icons = {
    Counts?: any,
    icon?: any,
    iconTwo?:any
}
const PostFooter = ({Counts,icon, iconTwo}:icons) => {
  return (
    <View style={{paddingHorizontal:10, paddingVertical:5, borderWidth:1, borderRadius:200, flexDirection:'row', alignItems:'center', gap:5}}>
        {
            icon
        }
        {
            iconTwo ? (
                
                    iconTwo
                
            ):(

                <AppText title={Counts.length} textSize={1.5} />
            )
        }
    </View>
  )
}

export default PostFooter
import { View, Text, Image } from 'react-native'
import React from 'react'
import AppText from './AppText'
import AppColors from '../../utils/Other/AppColors'


type props = {
    pfp?: any,
    name?: string,
    type?: string  
}

const Participants = ({name,pfp,type}: props) => {
  return (
    
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
        
        <Image source={pfp} style={{height:30, width:30, resizeMode:'contain'}}/>    
        

        <AppText title={name} textColor={AppColors.WHITE} textSize={2}/>
        </View>

        <AppText title={type} textColor={AppColors.SECONDARY} textSize={2}/>

    </View>
  )
}


export default Participants
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AppImages from '../assets/images/AppImages'
import { responsiveHeight, responsiveWidth } from '../utils/Other/Responsive_Dimensions'
import AppText from './AppCommonComponents/AppText'
import AppColors from '../utils/Other/AppColors'
import Line from './AppCommonComponents/Line'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

type props = {
    pfp?: any,
    name?: string,
    message?: string,
    time?:any,
    FriendId?:any
}

const ConversationBar = ({message,name ,pfp,time,FriendId }:props) => {


    const navigation = useNavigation()
  return (
    <>
    
    <TouchableOpacity onPress={()=> navigation.navigate("Conversation",{friendId: FriendId, friendName: name})} style={{flexDirection:'row', alignItems:'center', width:responsiveWidth(90), alignSelf:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <Image source={AppImages.IMAGES} style={{height:responsiveHeight(6), width:responsiveHeight(6)}}/>
            <View>
                <AppText title={name} textColor={AppColors.BLACK} textSize={2} textFontWeight/>
                <AppText title={message} textColor={AppColors.GRAY} />
            </View>
        </View>


      <AppText title={moment(time).format("hh:mm A")} textColor={AppColors.GRAY} />

      
    </TouchableOpacity>
    <View style={{marginTop:10}}>

<Line colour={AppColors.GRAY}/>
    </View>
    </>
  )
}

export default ConversationBar
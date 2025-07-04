import { View, Text } from 'react-native'
import React from 'react'
import { SvgIcons } from '../assets/icons/HomeIcons/SvgIcons'
import { responsiveWidth } from '../utils/Other/Responsive_Dimensions'
import AppColors from '../utils/Other/AppColors'
import AppText from './AppCommonComponents/AppText'
import IconText from './AppCommonComponents/IconText'


type props = {
    Icon?: any,
    ActivityName?: any,
    TotalJoiner?: string,
    TotalJoined?: string,
    JoiningFee?: string,
}
const ActivityCard = ({ActivityName,Icon,JoiningFee,TotalJoined,TotalJoiner}: props) => {

  return (
    <View style={{borderRadius:15, padding:10, width:responsiveWidth(40), backgroundColor:AppColors.WHITE, gap:20}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            {
                Icon
            }
            <SvgIcons.size/>
        </View>

        <AppText title={"Activity Name"} textSize={3} textFontWeight/>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <IconText Icon={<SvgIcons.pfpb/>} title='(5/6)' titleColour={AppColors.BLACK}/>
                <IconText Icon={<SvgIcons.pennyb />} title='$200' titleColour={AppColors.BLACK}/>
        </View>
    </View>
  )
}

export default ActivityCard
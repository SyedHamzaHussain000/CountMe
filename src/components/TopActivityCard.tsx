import { View, Text } from 'react-native'
import React from 'react'
import AppText from './AppCommonComponents/AppText'
import AppColors from '../utils/Other/AppColors'
import { responsiveWidth } from '../utils/Other/Responsive_Dimensions'


type props = {
    Icon?: any,
    Title?: any,
    TotalJoiner?: any,
    TotalJoined?: any,
}

const TopActivityCard = ({Icon,Title,TotalJoined,TotalJoiner}:props) => {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:responsiveWidth(80)}}>
      <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            {
              Icon
            }
            <View>

            <AppText title={Title} textSize={2} textFontWeight/>
            <AppText title={`(${TotalJoined}/${TotalJoiner})`} textSize={2} />
            </View>
            </View>

            <AppText title={"Join Now"} textSize={2} textColor={AppColors.PRIMARY}/>
    </View>
  )
}

export default TopActivityCard
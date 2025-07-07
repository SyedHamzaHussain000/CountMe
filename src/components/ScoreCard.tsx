import { View, Text } from 'react-native'
import React from 'react'
import { responsiveHeight } from '../utils/Other/Responsive_Dimensions'
import AppColors from '../utils/Other/AppColors'
import AppText from './AppCommonComponents/AppText'
type props = {
    TotalScore?: number
    ScoreTitle?: string
}

const ScoreCard = ({ScoreTitle,TotalScore}: props) => {
  return (
    <View style={{height:responsiveHeight(14), width:responsiveHeight(14), borderRadius:10, backgroundColor:AppColors.WHITE, elevation:1, alignItems:'center', justifyContent:'center'}}>
        <AppText title={TotalScore} textSize={3} textFontWeight/>
        <AppText title={ScoreTitle} textSize={1.6} textFontWeight/>
    </View>
  )
}

export default ScoreCard
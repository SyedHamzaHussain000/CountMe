import { View, Text, Image } from 'react-native'
import React from 'react'
import AppImages from '../../assets/images/AppImages'
import AppText from './AppText'
import { SvgXml } from 'react-native-svg'
import Appsvgicon from '../../assets/icons/Appsvgicon'
import AppColors from '../../utils/Other/AppColors'

type props = {

}


const AppHeader = () => {
  return (
    <View style={{padding:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:0.5, backgroundColor:AppColors.WHITE}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
            <Image source={AppImages.mainHeaderRowlogo}  style={{height:30, width:120, resizeMode:'contain'}}/>
            {/* <AppText title={"Countme"} textSize={3} textFontWeight/> */}
        </View>

        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>   
            <SvgXml xml={Appsvgicon.Notification}/>
            <SvgXml xml={Appsvgicon.Setting}/>

        </View>
      
    </View>
  )
}

export default AppHeader
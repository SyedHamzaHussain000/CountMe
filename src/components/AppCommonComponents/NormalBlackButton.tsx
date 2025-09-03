import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Appsvgicon from '../../assets/icons/Appsvgicon';
import { SvgXml } from 'react-native-svg';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppText from './AppText';
import AppColors from '../../utils/Other/AppColors';

type props ={
    onPress?: () => void;
}
const NormalBlackButton = ({onPress}: props) => {
  return (
    <TouchableOpacity  onPress={onPress} style={{padding:0, flexDirection:'row', alignItems:'center', gap:10, alignSelf:'flex-start'}}>
      <SvgIcons.backb/>
      <AppText title={"Go Back"} textColor={AppColors.BLACK} textSize={2}/>
    </TouchableOpacity>
  )
}

export default NormalBlackButton
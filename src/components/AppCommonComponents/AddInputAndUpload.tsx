import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import AppColors from '../../utils/Other/AppColors'
import RoundButton from '../RoundButton'
import { SvgXml } from 'react-native-svg'
import Appsvgicon from '../../assets/icons/Appsvgicon'
type props = {
  onOpenTextInput : () => void
}
const AddInputAndUpload = ({onOpenTextInput}: props) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', gap:5 }}>
        <TextInput  
          placeholder='Write Something or add event '
          style={{borderWidth:1, width:responsiveWidth(80), borderColor:AppColors.PRIMARY, borderRadius:100, paddingHorizontal:10}}
          onFocus={onOpenTextInput}   
        />

        <RoundButton bgColour={AppColors.PINK} Icon={<SvgXml xml={Appsvgicon.attachment}/>} marginBottom={0}/>
    </View>
  )
}

export default AddInputAndUpload
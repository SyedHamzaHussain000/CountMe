import { View, Text, TextInput } from 'react-native'
import React from 'react'
import AppText from './AppText';
import AppColors from '../../utils/Other/AppColors';
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions';

type props = {
    title?: string;
    placeholder?: string;
    password?: boolean;
    keyboardType?: any;
    onChangeText?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
}
const AppTextInput = ({keyboardType,onChangeText,password,placeholder,secureTextEntry,title,value}:props) => {
  return (
    <View style={{gap:5}}>
        <AppText title={title} textSize={2} textColor={AppColors.WHITE}/>
        <View style={{backgroundColor:AppColors.WHITE, flexDirection:'row', borderRadius:10, paddingHorizontal:10}}>

            <TextInput
            placeholder={placeholder}
            style={{width:responsiveWidth(70), height:50}}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            />
        </View>

    </View>
  )
}

export default AppTextInput
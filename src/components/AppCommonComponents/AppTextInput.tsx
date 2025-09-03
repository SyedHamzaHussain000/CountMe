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
    titleColour?:string;
    TextInputColour?:string;
    maxLength?: number;
}
const AppTextInput = ({keyboardType,onChangeText,password,placeholder,secureTextEntry,title,value,titleColour,TextInputColour,maxLength}:props) => {
  return (
    <View style={{gap:5}}>
      {
        title && (
          <AppText title={title} textSize={2} textColor={titleColour ? titleColour : AppColors.WHITE}/>
        )
      }
        <View style={{backgroundColor:TextInputColour ? TextInputColour : AppColors.WHITE, flexDirection:'row', borderRadius:10, paddingHorizontal:10}}>

            <TextInput
              placeholder={placeholder}
              style={{width:responsiveWidth(70), height:50}}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              value={value}
              keyboardType={keyboardType}
              maxLength={maxLength ? maxLength : undefined}
            />
        </View>

    </View>
  )
}

export default AppTextInput
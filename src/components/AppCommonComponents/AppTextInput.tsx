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
  titleColour?: string;
  TextInputColour?: string;
  TextColour?: string;
  maxLength?: number;
  editable?: boolean;
  borderRadius?: number;
  width?: number;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
}
const AppTextInput = ({ keyboardType, onChangeText, password, placeholder, secureTextEntry, title, value, titleColour, TextInputColour, maxLength, editable, borderRadius, width, TextColour, multiline, numberOfLines, style }: props) => {
  return (
    <View style={{ gap: 5 }}>
      {
        title && (
          <AppText title={title} textSize={2} textColor={titleColour ? titleColour : AppColors.WHITE} />
        )
      }
      <View style={{ backgroundColor: TextInputColour ? TextInputColour : AppColors.WHITE, flexDirection: 'row', borderRadius: borderRadius ? borderRadius : 10, paddingHorizontal: 10, width: responsiveWidth(width ? width : 90) }}>

        <TextInput
          placeholder={placeholder}
          style={[{ color: TextColour ? AppColors.WHITE : AppColors.BLACK, width: responsiveWidth(width ? 100 : 70), height: 50 }, style]}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength ? maxLength : undefined}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>

    </View>
  )
}

export default AppTextInput
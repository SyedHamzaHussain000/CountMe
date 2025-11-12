import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Other/Responsive_Dimensions';
import AppText from './AppCommonComponents/AppText';
import AppColors from '../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';

type props = {
  title?: string;
  bgColour?: string;
  onPress?: () => void;
  isSelected?: boolean;
};
const SelectSports = ({ bgColour, title, onPress, isSelected }: props) => {
  return (
    <LinearGradient
      colors={[
        isSelected ? AppColors.PRIMARY : AppColors.WHITE,
        isSelected ? AppColors.SECONDARY : AppColors.WHITE,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderRadius: 10,
          alignItems: 'center',
          alignSelf: 'flex-start',
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <AppText
          title={title}
          textSize={1.5}
          textColor={isSelected ? AppColors.WHITE : AppColors.BLACK}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SelectSports;

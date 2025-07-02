import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';
import AppColors from '../../utils/Other/AppColors';

const ProfileCreated = () => {
  return (
    <ImageBackground
      source={AppImages.STARTBG}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          height: responsiveHeight(60),
        }}
      >
        <AppText title={'Profile Created'} textSize={3.5} textFontWeight />
        <AppText title={'welcome to Count Me'} textSize={3} textFontWeight />
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
          textwidth={80}
          textAlignment={'center'}
          textSize={2}
        />

        <Image
          source={AppImages.SPORTS}
          style={{
            height: responsiveHeight(30),
            resizeMode: 'contain',
            width: responsiveWidth(100),
          }}
        />
      </View>

      <AppButton title="Get Started" />
    </ImageBackground>
  );
};

export default ProfileCreated;

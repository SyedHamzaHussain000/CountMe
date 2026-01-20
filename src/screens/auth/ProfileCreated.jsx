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

const ProfileCreated = ({ navigation }) => {




  return (
    <ImageBackground
      source={AppImages.AUTHBG}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          gap: 30,
          alignItems: 'center',
          justifyContent: 'center',
          height: responsiveHeight(61),
        }}
      >
        <AppText title={'Profile Created'} textSize={3.5} textFontWeight textColor={AppColors.WHITE} />
        {/* <AppText title={'welcome to Count Me'} textSize={3} textFontWeight textColor={AppColors.WHITE}/>
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
          textwidth={80}
          textAlignment={'center'}
          textSize={2}
        /> */}
        <Image
          source={AppImages.MainHeaderIcon}
          style={{
            height: responsiveHeight(20),
            resizeMode: 'contain',
            width: responsiveWidth(100),
          }}
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


      <AppButton title="Get Started" handlePress={() => navigation.navigate("TabBars")} />

    </ImageBackground>
  );
};

export default ProfileCreated;

import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';
import AppColors from '../../utils/Other/AppColors';

const ReadyToJoin = ({navigation}) => {
  return (
    <ImageBackground
      source={AppImages.STARTBG}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <AppText title={'Welcome To'} textSize={3.5} />
      <Image
        source={AppImages.LOGO}
        style={{ height: responsiveHeight(15), width: responsiveHeight(15) }}
        resizeMode="contain"
      />

      <View
        style={{
          height: responsiveHeight(10),
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        <AppText title={'Time To Get Started'} textSize={2.5} textFontWeight />
      </View>
      <AppButton title="Ready to Join the Game?"  handlePress={()=> navigation.navigate("Login")}/>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <AppText
          title={'Already have an account!'}
          textSize={2}
          textFontWeight
        />
        <AppText
          title={'login here'}
          textSize={2}
          textFontWeight
          textColor={AppColors.PRIMARY}
        />
      </View>
    </ImageBackground>
  );
};

export default ReadyToJoin;

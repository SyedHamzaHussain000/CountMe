import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';
import AppColors from '../../utils/Other/AppColors';

const ReadyToJoin = ({ navigation }) => {
  return (
    <ImageBackground
      source={AppImages.AUTHBG}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >

      <AppText title={'Welcome To'} textSize={3.5} textColor={AppColors.WHITE} textFontWeight />
      <Image
        source={AppImages.MainHeaderIcon}
        style={{ height: responsiveHeight(18), width: responsiveHeight(18), marginTop:20 }}
        resizeMode="contain"
      />

      <View
        style={{
          height: responsiveHeight(10),
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        <AppText title={'Time To Get Started'} textSize={2.5} textFontWeight textColor={AppColors.BLACK} />
      </View>
      <AppButton
        title="Ready to Join the Game?"
        handlePress={() => navigation.navigate('Login')}
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <AppText
          title={'Already have an account!'}
          textSize={2}
          textFontWeight
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText
            title={' login here'}
            textSize={2}
            textFontWeight
            textColor={AppColors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ReadyToJoin;

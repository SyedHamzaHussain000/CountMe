import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';

const Login = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={AppImages.AUTHBG}
        style={{ flex: 1, padding: 20 }}
      >
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={{gap:10, marginTop:30}}>
        <AppText
          title={'Count Me'}
          textSize={4}
          textColor={AppColors.SECONDARY}
          textFontWeight
          textAlignment={'center'}
        />
        <AppText
          title={'Sign In'}
          textSize={3}
          textColor={AppColors.WHITE}
          textFontWeight
          textAlignment={'center'}
        />
        <AppText
          title={'Lorem Ipsum is simply dummy text of the'}
          textSize={2}
          textColor={AppColors.WHITE}
          textAlignment={'center'}
        />
        </View>

        <View style={{height:responsiveHeight(35), justifyContent:'flex-end', gap:15, marginBottom:5}}>

        <AppTextInput title="Email" placeholder="abc@yahoo.com" />
        <AppTextInput
          title="Password"
          placeholder="*************"
          password={true}
          secureTextEntry={true}
        />
        </View>
        <AppText title={"Forgot Password?"} textAlignment={'flex-end'} textColor={AppColors.WHITE} textFontWeight textSize={2}/>
            <AppButton title='Sign In' marginTop={30} />
            <AppText title={"or Signin with?"} textAlignment={'center'} textColor={AppColors.BLACK}  textSize={1.7}/>

        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Login;

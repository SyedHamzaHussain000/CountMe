import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Separator from '../../components/AppCommonComponents/Separator';
import AuthSmallButtons from '../../components/AppCommonComponents/AuthSmallButtons';
import Container from '../../components/AppCommonComponents/Container';

const Login = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container backgroundImage={AppImages.AUTHBG}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ gap: 10, marginTop: 30 }}>
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

          <View
            style={{
              height: responsiveHeight(35),
              justifyContent: 'flex-end',
              gap: 15,
              marginBottom: 5,
            }}
          >
            <AppTextInput title="Email" placeholder="abc@yahoo.com" />
            <AppTextInput
              title="Password"
              placeholder="*************"
              password={true}
              secureTextEntry={true}
            />
          </View>
          <AppText
            title={'Forgot Password?'}
            textAlignment={'flex-end'}
            textColor={AppColors.WHITE}
            textFontWeight
            textSize={2}
          />
          <AppButton title="Sign In" marginTop={30} />

          <View style={{ marginTop: 20 }}>
            <Separator title={'or Signin with?'} lineWidth={25} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-around',
            }}
          >
            <AuthSmallButtons logo={AppImages.FACEBOOK} />
            <AuthSmallButtons logo={AppImages.APPLE} />
            <AuthSmallButtons logo={AppImages.GOOGLE} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              alignSelf: 'center',
              gap: 5,
            }}
          >
            <AppText title={"Don't have an account?"} textSize={2} />
            <TouchableOpacity>
              <AppText
                title={'Sign Up'}
                textColor={'blue'}
                textSize={2}
                textFontWeight
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Login;

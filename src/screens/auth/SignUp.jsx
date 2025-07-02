import { View, Text } from 'react-native';
import React from 'react';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import Line from '../../components/AppCommonComponents/Line';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SvgFromXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import BackButton from '../../components/AppCommonComponents/BackButton';
const SignUp = () => {
  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <View style={{ gap: 20 }}>
        <BackButton/>
        <AppText
          title={'Create Your Account'}
          textSize={3}
          textFontWeight
          textColor={AppColors.WHITE}
        />
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
          textColor={AppColors.WHITE}
          textSize={1.8}
        />

        <Line />
      </View>

      <View style={{ gap: 20, marginTop: 30 }}>
        <AppTextInput title="Full name" placeholder="Benson Ronald" />
        <AppTextInput title="Email" placeholder="abc@yahoo.com" />
        <AppTextInput
          title="Password"
          placeholder="*************"
          password={true}
          secureTextEntry={true}
        />
        <AppTextInput
          title="Re Enter Password"
          placeholder="*************"
          password={true}
          secureTextEntry={true}
        />

        <View style={{marginTop:20, gap:10}}>
        <AppText title={"By registering you agree to Terms & Condition and Privacy Policy"} textSize={2}/>
        <AppButton title='Continue'/>
        </View>
      </View>
    </Container>
  );
};

export default SignUp;

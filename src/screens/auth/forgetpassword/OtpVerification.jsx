import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Container from '../../../components/AppCommonComponents/Container';
import AppImages from '../../../assets/images/AppImages';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../../components/AppCommonComponents/AppButton';
import ShowToast from '../../../utils/Other/ShowToast';
import { ApiCall } from '../../../utils/apicalls/ApiCalls';
import { responsiveHeight } from '../../../utils/Other/Responsive_Dimensions';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../redux/slices/AuthSlice';

const OtpVerification = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { data } = route.params;
  const { email, Otp } = data.data;
  const signupToken = data.signupToken;



  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  const VerifyOTP = async () => {
    if (otp.length !== 4) {
      ShowToast('error', 'Please enter a valid 4-digit OTP');
      return;
    }

    setLoader(true);

    try {
      if (Otp !== otp) {
        ShowToast('error', "Invalid otp")
        setLoader(false);
        return
      }
      const body = {
        addSignUpToken: signupToken,
        Otp: Number(otp),
      };

      console.log("body", body)
      const { data } = await ApiCall('POST', 'verifyOtp', body);

      console.log("data", data)
      setLoader(false);

      ShowToast('success', data.message);

      // Store user data after successful verification  
      dispatch(setUserDetails(data || {}));

      // Navigate to Home / Login / Profile Setup
      navigation.navigate('Home');

    } catch (error) {
      setLoader(false);
      ShowToast('error', error?.response?.data?.message || 'OTP Verification Failed');
    }
  };

  const ResendOtp = async () => {
    try {
      const body = { email: email };
      const { data } = await ApiCall('POST', 'sendOtp', body);

      ShowToast('success', data.message);
    } catch (error) {
      ShowToast('error', 'Failed to resend OTP');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container backgroundImage={AppImages.AUTHBG}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/* Header */}
          <View style={{ marginTop: 40, gap: 10 }}>
            <AppText
              title="OTP Verification"
              textSize={3}
              textFontWeight
              textAlignment="center"
              textColor={AppColors.WHITE}
            />
            <AppText
              title="Enter the OTP sent to your email"
              textSize={2}
              textAlignment="center"
              textColor={AppColors.WHITE}
            />
            <AppText
              title={email}
              textColor={AppColors.SECONDARY}
              textAlignment="center"
              textFontWeight
            />
          </View>

          {/* OTP INPUT */}
          <View
            style={{
              height: responsiveHeight(30),
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
          >
            <AppTextInput
              title="Enter OTP"
              placeholder="----"
              keyboardType="number-pad"
              maxLength={4}
              onChangeText={txt => setOtp(txt)}
              value={otp}
            />
          </View>

          {/* Verify Button */}
          <AppButton
            title="Verify OTP"
            marginTop={20}
            handlePress={VerifyOTP}
            loading={loader}
          />

          {/* Resend OTP */}
          <View style={{ flexDirection: 'row', marginTop: 25, alignSelf: 'center' }}>
            <AppText title="Didn't receive the OTP?" textColor={AppColors.WHITE} />
            <TouchableOpacity onPress={ResendOtp}>
              <AppText
                title=" Resend"
                textColor={AppColors.SECONDARY}
                textFontWeight
              />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

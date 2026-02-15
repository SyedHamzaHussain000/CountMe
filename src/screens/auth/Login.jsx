import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Separator from '../../components/AppCommonComponents/Separator';
import AuthSmallButtons from '../../components/AppCommonComponents/AuthSmallButtons';
import Container from '../../components/AppCommonComponents/Container';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import ShowToast from '../../utils/Other/ShowToast';
import { get, getDatabase, ref } from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import {
  setFavouriteSports,
  setProfilePicture,
  setSignupFlowCompleted,
  setSportsSkills,
  setUserDetails,
} from '../../redux/slices/AuthSlice';
import { ApiCall } from '../../utils/apicalls/ApiCalls';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('james01@gmail.com');
  const [password, setPassword] = useState('12345678');

  const [loader, setLoader] = useState(false);
  const LoginApi = async () => {
    if (email == '' || password == '') {
      ShowToast('error', 'Please enter your email and password');
      return;
    }

    setLoader(true)


    try {

      const userDetails = {
        email: email,
        password: password,
      };

      const { data } = await ApiCall('POST', 'loginUser', userDetails);

      setLoader(false)
      dispatch(setUserDetails(data));

      ShowToast('success', data.message);
    } catch (error) {
      console.log('Error', error);
      ShowToast('error', error?.response?.data?.message || 'Signup failed');
      setLoader(false);
    }
    // return;

    // signInWithEmailAndPassword(getAuth(), email, password).then(async () => {
    //   const auth = getAuth();
    //   const user = auth.currentUser;

    //   if (user) {
    //     const db = getDatabase();
    //     const userRef = ref(db, `Users/${user.uid}`);
    //     const snapshot = await get(userRef);

    //     if (snapshot.exists()) {
    //       const userDetails = snapshot.val();
    //       dispatch(
    //         setUserDetails({
    //           email: userDetails.email,
    //           full_name: userDetails.full_name,
    //           device_token: '',
    //         }),
    //       );
    //       dispatch(setFavouriteSports(userDetails.Sports));
    //       dispatch(setSportsSkills(userDetails.SportsSkills));
    //       dispatch(setProfilePicture(userDetails.ProfilePicture));
    //       dispatch(setSignupFlowCompleted(userDetails.ProfileCreated));

    //       ShowToast('success', `Welcome ${userDetails.full_name}`);
    //     } else {
    //       console.log('No user data found!');
    //     }
    //   }
    //   ShowToast('success', 'Successfully logged in');
    // });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container backgroundImage={AppImages.AUTHBG}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 10, marginTop: 30 }}>
            {/* <AppText
              title={'Countme'}
              textSize={4}
              textColor={AppColors.SECONDARY}
              textFontWeight
              textAlignment={'center'}
            /> */}
            <Image
              source={AppImages.MainHeaderIcon}
              style={{ height: responsiveHeight(15), width: responsiveHeight(15), marginTop: 20, alignSelf: 'center' }}
              resizeMode="contain"
            />
            <AppText
              title={'Sign In'}
              textSize={4}
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
            <AppTextInput
              title="Email"
              placeholder="abc@yahoo.com"
              onChangeText={txt => setEmail(txt)}
              value={email}
            />
            <AppTextInput
              title="Password"
              placeholder="*************"
              password={true}
              secureTextEntry={true}
              onChangeText={txt => setPassword(txt)}
              value={password}
            />
          </View>
          <AppText
            title={'Forgot Password?'}
            textAlignment={'flex-end'}
            textColor={AppColors.WHITE}
            textFontWeight
            textSize={2}
          />
          <AppButton
            title="Sign In"
            marginTop={30}
            handlePress={() => LoginApi()}
            loading={loader}
          />

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
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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

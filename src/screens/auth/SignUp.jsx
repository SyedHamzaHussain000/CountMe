import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import Line from '../../components/AppCommonComponents/Line';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgFromXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import BackButton from '../../components/AppCommonComponents/BackButton';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
  const [credientials, setCredientials] = useState({
    full_name: '',
    email: '',
    passord: '',
    re_type_password: '',
  });
  const [loader, setLoader] = useState(false);

  const CreateAccount = () => {
    setLoader(true);

    createUserWithEmailAndPassword(
      getAuth(),
      credientials.email,
      credientials.passord,
    )
      .then(() => {
        console.log('User account created & signed in!');
        // navigation.navigate('UploadPicture')
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ gap: 20 }}>
          <BackButton />
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
          <AppTextInput
            title="Full name"
            placeholder="Benson Ronald"
            onChangeText={val =>
              setCredientials({ ...credientials, full_name: val })
            }
            value={credientials.full_name}
          />
          <AppTextInput
            title="Email"
            placeholder="abc@yahoo.com"
            onChangeText={val =>
              setCredientials({ ...credientials, email: val })
            }
            value={credientials.email}
          />
          <AppTextInput
            title="Password"
            placeholder="*************"
            password={true}
            secureTextEntry={true}
            onChangeText={val =>
              setCredientials({ ...credientials, passord: val })
            }
            value={credientials.passord}
          />
          <AppTextInput
            title="Re Enter Password"
            placeholder="*************"
            password={true}
            secureTextEntry={true}
            onChangeText={val =>
              setCredientials({ ...credientials, re_type_password: val })
            }
            value={credientials.re_type_password}
          />

          <View style={{ marginTop: 20, gap: 10 }}>
            <AppText
              title={
                'By registering you agree to Terms & Condition and Privacy Policy'
              }
              textSize={2}
            />
            <AppButton title="Continue" handlePress={() => CreateAccount()} loading={loader}  />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUp;

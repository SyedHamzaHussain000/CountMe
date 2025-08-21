import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import Line from '../../components/AppCommonComponents/Line';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgFromXml, SvgXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import BackButton from '../../components/AppCommonComponents/BackButton';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePicture } from '../../redux/slices/AuthSlice';
import { getAuth } from '@react-native-firebase/auth';

const UploadPicture = ({ navigation }) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);

  const MyFavSports = useSelector(state => state?.auth?.FavouriteSports);
  const MySportsSkills = useSelector(state => state?.auth?.SportsSkills);

  console.log("MyFavSports", MyFavSports, MySportsSkills)

  const openLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      dispatch(setProfilePicture(result.assets[0].uri));
    }
  };

  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <View style={{ gap: 20 }}>
        <BackButton />
        <AppText
          title={'upload your photo'}
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
        <View style={{ height: responsiveHeight(50) }}>
          <TouchableOpacity
            onPress={openLibrary}
            style={{ alignSelf: 'center' }}
          >
            <Image
              source={imageUri ? { uri: imageUri } : AppImages.IMAGES}
              style={{
                height: responsiveHeight(20),
                width: responsiveHeight(20),
                resizeMode: 'cover',
                borderRadius: 200,
              }}
            />
            <View
              style={{ position: 'absolute', zIndex: 1, bottom: -5, right: -5 }}
            >
              <SvgXml xml={Appsvgicon.plus} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, gap: 10 }}>
          <AppButton
            title="Continue"
            handlePress={() => navigation.navigate('AddSports')}
          />

          <AppButton title="Logout" handlePress={()=> getAuth().signOut()} />
        </View>
      </View>
    </Container>
  );
};

export default UploadPicture;

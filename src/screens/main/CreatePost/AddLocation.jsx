import { View, Text } from 'react-native';
import React from 'react';
import NormalBlackButton from '../../../components/AppCommonComponents/NormalBlackButton';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import AppColors from '../../../utils/Other/AppColors';
import AppText from '../../../components/AppCommonComponents/AppText';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../../redux/slices/AuthSlice';

const AddLocation = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <View style={{ padding: 20, paddingBottom: 100, gap: 30 }}>
        <NormalBlackButton onPress={() => navigation.goBack()} />

        <AppText title={'Add Location'} textSize={3} textFontWeight />
        <GooglePlacesTextInput
          apiKey="AIzaSyAZAvDyEDcbRLt0RI0KhwDQbPmh-ehS65o"
          onPlaceSelect={res => {
            console.log('res', res);
            // setDetil(res.details);
            const detail = {
              address: res.details.formattedAddress,
              latitude: res.details.location.latitude,
              longitude: res.details.location.longitude,
            };

            dispatch(setAddress(detail));
          }}
          debounceDelay={200}
          languageCode="en"
          placeHolderText="Enter Location"
          fetchDetails={true}
        />
      </View>
    </View>
  );
};

export default AddLocation;

import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import AppColors from '../../../utils/Other/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../../../components/AppCommonComponents/AppButton';
import ReactNativeModal from 'react-native-modal';
import SmallButtons from '../../../components/AppCommonComponents/SmallButtons';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import PostFeatureBar from '../../../components/PostFeatureBar';
import AppImages from '../../../assets/images/AppImages';
import { getAuth } from '@react-native-firebase/auth';
import { CreatePostApi } from '../../../global/main/PostsRelatedFunctions/CreatePostApi';
import AppText from '../../../components/AppCommonComponents/AppText';
import { useSelector } from 'react-redux';
import SelectableButtons from '../../../components/AppCommonComponents/SelectableButtons';
import CountMeComponent from '../../../components/CountMeComponent';
import BackButton from '../../../components/AppCommonComponents/BackButton';
import NormalBlackButton from '../../../components/AppCommonComponents/NormalBlackButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Create = ({ value, onClosePress }) => {
  const userId = getAuth()?.currentUser?.uid;
  const [Caption, setCaption] = useState('');
  const [postType, setPostType] = useState(''); //Count me //Poll //general //link //location
  const [CountMeDetails, setCountMeDetails] = useState({
    sport: '',
    totalPlayers: '',
  });
  const [postLink, setPostLink] = useState('')
  const [Loader, setLoader] = useState(false);
  const MyFavSports = useSelector(state => state?.auth?.FavouriteSports);
  const UserData = useSelector(state => state?.auth);


  const createPostApiCall = async () => {
    if (Caption == '') {
      ToastAndroid.show('Please enter your caption', 500);
      return;
    }


    setLoader(true)
    await CreatePostApi(UserData, userId, Caption, CountMeDetails, postLink, '' );
    setLoader(false)
  };

  

  return (
    <ReactNativeModal isVisible={value} style={{ margin: 0 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: AppColors.WHITE }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity onPress={onClosePress}>
              <AntDesign name={'close'} size={20} color={AppColors.BLACK} />
            </TouchableOpacity>

            <SmallButtons
              title="POST"
              handlePress={() => createPostApiCall()}
              loader={Loader}
            />
          </View>

          <View>
            <AppTextInput
              placeholder="What’s on your mind"
              onChangeText={txt => setCaption(txt)}
              value={Caption}
            />
          </View>
        </View>

        {postType == 'Countme' ? (
          <CountMeComponent
            MyFavSports={MyFavSports}
            handlePressButton={item => {
              setCountMeDetails({ ...CountMeDetails, sport: item?.name });
            }}
            value={CountMeDetails.sport}
            handleNormalButtonPress={() => setPostType('')}
            onChangeText={txt => setCountMeDetails({...CountMeDetails, totalPlayers: txt})}
            textValue={CountMeDetails.totalPlayers}
          />
        ): postType == 'link' ? (
          <View style={{padding:20, paddingBottom:100, gap:30}}>
            <NormalBlackButton onPress={() => setPostType('')}/>
            <AppTextInput 
              title='Enter Link'
              titleColour={AppColors.BLACK}
              TextInputColour={AppColors.LIGHTGRAY}
              placeholder='Https://'
              onChangeText={txt => setPostLink(txt)}
              value={postLink}
            />
          </View>
        ) : postType == 'location' ? (
          <View style={{padding:20, paddingBottom:100, gap:30}}>
            <NormalBlackButton onPress={() => setPostType('')}/>
         <GooglePlacesAutocomplete
            placeholder="Add Location"
            // ref={googlePlacesRef}
            query={{
              key: 'AIzaSyAZAvDyEDcbRLt0RI0KhwDQbPmh-ehS65o', // REPLACE WITH YOUR ACTUAL API KEY
              language: 'en',
              //   types: 'geocode',
            }}
            styles={{
              textInput: {
                backgroundColor: '#F0F0F0', // :white_check_mark: BG color here
                color: '#000', // text color
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 45,
              },
              description: {
                color: '#000', // suggestions text
              },
              listView: {
                backgroundColor: 'white', // dropdown bg
              },
            }}
            autoFillOnNotFound={false}
            currentLocation={false}
            currentLocationLabel="Current location"
            debounce={400}
            disableScroll={false}
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={true}
            fetchDetails={true}
            isRowScrollable={true}
            keyboardShouldPersistTaps="always"
            listUnderlayColor="#C8C7CC"
            minLength={1}
            onPress={(data, details = null) => {
              if (details) {
                const lat = details.geometry.location.lat;
                const lng = details.geometry.location.lng;
                const address = details.formatted_address || data.description;
              }
            }}
            predefinedPlaces={[]}
            textInputProps={{}}
            timeout={20000}
            // renderRightButton={() => (
            //   <TouchableOpacity
            //     onPress={() => googlePlacesRef.current?.setAddressText('')}
            //     style={{justifyContent: 'center', paddingHorizontal: 8}}>
            //     <Icon name="close" size={22} color="#000" />
            //   </TouchableOpacity>
            // )}
            // ref={ref => {
            //   this.googlePlacesRef = ref;
            // }}
          />
          </View>
        ) : (
          <View style={{ paddingHorizontal: 10, gap: 10 }}>
            <PostFeatureBar
              img={AppImages.runner}
              title="Countme"
              onHandlePress={() => setPostType('Countme')}
            />
            <PostFeatureBar
              img={AppImages.photo}
              title="Add Photos/videos"
              onHandlePress={() => setPostType('Photos/videos')}
            />
            <PostFeatureBar
              img={AppImages.poll}
              title="Add poll"
              onHandlePress={() => setPostType('poll')}
            />
            <PostFeatureBar
              img={AppImages.link}
              title="Add link"
              onHandlePress={() => setPostType('link')}
            />
            <PostFeatureBar
              img={AppImages.location}
              title="Add location"
              onHandlePress={() => setPostType('location')}
            />
            {/* <PostFeatureBar img={AppImages.live} title="Live Video" /> */}
          </View>
        )}
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};

export default Create;

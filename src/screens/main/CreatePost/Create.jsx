import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  FlatList,
  Image,
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
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ApiCallFormData } from '../../../utils/apicalls/ApiCalls';
import { launchImageLibrary } from 'react-native-image-picker';

const Create = ({ navigation }) => {
  const userId = getAuth()?.currentUser?.uid;
  const [Caption, setCaption] = useState('');
  const [postType, setPostType] = useState(''); //Count me //Poll //general //link //location
  const [CountMeDetails, setCountMeDetails] = useState({
    sport: '',
    totalPlayers: '',
    amount: '',
  });
  const [postLink, setPostLink] = useState('');
  const [Loader, setLoader] = useState(false);

  //date
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [imageData, setImageData] = useState()

  const [selectedType, setSelectedType] = useState('Activity Post');
  
  
  const userDetail = useSelector(state => state?.auth.userData);
  const MyFavSports = useSelector(state => state?.auth?.FavouriteSports);
  const UserData = useSelector(state => state?.auth);
  const AddressDetail = useSelector(state => state?.auth?.Address);



    const openLibrary = async () => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
  
      if (!result.didCancel && result.assets && result.assets.length > 0) {
        setImageData(result.assets[0]);
        // dispatch(setProfilePicture(result));
      }
    };

  const createPostApiCall = async () => {
    if (Caption == '') {
      ToastAndroid.show('Please enter your caption', 500);
      return;
    }
    try {
      
    
    const formdata = new FormData();

    console.log("first",imageData)
    formdata.append('userId', userDetail?._id );
    formdata.append('type', selectedType == "Activity Post" ?  'ActivityPost' : 'CasualPost');
    formdata.append('posts',imageData ? {
      type: imageData.type,
      name: imageData.fileName,
      uri: imageData.uri,
    } : '' ); 
    formdata.append('caption', Caption);
    formdata.append('perPrsonPrice', CountMeDetails.amount);
    formdata.append('totalPlayer', CountMeDetails.totalPlayers);
    formdata.append('startTime', JSON.stringify(date));
    formdata.append('latitude', JSON.stringify( AddressDetail?.latitude));
    formdata.append('longitude', JSON.stringify(AddressDetail?.longitude));
    formdata.append('locationName', AddressDetail?.address);
    formdata.append('activity', '["Entertainment"]');



    setLoader(true);
    const {data} = await ApiCallFormData('POST', 'createPost', formdata);

    navigation.goBack();
    setLoader(false);
    } catch (error) {
      console.log("error" ,error) 
    }
    return;
    await CreatePostApi(
      UserData,
      userId,
      Caption,
      CountMeDetails,
      postLink,
      date,
      AddressDetail,
      '',
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <DateTimePickerModal
        isVisible={show}
        minimumDate={new Date()}
        mode="datetime"
        onConfirm={selectedDate => {
          setDate(selectedDate), setShow(false);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: AppColors.WHITE }}
      >
        <View style={{ padding: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name={'close'} size={20} color={AppColors.BLACK} />
              </TouchableOpacity>
              <Image
                source={AppImages.mainHeaderRowlogo}
                style={{ width: 120, resizeMode: 'contain' }}
              />
            </View>

            <SmallButtons
              title="POST"
              handlePress={() => createPostApiCall()}
              loader={Loader}
            />
          </View>

          {/* <View>
            <AppTextInput
              placeholder="What’s on your mind"
              onChangeText={txt => setCaption(txt)}
              value={Caption}
            />
          </View> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <SelectableButtons
            width={45}
            title="Activity Post"
            handlePress={() => setSelectedType('Activity Post')}
            value={selectedType}
          />
          <SelectableButtons
            width={45}
            title="Chill Post"
            handlePress={() => setSelectedType('Chill Post')}
            value={selectedType}
          />
        </View>

        <CountMeComponent
          MyFavSports={MyFavSports}
          handlePressButton={item => {
            setCountMeDetails({ ...CountMeDetails, sport: item?.name });
          }}
          value={CountMeDetails?.sport}
          selectedType={selectedType}
          handleNormalButtonPress={() => setPostType('')}
          onChangeCaption={txt =>
            setCaption(txt)
          }
          captionValue={Caption}

          onChangeText={txt =>
            setCountMeDetails({ ...CountMeDetails, totalPlayers: txt })
          }
          textValue={CountMeDetails?.totalPlayers}
          onChangeAmount={txt =>
            setCountMeDetails({ ...CountMeDetails, amount: txt })
          }
          
          
          AmountValue={CountMeDetails?.amount}
          onDatePickerPress={() => setShow(true)}
          dateValue={date}
          show={show}
          onUploadImageButtonPress={()=> openLibrary()}
          onActivityButtonPress={()=> console.log("first")}
          imageData={imageData}
          onImageClear={()=> setImageData()}
        />

        {/* {postType == 'Countme' ? (
        ) : postType == 'link' ? (
          <View style={{ padding: 20, paddingBottom: 100, gap: 30 }}>
            <NormalBlackButton onPress={() => setPostType('')} />
            <AppTextInput
              title="Enter Link"
              titleColour={AppColors.BLACK}
              TextInputColour={AppColors.LIGHTGRAY}
              placeholder="Https://"
              onChangeText={txt => setPostLink(txt)}
              value={postLink}
            />
          </View>
        )  : (
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
              title={ "Add location"}
              onHandlePress={() => navigation.navigate('AddLocation')}
            />

          </View>
        )} */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Create;

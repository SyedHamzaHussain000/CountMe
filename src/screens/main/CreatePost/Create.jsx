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
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

  console.log('CountMeDetails', date);

  const MyFavSports = useSelector(state => state?.auth?.FavouriteSports);
  const UserData = useSelector(state => state?.auth);
  const AddressDetail = useSelector(state => state?.auth?.Address);



  const createPostApiCall = async () => {
    if (Caption == '') {
      ToastAndroid.show('Please enter your caption', 500);
      return;
    }

    setLoader(true);
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
    setLoader(false);
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
         <DateTimePickerModal
        isVisible={show}
        minimumDate={new Date()}
        mode="datetime"
        onConfirm={(selectedDate)=>{setDate(selectedDate), setShow(false)}}
        onCancel={()=>{setShow(false)}}

      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: AppColors.WHITE }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
            value={CountMeDetails?.sport}
            handleNormalButtonPress={() => setPostType('')}
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
          />
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
            {/* <PostFeatureBar img={AppImages.live} title="Live Video" /> */}
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Create;

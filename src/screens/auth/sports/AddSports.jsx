import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../../components/AppCommonComponents/Container';
import AppImages from '../../../assets/images/AppImages';
import BackButton from '../../../components/AppCommonComponents/BackButton';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import Line from '../../../components/AppCommonComponents/Line';
import AppSearchBar from '../../../components/AppCommonComponents/AppSearchBar';
import SelectSports from '../../../components/SelectSports';
import AppButton from '../../../components/AppCommonComponents/AppButton';
import {
  setFavouriteSports,
  setUserDetails,
  setUserUpdateDetailOnly,
} from '../../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import BackButtonWithHeader from '../../../components/BackButtonWithHeader';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import { ApiCallFormData } from '../../../utils/apicalls/ApiCalls';
import ShowToast from '../../../utils/Other/ShowToast';

const AddSports = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isSelectionMode = route?.params?.isSelectionMode;

  const profileImage = useSelector(state => state.auth.ProfileImage);
  const token = useSelector(state => state.auth.token);
  const userData = useSelector(state => state.auth.userData);

  const [loader, setLoader] = useState(false);

  console.log('first', userData);

  const SelectSubActivity = [
    // Sports & Physical
    { id: 1, name: '🏅 Sports & Fitness', bgColour: AppColors.PRIMARY },
    { id: 2, name: '⚽ Team Sports', bgColour: AppColors.SECONDARY },
    { id: 3, name: '🏋️‍♂️ Gym & Bodybuilding', bgColour: AppColors.PRIMARY },
    { id: 4, name: '🚴 Cycling & Running', bgColour: AppColors.SECONDARY },
    { id: 5, name: '🧘 Yoga & Meditation', bgColour: AppColors.PRIMARY },

    // Creativity & Arts
    { id: 6, name: '🎨 Arts & Creativity', bgColour: AppColors.SECONDARY },
    { id: 7, name: '🎭 Drama & Theatre', bgColour: AppColors.PRIMARY },
    { id: 8, name: '🎵 Music & Singing', bgColour: AppColors.SECONDARY },
    {
      id: 9,
      name: '📸 Photography & Videography',
      bgColour: AppColors.PRIMARY,
    },
    { id: 10, name: '✍️ Writing & Blogging', bgColour: AppColors.SECONDARY },

    // Tech & Learning
    { id: 11, name: '💻 Technology & Learning', bgColour: AppColors.PRIMARY },
    { id: 12, name: '🤖 AI & Robotics', bgColour: AppColors.SECONDARY },
    { id: 13, name: '🧑‍💻 Coding & Development', bgColour: AppColors.PRIMARY },
    { id: 14, name: '📚 Reading & Research', bgColour: AppColors.SECONDARY },
    {
      id: 15,
      name: '🧩 Problem Solving & Puzzles',
      bgColour: AppColors.PRIMARY,
    },

    // Nature & Outdoor
    { id: 16, name: '🌿 Outdoor & Nature', bgColour: AppColors.SECONDARY },
    { id: 17, name: '🏕 Camping & Hiking', bgColour: AppColors.PRIMARY },
    { id: 18, name: '🌊 Water Sports', bgColour: AppColors.SECONDARY },
    { id: 19, name: '🐾 Animal & Wildlife', bgColour: AppColors.PRIMARY },
    {
      id: 20,
      name: '🌸 Gardening & Eco Living',
      bgColour: AppColors.SECONDARY,
    },

    // Mind & Lifestyle
    { id: 21, name: '🧠 Mind & Relaxation', bgColour: AppColors.PRIMARY },
    { id: 22, name: '💬 Social & Lifestyle', bgColour: AppColors.SECONDARY },
    { id: 23, name: '🛍️ Fashion & Shopping', bgColour: AppColors.PRIMARY },
    { id: 24, name: '🍳 Cooking & Baking', bgColour: AppColors.SECONDARY },
    { id: 25, name: '🎮 Entertainment & Games', bgColour: AppColors.PRIMARY },

    // Growth & Career
    { id: 26, name: '🚀 Career & Skill Growth', bgColour: AppColors.SECONDARY },
    { id: 27, name: '📈 Business & Startups', bgColour: AppColors.PRIMARY },
    { id: 28, name: '💰 Finance & Investment', bgColour: AppColors.SECONDARY },
    {
      id: 29,
      name: '🗣️ Leadership & Communication',
      bgColour: AppColors.PRIMARY,
    },
    {
      id: 30,
      name: '📊 Productivity & Planning',
      bgColour: AppColors.SECONDARY,
    },

    // Culture & Community
    { id: 31, name: '🎭 Culture & Entertainment', bgColour: AppColors.PRIMARY },
    { id: 32, name: '🌍 Travel & Exploration', bgColour: AppColors.SECONDARY },
    { id: 33, name: '🎉 Events & Festivals', bgColour: AppColors.PRIMARY },
    {
      id: 34,
      name: '💞 Volunteering & Community',
      bgColour: AppColors.SECONDARY,
    },
    { id: 35, name: '🏠 Home & Lifestyle', bgColour: AppColors.PRIMARY },
  ];

  const [searchText, setSearchText] = useState('');
  const [selectedSports, setSelectedSports] = useState([]);

  const filteredSports = SelectSubActivity.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const toggleSelect = item => {
    setSelectedSports(prevSelected => {
      const isSelected = prevSelected.some(res => res.id == item.id);
      if (isSelected) {
        return prevSelected.filter(res => res.id !== item.id); // remove
      } else {
        return [...prevSelected, item]; // add
      }
    });
  };

  // useEffect(() => {
  //   dispatch(setFavouriteSports(selectedSports));
  // }, [selectedSports]);

  const UpdateProfile = async () => {
    if (isSelectionMode) {
      navigation.navigate({
        name: 'Create',
        params: { selectedActivity: selectedSports },
        merge: true,
      });
      return;
    }

    // console.log("selectedSports",profileImage)

    try {

      const profilePicture = profileImage?.assets[0];
      setLoader(true);
      const userUpdateDetial = {
        activity: selectedSports.map(res => res.name),
        image: {
          type: profilePicture?.type,
          name: profilePicture?.fileName,
          uri: profilePicture?.uri,
        },
      };

      const formData = new FormData();

      formData.append(`userId`, userData._id);
      formData.append('activity', JSON.stringify(userUpdateDetial.activity));

      // userUpdateDetial?.image?.forEach((img, index) => {
      formData.append('image', userUpdateDetial.image);
      // });

      const { data } = await ApiCallFormData('POST', 'updateUser', formData);

      console.log('data...........', data);

      setLoader(false);
      ShowToast('success', data.message);

      dispatch(setUserUpdateDetailOnly(data.data));
      navigation.navigate('ProfileCreated');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <ScrollView style={{ gap: 20 }} showsVerticalScrollIndicator={false}>
        <BackButtonWithHeader />
        <LineBreak height={30} />
        <AppText
          title={isSelectionMode ? "Select Activity" : "Select Activity"}
          textSize={3}
          textFontWeight
          textColor={AppColors.WHITE}
        />
        <AppText
          title={isSelectionMode ? "Select the activity for your post" : "What would you like to do the most in your free time?"}
          textColor={AppColors.WHITE}
          textSize={1.8}
        />

        {/* 🔎 Search bar */}
        {/* <AppSearchBar
          placeHolder="search your sports here"
          value={searchText}
          onChangeText={setSearchText}
        /> */}

        {/* 🏀 Sports List */}
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <FlatList
            data={SelectSubActivity}
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: 10,
            }}
            renderItem={({ item }) => {
              const isSelected = selectedSports.some(res => res.id == item.id);

              return (
                <SelectSports
                  title={item.name}
                  bgColour={item.bgColour} // white when selected
                  onPress={() => toggleSelect(item)}
                  isSelected={isSelected}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <View style={{ marginBottom: 20, gap: 10 }}>
          <AppText
            title={'Other Activity'}
            textSize={3}
            textFontWeight
            textColor={AppColors.WHITE}
          />
          <AppTextInput />
        </View>
      </ScrollView>
      <AppButton
        title={isSelectionMode ? "Select" : "Continue"}
        handlePress={() => UpdateProfile()}
        loading={loader}
      />
    </Container>
  );
};

export default AddSports;

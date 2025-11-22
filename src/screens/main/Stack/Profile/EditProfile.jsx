import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import BackHeader from '../../../../components/AppCommonComponents/BackHeader';
import AppImages from '../../../../assets/images/AppImages';
import { SvgIcons } from '../../../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../../../utils/Other/AppColors';
import AppTextInput from '../../../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../../../components/AppCommonComponents/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateUserDetails } from '../../../../redux/slices/AuthSlice';
import { ApiCallFormData } from '../../../../utils/apicalls/ApiCalls';
import { IMAGE_BASE_URL } from '../../../../utils/BaseUrls/BaseUrl';

const EditProfile = ({ navigation }) => {
  const userDetail = useSelector(state => state.auth.userData);

  console.log('userDetail', userDetail);
  const [loader, setLoader] = useState(false)

  const [info, setInfo] = useState({
    full_name: userDetail?.fullName,
    Gender: userDetail?.gender,
    Birthday: userDetail?.dob,
    Language: userDetail?.language,
    City: userDetail?.city,
    Primary_sports: userDetail?.primarySport,
    Skill_Level: userDetail?.skillLevel, // Assuming skillLevel exists or mapping to something else
    Availability: userDetail?.availablity,
    Joined_CountMe: userDetail?.joinedCountMe,
    email: userDetail?.email,
    Contact_Number: userDetail?.contactNumber,
    Bio: userDetail?.bio,
  });

  const dispatch = useDispatch()

  const updateUserData = async () => {
    try {
      setLoader(true)

      const formData = new FormData();
      formData.append('userId', userDetail?._id);
      formData.append('fullName', info.full_name);
      formData.append('gender', info.Gender);
      formData.append('dob', info.Birthday);
      formData.append('language', info.Language);
      formData.append('city', info.City);
      formData.append('primarySport', info.Primary_sports);
      // formData.append('skillLevel', info.Skill_Level); // Check if API supports this
      formData.append('availablity', info.Availability);
      formData.append('joinedCountMe', info.Joined_CountMe);
      formData.append('contactNumber', info.Contact_Number);
      formData.append('bio', info.Bio);

      // Add other fields if necessary or available in info
      // formData.append('userName', '...'); 
      // formData.append('profession', '...');
      // formData.append('activity', '...');
      // formData.append('secondarySport', '...');
      // formData.append('education', '...');
      // formData.append('relationShip', '...');
      // formData.append('locationName', '...');
      // formData.append('longitude', '...');
      // formData.append('latitude', '...');

      const res = await ApiCallFormData('POST', 'user/updateUser', formData);

      if (res.status === 200 || res.status === 201) {
        // Update local redux state with new info
        // We might need to map back to the structure expected by Redux/App
        const updatedUser = {
          ...userDetail,
          full_name: info.full_name,
          gender: info.Gender,
          dob: info.Birthday,
          language: info.Language,
          city: info.City,
          primarySport: info.Primary_sports,
          availablity: info.Availability,
          contactNumber: info.Contact_Number,
          bio: info.Bio
        };
        dispatch(setUpdateUserDetails(updatedUser));
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Failed to update profile");
        console.log("Update response:", res);
      }

      setLoader(false)
      console.log('✅ User data updated successfully');
    } catch (error) {
      setLoader(false)
      console.error('❌ Error updating user data:', error);
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <BackHeader title="Edit Profile" navigation={navigation} />

      <View style={{ alignSelf: 'center' }}>
        <Image
          source={userDetail?.image ? { uri: `${IMAGE_BASE_URL}${userDetail.image}` } : AppImages.profileimg}
          style={{ height: 70, width: 70, borderRadius: 35 }}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'flex-end',
            bottom: 0,
            backgroundColor: AppColors.WHITE,
            padding: 5,
            borderRadius: 200,
          }}
        >
          <SvgIcons.camera />
        </View>
      </View>
      <View style={{ padding: 20, gap: 10 }}>
        <AppTextInput
          title="Name"
          titleColour={AppColors.BLACK}
          placeholder={info.full_name}
          onChangeText={txt => setInfo({ ...info, full_name: txt })}
          value={info.full_name}
        />
        <AppTextInput
          title="Gender"
          titleColour={AppColors.BLACK}
          placeholder={info.Gender}
          onChangeText={txt => setInfo({ ...info, Gender: txt })}
          value={info.Gender}
        />
        <AppTextInput
          title="Birthday"
          titleColour={AppColors.BLACK}
          placeholder={info.Birthday}
          onChangeText={txt => setInfo({ ...info, Birthday: txt })}
          value={info.Birthday}
        />
        <AppTextInput
          title="Language"
          titleColour={AppColors.BLACK}
          placeholder={info.Language}
          onChangeText={txt => setInfo({ ...info, Language: txt })}
          value={info.Language}
        />
        <AppTextInput
          title="City"
          titleColour={AppColors.BLACK}
          placeholder={info.City}
          onChangeText={txt => setInfo({ ...info, City: txt })}
          value={info.City}
        />
        <AppTextInput
          title="Primary sports"
          titleColour={AppColors.BLACK}
          placeholder={info.Primary_sports}
          onChangeText={txt => setInfo({ ...info, Primary_sports: txt })}
          value={info.Primary_sports}
        />
        <AppTextInput
          title="Skill Level"
          titleColour={AppColors.BLACK}
          placeholder={info.Skill_Level}
          onChangeText={txt => setInfo({ ...info, Skill_Level: txt })}
          value={info.Skill_Level}
        />
        <AppTextInput
          title="Availability"
          titleColour={AppColors.BLACK}
          placeholder={info.Availability}
          onChangeText={txt => setInfo({ ...info, Availability: txt })}
          value={info.Availability}
        />
        <AppTextInput
          title="Joined CountMe"
          titleColour={AppColors.BLACK}
          placeholder={info.Joined_CountMe}
          editable={false}
          value={info.Joined_CountMe}
        />
        <AppTextInput
          title="Email"
          titleColour={AppColors.BLACK}
          placeholder={info.email}
          editable={false}
          value={info.email}
        />
        <AppTextInput
          title="Contact Number"
          titleColour={AppColors.BLACK}
          placeholder={info.Contact_Number}
          onChangeText={txt => setInfo({ ...info, Contact_Number: txt })}
          value={info.Contact_Number}
        />
        <AppTextInput
          title="Bio"
          titleColour={AppColors.BLACK}
          placeholder={info.Bio}
          onChangeText={txt => setInfo({ ...info, Bio: txt })}
          value={info.Bio}
        />

        <AppButton title="Update" handlePress={() => updateUserData()} loading={loader} />
      </View>
    </ScrollView>
  );
};

export default EditProfile;

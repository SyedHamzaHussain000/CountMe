import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import BackHeader from '../../../../components/AppCommonComponents/BackHeader';
import AppImages from '../../../../assets/images/AppImages';
import { SvgIcons } from '../../../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../../../utils/Other/AppColors';
import AppTextInput from '../../../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../../../components/AppCommonComponents/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, update } from '@react-native-firebase/database';
import { getAuth } from '@react-native-firebase/auth';
import { setUpdateUserDetails } from '../../../../redux/slices/AuthSlice';

const EditProfile = ({ navigation }) => {
  const userDetail = useSelector(state => state.auth);

  const [loader, setLoader] = useState()

  const [info, setInfo] = useState({
    full_name: userDetail?.full_name,
    Gender: userDetail?.Gender,
    Birthday: userDetail?.Birthday,
    Language: userDetail?.Language,
    City: userDetail?.City,
    Primary_sports: userDetail?.Primary_sports,
    Skill_Level: userDetail?.Skill_Level,
    Availability: userDetail?.Availability,
    Joined_CountMe: userDetail?.Joined_CountMe,
    email: userDetail?.email,
    Contact_Number: userDetail?.Contact_Number,
    Bio: userDetail?.Bio,
  });

  const UserId = getAuth().currentUser.uid;
  const dispatch = useDispatch()

  const updateUserData = async () => {
    try {
      setLoader(true)
      const db = getDatabase();
      const userRef = ref(db, `Users/${UserId}`);

      await update(userRef, info);
      dispatch(setUpdateUserDetails(info))
      setLoader(false)
      console.log('✅ User data updated successfully');
    } catch (error) {
      setLoader(false)
      console.error('❌ Error updating user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <BackHeader title="Edit Profile" navigation={navigation} />

      <View style={{ alignSelf: 'center' }}>
        <Image
          source={AppImages.profileimg}
          style={{ height: 70, width: 70 }}
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
        />
        <AppTextInput
          title="Email"
          titleColour={AppColors.BLACK}
          placeholder={info.email}
          editable={false}
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

        <AppButton title="Update" handlePress={()=>updateUserData()} loading={loader}/>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

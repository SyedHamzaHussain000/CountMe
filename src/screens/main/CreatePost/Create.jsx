import { View, Text, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import AppColors from '../../../utils/Other/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../../../components/AppCommonComponents/AppButton';
import ReactNativeModal from 'react-native-modal';
import SmallButtons from '../../../components/AppCommonComponents/SmallButtons';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import PostFeatureBar from '../../../components/PostFeatureBar';
import AppImages from '../../../assets/images/AppImages';

const Create = () => {
  return (
    <ReactNativeModal isVisible={true} style={{ margin: 0 }}>
             <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust if header overlaps
      >
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.WHITE,
          padding: 20,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <AntDesign name={'close'} size={20} color={AppColors.BLACK} />

            <SmallButtons title="POST" />
          </View>

          <View>
            <AppTextInput placeholder="Title Here (optional)" />
            <AppTextInput placeholder="What’s on your mind" />
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <PostFeatureBar img={AppImages.runner} title="Count me" />
          <PostFeatureBar img={AppImages.photo} title="Add Photos/videos" />
          <PostFeatureBar img={AppImages.poll} title="Add poll" />
          <PostFeatureBar img={AppImages.link} title="Add link" />
          <PostFeatureBar img={AppImages.location} title="Add location" />
          <PostFeatureBar img={AppImages.live} title="Live Video" />
        </View>
      </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};

export default Create;

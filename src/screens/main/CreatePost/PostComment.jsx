import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SvgIcons } from '../../../assets/icons/HomeIcons/SvgIcons';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppImages from '../../../assets/images/AppImages';
import { responsiveWidth } from '../../../utils/Other/Responsive_Dimensions';
import AppColors from '../../../utils/Other/AppColors';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import RoundButton from '../../../components/RoundButton';

import { useSelector } from 'react-redux';
import NormalizeData from '../../../global/utils/NormalizeData';
import moment from 'moment';
import { ApiCall } from '../../../utils/apicalls/ApiCalls';
import { IMAGE_BASE_URL } from '../../../utils/BaseUrls/BaseUrl';

const PostComment = ({ navigation, route }) => {
  const { postId, runner, comments: initialComments } = route?.params;

  console.log("postId", initialComments);

  const [TextComment, setTextComments] = useState('');
  const [comments, setComments] = useState([]);

  const userDetail = useSelector(state => state?.auth.userData);

  const userId = userDetail?._id;

  useEffect(() => {
    if (initialComments) {
      // Sort by createdAt descending
      const sorted = [...initialComments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setComments(sorted);
    }

    // // Handle runner auto-comment
    // if (runner) {
    //   const alreadyCommented = initialComments?.some(
    //     c => c.userId?._id === userId && c.message === "Game on, I’m coming 🏃"
    //   );

    //   if (!alreadyCommented) {
    //     AddComment("Game on, I’m coming 🏃");
    //   }
    // }
  }, [initialComments, runner]);

  const AddComment = async (text) => {
    const commentText = text ? text : TextComment;
    if (!commentText.trim()) return;

    try {
      const newComment = {
        userId: {
          _id: userId,
          fullName: userDetail?.full_name,
          image: userDetail?.image
        },
        message: commentText,
        _id: Date.now().toString(), // Temporary ID
        createdAt: new Date().toISOString(),
        postId: postId
      };

      // Optimistic update
      setComments(prev => [newComment, ...prev]);
      setTextComments('');

      const commentData = {
        postId: postId,
        userId: userId,
        message: commentText
      }


      const res = await ApiCall('POST', 'commentByUser', commentData);
      console.log("cooment res", res)


      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert("Error", "Failed to add comment");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
      >
        <SvgIcons.backb />
        <AppText title={'Add Comments'} textSize={2} textFontWeight />
      </TouchableOpacity>

      <FlatList
        data={comments}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Image
                  source={item?.userId?.image ? { uri: `${IMAGE_BASE_URL}${item.userId.image}` } : AppImages.photo}
                  style={{
                    borderRadius: 200,
                    resizeMode: 'contain',
                    height: 40,
                    width: 40,
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <AppText title={item?.userId?.fullName} textSize={2} textFontWeight />
                    <AppText
                      title={moment(item?.createdAt).fromNow()}
                      textSize={1.5}
                    />
                  </View>
                  <AppText title={item?.message} textSize={1.8} />
                </View>
              </View>
              <View
                style={{
                  height: 0.7,
                  width: responsiveWidth(100),
                  backgroundColor: AppColors.GRAY,
                  marginTop: 10,
                  marginBlock: 10,
                }}
              />
            </View>
          );
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <AppTextInput
          TextInputColour={AppColors.GRAY}
          borderRadius={1000}
          width={76}
          onChangeText={txt => setTextComments(txt)}
          value={TextComment}
        />
        <RoundButton
          Icon={<SvgIcons.sendmsg />}
          handlePress={() => AddComment()}
        />
      </View>
    </View>
  );
};

export default PostComment;

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
import {
  get,
  getDatabase,
  push,
  ref,
  runTransaction,
  set,
} from '@react-native-firebase/database';
import AppImages from '../../../assets/images/AppImages';
import { responsiveWidth } from '../../../utils/Other/Responsive_Dimensions';
import AppColors from '../../../utils/Other/AppColors';
import AppTextInput from '../../../components/AppCommonComponents/AppTextInput';
import RoundButton from '../../../components/RoundButton';
import { getAuth } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import NormalizeData from '../../../global/utils/NormalizeData';
import moment from 'moment';

const PostComment = ({ navigation, route }) => {
  const { postId, runner } = route?.params;

  const [TextComment, setTextComments] = useState('');
  const [comments, setComments] = useState([]);

  const userId = getAuth()?.currentUser?.uid;
  const userDetail = useSelector(state => state?.auth);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllComments();      
    });
    return nav;
  }, [navigation]);

  const AddComment = async text => {
    try {
      const db = getDatabase();
      const user = getAuth().currentUser;

      if (!user) return;

      const commentRef = ref(db, `comments/${postId}`);
      const postRef = ref(db, `posts/${postId}/commentsCount`);
      const newCommentRef = push(commentRef);

      await set(newCommentRef, {
        userId: userId,
        name: userDetail.full_name,
        comment: text ? text :  TextComment,
        postId: postId,
        createdAt: Date.now(), // or serverTimestamp() if Firestore
        runner: runner
      });
      await runTransaction(postRef, count => (count || 0) + 1);
      await getAllComments();
      console.log('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getAllComments = async () => {
    const db = getDatabase();
    const commentsRef = ref(db, `comments/${postId}`);

    try {
      const snapshot = await get(commentsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const alreadyCommented = Object.values(data).some(
          c => c.userId === userId && c.runner === true
        );


        if(alreadyCommented == false){
          AddComment("Game on, I’m coming 🏃")
        }

        const formatted = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        formatted.sort((a, b) => b.createdAt - a.createdAt);

        setComments(formatted);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
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
                  source={AppImages.photo}
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
                    <AppText title={item.name} textSize={2} textFontWeight />
                    <AppText
                      title={moment(item?.createdAt).fromNow()}
                      textSize={1.5}
                    />
                  </View>
                  <AppText title={item.comment} textSize={1.8} />
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

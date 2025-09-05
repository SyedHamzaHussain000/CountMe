import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AddInputAndUpload from '../../components/AppCommonComponents/AddInputAndUpload';
import SocialMediaPost from '../../components/SocialMediaPost';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';
import Create from './CreatePost/Create';
import AppButton from '../../components/AppCommonComponents/AppButton';
import { getAuth } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { SignOut } from '../../redux/slices/AuthSlice';
import GetAllPosts from '../../global/main/PostsRelatedFunctions/GetAllPosts';
import moment from 'moment';
import {
  getDatabase,
  ref,
  remove,
  runTransaction,
  set,
} from '@react-native-firebase/database';
import GetAllPostLikes from '../../global/main/PostsRelatedFunctions/GetAllPostLikes';
import GetAllPostJoins from '../../global/main/PostsRelatedFunctions/GetAllPostJoins';
import NormalizeData from '../../global/utils/NormalizeData';

const Home = ({ navigation }) => {
  const [VisibleModal, SetVisibleModal] = useState(false);
  const [allLocalPost, setAllLocalPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [joines, setJoines] = useState([]);
  const dispatch = useDispatch();

  const userId = getAuth()?.currentUser?.uid;
  const userDetail = useSelector(state => state?.auth);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {

      getAllNewPost();
    })

    return nav
  }, [navigation]);

  const getAllNewPost = async () => {
    const GetPostAndSetToLocalState = await GetAllPosts();
    const getPostLikes = await GetAllPostLikes();
    const getPostJoins = await GetAllPostJoins();

    const normalizedLikes = NormalizeData(getPostLikes);
    const normalizedJoins = NormalizeData(getPostJoins);

    setAllLocalPosts(GetPostAndSetToLocalState);
    setLikes(normalizedLikes);
    setJoines(normalizedJoins);
  };


  const toggleLike = async (postId, isLiked) => {
    setAllLocalPosts(prev =>
      prev.map(p =>
        p.postId === postId
          ? {
              ...p,
              likesCount: p.likesCount + (isLiked ? -1 : 1),
              isLiked: !isLiked,
            }
          : p,
      ),
    );

    setLikes(prev => {
      const updated = { ...prev };

      if (isLiked) {
        // remove like
        delete updated[postId][userId];
        if (Object.keys(updated[postId]).length === 0) {
          delete updated[postId];
        }
      } else {
        if (!updated[postId]) updated[postId] = {};
        updated[postId][userId] = {
          userId,
          postId,
          name: userDetail.full_name,
          createdAt: Date.now(),
        };
      }

      return updated;
    });

    const db = getDatabase();
    const likeRef = ref(db, `likes/${postId}/${userId}`);
    const postRef = ref(db, `posts/${postId}/likesCount`);

    if (isLiked) {
      await remove(likeRef);
      await runTransaction(postRef, count => (count || 1) - 1);
    } else {
      await set(likeRef, {
        userId,
        name: userDetail.full_name,
        postId: postId,
        createdAt: Date.now(),
      });
      await runTransaction(postRef, count => (count || 0) + 1);
    }
  };

  const toggleJoin = async (postId, isJoined) => {
    setAllLocalPosts(prev =>
      prev.map(p =>
        p.postId === postId
          ? {
              ...p,
              joinedCount: p.joinedCount + (isJoined ? -1 : 1),
              isJoined: !isJoined,
            }
          : p,
      ),
    );

    setJoines(prev => {
      const updated = { ...prev };

      if (isJoined) {
        // remove like
        delete updated[postId][userId];
        if (Object.keys(updated[postId]).length === 0) {
          delete updated[postId];
        }
      } else {
        if (!updated[postId]) updated[postId] = {};
        updated[postId][userId] = {
          userId,
          postId,
          name: userDetail.full_name,
          createdAt: Date.now(),
        };
      }

      return updated;
    });

    const db = getDatabase();
    const joinsRef = ref(db, `joins/${postId}/${userId}`);
    const postRef = ref(db, `posts/${postId}/joinedCount`);

    if (isJoined) {
      await remove(joinsRef);
      await runTransaction(postRef, count => (count || 1) - 1);
    } else {
      await set(joinsRef, {
        userId,
        name: userDetail.full_name,
        postId: postId,
        createdAt: Date.now(),
      });
      await runTransaction(postRef, count => (count || 0) + 1);
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <AppHeader />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Create');
        }}
        style={{ marginTop: 15 }}
      >
        <AddInputAndUpload editable={false} />
      </TouchableOpacity>

      <View style={{ padding: 20 }}>
        <FlatList
          data={allLocalPost}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingBottom: responsiveHeight(40),
          }}
          renderItem={({ item }) => {
            const isLiked = !!likes?.[item?.postId]?.[userId];
            const isJoined = !!joines?.[item?.postId]?.[userId];

            return (
              <SocialMediaPost
                name={item?.authorName}
                ago={moment(item?.createdAt).fromNow()}
                PostDescription={item?.caption}
                PostPicture={item?.PostPicture}
                JoiningPost={item?.totalPlayers > 0 ? true : false}
                IsJoined={isJoined}
                Likes={item?.likesCount}
                Comment={item?.commentsCount}
                Share={item?.sharesCount}
                TotalJoiners={item?.totalPlayers}
                TotalJoinerRemain={item?.joinedCount}
                onLikePress={() => toggleLike(item?.postId, isLiked)}
                onJoinTeamPress={() => toggleJoin(item?.postId, isJoined)}
                onCommentPress={() => navigation.navigate('PostComment',{postId:item?.postId})}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

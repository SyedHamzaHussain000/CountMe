import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  RefreshControl,
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
  off,
  onValue,
  ref,
  remove,
  runTransaction,
  set,
} from '@react-native-firebase/database';
import GetAllPostLikes from '../../global/main/PostsRelatedFunctions/GetAllPostLikes';
import GetAllPostJoins from '../../global/main/PostsRelatedFunctions/GetAllPostJoins';
import NormalizeData from '../../global/utils/NormalizeData';
import {
  AutoSkeletonView,
  AutoSkeletonIgnoreView,
} from 'react-native-auto-skeleton';
import AppColors from '../../utils/Other/AppColors';

const Home = ({ navigation }) => {
  const [VisibleModal, SetVisibleModal] = useState(false);
  const [allLocalPost, setAllLocalPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [joines, setJoines] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const userId = getAuth()?.currentUser?.uid;
  const userDetail = useSelector(state => state?.auth);

  // useEffect(() => {
  //   const db = getDatabase();
  //   const postsRef = ref(db, 'posts');

  //   const unsubscribe = onValue(postsRef, snapshot => {
  //     if (snapshot.exists()) {
  //       const data = Object.values(snapshot.val());
  //       setAllLocalPosts(data.reverse()); // latest first
  //     }
  //     setLoader(false);
  //   });

  //   return () => off(postsRef, 'value', unsubscribe);
  // }, []);


//   useEffect(() => {
//   const db = getDatabase();
//   const postsRef = ref(db, 'posts');

//   const unsubscribe = onValue(postsRef, snapshot => {
//     if (snapshot.exists()) {
//       const data = Object.values(snapshot.val());
//       setAllLocalPosts(data.reverse()); // latest first
//     }
//     setLoader(false);
//   });

//   // cleanup
//   return () => unsubscribe();
// }, []);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllNewPost();
    });

    return nav;
  }, [navigation]);

  const getAllNewPost = async () => {
    setLoader(true);
    const GetPostAndSetToLocalState = await GetAllPosts();
    const getPostLikes = await GetAllPostLikes();
    const getPostJoins = await GetAllPostJoins();

    const normalizedLikes = NormalizeData(getPostLikes);
    const normalizedJoins = NormalizeData(getPostJoins);

    setAllLocalPosts(GetPostAndSetToLocalState);
    setLikes(normalizedLikes);
    setJoines(normalizedJoins);
    setLoader(false);
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

  const toggleJoin = async (postId, isJoined, authorId) => {
    if (authorId == userId) {
      console.log("you are the author you can't join this post");
      return;
    }

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

  const sharePostAlert = async (postId, authorId) => {
    Alert.alert(
      'Share Post',
      'Do you want to share this post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('❌ Share cancelled'),
          style: 'cancel',
        },
        {
          text: 'Share',
          onPress: () => {
            sharePost();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const sharePost = async (postId, authorId) => {
    const db = getDatabase();

    try {
      // Save share record
      const shareRef = push(ref(db, 'shares'));
      await set(shareRef, {
        postId,
        authorId,
        sharedBy: userId,
        sharedAt: Date.now(),
      });

      // Increment sharesCount
      const postSharesCountRef = ref(db, `posts/${postId}/sharesCount`);
      await runTransaction(postSharesCountRef, count => (count || 0) + 1);

      console.log('✅ Post shared to feed');
    } catch (err) {
      console.error('❌ Error sharing post:', err);
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
        {/* {loader && (
          <AutoSkeletonView isLoading={loader}>
            <SocialMediaPost />
          </AutoSkeletonView>
        )} */}

        <FlatList
          data={allLocalPost}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={() => getAllNewPost()}
              colors={[AppColors.PINK]}
            />
          }
          contentContainerStyle={{
            gap: 20,
            paddingBottom: responsiveHeight(40),
          }}
          renderItem={({ item }) => {
            const isLiked = !!likes?.[item?.postId]?.[userId];
            const isJoined = !!joines?.[item?.postId]?.[userId];

            return (
              <SocialMediaPost
                AuthorId={item?.authorId}
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
                onJoinTeamPress={() =>
                  toggleJoin(item?.postId, isJoined, item?.authorId)
                }
                onCommentPress={() =>
                  navigation.navigate('PostComment', {
                    postId: item?.postId,
                    runner: true,
                  })
                }
                onRunnerPress={() =>
                  navigation.navigate('PostComment', {
                    postId: item?.postId,
                    runner: true,
                  })
                }
                onSharePress={() =>
                  sharePostAlert(item?.postId, item?.authorId)
                }
                isAutherPost={item?.authorId == userId}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../utils/Other/AppColors';
import IconText from '../../components/AppCommonComponents/IconText';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppCommonComponents/AppText';
import SocialMediaPost from '../../components/SocialMediaPost';
import { SignOut } from '../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../components/AppCommonComponents/AppButton';
import GetOnlyMyPostApi from '../../global/main/PostsRelatedFunctions/GetOnlyMyPostApi';
import moment from 'moment';
import NormalizeData from '../../global/utils/NormalizeData';
import { IMAGE_BASE_URL } from '../../utils/BaseUrls/BaseUrl';
import { ApiCall } from '../../utils/apicalls/ApiCalls';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetail = useSelector(state => state?.auth?.userData);
  const userId = userDetail?._id;
  const [allLocalPost, setAllLocalPosts] = useState([]);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllMyPost();
    });

    return nav;
  }, [navigation]);

  const getAllMyPost = async () => {
    // TODO: Ideally this should also be an API call, but keeping existing function for now
    // assuming GetOnlyMyPostApi might be updated later or returns compatible data
    const allMyPosts = await GetOnlyMyPostApi(userId);
    setAllLocalPosts(allMyPosts);
  };

  const toggleLike = async (postId, isLiked) => {
    // Optimistic Update
    const updatedPosts = allLocalPost.map(post => {
      if (post.postId === postId) {
        const currentLikes = post.like || [];
        let newLikes;
        if (isLiked) {
          newLikes = currentLikes.filter(l => l._id !== userId);
        } else {
          newLikes = [...currentLikes, { _id: userId }];
        }
        return {
          ...post,
          like: newLikes,
          likesCount: newLikes.length,
          totalLikes: newLikes.length // Ensure compatibility
        };
      }
      return post;
    });

    setAllLocalPosts(updatedPosts);

    try {
      await ApiCall('POST', 'user/likeAndUnLikePost', {
        postId: postId,
        userId: userId,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error if needed, but for now keeping it simple
    }
  };

  const toggleJoin = (postId, isJoined, authorId) => {
    // Placeholder for Join functionality if needed on Profile
    // Since these are "my posts", joining might not be relevant or handled differently
    Alert.alert("Info", "Join functionality on profile is currently disabled.");
  };

  const sharePostAlert = (postId, authorId) => {
    // Placeholder for Share functionality
    Alert.alert("Share", "Share functionality coming soon.");
  };

  return (
    <View style={{ backgroundColor: AppColors.WHITE, }}>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
        nestedScrollEnabled
      >
        <AppHeader />
        <View>
          <Image source={AppImages.cover} style={styles.cover} />
          <View style={styles.pfpImgContainer}>
            <Image
              source={userDetail?.image ? { uri: `${IMAGE_BASE_URL}${userDetail.image}` } : AppImages.profileimg}
              style={styles.pfpImg}
            />
          </View>

          <View style={styles.cameraContainer}>
            <SvgIcons.cameraW />
          </View>
        </View>
        <LinearGradient
          colors={['#7EFF57', AppColors.WHITE]}
          start={{ x: 5, y: 0 }}
          style={{
            padding: 20,
            paddingTop: 100,
          }}
        >
          <View>
            <AppButton
              title="Logout"
              handlePress={() => {
                dispatch(SignOut());
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <AppText
                title={userDetail?.fullName}
                textSize={3}
                textFontWeight
              />

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                {userDetail?.activity?.map((item, index) => (
                  <Text key={index} style={{ fontSize: 25, color: 'black' }}>
                    {item.split(' ')[0]}
                  </Text>
                ))}
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <IconText
                Icon={<SvgIcons.blueprofile />}
                title="405 partners"
                textFontWeight
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
              >
                <IconText
                  Icon={<SvgIcons.edit />}
                  title="Edit Profile"
                  textFontWeight
                />
              </TouchableOpacity>
            </View>

            <AppText
              title={userDetail?.bio}
              textSize={2}
              textFontWeight
              textwidth={80}
            />

            <View style={{ marginTop: 20 }}>
              <IconText
                Icon={<SvgIcons.us />}
                title={`Lives In ${userDetail?.city || ''}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.run />}
                title={`Primary Sports: ${userDetail?.primarySport || ''}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.wifi />}
                title={`Skill Level: ${userDetail?.skillLevel || ''}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.clock />}
                title={`Availability: ${userDetail?.availablity || ''}`}
                textFontWeight
              />
            </View>

          </View>

          <View style={{ marginTop: 15, marginBottom: 10 }}>
            {/* <AddInputAndUpload /> */}
          </View>


          <FlatList
            data={allLocalPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingBottom: 0,
            }}
            renderItem={({ item }) => {
              // Check if liked by current user using the 'like' array from API/Post object
              const isLiked = item?.like?.some(l => l._id === userId);
              // Join status logic would go here if supported
              const isJoined = false;

              return (
                <SocialMediaPost
                  AuthorId={item?.authorId}
                  name={item?.authorName}
                  ago={moment(item?.createdAt).fromNow()}
                  PostDescription={item?.caption}
                  PostPicture={item?.PostPicture}
                  JoiningPost={item?.totalPlayers > 0 ? true : false}
                  IsJoined={isJoined}
                  Likes={item?.totalLikes || item?.likesCount} // Use totalLikes if available
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
                      comments: item?.comment // Pass comments if available
                    })
                  }
                  onRunnerPress={() =>
                    navigation.navigate('PostComment', {
                      postId: item?.postId,
                      runner: true,
                      comments: item?.comment
                    })
                  }
                  onSharePress={() =>
                    sharePostAlert(item?.postId, item?.authorId)
                  }
                  isAutherPost={item?.authorId == userId}
                  navigation={navigation}
                  IsLiked={isLiked}
                  activity={item?.activity}
                />
              );
            }}
          />

        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cover: {
    width: responsiveWidth(100),
    height: responsiveHeight(25),
    resizeMode: 'cover',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  pfpImgContainer: {
    position: 'absolute',
    bottom: -50,
    zIndex: 1,
    paddingHorizontal: 20,
    borderRadius: 400
  },
  pfpImg: {
    width: responsiveHeight(13),
    height: responsiveHeight(13),
    resizeMode: 'cover',
    borderTopRightRadius: 300,
    borderTopLeftRadius: 300,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
    backgroundColor: AppColors.GRAY,
    padding: 10,
    borderRadius: 10,
  },
});

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
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
import ScoreCard from '../../components/ScoreCard';
import AddInputAndUpload from '../../components/AppCommonComponents/AddInputAndUpload';
import SocialMediaPost from '../../components/SocialMediaPost';
import { getAuth } from '@react-native-firebase/auth';
import { SignOut } from '../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../components/AppCommonComponents/AppButton';
import GetOnlyMyPostApi from '../../global/main/PostsRelatedFunctions/GetOnlyMyPostApi';
import moment from 'moment';
import GetAllPostLikes from '../../global/main/PostsRelatedFunctions/GetAllPostLikes';
import GetAllPostJoins from '../../global/main/PostsRelatedFunctions/GetAllPostJoins';
import NormalizeData from '../../global/utils/NormalizeData';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const userId = getAuth()?.currentUser?.uid;
  const userDetail = useSelector(state => state?.auth);
  const [allLocalPost, setAllLocalPosts] = useState([]);

  const [likes, setLikes] = useState([]);
  const [joines, setJoines] = useState([]);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getAllMyPost();
    });

    return nav;
  }, [navigation]);

  const getAllMyPost = async () => {
    const allMyPosts = await GetOnlyMyPostApi(userId);
    const getPostLikes = await GetAllPostLikes();
    const getPostJoins = await GetAllPostJoins();

    const normalizedLikes = NormalizeData(getPostLikes);
    const normalizedJoins = NormalizeData(getPostJoins);

    setAllLocalPosts(allMyPosts);
    setLikes(normalizedLikes);
    setJoines(normalizedJoins);
  };

  return (
    <View style={{ backgroundColor: AppColors.WHITE,  }}>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom:100,
        }}
        nestedScrollEnabled
      >
        <AppHeader />
        <View>
          <Image source={AppImages.cover} style={styles.cover} />
          <View style={styles.pfpImgContainer}>
            <Image source={AppImages.profileimg} style={styles.pfpImg} />
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
          {/* <View style={{alignSelf:'flex-end', backgroundColor:AppColors.WHITE, padding:10}}>
          <IconText title='Rating 4/5' Icon={<SvgIcons.starthumb/>}/>
        </View> */}

          <View>
            <AppButton
              title="Logout"
              handlePress={() => {
                dispatch(SignOut()), getAuth().signOut();
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
                title={userDetail?.full_name}
                textSize={3}
                textFontWeight
              />

              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <SvgIcons.badmiton height={30} />
                <SvgIcons.helmet height={30} />
                <SvgIcons.basket height={30} />
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
              title={userDetail?.Bio}
              textSize={2}
              textFontWeight
              textwidth={80}
            />

            <View style={{ marginTop: 20 }}>
              <IconText
                Icon={<SvgIcons.us />}
                title={`Lives In ${userDetail?.City}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.run />}
                title={`Primary Sports: ${userDetail?.Primary_sports}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.wifi />}
                title={`Skill Level: ${userDetail?.Skill_Level}`}
                textFontWeight
              />
              <IconText
                Icon={<SvgIcons.clock />}
                title={`Availability: ${userDetail?.Availability}`}
                textFontWeight
              />
            </View>

            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
              <ScoreCard ScoreTitle='Matches Played' TotalScore={50}/>
              <ScoreCard ScoreTitle='Wins' TotalScore={30}/>
              <ScoreCard ScoreTitle='Teams Formed' TotalScore={30}/>
          </View> */}
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
  },
  pfpImg: {
    width: responsiveHeight(13),
    height: responsiveHeight(13),
    resizeMode: 'cover',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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

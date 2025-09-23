import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import SmallButtons from '../../components/AppCommonComponents/SmallButtons';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import AppText from '../../components/AppCommonComponents/AppText';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import ActivityCard from '../../components/ActivityCard';
import TopActivityCard from '../../components/TopActivityCard';
import { SvgXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import IconText from '../../components/AppCommonComponents/IconText';
import Banners from '../../components/Banners';
import SocialMediaPost from '../../components/SocialMediaPost';
import { GetAllJoiningPost } from '../../global/main/PostsRelatedFunctions/GetAllJoiningPost';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import GetAllPostJoins from '../../global/main/PostsRelatedFunctions/GetAllPostJoins';
import NormalizeData from '../../global/utils/NormalizeData';
import {
  getDatabase,
  ref,
  remove,
  runTransaction,
  set,
} from '@react-native-firebase/database';
import { getAuth } from '@react-native-firebase/auth';
import { AllSports } from '../../utils/Other/AllSports';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = getAuth()?.currentUser?.uid;
  const [RecentActivity, setRecentActivity] = useState([]);
  const [AllSportPosts, setAllSportsPost] = useState([]);
  const [joines, setJoines] = useState([]);

  const [selectedSports, setSelectedSports] = useState("Football (Soccer)")

  const sportsArr = [
    { id: 1, img: AppImages.sport1, sportsName: AllSports[3].name },
    { id: 2, img: AppImages.sport2, sportsName: AllSports[1].name },
    { id: 3, img: AppImages.sport3, sportsName: AllSports[52].name },
    { id: 4, img: AppImages.sport4, sportsName: AllSports[20].name },
    { id: 5, img: AppImages.sport5, sportsName: AllSports[4].name },
    { id: 6, img: AppImages.sport6, sportsName: AllSports[29].name },
    { id: 7, img: AppImages.sport7, sportsName: AllSports[19].name },
    { id: 8, img: AppImages.sport8, sportsName: AllSports[0].name },
  ];

  useEffect(() => {
    const nav = navigation.addListener('focus', async () => {
      const getAllSportsJoinedPost = await GetAllJoiningPost(dispatch);

      const getPostJoins = await GetAllPostJoins();
      const normalizedJoins = NormalizeData(getPostJoins);

      setAllSportsPost(getAllSportsJoinedPost);
      CreateRecentActivity(getAllSportsJoinedPost);
      setJoines(normalizedJoins);
    });

    return nav;
  }, [navigation]);

  const CreateRecentActivity = SortStartingSoonPosts => {
    const now = moment();
    const oneWeekLater = moment().add(7, 'days');

    const filtered = SortStartingSoonPosts.filter(post => {
      if (!post.matchDateAndTime) return false;

      const matchTime = moment(JSON.parse(post.matchDateAndTime));
      return matchTime.isBetween(now, oneWeekLater);
    });

    const sorted = filtered.sort((a, b) => {
      const timeA = moment(JSON.parse(a.matchDateAndTime));
      const timeB = moment(JSON.parse(b.matchDateAndTime));
      return timeA - timeB;
    });

    setRecentActivity(sorted);

    return sorted;
  };

  const toggleJoin = async (postId, isJoined, authorId) => {
    if (authorId == userId) {
      console.log("you are the author you can't join this post");
      return;
    }

    setAllSportsPost(prev =>
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
    <ImageBackground source={AppImages.searchbg} style={{ flex: 1 }}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 0 }}
      >
        {/* <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.yellowButtons}>
            <AppText
              title={'Add Activity'}
              textSize={2}
              textColor={AppColors.WHITE}
            />
            <SvgIcons.activity />
          </TouchableOpacity> */}

        {/* <TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
              style={styles.searchButton}
            >
              <SvgIcons.searchW />
              <AppText
                title={'Search'}
                textSize={2}
                textColor={AppColors.WHITE}
              />
            </LinearGradient>
          </TouchableOpacity> */}
        {/* </View> */}

        <View style={{ marginTop: 20 }}>
          <AppText
            title={'Recent activity'}
            textSize={3}
            textFontWeight
            textColor={AppColors.BLACK}
          />

          <FlatList
            data={RecentActivity}
            horizontal
            contentContainerStyle={{ gap: 20 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ActivityCard
                  ActivityName={item?.sport}
                  TotalJoined={item?.joinedCount}
                  TotalJoiner={item?.totalPlayers}
                  JoiningFee={item?.amount}
                  Icon={item.Icon}
                />
              );
            }}
          />
        </View>

        <View>
          <View
            style={{
              backgroundColor: AppColors.YELLOWIS,
              opacity: 0.3,
              height: responsiveHeight(40),
              borderRadius: 10,
              marginTop: 10,
            }}
          />
          <View style={{ position: 'absolute', zIndex: 1, padding: 20 }}>
            <AppText title={'Top 5 Sports'} textSize={2.5} textFontWeight />

            <FlatList
              data={RecentActivity}
              contentContainerStyle={{ gap: 10, marginTop: 10 }}
              renderItem={({ item }) => {
                return (
                  <TopActivityCard
                    Title={item?.sport}
                    TotalJoined={item?.joinedCount}
                    TotalJoiner={item?.totalPlayers}
                    Icon={<SvgIcons.club />}
                  />
                );
              }}
            />
          </View>

          <Banners data={RecentActivity} />

          <View style={{ marginTop: 10 }}>
            <AppText title={'Choose By Sports'} textSize={2.5} textFontWeight />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: responsiveWidth(90),
                  marginBottom:20
                }}
              >
                {sportsArr.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedSports(item.sportsName)}

                  >
                    <Image
                      key={index}
                      source={item.img}
                      style={{ width: 80, height: 80, borderRadius: 10,backgroundColor: item.sportsName == selectedSports ?  AppColors.PINK : null }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={{ padding: 0 }}>
          <FlatList
            data={AllSportPosts.filter((res)=> res.sport == selectedSports)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingBottom: responsiveHeight(20),
            }}
            renderItem={({ item }) => {
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
                  isAutherPost={item?.authorId == userId}
                  navigation={navigation}
                  RemoveFunctionality={true}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yellowButtons: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.YELLOWIS,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 15,
    borderRadius: 200,
  },
  searchButton: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.YELLOWIS,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
    borderRadius: 200,
  },
});

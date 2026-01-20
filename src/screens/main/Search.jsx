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
  ActivityIndicator,
  RefreshControl,
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
import { useDispatch, useSelector } from 'react-redux';
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
import { ApiCall } from '../../utils/apicalls/ApiCalls';
import AppSearchBar from '../../components/AppCommonComponents/AppSearchBar';
import { IMAGE_BASE_URL } from '../../utils/BaseUrls/BaseUrl';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = getAuth()?.currentUser?.uid;
  const token = useSelector(state => state.auth.token);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [joines, setJoines] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await ApiCall('GET', 'getUserActivityPosts', null, token);
      const getPostJoins = await GetAllPostJoins();
      const normalizedJoins = NormalizeData(getPostJoins);

      console.log("data.length", data.data.length)

      if (data && data.data) {
        // Parse activity if it's a string
        const parsedPosts = data.data.map(post => {
          let parsedActivity = post.activity;
          if (typeof post.activity === 'string') {
            try {
              parsedActivity = JSON.parse(post.activity);
            } catch (e) {
              console.log('Error parsing activity:', e);
              parsedActivity = [post.activity]; // Fallback to array with single string
            }
          }
          return {
            ...post,
            activity: parsedActivity
          };
        });
        setPosts(parsedPosts);
        setFilteredPosts(parsedPosts);
      }
      setJoines(normalizedJoins);
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.activity?.some((act) =>
          act.toLowerCase().includes(text.toLowerCase())
        )
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <ImageBackground source={AppImages.searchbg} style={{ flex: 1 }}>
      <AppHeader />

      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <AppSearchBar
          placeHolder="Search by sports name"
          value={searchQuery}
          onChangeText={handleSearch}
          color={AppColors.BLACK}
        />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={AppColors.PRIMARY} />
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => fetchPosts()}
              colors={[AppColors.PRIMARY]}
            />
          }
          contentContainerStyle={{
            padding: 20,
            paddingBottom: responsiveHeight(15),
            gap: 20,
          }}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
              <AppText
                title={searchQuery ? "No match found related to this sports" : "No activity posts found"}
                textColor={AppColors.BLACK}
                textSize={2}
                textFontWeight
              />
            </View>
          }
          renderItem={({ item }) => {
            const postId = item?.postId || item?._id;
            const isJoined = !!joines?.[postId]?.[userId];
            const joinedCount = joines?.[postId] ? Object.keys(joines[postId]).length : (item?.joinedUsers?.length || 0);

            return (
              <SocialMediaPost
                AuthorId={item?.userId?._id}
                authorImage={item?.userId?.ProfilePicture}
                name={item?.userId?.fullName}
                ago={moment(item?.createdAt).fromNow()}
                PostDescription={Array.isArray(item?.activity) ? item.activity.join(', ') : item?.activity}
                PostPicture={item?.image ? [item.image] : []}
                activity={item?.activity}
                JoiningPost={true}
                IsJoined={isJoined}
                Likes={item?.totalLikes || 0}
                Comment={item?.totalComments || 0}
                Share={item?.totalShares || 0}
                TotalJoiners={item?.totalPlayers || 0}
                TotalJoinerRemain={joinedCount}
                isAutherPost={item?.userId?._id === userId}
                navigation={navigation}
                RemoveFunctionality={false}
                matchDate={item?.date}
                startTime={item?.startTime}
                endTime={item?.endTime}
                onJoinTeamPress={() =>
                  navigation.navigate('JoinPaymentScreen', {
                    postData: item
                  })
                }
                onCommentPress={() =>
                  navigation.navigate('PostComment', {
                    postId: postId,
                    runner: true,
                    comments: item?.comment
                  })
                }
                onRunnerPress={() =>
                  navigation.navigate('PostComment', {
                    postId: postId,
                    runner: true,
                    comments: item?.comment
                  })
                }
                onSharePress={() => {
                  Alert.alert('Share Post', 'Do you want to share this post?');
                }}
              />
            );
          }}
        />
      )}
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

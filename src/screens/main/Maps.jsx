import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import AppColors from '../../utils/Other/AppColors';
import AppText from '../../components/AppCommonComponents/AppText';
// import SvgIcons from '../../assets/icons/HomeIcons/SvgIcons'
// import SearchW from '../../assets/icons/HomeIcons/searchw'
import IconText from '../../components/AppCommonComponents/IconText';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import Line from '../../components/AppCommonComponents/Line';
import Participants from '../../components/AppCommonComponents/Participants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { getNearbyPosts } from '../../global/main/mapsScreenFunctions/GetNearbyPosts';
import { useDispatch, useSelector } from 'react-redux';
import GetAllJoinerByPost from '../../global/main/mapsScreenFunctions/GetAllJoinerByPost';
import { useFocusEffect } from '@react-navigation/native';

const Maps = ({ navigation }) => {
  const dispatch = useDispatch();
  const AllNearbyPosts = useSelector(state => state?.auth?.AllNearbyPosts);

  const [postIndex, setPostIndex] = useState(0);
  const [AllPostJoinersState, setAllPostJoinersState] = useState([]);
  const [JoinerLoader, setJoinerLoader] = useState(false)


  const data = [
    { id: 1, name: 'Alex Hales', type: 'Organizer' },
    { id: 2, name: 'Jhon', type: 'participant' },
    { id: 3, name: 'Jhon', type: 'participant' },
    { id: 4, name: 'Jhon', type: 'participant' },
    { id: 5, name: 'Jhon', type: 'participant' },
    { id: 6, name: 'Slot available', type: 'Join now' },
  ];

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getNearbyLocations();
      // getAllJoiners(AllNearbyPosts);
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    getAllJoiners(AllNearbyPosts);
  }, [AllNearbyPosts]);

  const getNearbyLocations = async () => {
    await getNearbyPosts(40.7579747, -73.9855426, 300, dispatch);
  };

  const getAllJoiners = async AllNearbyPosts => {
    setJoinerLoader(true)
    const getPostJoiners = await GetAllJoinerByPost(AllNearbyPosts[postIndex]?.postId);


    const author = {
     userId:  AllNearbyPosts[postIndex]?.authorId,
     postId: AllNearbyPosts[postIndex]?.postId,
     name: AllNearbyPosts[postIndex]?.authorName,
     createdAt: AllNearbyPosts[postIndex]?.createdAt
    }


    setAllPostJoinersState(getPostJoiners);
    setJoinerLoader(false)
  };

  return (
    <View style={{ backgroundColor: AppColors.PURPLE, flex: 1 }}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: responsiveHeight(20),
        }}
      >
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              height: 400,
              width: responsiveWidth(100),
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              overflow: 'hidden',
            }}
            region={{
              latitude: 40.7579747,
              longitude: -73.9855426,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {AllNearbyPosts.length > 0 &&
              AllNearbyPosts.map(res => (
                <Marker
                  key={res.postId}
                  coordinate={{
                    latitude: res.latitude,
                    longitude: res.longitude,
                  }}
                  title={res.caption}
                  description={res.address}
                />
              ))}
          </MapView>

          <View
            style={{
              position: 'absolute',
              zIndex: 0,
              bottom: 0,
              backgroundColor: AppColors.WHITE,
              width: responsiveWidth(100),
              alignSelf: 'center',
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              opacity: 0.8,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
            }}
          >
            <View>
              <AppText
                title={'Activities near me'}
                textSize={2.5}
                textFontWeight
              />
              <AppText title={'200m - 300m'} textSize={2} />
            </View>

            <View
              style={{
                height: responsiveHeight(5),
                width: responsiveHeight(5),
                backgroundColor: AppColors.YELLOWIS,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            >
              <SvgIcons.searchW />
            </View>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20 }}>
          <AppText
            title={'Activity Detail'}
            textColor={AppColors.WHITE}
            textSize={3}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconText
              title={
                AllNearbyPosts[postIndex]?.sport
                  ? AllNearbyPosts[postIndex]?.sport
                  : 'Not Activity'
              }
              Icon={<SvgIcons.world />}
              titleColour={AppColors.WHITE}
            />
            <IconText
              title={
                AllNearbyPosts[postIndex]?.amount
                  ? `$ ${AllNearbyPosts[postIndex]?.amount}`
                  : '0'
              }
              Icon={<SvgIcons.Penny />}
              titleColour={AppColors.WHITE}
            />
          </View>
          <IconText
            title={
              AllNearbyPosts[postIndex]?.matchDateAndTime
                ? AllNearbyPosts[postIndex]?.matchDateAndTime
                : '-'
            }
            Icon={<SvgIcons.calender />}
            titleColour={AppColors.WHITE}
          />

          <View>
            <IconText
              title={
                AllNearbyPosts[postIndex]?.address
                  ? AllNearbyPosts[postIndex]?.address
                  : 'No Address'
              }
              Icon={<SvgIcons.location />}
              titleColour={AppColors.WHITE}
            />

            <View style={{ width: responsiveWidth(75), alignSelf: 'center' }}>
              <AppText
                title="Get Direction"
                textColor={'#FD26D9'}
                textSize={2}
              />
            </View>
          </View>
          <IconText
            title={`participants (${AllNearbyPosts[postIndex]?.joinedCount}/${AllNearbyPosts[postIndex]?.totalPlayers})`}
            Icon={<SvgIcons.pfp />}
            titleColour={AppColors.WHITE}
          />
        </View>

        <Line />
          {
            JoinerLoader == true ? (
              <View style={{marginTop:20, alignItems:'center', justifyContent:'center', gap:10}}>
              <ActivityIndicator size={'large'} color={AppColors.WHITE}/>
              <AppText title={"Fetching participants"} textColor={AppColors.WHITE} textAlignment={'center'} textSize={1.7}/>
              </View>
            ):(

              <FlatList
                data={AllPostJoinersState}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  gap: 10,
                  marginTop: 20,
                }}
                renderItem={({ item }) => {
                  return (
                    <Participants
                      name={item.name}
                      pfp={AppImages.User}
                      type={'participant'}
                    />
                  );
                }}
              />
            )
          }
      </ScrollView>
    </View>
  );
};

export default Maps;

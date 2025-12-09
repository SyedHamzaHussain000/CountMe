import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import moment from 'moment';
import { ApiCall } from '../../utils/apicalls/ApiCalls';

const Maps = ({ navigation }) => {
  const mapRef = useRef();
  const [AllNearbyPosts, setAllNearbyPosts] = useState([]);

  const [postIndex, setPostIndex] = useState(0);
  const [AllPostJoinersState, setAllPostJoinersState] = useState([]);
  const [JoinerLoader, setJoinerLoader] = useState(false);


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
    });

    return nav;
  }, [navigation]);

  // useEffect(() => {
  //   getAllJoiners(AllNearbyPosts);
  // }, [AllNearbyPosts]);

  useEffect(() => {
    if (AllNearbyPosts.length > 0) {
      // Focus on the first post
      animateToTheLocation(
        parseFloat(AllNearbyPosts[0].latitude),
        parseFloat(AllNearbyPosts[0].longitude),
      );
    }
  }, [AllNearbyPosts]);

  const getNearbyLocations = async () => {
    try {
      const res = await ApiCall('get', 'getNearbyActivityPosts?latitude=38.7888&longitude=106.5349');
      if (res?.data?.success) {
        setAllNearbyPosts(res.data.data);
      } else {
        console.log('Error fetching nearby posts:', res);
      }
    } catch (error) {
      console.log('Error in getNearbyLocations:', error);
    }
  };

  // 40.9651419
  // -73.6751251
  const getAllJoiners = async (AllNearbyPosts, i) => {
    // setJoinerLoader(true);
    // const getPostJoiners = await GetAllJoinerByPost(
    //   AllNearbyPosts[i == 0 || i > 0 ? i : postIndex]?.postId,
    // );
    // setAllPostJoinersState(getPostJoiners);
    // setJoinerLoader(false);
  };

  const animateToTheLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01, // zoom level (smaller = more zoom)
          longitudeDelta: 0.01,
        },
        2000, // duration in ms
      );
    }
  };

  const openMapDirection = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?daddr=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    // Using a universal link for better cross-platform compatibility if the above fails or as a preference
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    Linking.openURL(googleMapsUrl).catch(err => console.error('An error occurred', err));
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
            ref={mapRef}
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
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }}
          >
            {AllNearbyPosts.length > 0 &&
              AllNearbyPosts.map((res, index) => {
                return (
                  <Marker
                    key={res._id || index}
                    coordinate={{
                      latitude: parseFloat(res.latitude),
                      longitude: parseFloat(res.longitude),
                    }}
                    title={res.caption}
                    description={res.locationName}
                    onPress={() => {
                      setPostIndex(index);
                      // getAllJoiners(AllNearbyPosts, index);
                    }}
                  />
                );
              })}
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
                AllNearbyPosts[postIndex]?.activity && AllNearbyPosts[postIndex]?.activity.length > 0
                  ? AllNearbyPosts[postIndex]?.activity[0]
                  : 'Not Activity'
              }
              Icon={<SvgIcons.world />}
              titleColour={AppColors.WHITE}
            />
            <IconText
              title={
                AllNearbyPosts[postIndex]?.perPrsonPrice
                  ? `$ ${AllNearbyPosts[postIndex]?.perPrsonPrice}`
                  : '0'
              }
              Icon={<SvgIcons.Penny />}
              titleColour={AppColors.WHITE}
            />
          </View>
          <IconText
            title={
              AllNearbyPosts[postIndex]?.date
                ? `${AllNearbyPosts[postIndex]?.date} ${AllNearbyPosts[postIndex]?.startTime || ''}`
                : '-'
            }
            Icon={<SvgIcons.calender />}
            titleColour={AppColors.WHITE}
          />

          <View>
            <IconText
              title={
                AllNearbyPosts[postIndex]?.locationName
                  ? AllNearbyPosts[postIndex]?.locationName
                  : 'No Address'
              }
              Icon={<SvgIcons.location />}
              titleColour={AppColors.WHITE}
            />

            <TouchableOpacity
              style={{ width: responsiveWidth(75), alignSelf: 'center' }}
              onPress={() => {
                if (AllNearbyPosts[postIndex]) {
                  openMapDirection(
                    parseFloat(AllNearbyPosts[postIndex].latitude),
                    parseFloat(AllNearbyPosts[postIndex].longitude)
                  );
                }
              }}
            >
              <AppText
                title="Get Direction"
                textColor={'#FD26D9'}
                textSize={2}
              />
            </TouchableOpacity>
          </View>
          <IconText
            title={`participants (${AllNearbyPosts[postIndex]?.joinedUsers?.length || 0}/${AllNearbyPosts[postIndex]?.totalPlayer || 0})`}
            Icon={<SvgIcons.pfp />}
            titleColour={AppColors.WHITE}
          />
        </View>

        <Line />

        <View style={{ padding: 20, paddingBottom: 0 }}>
          <Participants
            name={AllNearbyPosts[postIndex]?.userId?.fullName || 'Organizer'}
            pfp={AppImages.User}
            type={'Organizer'}
          />
        </View>

        {JoinerLoader == true ? (
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            <AppText
              title={'Fetching participants'}
              textColor={AppColors.WHITE}
              textAlignment={'center'}
              textSize={1.7}
            />
          </View>
        ) : (
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
        )}

        <View style={{ padding: 20, paddingBottom: 0 }}>
          <Participants
            name={'Slot available'}
            pfp={AppImages.User}
            type={'Join Now'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Maps;

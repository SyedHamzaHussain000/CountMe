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
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// Using built-in Geolocation (no Google Play Services dependency)
import Geolocation from 'react-native-geolocation-service';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [radius, setRadius] = useState(2000); // in meters
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 38.7888, // Default fallback
    longitude: 106.5349,
  });

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      getCurrentLocation();
    });
    return nav;
  }, [navigation]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  const getCurrentLocation = async () => {
    setInitialLoading(true);
    const hasPermission = await requestLocationPermission();

    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          console.log("position", position);
          setCurrentPosition({ latitude, longitude });
          getNearbyLocations('', 2000, latitude, longitude);
        },
        (error) => {
          console.log("Geolocation Error: ", error.code, error.message);
          // Use fallback coordinates on timeout/error
          getNearbyLocations();
        },
        { enableHighAccuracy: false, timeout: 30000, }
      );
    } else {
      Alert.alert("Permission Denied", "Location permission is required to find activities near you.");
      getNearbyLocations();
    }
  };

  const getNearbyLocations = async (query = '', radius = 2000, lat = currentPosition.latitude, lng = currentPosition.longitude) => {
    setLoading(true);
    try {
      const endpoint = `getNearbyActivityPosts?latitude=${lat}&longitude=${lng}&radius=${radius}${query ? `&query=${query}` : ''}`;
      const res = await ApiCall('get', endpoint);

      setLoading(false);
      setInitialLoading(false);
      if (res?.data?.success) {
        const posts = res.data.data;
        // console.log("posts", posts)
        if (posts.length > 0) {
          setAllNearbyPosts(posts);
          setPostIndex(0);
          animateToTheLocation(
            parseFloat(posts[0].latitude),
            parseFloat(posts[0].longitude),
          );
        } else {
          setAllNearbyPosts([]);
          if (query) {
            Alert.alert("Not Found", `This name of match is not present in the ${radius / 1000}KM`);
          }
        }
      } else {
        console.log('Error fetching nearby posts:', res);
      }
    } catch (error) {
      setLoading(false);
      setInitialLoading(false);
      console.log('Error in getNearbyLocations:', error);
    }
  };

  const animateToTheLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        },
        1500,
      );
    }
  };

  const goToMatch = (direction) => {
    if (AllNearbyPosts.length === 0) return;
    let newIndex;
    if (direction === 'next') {
      newIndex = (postIndex + 1) % AllNearbyPosts.length;
    } else {
      newIndex = (postIndex - 1 + AllNearbyPosts.length) % AllNearbyPosts.length;
    }
    setPostIndex(newIndex);
    animateToTheLocation(
      parseFloat(AllNearbyPosts[newIndex].latitude),
      parseFloat(AllNearbyPosts[newIndex].longitude),
    );
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
          {initialLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 400,
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
              }}
            >
              <ActivityIndicator size="large" color={AppColors.WHITE} />
              <AppText
                title={'Fetching nearby activities...'}
                textColor={AppColors.WHITE}
                textSize={2}
                style={{ marginTop: 10 }}
              />
            </View>
          )}
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
            initialRegion={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}

          >
            {/* Current location marker */}
            <Marker
              coordinate={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
              }}
              title="You are here"
              description="Your current location"
              pinColor="red"
            />

            {/* Activity markers */}
            {AllNearbyPosts.length > 0 &&
              AllNearbyPosts.map((res, index) => {

                console.log("response", res)
                return (
                  <Marker
                    key={res._id || index}
                    coordinate={{

                      latitude: parseFloat(res.latitude),
                      longitude: parseFloat(res.longitude),
                    }}
                    title={res.caption}
                    description={res.locationName}
                    pinColor={AppColors.PURPLE}
                    onPress={() => {
                      setPostIndex(index);
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
            <View style={{ flex: 1, marginRight: 10 }}>
              <AppText
                title={'Activities near me'}
                textSize={2.5}
                textFontWeight
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 }}>
                <TextInput
                  placeholder="Search sport name..."
                  placeholderTextColor={AppColors.GRAY}
                  style={{
                    backgroundColor: AppColors.LIGHTGRAY,
                    flex: 1,
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    height: 40,
                    color: AppColors.BLACK
                  }}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={() => getNearbyLocations(searchQuery)}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    const newRadius = Math.max(1000, radius - 1000);
                    setRadius(newRadius);
                    getNearbyLocations(searchQuery, newRadius);
                  }}
                  style={{
                    backgroundColor: AppColors.PURPLE,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: AppColors.WHITE, fontSize: 18, fontWeight: 'bold' }}>−</Text>
                </TouchableOpacity>

                <AppText title={`Radius: ${radius / 1000}KM`} textSize={2} />

                <TouchableOpacity
                  onPress={() => {
                    const newRadius = Math.min(50000, radius + 1000);
                    setRadius(newRadius);
                    getNearbyLocations(searchQuery, newRadius);
                  }}
                  style={{
                    backgroundColor: AppColors.PURPLE,
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: AppColors.WHITE, fontSize: 18, fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => getNearbyLocations(searchQuery, radius)}
              style={{
                height: responsiveHeight(6),
                width: responsiveHeight(6),
                backgroundColor: AppColors.YELLOWIS,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            >
              {loading ? <ActivityIndicator size="small" color={AppColors.WHITE} /> : <SvgIcons.searchW />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: 20, gap: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => goToMatch('prev')}
              style={{
                backgroundColor: AppColors.YELLOWIS,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: AppColors.WHITE, fontSize: 20, fontWeight: 'bold' }}>{"<"}</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <AppText
                title={'Activity Detail'}
                textColor={AppColors.WHITE}
                textSize={3}
              />
              {AllNearbyPosts.length > 0 && (
                <AppText
                  title={`${postIndex + 1} of ${AllNearbyPosts.length}`}
                  textColor={AppColors.PINK}
                  textSize={1.8}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => goToMatch('next')}
              style={{
                backgroundColor: AppColors.YELLOWIS,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: AppColors.WHITE, fontSize: 20, fontWeight: 'bold' }}>{">"}  </Text>
            </TouchableOpacity>
          </View>

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

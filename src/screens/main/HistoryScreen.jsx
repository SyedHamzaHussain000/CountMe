import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Image, Linking, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppText from '../../components/AppCommonComponents/AppText';
import { responsiveHeight, responsiveWidth } from '../../utils/Other/Responsive_Dimensions';
import AppColors from '../../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import { ApiCall } from '../../utils/apicalls/ApiCalls';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../utils/BaseUrls/BaseUrl';
import AppImages from '../../assets/images/AppImages';
import moment from 'moment';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';

const HistoryScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector(state => state.auth.token);
    const AddressDetail = useSelector(state => state?.auth?.Address);

    const openMapDirection = (lat, lng) => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        Linking.openURL(googleMapsUrl).catch(err => console.error('An error occurred', err));
    };

    const fetchJoinedPosts = async () => {
        setLoading(true);
        try {
            const type = activeTab === 'History' ? 'History' : 'Upcomming';
            const res = await ApiCall('GET', `getJoinedActivityPost?type=${type}`, null, token);
            if (res.data) {
                setPosts(res.data.data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.log("Error fetching joined posts:", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchJoinedPosts();
        });
        return unsubscribe;
    }, [navigation, activeTab]);

    useEffect(() => {
        fetchJoinedPosts();
    }, [activeTab]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image
                        source={item?.userId?.image ? { uri: `${IMAGE_BASE_URL}${item?.userId?.image}` } : AppImages.IMAGES}
                        style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#ccc' }}
                    />
                    <View style={{ width: '60%' }}>
                        <AppText title={item?.userId?.fullName || "User"} textFontWeight textSize={1.8} />
                        <AppText title={item?.caption || "No caption provided"} textSize={1.2} textColor="gray" numberOfLines={2} />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <AppText title="Starting" textSize={1.5} textFontWeight />
                    <AppText title={item?.startTime || "N/A"} textSize={1.5} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}
                    onPress={() => {
                        if (item?.latitude && item?.longitude) {
                            openMapDirection(item.latitude, item.longitude);
                        }
                    }}
                >
                    <SvgIcons.location height={15} width={15} fill="gray" />
                    <AppText title={item?.locationName || "No address provided"} textSize={1.2} textColor="gray" numberOfLines={1} style={{ flex: 1 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <SvgIcons.Penny height={15} width={15} fill={AppColors.PRIMARY} />
                    <AppText title={`$${item?.perPrsonPrice || 0}`} textSize={1.4} textFontWeight textColor={AppColors.PRIMARY} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <AppText title={`${item?.joinedUsers?.length || 0}/${item?.totalPlayer || 0} Joined`} textFontWeight textSize={1.8} />
                <AppText title={item?.date || "N/A"} textSize={1.5} textColor="gray" />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <AppHeader />

            <View style={{ padding: 20, flex: 1 }}>
                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Upcoming' ? {} : { backgroundColor: 'transparent' }]}
                        onPress={() => setActiveTab('Upcoming')}
                    >
                        {activeTab === 'Upcoming' ? (
                            <LinearGradient
                                colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientTab}
                            >
                                <AppText title="Upcoming" textColor={AppColors.WHITE} textFontWeight />
                            </LinearGradient>
                        ) : (
                            <AppText title="Upcoming" textColor={AppColors.BLACK} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'History' ? {} : { backgroundColor: 'transparent' }]}
                        onPress={() => setActiveTab('History')}
                    >
                        {activeTab === 'History' ? (
                            <LinearGradient
                                colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.gradientTab}
                            >
                                <AppText title="History" textColor={AppColors.WHITE} textFontWeight />
                            </LinearGradient>
                        ) : (
                            <AppText title="History" textColor={AppColors.BLACK} />
                        )}
                    </TouchableOpacity>
                </View>

                {loading && posts?.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={AppColors.PRIMARY} />
                    </View>
                ) : (
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={fetchJoinedPosts}
                                colors={[AppColors.PRIMARY]}
                            />
                        }
                        ListEmptyComponent={
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                <AppText title={`No ${activeTab.toLowerCase()} posts found`} textColor="gray" />
                            </View>
                        }
                    />
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 4,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    gradientTab: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    card: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 15,
    }
});

export default HistoryScreen;

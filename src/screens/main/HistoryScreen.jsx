import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppText from '../../components/AppCommonComponents/AppText';
import { responsiveHeight, responsiveWidth } from '../../utils/Other/Responsive_Dimensions';
import AppColors from '../../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';

const HistoryScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('History');

    const dummyData = [
        { id: '1', name: 'Mary Elizabeth', status: '3/6 Joined', time: 'Starting 9:00 PM', date: '10/09/2025' },
        { id: '2', name: 'Mary Elizabeth', status: '3/6 Joined', time: 'Starting 9:00 PM', date: '10/09/2025' },
        { id: '3', name: 'Mary Elizabeth', status: '3/6 Joined', time: 'Starting 9:00 PM', date: '10/09/2025' },
        { id: '4', name: 'Mary Elizabeth', status: '3/6 Joined', time: 'Starting 9:00 PM', date: '10/09/2025' },
        { id: '5', name: 'Mary Elizabeth', status: '3/6 Joined', time: 'Starting 9:00 PM', date: '10/09/2025' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: '#ccc' }}></View>
                    <View style={{ width: '60%' }}>
                        <AppText title={item.name} textFontWeight textSize={1.8} />
                        <AppText title="Lorem Ipsum is simply dummy text of the printing and typesetting industry." textSize={1.2} textColor="gray" numberOfLines={2} />
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <AppText title="Starting" textSize={1.5} textFontWeight />
                    <AppText title={item.time} textSize={1.5} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <AppText title={item.status} textFontWeight textSize={1.8} />
                <AppText title={item.date} textSize={1.5} textColor="gray" />
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <AppHeader />

            <View style={{ padding: 20 }}>
                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'History' ? {} : { backgroundColor: 'transparent' }]}
                        onPress={() => setActiveTab('History')}
                    >
                        {activeTab === 'History' ? (
                            <LinearGradient
                                colors={[AppColors.PRIMARY, AppColors.SECONDARY]} // Assuming these are the pink/purple gradient
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
                </View>

                <FlatList
                    data={dummyData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ gap: 15, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />

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

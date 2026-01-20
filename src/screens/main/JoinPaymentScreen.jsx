import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppText from '../../components/AppCommonComponents/AppText';
import AppButton from '../../components/AppCommonComponents/AppButton';
import { responsiveHeight, responsiveWidth } from '../../utils/Other/Responsive_Dimensions';
import AppColors from '../../utils/Other/AppColors';
import Line from '../../components/AppCommonComponents/Line';
import { SvgXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import moment from 'moment';
import { IMAGE_BASE_URL } from '../../utils/BaseUrls/BaseUrl';
import AppImages from '../../assets/images/AppImages';
import { useSelector } from 'react-redux';
import { getAuth } from '@react-native-firebase/auth';
import { ApiCallFormData } from '../../utils/apicalls/ApiCalls';
import ShowToast from '../../utils/Other/ShowToast';

const JoinPaymentScreen = ({ navigation, route }) => {
    const { postData } = route.params || {};
    const [selectedMethod, setSelectedMethod] = useState('cash'); // 'cash' or 'online'
    const [loading, setLoading] = useState(false);

    const token = useSelector(state => state.auth.token);
    const userId = getAuth()?.currentUser?.uid;
    const userDetail = useSelector(state => state?.auth.userData);

    console.log("userDetail", userDetail)

    const handleJoin = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('postId', postData?._id);
        data.append('userId', userDetail?._id);
        data.append('status', selectedMethod === 'cash' ? 'Cash' : 'Online');



        try {
            const res = await ApiCallFormData('POST', 'editPost', data, token);
            if (res.data.status === true) {
                ShowToast('success', 'Joined successfully');
                navigation.goBack();
            } else {
                ShowToast('error', res.data.message || 'Failed to join');
            }
        } catch (error) {
            console.log("Error joining post:", error);
            ShowToast('error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    console.log("popstData", postData)
    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <AppHeader />
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 50 }}>

                {/* Header Info */}
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                    {/* Placeholder for user image if available, else generic */}
                    <Image
                        source={postData?.userId?.image ? { uri: `${IMAGE_BASE_URL}${postData?.userId?.image}` } : AppImages.IMAGES}
                        style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#ccc' }}
                    />
                    <View>
                        <AppText title={postData?.userId?.fullName || "User"} textFontWeight textSize={2.2} />
                        <AppText title={moment(postData?.createdAt).fromNow()} textSize={1.8} textColor="gray" />
                    </View>
                </View>

                <AppText
                    title={postData?.caption || ""}
                    textSize={1.8}
                    textColor="gray"
                    style={{ marginBottom: 20 }}
                />

                <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                    <AppText title={`${postData?.joinedUsers?.length || 0}/${postData?.totalPlayer || 0} Joined`} textFontWeight textSize={2} />
                </View>


                {/* Payment Method Section */}
                <View style={styles.sectionContainer}>
                    <AppText title="Payment Method" textFontWeight textSize={2.2} style={{ marginBottom: 15 }} />

                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => setSelectedMethod('cash')}
                    >
                        <AppText title="Cash On Arrival" textFontWeight textSize={2} />
                        <View style={styles.radioOuter}>
                            {selectedMethod === 'cash' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => setSelectedMethod('online')}
                    >
                        <AppText title="Online Transfer" textFontWeight textSize={2} />
                        <View style={styles.radioOuter}>
                            {selectedMethod === 'online' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={{ padding: 20, paddingBottom: responsiveHeight(5) }}>
                <AppButton
                    title="Join Now"
                    loading={loading}
                    handlePress={handleJoin}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#F9F9F9', // Light gray background as per design
        borderRadius: 15,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: AppColors.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: AppColors.BLACK,
    }
});

export default JoinPaymentScreen;

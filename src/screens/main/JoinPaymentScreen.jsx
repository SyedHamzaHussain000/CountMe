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

const JoinPaymentScreen = ({ navigation, route }) => {
    const { postData } = route.params || {};
    const [selectedMethod, setSelectedMethod] = useState('card'); // 'cash' or 'card'
    const [selectedCard, setSelectedCard] = useState('4242');

    const cards = [
        { id: '1', last4: '4242', brand: 'Mastercard' },
        { id: '2', last4: '6212', brand: 'Visa' },
    ];

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
                        onPress={() => setSelectedMethod('card')}
                    >
                        <AppText title="Pay With Card" textFontWeight textSize={2} />
                        <View style={styles.radioOuter}>
                            {selectedMethod === 'card' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    {selectedMethod === 'card' && (
                        <View style={{ marginTop: 20 }}>
                            <AppText title="Select Card" textFontWeight textSize={2.2} style={{ marginBottom: 15 }} />

                            {cards.map((card) => (
                                <TouchableOpacity
                                    key={card.id}
                                    style={styles.row}
                                    onPress={() => setSelectedCard(card.last4)}
                                >
                                    <AppText title={`**** ***** **** ${card.last4}`} textFontWeight textSize={2} />
                                    <View style={styles.radioOuter}>
                                        {selectedCard === card.last4 && <View style={styles.radioInner} />}
                                    </View>
                                </TouchableOpacity>
                            ))}

                            <AppButton
                                title="+ Add Card"
                                marginTop={20}
                                handlePress={() => navigation.navigate('AddCardScreen')}
                                width={80}
                            />
                        </View>
                    )}
                </View>

            </ScrollView>

            <View style={{ padding: 20, paddingBottom: responsiveHeight(5) }}>
                <AppButton title="Join Now" handlePress={() => {
                    // Handle join logic here
                    console.log("Joining with", selectedMethod);
                    navigation.goBack();
                }} />
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

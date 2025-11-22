import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppText from '../../components/AppCommonComponents/AppText';
import AppButton from '../../components/AppCommonComponents/AppButton';
import { responsiveHeight, responsiveWidth } from '../../utils/Other/Responsive_Dimensions';
import AppColors from '../../utils/Other/AppColors';

const AddCardScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <AppHeader title="Add New Card" />

            <View style={{ padding: 20 }}>
                <AppText
                    title="We Recommend You To Set Card For Further Reference Too You Cann Use It Aytime"
                    textSize={1.8}
                    textColor="gray"
                    style={{ marginBottom: 30 }}
                />

                <View style={{ marginBottom: 20 }}>
                    <AppText title="Card Number" textFontWeight textSize={2} style={{ marginBottom: 10 }} />
                    <TextInput
                        placeholder="0000 0000 0000 0000"
                        style={styles.input}
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <View style={{ flex: 1 }}>
                        <AppText title="Expiry Date" textFontWeight textSize={2} style={{ marginBottom: 10 }} />
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TextInput
                                placeholder="MM"
                                style={[styles.input, { flex: 1, textAlign: 'center' }]}
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                maxLength={2}
                            />
                            <TextInput
                                placeholder="YY"
                                style={[styles.input, { flex: 1, textAlign: 'center' }]}
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                                maxLength={2}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <AppText title="Expiry Date" textFontWeight textSize={2} style={{ marginBottom: 10 }} />
                        <TextInput
                            placeholder="CVV"
                            style={styles.input}
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            maxLength={3}
                        />
                    </View>
                </View>

            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20, paddingBottom: responsiveHeight(5) }}>
                <AppButton title="Add Card" handlePress={() => {
                    // Handle add card logic
                    navigation.goBack();
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: AppColors.BLACK,
        fontFamily: 'Poppins-Regular' // Assuming font family
    }
});

export default AddCardScreen;

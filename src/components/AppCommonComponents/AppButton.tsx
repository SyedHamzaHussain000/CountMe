import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utils/Other/AppColors';
import AppText from './AppText';

type props = {
  title?: string;
  marginTop?: number;
  handlePress?: () => void;
  loading?: boolean;
  width?:number 
};

const AppButton = ({ title, marginTop, handlePress, loading ,width}: props) => {
  return (
    <>
      {loading == true ? (
        <View style={{ marginTop: marginTop || 0 }}>
          <LinearGradient
            colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.linearGradient, { width: responsiveWidth(90) }]}
          >
            <ActivityIndicator size={'large'} color={AppColors.WHITE} />
          </LinearGradient>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={{ marginTop: marginTop || 0 }}
        >
          <LinearGradient
            colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.linearGradient, { width: responsiveWidth(width?width:90) }]}
          >
            <AppText
              title={title}
              textSize={2.5}
              textFontWeight
              textColor={AppColors.WHITE}
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  linearGradient: {
    height: responsiveHeight(6),

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

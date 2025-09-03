import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utils/Other/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import AppText from './AppText';

type props = {
  title?: string;
  icon?: any;
  handlePress?: () => void;
  btnWidth?: any;
  marginTop?: number;
  loader?: boolean;
};
const SmallButtons = ({
  icon,
  title,
  btnWidth,
  handlePress,
  marginTop,
  loader,
}: props) => {
  return (
    <>
      {loader ? (
        <View style={{ marginTop: marginTop || 0 }}>
          <LinearGradient
            colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.linearGradient,
              {
                width: btnWidth,
                height: responsiveHeight(6),
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              },
            ]}
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
            style={[
              styles.linearGradient,
              {
                width: btnWidth,
                height: responsiveHeight(6),
                paddingHorizontal: 10,
                flexDirection: 'row',
                gap: 5,
              },
            ]}
          >
            <AppText
              title={title}
              textSize={2}
              textColor={AppColors.WHITE}
              textFontWeight
            />
            {icon}
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SmallButtons;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 10,
    alignItems: 'center',
  },
});

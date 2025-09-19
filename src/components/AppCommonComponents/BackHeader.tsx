import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppText from './AppText';
import AppColors from '../../utils/Other/AppColors';

type props = {
  title?: string;
  navigation?: any;
};

const BackHeader = ({ title, navigation }: props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10 }}
      >
        <SvgIcons.backb />
      </TouchableOpacity>
      <AppText
        title={title}
        textSize={2.5}
        textFontWeight
        textColor={AppColors.BLACK}
      />
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AppColors from '../utils/Other/AppColors';

type props = {
  bgColour?: any;
  Icon?: any;
  handlePress?: () => void,
  marginBottom?: number
};

const RoundButton = ({ Icon, bgColour,handlePress, marginBottom}: props) => {
  return (
  <TouchableOpacity onPress={handlePress} style={[styles.containerStyle,{backgroundColor: bgColour || AppColors.PRIMARY, marginBottom: 0,}]}>
    {Icon}
  </TouchableOpacity>
  )
};

export default RoundButton;

const styles = StyleSheet.create({
  containerStyle: {
    height: 50,
    width: 50,
    borderRadius: 200,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center'
  },
});

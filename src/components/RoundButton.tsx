import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AppColors from '../utils/Other/AppColors';

type props = {
  bgColour?: any;
  Icon?: any;
};

const RoundButton = ({ Icon, bgColour }: props) => {
  return (
  <TouchableOpacity style={[styles.containerStyle,{backgroundColor: bgColour || AppColors.PRIMARY}]}>
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
    marginBottom: 50,
    alignItems:'center',
    justifyContent:'center'
  },
});

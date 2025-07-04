import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';

type props = {
  children?: React.ReactNode;
  backgroundImage?: any;
  padding?: any
};
const Container = ({ children, backgroundImage ,padding}: props) => {
  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, padding: padding ? padding :20 }}>
      {children}
    </ImageBackground>
  );
};

export default Container;

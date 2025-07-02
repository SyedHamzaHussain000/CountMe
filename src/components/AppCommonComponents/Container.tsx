import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import AppImages from '../../assets/images/AppImages';

type props = {
  children?: React.ReactNode;
  backgroundImage?: any;
};
const Container = ({ children, backgroundImage }: props) => {
  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, padding: 20 }}>
      {children}
    </ImageBackground>
  );
};

export default Container;

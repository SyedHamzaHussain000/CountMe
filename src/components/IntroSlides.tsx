import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import AppText from './AppCommonComponents/AppText';
import { responsiveHeight } from '../utils/Other/Responsive_Dimensions';

type props = {
  data?: any;
};

const IntroSlides = ({ data }: props) => {
  return (
    <ImageBackground source={data.image} style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <AppText title={data.title} textAlignment={'center'} textSize={3} />
          <AppText
            title={data.title2}
            textAlignment={'center'}
            textSize={3}
            textFontWeight
          />
        </View>
        <AppText
          title={data.text}
          textAlignment={'center'}
          textSize={1.8}
          textwidth={90}
        />
      </View>
    </ImageBackground>
  );
};

export default IntroSlides;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  textContainer: {
    height: responsiveHeight(25),
    gap: 20,
  },
});

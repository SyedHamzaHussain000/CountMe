import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroSlides from '../../components/IntroSlides';
import AppImages from '../../assets/images/AppImages';
import AppColors from '../../utils/Other/AppColors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import RoundButton from '../../components/RoundButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
const IntroScreen = () => {
  const slides = [
    {
      key: 1,
      title: 'Post an Invite',
      title2: 'Build Your Team',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum been the',
      image: AppImages.INTROFIRST,
    },
    {
      key: 2,
      title: 'Share Your Moments',
      title2: 'Create Memories',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum been the',
      image: AppImages.INTROSECOND,
    },
    {
      key: 3,
      title: 'No Team? No Problem',
      title2: 'Join & Play',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum been the',
      image: AppImages.INTROTHIRD,
    },
  ];

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        console.log('item', item);
        return <IntroSlides data={item} />;
      }}
      onDone={() => console.log('res')}
      dotStyle={[styles.dotStyle, { backgroundColor: AppColors.YELLOWIS }]}
      activeDotStyle={[
        styles.dotStyle,
        { backgroundColor: AppColors.SECONDARY, width: responsiveWidth(5) },
      ]}
      showDoneButton={false}
      showNextButton={false}
      showPrevButton={false}
      showSkipButton={false}
      renderPagination={activeIndex => {
        return (
          <View style={{ backgroundColor: AppColors.WHITE }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              {slides.map((_, index) => (
                <>
                  <View
                    key={index}
                    style={{
                      width: index === activeIndex ? 20 : 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor:
                        index === activeIndex
                          ? AppColors.SECONDARY
                          : AppColors.YELLOWIS,
                      marginHorizontal: 5,
                    }}
                  />
                </>
              ))}
            </View>

            <RoundButton
              Icon={
                <AntDesign
                  name={'arrow-right'}
                  size={responsiveFontSize(2)}
                  color={AppColors.WHITE}
                />
              }
            />
          </View>
        );
      }}
    />
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  dotStyle: {
    marginBottom: 200,
  },
});

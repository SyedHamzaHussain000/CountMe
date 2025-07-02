import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
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
import { SvgFromXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';

const IntroScreen = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(activeIndex + 1, true);
    } else {
      navigation.replace('ReadyToJoin'); // or your target screen
    }
  };

  return (
    <AppIntroSlider
      data={slides}
      ref={sliderRef}
      renderItem={({ item }) => {
        return <IntroSlides data={item} />;
      }}
      onSlideChange={(currentIndex, prevIndex) =>

        setActiveIndex(currentIndex)
      }
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
              handlePress={handleNext}
              Icon={
                <SvgFromXml
                  xml={Appsvgicon.RightArrow}
                  height={20}
                  width={20}
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

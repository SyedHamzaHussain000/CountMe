import { View, Text, Image } from 'react-native';
import React from 'react';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import AppText from '../../components/AppCommonComponents/AppText';
import AppColors from '../../utils/Other/AppColors';
import Line from '../../components/AppCommonComponents/Line';
import AppTextInput from '../../components/AppCommonComponents/AppTextInput';
import AppButton from '../../components/AppCommonComponents/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SvgFromXml, SvgXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import BackButton from '../../components/AppCommonComponents/BackButton';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';

const UploadPicture = ({navigation}) => {
  return (
       <Container backgroundImage={AppImages.AUTHBG}>
      <View style={{ gap: 20 }}>
        <BackButton/>
        <AppText
          title={'upload your photo'}
          textSize={3}
          textFontWeight
          textColor={AppColors.WHITE}
        />
        <AppText
          title={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
          }
          textColor={AppColors.WHITE}
          textSize={1.8}
        />

        <Line />
      </View>

      <View style={{ gap: 20, marginTop: 30 }}>
            <View style={{height:responsiveHeight(50)}}>
                <View style={{ alignSelf:'flex-start'}}>
                    <Image source={AppImages.IMAGES} style={{height:responsiveHeight(10), width:responsiveHeight(10), resizeMode:'contain'}}/>
                    <View style={{position:'absolute', zIndex:1, bottom:-5,right:-5}}>
                    <SvgXml xml={Appsvgicon.plus}/>
                    </View>
                </View>

            </View>

        <View style={{marginTop:20, gap:10}}>

        <AppButton title='Continue' handlePress={()=> navigation.navigate("ProfileCreated")}/>
        </View>
      </View>
    </Container>
  )
}

export default UploadPicture
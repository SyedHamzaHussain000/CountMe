import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth } from '../../../utils/Other/Responsive_Dimensions';
import { SvgIcons } from '../../../assets/icons/HomeIcons/SvgIcons';
import AppImages from '../../../assets/images/AppImages';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import RoundButton from '../../../components/RoundButton';

const Conversation = ({navigation}) => {
  return (
    <View style={{justifyContent:'space-between',  flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
          <SvgIcons.backb />
            </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Image
              source={AppImages.IMAGES}
              style={{
                height: responsiveHeight(5),
                width: responsiveHeight(5),
              }}
            />
            <View>
              <AppText title={'Mary Elizabeth'} textSize={2} textFontWeight />
              <AppText title={'online'} textSize={2} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <SvgIcons.camera />
          <SvgIcons.dots />
        </View>
      </View>


      <FlatList
        data={[
          { id: 1, my: false },
          { id: 1, my: true },
          { id: 1, my: false},
          { id: 1, my: false },
        ]}
        contentContainerStyle={{padding:10, gap:20}}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'row',alignSelf: item.my ? 'flex-end' : 'flex-start', }}>
              {item.my  == false && (
                <Image
                  source={AppImages.IMAGES}
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveHeight(5),
                  }}
                />
              )}

              <View
                style={{
                  backgroundColor: item.my == false ?  '#EBD5FF' : AppColors.PRIMARY,
                  padding: 20,
                  borderRadius:10,
                  maxWidth:responsiveWidth(80),
                  gap:10
                }}
              >
                <AppText title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"}textSize={2} textColor={item.my == false ?  AppColors.BLACK : AppColors.WHITE} />
                <AppText title={"02:00 PM"} textColor={item.my == false ?  AppColors.BLACK : AppColors.WHITE}/>
              </View>
            </View>
          );
        }}
      />

      <View style={{flexDirection:'row', alignSelf:'center', marginBottom:10, gap:10}}>
            <View style={{width:responsiveWidth(80), backgroundColor:AppColors.GRAY, borderRadius:200, flexDirection:'row', alignItems:'center'}}>
                <TextInput
                    placeholder='Text here'
                    style={{width:responsiveWidth(70), paddingHorizontal:10}}
                    placeholderTextColor={AppColors.WHITE}
                />
                <SvgIcons.attachment/>
            </View>

            <RoundButton Icon={<SvgIcons.sendmsg/>}/>
      </View>
    </View>
  );
};

export default Conversation;

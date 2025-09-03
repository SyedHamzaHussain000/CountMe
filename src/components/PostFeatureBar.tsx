import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from './AppCommonComponents/AppText';
import AppColors from '../utils/Other/AppColors';

type props = {
  title?: string;
  img?: any;
  onHandlePress?: () => void;
};
const PostFeatureBar = ({ title, img, onHandlePress }: props) => {
  return (
    <TouchableOpacity onPress={onHandlePress} style={{ flexDirection: 'row', alignItems:'center', gap:10 , borderBottomWidth:1, borderBottomColor:AppColors.PINK, paddingBottom:15}}>
      <Image source={img} style={{height:20, width:20, resizeMode:'contain'}}/>
      <AppText title={title} textSize={2}/>
    </TouchableOpacity>
  );
};

export default PostFeatureBar;

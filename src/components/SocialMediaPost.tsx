import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AppImages from '../assets/images/AppImages';
import { responsiveHeight, responsiveWidth } from '../utils/Other/Responsive_Dimensions';
import AppText from './AppCommonComponents/AppText';
import { SvgXml } from 'react-native-svg';
import Appsvgicon from '../assets/icons/Appsvgicon';
import PostFooter from './PostFooter';
import Line from './AppCommonComponents/Line';
import AppColors from '../utils/Other/AppColors';
import AppButton from './AppCommonComponents/AppButton';
import SmallButtons from './AppCommonComponents/SmallButtons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, IMAGE_BASE_URL } from '../utils/BaseUrls/BaseUrl';

type props = {
  AuthorId?: any,
  pfp?: any;
  name?: string;
  ago?: string;
  PostDescription?: string;
  PostPicture?: any;
  Likes?: any;
  Comment?: any;
  Share?: any;
  JoiningPost?: boolean;
  IsJoined?: boolean;
  TotalJoiners?: number;
  TotalJoinerRemain?: number;
  isAutherPost?: boolean,
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onJoinTeamPress?: () => void;
  onViewProfilePress?: () => void;
  onRunnerPress?:()=> void;
  navigation?: any
  RemoveFunctionality?:boolean
};
const SocialMediaPost = ({
  AuthorId,
  pfp,
  name,
  ago,
  PostDescription,
  PostPicture,
  Likes,
  Comment,
  Share,
  JoiningPost,
  IsJoined,
  TotalJoiners,
  TotalJoinerRemain,
  isAutherPost,
  onCommentPress,
  onJoinTeamPress,
  onLikePress,
  onSharePress,
  onViewProfilePress,
  onRunnerPress,
  navigation,
  RemoveFunctionality
}: props) => {


  return (
    <View style={{gap:10}}>
      <View style={styles.PostHeaderContainer}>
        <TouchableOpacity onPress={()=> isAutherPost ? navigation.navigate("Profile"):  navigation.navigate("OtherUserProfile", {FriendId: AuthorId })}  style={styles.PostHeaderChild}>
            <Image source={AppImages.IMAGES} style={styles.pfp} />
            <View>
                <AppText title={name} textSize={2} textFontWeight/>
                <AppText title={ago}/>
            </View>
        </TouchableOpacity>
        <SvgXml xml={Appsvgicon.Dots}/>
      </View>

      <AppText title={PostDescription} textSize={2}/>

      
      {
        PostPicture.length > 0 && (

            <Image source={{uri: `${IMAGE_BASE_URL}${PostPicture[0]}`}} style={styles.img}/>
        )
      }

      {
        JoiningPost && (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10, marginBottom:10}}>
                <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                    <Image source={AppImages.JOINERS} style={{height:20, width:20, resizeMode:'contain'}}/>
                        <AppText title={`${TotalJoinerRemain}/${TotalJoiners} Joined`} textFontWeight textSize={2}/>
                </View>
                {
                  !isAutherPost && (

                    <SmallButtons title={IsJoined ? 'Leave Now': 'Join Now'} icon={IsJoined ? null: <SvgXml xml={Appsvgicon.Send} height={18} width={18}/>} handlePress={onJoinTeamPress}/>
                  ) 
                }
                
            </View>
        )
      }

        {
          !RemoveFunctionality && (

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <PostFooter Counts={Likes} icon={<SvgXml xml={Appsvgicon.LIKE} />} onPress={onLikePress}/>
            <PostFooter Counts={Comment} icon={<SvgXml xml={Appsvgicon.ChatBubble} />} onPress={onCommentPress}/>
            <PostFooter Counts={Likes} icon={<SvgXml xml={Appsvgicon.ChatB} height={17} width={17} />} iconTwo={<SvgXml xml={Appsvgicon.Runner} height={17} width={17} />} onPress={onRunnerPress}/>
        </View>

      
        <View>
          {
            !isAutherPost && (

              <PostFooter Counts={Share} icon={<SvgXml xml={Appsvgicon.Share} />} onPress={onSharePress}/>
            )
          }
        </View>
      </View>
          )
        }

      <View style={{marginTop:10}}>
        <Line colour={"lightgray"}/>
      </View>



    </View>
  );
};

export default SocialMediaPost;

const styles = StyleSheet.create({
  pfp: {
    height: responsiveHeight(6),
    width: responsiveHeight(6),
    resizeMode: 'contain',
    borderRadius: 200,
  },
  PostHeaderContainer:{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between' },
  PostHeaderChild:{ flexDirection: 'row', alignItems:'center', gap:10 },
  img:{height:responsiveHeight(22), width:responsiveWidth(90), borderRadius:20}
});

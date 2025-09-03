import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AppImages from '../../assets/images/AppImages';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../utils/Other/AppColors';
import IconText from '../../components/AppCommonComponents/IconText';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/AppCommonComponents/AppText';
import ScoreCard from '../../components/ScoreCard';
import AddInputAndUpload from '../../components/AppCommonComponents/AddInputAndUpload';
import SocialMediaPost from '../../components/SocialMediaPost';
import { getAuth } from '@react-native-firebase/auth';
import { SignOut } from '../../redux/slices/AuthSlice';
import { useDispatch } from 'react-redux';
import AppButton from '../../components/AppCommonComponents/AppButton';

const Profile = () => {

   const sportsPosts = [
  {
    pfp: 'https://example.com/profiles/mike.jpg',
    name: 'Mike Johnson',
    ago: '1h ago',
    PostDescription: 'Looking for 2 players to join our basketball match this evening in Brooklyn.',
    PostPicture: '',
    Likes: ['JamesSmith', 'EmmaBrown', 'LucasTaylor'],
    Comment: ['I’m down!', 'What time?', 'Can I bring a friend?'],
    Share: ['ChrisWilson'],
    JoiningPost: true,
    TotalJoiners: ['JacobMiller', 'SophiaAnderson'],
    TotalJoinerRemain: 2,
  },
  {
    pfp: 'https://example.com/profiles/sarah.jpg',
    name: 'Sarah Williams',
    ago: '3h ago',
    PostDescription: 'Volleyball team forming in LA for a weekend tournament. Need 4 players!',
    PostPicture: 'https://example.com/posts/volleyball1.jpg',
    Likes: ['OliviaMartinez', 'DanielLee'],
    Comment: ['Countme!', 'Location?'],
    Share: ['EllaHall'],
    JoiningPost: false,
    TotalJoiners: ['MasonHarris'],
    TotalJoinerRemain: 3,
  },
  {
    pfp: 'https://example.com/profiles/tyler.jpg',
    name: 'Tyler Davis',
    ago: '5h ago',
    PostDescription: 'Pickup soccer game at Central Park. All skill levels welcome!',
    PostPicture: '',
    Likes: ['AidenYoung', 'GraceNelson'],
    Comment: ['Time?', 'I’ll bring the ball'],
    Share: [],
    JoiningPost: true,
    TotalJoiners: ['LiamKing', 'ChloeWright'],
    TotalJoinerRemain: 4,
  },
  {
    pfp: 'https://example.com/profiles/emily.jpg',
    name: 'Emily Clark',
    ago: '1d ago',
    PostDescription: 'Looking for a few teammates for a co-ed softball game this Saturday.',
    PostPicture: 'https://example.com/posts/softball1.jpg',
    Likes: ['JacksonLopez'],
    Comment: ['I’m interested!', 'Which park?'],
    Share: ['HenryScott'],
    JoiningPost: false,
    TotalJoiners: ['AveryHill'],
    TotalJoinerRemain: 5,
  },
  {
    pfp: 'https://example.com/profiles/jacob.jpg',
    name: 'Jacob Moore',
    ago: '4h ago',
    PostDescription: 'Organizing a friendly flag football match. Need 3 more players.',
    PostPicture: '',
    Likes: ['MadisonGreen', 'EthanAdams'],
    Comment: ['Sounds fun!', 'Can I join?'],
    Share: [],
    JoiningPost: true,
    TotalJoiners: ['IsabellaBaker', 'NoahRivera'],
    TotalJoinerRemain: 1,
  },
  {
    pfp: 'https://example.com/profiles/grace.jpg',
    name: 'Grace Lewis',
    ago: '2d ago',
    PostDescription: 'Tennis doubles practice. Need a partner!',
    PostPicture: 'https://example.com/posts/tennis1.jpg',
    Likes: ['LillianCox'],
    Comment: ['I can play this weekend'],
    Share: [],
    JoiningPost: false,
    TotalJoiners: ['ElijahWard'],
    TotalJoinerRemain: 0,
  },
  {
    pfp: 'https://example.com/profiles/ryan.jpg',
    name: 'Ryan Walker',
    ago: '30m ago',
    PostDescription: 'Looking to create a 3v3 basketball team for a local league.',
    PostPicture: '',
    Likes: ['NatalieMorgan'],
    Comment: ['I’m a shooter 🔥'],
    Share: ['ZacharyReed'],
    JoiningPost: true,
    TotalJoiners: ['BenjaminBailey'],
    TotalJoinerRemain: 2,
  },
  {
    pfp: 'https://example.com/profiles/ava.jpg',
    name: 'Ava Martinez',
    ago: '6h ago',
    PostDescription: 'Anyone interested in a women’s soccer scrimmage this Sunday?',
    PostPicture: 'https://example.com/posts/soccer2.jpg',
    Likes: ['VictoriaKelly', 'LunaSanders'],
    Comment: ['Yes please!', 'Where’s the field?'],
    Share: [],
    JoiningPost: false,
    TotalJoiners: ['HarperFlores', 'StellaBell'],
    TotalJoinerRemain: 3,
  },
  {
    pfp: 'https://example.com/profiles/josh.jpg',
    name: 'Josh White',
    ago: '8h ago',
    PostDescription: 'Need 2 more players for our Ultimate Frisbee squad!',
    PostPicture: '',
    Likes: ['DavidPrice'],
    Comment: ['Frisbee legend reporting 😎'],
    Share: ['JulianBarnes'],
    JoiningPost: true,
    TotalJoiners: ['AaronReyes'],
    TotalJoinerRemain: 1,
  },
  {
    pfp: 'https://example.com/profiles/lily.jpg',
    name: 'Lily Brooks',
    ago: '20m ago',
    PostDescription: 'Who’s up for a cycling group ride tomorrow morning?',
    PostPicture: 'https://example.com/posts/cycling1.jpg',
    Likes: ['HaileyCooper', 'LeviWard'],
    Comment: ['I’ll bring coffee at the end 😄'],
    Share: [],
    JoiningPost: false,
    TotalJoiners: ['SamuelHughes', 'NoraLong'],
    TotalJoinerRemain: 0,
  },
];

const dispatch = useDispatch()

  return (
    <View style={{backgroundColor:AppColors.WHITE}}>
      <AppHeader />

    <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:responsiveHeight(20)}} nestedScrollEnabled>
      <View>
        <Image source={AppImages.cover} style={styles.cover} />
        <View style={styles.pfpImgContainer}>
          <Image source={AppImages.profileimg} style={styles.pfpImg} />
        </View>

        <View style={styles.cameraContainer}>
          <SvgIcons.cameraW />
        </View>
      </View>
      <LinearGradient colors={["#7EFF57", AppColors.WHITE]}  start={{x:5, y:0}} style={{height:responsiveHeight(100), padding:20}}>
        <View style={{alignSelf:'flex-end', backgroundColor:AppColors.WHITE, padding:10}}>
          <IconText title='Rating 4/5' Icon={<SvgIcons.starthumb/>}/>
        </View>

        <View >
          <AppButton
                  title="Logout"
                  handlePress={() => {
                    dispatch(SignOut()), getAuth().signOut();
                  }}
                />

          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20}}>
              <AppText title={"Caretta"} textSize={3} textFontWeight/>

              <View style={{flexDirection:'row' , alignItems:'center', gap:10}}>
                <SvgIcons.badmiton height={30}/>
                <SvgIcons.helmet height={30}/>
                <SvgIcons.basket height={30}/>
              </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, marginBottom:20}}>
              <IconText Icon={<SvgIcons.blueprofile />} title='405 partners' textFontWeight/>
              <IconText Icon={<SvgIcons.edit />} title='Edit Profile' textFontWeight/>
          </View>
 
          <AppText title={"Any sport, any time just Countme Kicking it every weekend"} textSize={2} textFontWeight textwidth={80}/>

          <View style={{marginTop:20}}>
            <IconText Icon={<SvgIcons.us />} title='Lives In New York' textFontWeight/>
            <IconText Icon={<SvgIcons.run />} title='Primary Sports: Cricket' textFontWeight/>
            <IconText Icon={<SvgIcons.wifi />} title='Skill Level: Intermediate' textFontWeight/>
            <IconText Icon={<SvgIcons.clock />} title='Availability: Weekends' textFontWeight/>
            <IconText Icon={<SvgIcons.arrow />} title='See About Your Info' textFontWeight/>
          </View>
          
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
              <ScoreCard ScoreTitle='Matches Played' TotalScore={50}/>
              <ScoreCard ScoreTitle='Wins' TotalScore={30}/>
              <ScoreCard ScoreTitle='Teams Formed' TotalScore={30}/>
          </View>

        </View>


            <View style={{ marginTop: 15, marginBottom:10 }}>
        <AddInputAndUpload />
      </View>


      <FlatList
        data={sportsPosts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap:20}}
        renderItem={({ item }) => {
          return (
            <SocialMediaPost
              name={item.name}
              ago={item.ago}
              PostDescription={item.PostDescription}
              PostPicture={item.PostPicture}
              JoiningPost={item.JoiningPost}
              Likes={item.Likes}
              Comment={item.Comment}
              Share={item.Share}
              TotalJoiners={item.TotalJoiners}
              TotalJoinerRemain={item.TotalJoinerRemain}
            />
          );
        }}
      />

      </LinearGradient>
      </ScrollView>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cover: {
    width: responsiveWidth(100),
    height: responsiveHeight(25),
    resizeMode: 'cover',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  pfpImgContainer: {
    position: 'absolute',
    bottom: -50,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  pfpImg: {
    width: responsiveHeight(13),
    height: responsiveHeight(13),
    resizeMode: 'cover',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
    backgroundColor: AppColors.GRAY,
    padding: 10,
    borderRadius: 10,
  },
});

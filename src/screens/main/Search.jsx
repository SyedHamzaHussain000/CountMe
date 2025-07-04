import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import Container from '../../components/AppCommonComponents/Container';
import AppImages from '../../assets/images/AppImages';
import SmallButtons from '../../components/AppCommonComponents/SmallButtons';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../utils/Other/Responsive_Dimensions';
import AppText from '../../components/AppCommonComponents/AppText';
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons';
import AppColors from '../../utils/Other/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import ActivityCard from '../../components/ActivityCard';
import TopActivityCard from '../../components/TopActivityCard';
import { SvgXml } from 'react-native-svg';
import Appsvgicon from '../../assets/icons/Appsvgicon';
import IconText from '../../components/AppCommonComponents/IconText';
import Banners from '../../components/Banners';
import SocialMediaPost from '../../components/SocialMediaPost';

const Search = () => {
  const data = [
    { id: 1, gameType: 'basket', Icon: <SvgIcons.basket /> },
    { id: 2, gameType: 'badminton', Icon: <SvgIcons.badmiton /> },
    { id: 3, gameType: 'helmet', Icon: <SvgIcons.helmet /> },
    { id: 4, gameType: 'helmet', Icon: <SvgIcons.helmet /> },
    { id: 5, gameType: 'helmet', Icon: <SvgIcons.helmet /> },
  ];

  const sportsArr = [
    { id: 1, img: AppImages.sport1 },
    { id: 2, img: AppImages.sport2 },
    { id: 3, img: AppImages.sport3 },
    { id: 4, img: AppImages.sport4 },
    { id: 5, img: AppImages.sport5 },
    { id: 6, img: AppImages.sport6 },
    { id: 7, img: AppImages.sport7 },
    { id: 8, img: AppImages.sport8 },
  ];


   const sportsPosts = [
  
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
 
];
  return (
    <ImageBackground source={AppImages.searchbg} style={{ flex: 1 }}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 200 }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.yellowButtons}>
            <AppText
              title={'Add Activity'}
              textSize={2}
              textColor={AppColors.WHITE}
            />
            <SvgIcons.activity />
          </TouchableOpacity>

          <TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[AppColors.PRIMARY, AppColors.SECONDARY]}
              style={styles.searchButton}
            >
              <SvgIcons.searchW />
              <AppText
                title={'Search'}
                textSize={2}
                textColor={AppColors.WHITE}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <AppText
            title={'Recent activity'}
            textSize={3}
            textFontWeight
            textColor={AppColors.BLACK}
          />

          <FlatList
            data={data}
            horizontal
            contentContainerStyle={{ gap: 20 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return <ActivityCard Icon={item.Icon} />;
            }}
          />
        </View>

        <View>
          <View
            style={{
              backgroundColor: AppColors.YELLOWIS,
              opacity: 0.3,
              height: responsiveHeight(40),
              borderRadius: 10,
              marginTop: 10,
            }}
          />
          <View style={{ position: 'absolute', zIndex: 1, padding: 20 }}>
            <AppText
              title={'Top 5 Baseball Activities'}
              textSize={2.5}
              textFontWeight
            />

            <FlatList
              data={data}
              contentContainerStyle={{ gap: 10, marginTop: 10 }}
              renderItem={() => {
                return <TopActivityCard Icon={<SvgIcons.club />} />;
              }}
            />
          </View>
          <Banners />

          <View style={{ marginTop: 10 }}>
            <AppText title={'Choose By Sports'} textSize={2.5} textFontWeight />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width:responsiveWidth(90)
                }}
              >
                {sportsArr.map((item, index) => (
                  <Image
                    key={index}
                    source={item.img}
                    style={{ width:80, height:80, borderRadius: 10 }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          </View>

          
    <View style={{padding:0}}>
      <FlatList
        data={sportsPosts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap:20, paddingBottom:responsiveHeight(40)}}
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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yellowButtons: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.YELLOWIS,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 15,
    borderRadius: 200,
  },
  searchButton: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.YELLOWIS,
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
    borderRadius: 200,
  },
});

import { View, Text, FlatList } from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppCommonComponents/AppHeader';
import AddInputAndUpload from '../../components/AppCommonComponents/AddInputAndUpload';
import SocialMediaPost from '../../components/SocialMediaPost';
import { responsiveHeight } from '../../utils/Other/Responsive_Dimensions';

const Home = () => {
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
    Comment: ['Count me in!', 'Location?'],
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


  return (
    <View>
      <AppHeader />

      <View style={{ marginTop: 15 }}>
        <AddInputAndUpload />
      </View>

    <View style={{padding:20}}>
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
    </View>
  );
};

export default Home;

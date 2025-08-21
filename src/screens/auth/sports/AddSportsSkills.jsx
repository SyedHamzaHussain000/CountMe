import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../../components/AppCommonComponents/Container';
import AppImages from '../../../assets/images/AppImages';
import BackButton from '../../../components/AppCommonComponents/BackButton';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import Line from '../../../components/AppCommonComponents/Line';
import AppSearchBar from '../../../components/AppCommonComponents/AppSearchBar';
import SelectSports from '../../../components/SelectSports';
import AppButton from '../../../components/AppCommonComponents/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { setSportsSkills } from '../../../redux/slices/AuthSlice';
import { UserId, UsersDbRef } from '../../../utils/BaseUrls/BaseUrl';
import ShowToast from '../../../utils/Other/ShowToast';

const AddSportsSkills = ({navigation}) => {
  const MyFavSports = useSelector(state => state?.auth?.FavouriteSports);
  const MySportsSkills = useSelector(state => state?.auth?.SportsSkills);
  const ProfilePicture = useSelector(state => state?.auth?.ProfileImage);

  console.log("MyFavSports",MyFavSports ,MySportsSkills,ProfilePicture )

  const dispatch = useDispatch()
  const [selectedSports, setSelectedSports] = useState([]);

  const Sports = [
    {
      id: 1,
      name: 'Basketball',
      skills: ['Dribbling', 'Shooting', 'Passing', 'Defense', 'Rebounding'],
    },
    {
      id: 2,
      name: 'Football (Soccer)',
      skills: ['Dribbling', 'Passing', 'Shooting', 'Defending', 'Goalkeeping'],
    },
    {
      id: 3,
      name: 'American Football',
      skills: ['Throwing', 'Catching', 'Tackling', 'Blocking', 'Kicking'],
    },
    {
      id: 4,
      name: 'Rugby',
      skills: ['Passing', 'Tackling', 'Scrummaging', 'Kicking', 'Endurance'],
    },
    {
      id: 5,
      name: 'Baseball',
      skills: ['Batting', 'Pitching', 'Catching', 'Fielding', 'Base Running'],
    },
    {
      id: 6,
      name: 'Cricket',
      skills: [
        'Batting',
        'Bowling',
        'Fielding',
        'Wicketkeeping',
        'Running Between Wickets',
      ],
    },
    {
      id: 7,
      name: 'Volleyball',
      skills: ['Serving', 'Spiking', 'Setting', 'Blocking', 'Digging'],
    },
    {
      id: 8,
      name: 'Handball',
      skills: ['Throwing', 'Catching', 'Dribbling', 'Blocking', 'Shooting'],
    },
    {
      id: 9,
      name: 'Hockey',
      skills: ['Dribbling', 'Passing', 'Shooting', 'Tackling', 'Positioning'],
    },
    {
      id: 10,
      name: 'Lacrosse',
      skills: ['Cradling', 'Passing', 'Shooting', 'Dodging', 'Checking'],
    },
    {
      id: 11,
      name: 'Water Polo',
      skills: ['Swimming', 'Passing', 'Shooting', 'Blocking', 'Treading Water'],
    },
    {
      id: 12,
      name: 'Softball',
      skills: ['Batting', 'Pitching', 'Catching', 'Fielding', 'Base Running'],
    },
    {
      id: 13,
      name: 'Futsal',
      skills: [
        'Dribbling',
        'Passing',
        'Shooting',
        'Defending',
        'Quick Reflexes',
      ],
    },
    {
      id: 14,
      name: 'Athletics',
      skills: ['Running', 'Jumping', 'Throwing', 'Endurance', 'Strength'],
    },
    {
      id: 15,
      name: 'Boxing',
      skills: ['Punching', 'Footwork', 'Defense', 'Speed', 'Stamina'],
    },
    {
      id: 16,
      name: 'Wrestling',
      skills: ['Takedowns', 'Pins', 'Escapes', 'Strength', 'Endurance'],
    },
    {
      id: 17,
      name: 'Gymnastics',
      skills: [
        'Balance',
        'Flexibility',
        'Strength',
        'Coordination',
        'Body Control',
      ],
    },
    {
      id: 18,
      name: 'Swimming',
      skills: [
        'Freestyle',
        'Backstroke',
        'Breaststroke',
        'Butterfly',
        'Endurance',
      ],
    },
    {
      id: 19,
      name: 'Diving',
      skills: ['Balance', 'Form', 'Timing', 'Body Control', 'Aerial Awareness'],
    },
    {
      id: 20,
      name: 'Tennis',
      skills: ['Forehand', 'Backhand', 'Serve', 'Volley', 'Footwork'],
    },
    {
      id: 21,
      name: 'Table Tennis',
      skills: ['Forehand', 'Backhand', 'Serve', 'Spin Control', 'Footwork'],
    },
    {
      id: 22,
      name: 'Badminton',
      skills: ['Smash', 'Drop Shot', 'Net Play', 'Footwork', 'Clear'],
    },
    {
      id: 23,
      name: 'Squash',
      skills: ['Forehand', 'Backhand', 'Volley', 'Drop Shot', 'Movement'],
    },
    {
      id: 24,
      name: 'Cycling',
      skills: [
        'Endurance',
        'Climbing',
        'Sprinting',
        'Balance',
        'Bike Handling',
      ],
    },
    {
      id: 25,
      name: 'Triathlon',
      skills: ['Swimming', 'Cycling', 'Running', 'Transitioning', 'Endurance'],
    },
    {
      id: 26,
      name: 'Marathon Running',
      skills: [
        'Endurance',
        'Pacing',
        'Breathing Control',
        'Mental Strength',
        'Hydration Management',
      ],
    },
    {
      id: 27,
      name: 'Weightlifting',
      skills: ['Snatch', 'Clean & Jerk', 'Grip Strength', 'Form', 'Power'],
    },
    {
      id: 28,
      name: 'Powerlifting',
      skills: ['Squat', 'Bench Press', 'Deadlift', 'Strength', 'Technique'],
    },
    {
      id: 29,
      name: 'CrossFit',
      skills: [
        'Olympic Lifts',
        'Endurance',
        'Agility',
        'Gymnastics Moves',
        'Conditioning',
      ],
    },
    {
      id: 30,
      name: 'Skateboarding',
      skills: ['Ollie', 'Kickflip', 'Grinds', 'Balance', 'Manuals'],
    },
    {
      id: 31,
      name: 'Snowboarding',
      skills: ['Carving', 'Jumping', 'Balance', 'Switch Riding', 'Grinds'],
    },
    {
      id: 32,
      name: 'Skiing',
      skills: ['Carving', 'Jumping', 'Balance', 'Pole Planting', 'Turns'],
    },
    {
      id: 33,
      name: 'Surfing',
      skills: ['Paddling', 'Popping Up', 'Balance', 'Wave Reading', 'Turns'],
    },
    {
      id: 34,
      name: 'Windsurfing',
      skills: ['Balance', 'Sail Handling', 'Turning', 'Jumping', 'Endurance'],
    },
    {
      id: 35,
      name: 'Kitesurfing',
      skills: ['Kite Control', 'Balance', 'Jumping', 'Water Starts', 'Turning'],
    },
    {
      id: 36,
      name: 'Rock Climbing',
      skills: [
        'Grip Strength',
        'Footwork',
        'Balance',
        'Route Reading',
        'Endurance',
      ],
    },
    {
      id: 37,
      name: 'Mountaineering',
      skills: [
        'Climbing',
        'Navigation',
        'Endurance',
        'Ice Axe Use',
        'Rope Skills',
      ],
    },
    {
      id: 38,
      name: 'Skydiving',
      skills: [
        'Body Positioning',
        'Freefall Control',
        'Parachute Deployment',
        'Landing',
        'Awareness',
      ],
    },
    {
      id: 39,
      name: 'Paragliding',
      skills: [
        'Wing Control',
        'Launching',
        'Turning',
        'Landing',
        'Weather Reading',
      ],
    },
    {
      id: 40,
      name: 'Parkour',
      skills: ['Vaults', 'Wall Runs', 'Precision Jumps', 'Climbs', 'Rolls'],
    },
    {
      id: 41,
      name: 'BMX',
      skills: ['Jumping', 'Grinds', 'Balance', 'Spins', 'Manuals'],
    },
    {
      id: 42,
      name: 'Motocross',
      skills: [
        'Jumping',
        'Cornering',
        'Balance',
        'Clutch Control',
        'Endurance',
      ],
    },
    {
      id: 43,
      name: 'Karate',
      skills: ['Punches', 'Kicks', 'Blocks', 'Kata', 'Sparring'],
    },
    {
      id: 44,
      name: 'Taekwondo',
      skills: ['Kicks', 'Punches', 'Blocks', 'Forms', 'Sparring'],
    },
    {
      id: 45,
      name: 'Judo',
      skills: ['Throws', 'Pins', 'Chokes', 'Joint Locks', 'Breakfalls'],
    },
    {
      id: 46,
      name: 'Jiu-Jitsu',
      skills: ['Submissions', 'Escapes', 'Sweeps', 'Guard Passing', 'Control'],
    },
    {
      id: 47,
      name: 'Kickboxing',
      skills: ['Punches', 'Kicks', 'Knees', 'Defense', 'Footwork'],
    },
    {
      id: 48,
      name: 'Muay Thai',
      skills: ['Elbows', 'Knees', 'Clinch', 'Kicks', 'Punches'],
    },
    {
      id: 49,
      name: 'MMA',
      skills: [
        'Striking',
        'Wrestling',
        'Jiu-Jitsu',
        'Clinch Work',
        'Conditioning',
      ],
    },
    {
      id: 50,
      name: 'Capoeira',
      skills: ['Kicks', 'Dodges', 'Cartwheels', 'Acrobatics', 'Rhythm'],
    },
    {
      id: 51,
      name: 'Sambo',
      skills: [
        'Throws',
        'Pins',
        'Joint Locks',
        'Defense',
        'Striking (Combat Sambo)',
      ],
    },
    {
      id: 52,
      name: 'Fencing',
      skills: ['Footwork', 'Attacking', 'Parries', 'Timing', 'Reflexes'],
    },
    {
      id: 53,
      name: 'Golf',
      skills: [
        'Driving',
        'Iron Play',
        'Putting',
        'Chipping',
        'Course Management',
      ],
    },
    {
      id: 54,
      name: 'Archery',
      skills: [
        'Aiming',
        'Drawing',
        'Breathing Control',
        'Release',
        'Stability',
      ],
    },
    {
      id: 55,
      name: 'Shooting',
      skills: [
        'Aiming',
        'Trigger Control',
        'Breathing',
        'Stability',
        'Concentration',
      ],
    },
    {
      id: 56,
      name: 'Darts',
      skills: [
        'Aiming',
        'Throwing Accuracy',
        'Concentration',
        'Consistency',
        'Scoring',
      ],
    },
    {
      id: 57,
      name: 'Billiards',
      skills: ['Cue Control', 'Aiming', 'Spin', 'Positioning', 'Strategy'],
    },
    {
      id: 58,
      name: 'Bowling',
      skills: ['Approach', 'Release', 'Spin', 'Accuracy', 'Consistency'],
    },
    {
      id: 59,
      name: 'Horse Racing',
      skills: ['Balance', 'Riding', 'Pacing', 'Whip Control', 'Tactics'],
    },
    {
      id: 60,
      name: 'Polo',
      skills: ['Riding', 'Hitting', 'Positioning', 'Tactics', 'Endurance'],
    },
    {
      id: 61,
      name: 'Equestrian',
      skills: ['Jumping', 'Dressage', 'Riding', 'Control', 'Balance'],
    },
    {
      id: 62,
      name: 'Dog Sledding',
      skills: [
        'Mushing',
        'Commands',
        'Navigation',
        'Endurance',
        'Dog Handling',
      ],
    },
    {
      id: 63,
      name: 'Greyhound Racing',
      skills: ['Handling', 'Training', 'Timing', 'Strategy', 'Endurance'],
    },
    {
      id: 64,
      name: 'Camel Racing',
      skills: ['Riding', 'Balance', 'Pacing', 'Handling', 'Endurance'],
    },
    {
      id: 65,
      name: 'Rowing',
      skills: ['Stroke Technique', 'Timing', 'Endurance', 'Power', 'Teamwork'],
    },
    {
      id: 66,
      name: 'Canoeing',
      skills: ['Paddling', 'Balance', 'Turning', 'Endurance', 'Navigation'],
    },
    {
      id: 67,
      name: 'Kayaking',
      skills: ['Paddling', 'Rolling', 'Balance', 'Turning', 'Endurance'],
    },
    {
      id: 68,
      name: 'Sailing',
      skills: [
        'Sail Handling',
        'Navigation',
        'Balance',
        'Wind Reading',
        'Tactics',
      ],
    },
    {
      id: 69,
      name: 'Jet Skiing',
      skills: ['Balance', 'Turning', 'Jumping', 'Control', 'Endurance'],
    },
    {
      id: 70,
      name: 'Water Skiing',
      skills: ['Balance', 'Starts', 'Turns', 'Jumps', 'Endurance'],
    },
    {
      id: 71,
      name: 'Paddleboarding',
      skills: ['Balance', 'Paddling', 'Turning', 'Endurance', 'Core Strength'],
    },
    {
      id: 72,
      name: 'Chess',
      skills: ['Openings', 'Tactics', 'Strategy', 'Endgame', 'Calculation'],
    },
    {
      id: 73,
      name: 'Esports',
      skills: [
        'Reflexes',
        'Strategy',
        'Communication',
        'Decision-Making',
        'Hand-Eye Coordination',
      ],
    },
    {
      id: 74,
      name: 'Yoga',
      skills: [
        'Flexibility',
        'Balance',
        'Breathing',
        'Strength',
        'Mindfulness',
      ],
    },
    {
      id: 75,
      name: 'Bridge',
      skills: ['Bidding', 'Play of Hand', 'Defense', 'Memory', 'Strategy'],
    },
  ];

  const filteredSports = Sports.filter(sport =>
    MyFavSports?.some(fav => fav.id === sport.id),
  );

  const toggleSkills = item => {
    setSelectedSports(prevSelected => {
      const isSelected = prevSelected.some(res => res == item);
      if (isSelected) {
        return prevSelected.filter(res => res !== item); // remove
      } else {
        return [...prevSelected, item]; // add
      }
    });
  };


    useEffect(()=>{
      dispatch(setSportsSkills(selectedSports))
    },[selectedSports])


    const CreateProfile = () => {

      UsersDbRef.child(UserId).update({
          ProfilePicture: "",
            Sports: MyFavSports,
            SportsSkills: MySportsSkills,
            ProfileCreated: true
      }).then(()=>{

        navigation.navigate("ProfileCreated")
      }).catch((error)=>{
        ShowToast("error", "Internet connect lost")
      })

    }
  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <ScrollView style={{ gap: 20 }}>
        <BackButton />
        <AppText
          title={'Add Sports Skills'}
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

        <View style={{ marginTop: 20 }}>
          <FlatList
            data={filteredSports}
            renderItem={({ item }) => {
              return (
                <View>
                  <AppText
                    title={item.name}
                    textColor={AppColors.WHITE}
                    textSize={2}
                  />

                  <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 10, padding: 20 }}
                  >
                    {item?.skills?.map(newitem => {
                      const isSelected = selectedSports.some(
                        res => res == newitem,
                      );

                      return (
                        <SelectSports
                          title={newitem}
                          bgColour={AppColors.PRIMARY}
                          onPress={() => toggleSkills(newitem)}
                          isSelected={isSelected}
                        />
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <AppButton title="Continue" handlePress={()=> CreateProfile()} />
    </Container>
  );
};

export default AddSportsSkills;

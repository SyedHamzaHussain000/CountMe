import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Container from '../../../components/AppCommonComponents/Container';
import AppImages from '../../../assets/images/AppImages';
import BackButton from '../../../components/AppCommonComponents/BackButton';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import Line from '../../../components/AppCommonComponents/Line';
import AppSearchBar from '../../../components/AppCommonComponents/AppSearchBar';
import SelectSports from '../../../components/SelectSports';
import AppButton from '../../../components/AppCommonComponents/AppButton';

const AddSports = () => {

 const Sports = [
  { id: 1, name: "Basketball", bgColour: AppColors.PRIMARY },
  { id: 2, name: "Football (Soccer)", bgColour: AppColors.SECONDARY },
  { id: 3, name: "American Football", bgColour: AppColors.PRIMARY },
  { id: 4, name: "Rugby", bgColour: AppColors.SECONDARY },
  { id: 5, name: "Baseball", bgColour: AppColors.PRIMARY },
  { id: 6, name: "Cricket", bgColour: AppColors.SECONDARY },
  { id: 7, name: "Volleyball", bgColour: AppColors.PRIMARY },
  { id: 8, name: "Handball", bgColour: AppColors.SECONDARY },
  { id: 9, name: "Hockey", bgColour: AppColors.PRIMARY },
  { id: 10, name: "Lacrosse", bgColour: AppColors.SECONDARY },
  { id: 11, name: "Water Polo", bgColour: AppColors.PRIMARY },
  { id: 12, name: "Softball", bgColour: AppColors.SECONDARY },
  { id: 13, name: "Futsal", bgColour: AppColors.PRIMARY },
  { id: 14, name: "Athletics", bgColour: AppColors.SECONDARY },
  { id: 15, name: "Boxing", bgColour: AppColors.PRIMARY },
  { id: 16, name: "Wrestling", bgColour: AppColors.SECONDARY },
  { id: 17, name: "Gymnastics", bgColour: AppColors.PRIMARY },
  { id: 18, name: "Swimming", bgColour: AppColors.SECONDARY },
  { id: 19, name: "Diving", bgColour: AppColors.PRIMARY },
  { id: 20, name: "Tennis", bgColour: AppColors.SECONDARY },
  { id: 21, name: "Table Tennis", bgColour: AppColors.PRIMARY },
  { id: 22, name: "Badminton", bgColour: AppColors.SECONDARY },
  { id: 23, name: "Squash", bgColour: AppColors.PRIMARY },
  { id: 24, name: "Cycling", bgColour: AppColors.SECONDARY },
  { id: 25, name: "Triathlon", bgColour: AppColors.PRIMARY },
  { id: 26, name: "Marathon Running", bgColour: AppColors.SECONDARY },
  { id: 27, name: "Weightlifting", bgColour: AppColors.PRIMARY },
  { id: 28, name: "Powerlifting", bgColour: AppColors.SECONDARY },
  { id: 29, name: "CrossFit", bgColour: AppColors.PRIMARY },
  { id: 30, name: "Skateboarding", bgColour: AppColors.SECONDARY },
  { id: 31, name: "Snowboarding", bgColour: AppColors.PRIMARY },
  { id: 32, name: "Skiing", bgColour: AppColors.SECONDARY },
  { id: 33, name: "Surfing", bgColour: AppColors.PRIMARY },
  { id: 34, name: "Windsurfing", bgColour: AppColors.SECONDARY },
  { id: 35, name: "Kitesurfing", bgColour: AppColors.PRIMARY },
  { id: 36, name: "Rock Climbing", bgColour: AppColors.SECONDARY },
  { id: 37, name: "Mountaineering", bgColour: AppColors.PRIMARY },
  { id: 38, name: "Skydiving", bgColour: AppColors.SECONDARY },
  { id: 39, name: "Paragliding", bgColour: AppColors.PRIMARY },
  { id: 40, name: "Parkour", bgColour: AppColors.SECONDARY },
  { id: 41, name: "BMX", bgColour: AppColors.PRIMARY },
  { id: 42, name: "Motocross", bgColour: AppColors.SECONDARY },
  { id: 43, name: "Karate", bgColour: AppColors.PRIMARY },
  { id: 44, name: "Taekwondo", bgColour: AppColors.SECONDARY },
  { id: 45, name: "Judo", bgColour: AppColors.PRIMARY },
  { id: 46, name: "Jiu-Jitsu", bgColour: AppColors.SECONDARY },
  { id: 47, name: "Kickboxing", bgColour: AppColors.PRIMARY },
  { id: 48, name: "Muay Thai", bgColour: AppColors.SECONDARY },
  { id: 49, name: "MMA", bgColour: AppColors.PRIMARY },
  { id: 50, name: "Capoeira", bgColour: AppColors.SECONDARY },
  { id: 51, name: "Sambo", bgColour: AppColors.PRIMARY },
  { id: 52, name: "Fencing", bgColour: AppColors.SECONDARY },
  { id: 53, name: "Golf", bgColour: AppColors.PRIMARY },
  { id: 54, name: "Archery", bgColour: AppColors.SECONDARY },
  { id: 55, name: "Shooting", bgColour: AppColors.PRIMARY },
  { id: 56, name: "Darts", bgColour: AppColors.SECONDARY },
  { id: 57, name: "Billiards", bgColour: AppColors.PRIMARY },
  { id: 58, name: "Bowling", bgColour: AppColors.SECONDARY },
  { id: 59, name: "Horse Racing", bgColour: AppColors.PRIMARY },
  { id: 60, name: "Polo", bgColour: AppColors.SECONDARY },
  { id: 61, name: "Equestrian", bgColour: AppColors.PRIMARY },
  { id: 62, name: "Dog Sledding", bgColour: AppColors.SECONDARY },
  { id: 63, name: "Greyhound Racing", bgColour: AppColors.PRIMARY },
  { id: 64, name: "Camel Racing", bgColour: AppColors.SECONDARY },
  { id: 65, name: "Rowing", bgColour: AppColors.PRIMARY },
  { id: 66, name: "Canoeing", bgColour: AppColors.SECONDARY },
  { id: 67, name: "Kayaking", bgColour: AppColors.PRIMARY },
  { id: 68, name: "Sailing", bgColour: AppColors.SECONDARY },
  { id: 69, name: "Jet Skiing", bgColour: AppColors.PRIMARY },
  { id: 70, name: "Water Skiing", bgColour: AppColors.SECONDARY },
  { id: 71, name: "Paddleboarding", bgColour: AppColors.PRIMARY },
  { id: 72, name: "Chess", bgColour: AppColors.SECONDARY },
  { id: 73, name: "Esports", bgColour: AppColors.PRIMARY },
  { id: 74, name: "Yoga", bgColour: AppColors.SECONDARY },
  { id: 75, name: "Bridge", bgColour: AppColors.PRIMARY },
];



  
const [searchText, setSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // show only 6 first
  const [selectedSports, setSelectedSports] = useState([]);

  // 🔎 filter by search
  const filteredSports = Sports.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 📌 show only 6 at a time
  const visibleSports = filteredSports.slice(0, visibleCount);

  // ✅ toggle select sport
  const toggleSelect = (id) => {
    if (selectedSports.includes(id)) {
      setSelectedSports(selectedSports.filter((s) => s !== id));
    } else {
      setSelectedSports([...selectedSports, id]);
    }
  };

  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <View style={{ gap: 20 }}>
        <BackButton />
        <AppText
          title="Add Sports"
          textSize={3}
          textFontWeight
          textColor={AppColors.WHITE}
        />
        <AppText
          title="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          textColor={AppColors.WHITE}
          textSize={1.8}
        />

        {/* 🔎 Search bar */}
        <AppSearchBar
          placeHolder="search your sports here"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* 🏀 Sports List */}
        <FlatList
          data={visibleSports}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
          renderItem={({ item }) => {
            const isSelected = selectedSports.includes(item.id);
            return (
              <TouchableOpacity onPress={() => toggleSelect(item.id)}>
                <SelectSports
                  title={item.name}
                  bgColour={isSelected ? AppColors.WHITE : item.bgColour} // white when selected
                  textColor={isSelected ? AppColors.PRIMARY : AppColors.WHITE} // adjust text color
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* 📌 Load More Button */}
        {visibleCount < filteredSports.length && (
          <AppButton
            title="Load More"
            onPress={() => setVisibleCount(visibleCount + 6)}
          />
        )}

        <AppButton title="Continue" onPress={() => console.log(selectedSports)} />
      </View>
    </Container>
  );
};

export default AddSports;
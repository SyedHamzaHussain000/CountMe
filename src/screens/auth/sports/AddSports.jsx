import { View, Text, FlatList } from 'react-native';
import React from 'react';
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
    { id: 1, name: 'Football (Soccer)', bgColour: AppColors.PRIMARY },
    { id: 2, name: 'Cricket', bgColour: AppColors.SECONDARY },
    { id: 3, name: 'Basketball', bgColour: AppColors.PRIMARY },
    { id: 4, name: 'Volleyball', bgColour: AppColors.SECONDARY },
    { id: 5, name: 'Rugby', bgColour: AppColors.PRIMARY },
    { id: 6, name: 'Baseball', bgColour: AppColors.SECONDARY },
  ];
  return (
    <Container backgroundImage={AppImages.AUTHBG}>
      <View style={{ gap: 20 }}>
        <BackButton />
        <AppText
          title={'Add Sports'}
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

        <AppSearchBar placeHolder="search your sports here" />

        <FlatList
          data={Sports}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
          renderItem={({ item }) => {
            return <SelectSports title={item.name} bgColour={item.bgColour} />;
          }}
        />

        <AppButton title='Continue'/>
      </View>
    </Container>
  );
};

export default AddSports;

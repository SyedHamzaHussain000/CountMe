import { View, Text, FlatList } from 'react-native';
import React from 'react';
import AppTextInput from './AppCommonComponents/AppTextInput';
import SelectableButtons from './AppCommonComponents/SelectableButtons';
import AppText from './AppCommonComponents/AppText';
import AppColors from '../utils/Other/AppColors';
import BackButton from './AppCommonComponents/BackButton';
import NormalBlackButton from './AppCommonComponents/NormalBlackButton';

type props = {
  MyFavSports?: any;
  handlePressButton?: (value?: any) => any;
  value?: string;
  handleNormalButtonPress?: () => void;
  onChangeText?: (text: string) => void;
    textValue?: string;
};

const CountMeComponent = ({ MyFavSports, handlePressButton,handleNormalButtonPress, value, onChangeText, textValue }: props) => {
  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 50, gap: 30 }}>
      <View style={{gap:10}}>
        <NormalBlackButton onPress={handleNormalButtonPress}/>
        <AppText title={'Select Sports'} textSize={2} />
        <FlatList
          data={MyFavSports}
          horizontal
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <SelectableButtons
                title={item.name}
                handlePress={() => handlePressButton && handlePressButton(item)}
                value={value}
              />
            );
          }}
        />
      </View>

      <AppTextInput
        title="Total Player You need"
        titleColour={AppColors.BLACK}
        TextInputColour={AppColors.LIGHTGRAY}
        keyboardType={'number-pad'}
        maxLength={2}
        onChangeText={onChangeText}
        value={textValue}
      />
    </View>
  );
};

export default CountMeComponent;

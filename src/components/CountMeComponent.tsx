import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import AppTextInput from './AppCommonComponents/AppTextInput';
import SelectableButtons from './AppCommonComponents/SelectableButtons';
import AppText from './AppCommonComponents/AppText';
import AppColors from '../utils/Other/AppColors';
import BackButton from './AppCommonComponents/BackButton';
import NormalBlackButton from './AppCommonComponents/NormalBlackButton';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppButton from './AppCommonComponents/AppButton';

type props = {
  MyFavSports?: any;
  handlePressButton?: (value?: any) => any;
  value?: string;
  handleNormalButtonPress?: () => void;
  onChangeText?: (text: string) => void;
  textValue?: string;
  onDatePickerPress?: () => void;
  dateValue?: Date;
  show?: boolean;
  onChangeAmount?: (text: string) => void;
  AmountValue?: string;
};

const CountMeComponent = ({
  MyFavSports,
  handlePressButton,
  handleNormalButtonPress,
  value,
  onChangeText,
  textValue,
  onDatePickerPress,
  dateValue,
  show,
  AmountValue,
  onChangeAmount,
}: props) => {
  const nav = useNavigation();
  const AddressDetail = useSelector((state: any) => state?.auth?.Address)

  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 50, gap: 30 }}>
      <View style={{ gap: 10, flexDirection:'row', justifyContent:'space-between' }}>
        {/* <NormalBlackButton onPress={handleNormalButtonPress} /> */}
        {/* <AppText title={'Select Sports'} textSize={2} /> */}
        {/* <FlatList
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
        /> */}

        <AppButton width={40} title='Add Activity'/>

        <AppButton width={40} title='Upload Image'/>
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
      <AppTextInput
        title="Amount"
        placeholder="$"
        titleColour={AppColors.BLACK}
        TextInputColour={AppColors.LIGHTGRAY}
        keyboardType={'number-pad'}
        onChangeText={onChangeAmount}
        value={AmountValue}
      />

      <TouchableOpacity onPress={onDatePickerPress}>
        <AppTextInput
          title="Date/Time"
          titleColour={AppColors.BLACK}
          TextInputColour={AppColors.LIGHTGRAY}
          keyboardType={'number-pad'}
          onChangeText={onChangeText}
          value={
            dateValue
              ? moment(dateValue).format('DD-MMM-YYYY hh:mm A')
              : 'Select Date and Time'
          }
          placeholder={
            dateValue
              ? moment(dateValue).format('DD-MMM-YYYY hh:mm A')
              : 'Select Date and Time'
          }
          editable={false}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => nav.navigate('AddLocation')}>
        <AppTextInput
          title="Enter locaiton"
          titleColour={AppColors.BLACK}
          TextInputColour={AppColors.LIGHTGRAY}
          keyboardType={'number-pad'}
          value={
          AddressDetail?.address
          }
          placeholder={
            AddressDetail?.address ? AddressDetail?.address : 'Add Location'
          }
          editable={false}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CountMeComponent;

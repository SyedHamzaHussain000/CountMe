import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
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
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize } from '../utils/Other/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  selectedType?: any;
  onUploadImageButtonPress?: () => void;
  onActivityButtonPress?: () => void;
  imageData: any;
  onImageClear: () => void;
  onChangeCaption: (text : string) => void
  captionValue: string
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
  selectedType,
  onUploadImageButtonPress,
  onActivityButtonPress,
  imageData,
  onImageClear,
  onChangeCaption,
  captionValue
}: props) => {
  const nav = useNavigation();
  const AddressDetail = useSelector((state: any) => state?.auth?.Address);

  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 50, gap: 30 }}>
      <View
        style={{
          gap: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {selectedType == 'Activity Post' && (
          <AppButton
            width={40}
            title="Add Activity"
            handlePress={onActivityButtonPress}
            colourOne={'#8A2BE2'}
            colourTwo={'#FF5722'}
          />
        )}

        <AppButton
          width={50}
          title="Upload Image"
          handlePress={onUploadImageButtonPress}
          colourOne={'#8A2BE2'}
          colourTwo={'#FF5722'}
          rightLogo={
            <Feather
              name={'plus-circle'}
              size={responsiveFontSize(2)}
              color={AppColors.WHITE}
            />
          }
        />
      </View>

      {imageData && (
        <View style={{alignSelf:'flex-start'}}>
          <TouchableOpacity
            onPress={onImageClear}
            style={{ position: 'absolute', zIndex: 10, right: -10, top: -10 }}
          >
            <Ionicons
              name={'close-circle'}
              size={responsiveFontSize(4)}
              color={AppColors.PRIMARY}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: imageData?.uri }}
            style={{ height: 100, width: 100, borderRadius: 10 }}
          />
        </View>
      )}

      <AppTextInput
        title="What's in your mind"
        titleColour={AppColors.BLACK}
        TextInputColour={AppColors.LIGHTGRAY}
        onChangeText={onChangeCaption}
        value={captionValue}
        
      />



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
          value={AddressDetail?.address}
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

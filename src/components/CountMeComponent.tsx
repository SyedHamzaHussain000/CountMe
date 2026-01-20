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
  value?: string | string[];
  handleNormalButtonPress?: () => void;
  onChangeText?: (text: string) => void;
  textValue?: string;
  onDatePickerPress?: () => void;
  dateValue?: Date;
  show?: boolean;
  onChangeAmount?: (text: string) => void;
  AmountValue?: string;
  selectedType?: any;
  onStartTimePress?: () => void;
  onEndTimePress?: () => void;
  startTimeValue?: Date;
  endTimeValue?: Date;
  onUploadImageButtonPress?: () => void;
  onActivityButtonPress?: () => void;
  imageData: any;
  onImageClear: () => void;
  onChangeCaption: (text: string) => void
  captionValue: string
  title?: string;
  onChangeTitle?: (text: string) => void;
  paymentMethod?: string;
  setPaymentMethod?: (method: string) => void;
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
  onStartTimePress,
  onEndTimePress,
  startTimeValue,
  endTimeValue,
  show,
  AmountValue,
  onChangeAmount,
  selectedType,
  onUploadImageButtonPress,
  onActivityButtonPress,
  imageData,
  onImageClear,
  onChangeCaption,
  captionValue,
  title,
  onChangeTitle,
  paymentMethod,
  setPaymentMethod
}: props) => {
  const nav = useNavigation();
  const AddressDetail = useSelector((state: any) => state?.auth?.Address);

  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 50, gap: 20 }}>
      <View
        style={{
          gap: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {selectedType == 'Activity Post' ? (
          <View style={{ width: '48%' }}>
            <AppButton
              width={45} // Relative to parent View
              title={value && value.length > 0 ? "Change Activity" : "Add Activity"}
              handlePress={onActivityButtonPress}
              colourOne={'#8A2BE2'}
              colourTwo={'#FF5722'}
            />
            {value && value.length > 0 && (
              <Text style={{ color: AppColors.BLACK, marginTop: 5, fontWeight: 'bold' }}>
                Selected: {Array.isArray(value) ? value.join(', ') : value}
              </Text>
            )}
          </View>
        ) : <View />}


        <AppButton
          width={45} // Relative to parent View
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
        <View style={{ alignSelf: 'flex-start' }}>
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
        title="Title Here (Optional)"
        titleColour={AppColors.BLACK}
        TextInputColour={AppColors.LIGHTGRAY}
        onChangeText={onChangeTitle}
        value={title}
      />

      <AppTextInput
        title="What's in your mind"
        titleColour={AppColors.BLACK}
        TextInputColour={AppColors.LIGHTGRAY}
        onChangeText={onChangeCaption}
        value={captionValue}
        multiline={true}
        numberOfLines={4}
        style={{ height: 100, textAlignVertical: 'top' }}
      />


      {selectedType == 'Activity Post' && (
        <>
          <AppTextInput
            title="Enter Player You Need"
            titleColour={AppColors.BLACK}
            TextInputColour={AppColors.LIGHTGRAY}
            keyboardType={'number-pad'}
            maxLength={2}
            onChangeText={onChangeText}
            value={textValue}
          />
          <AppTextInput
            title="Enter $ (Per Person)"
            placeholder="$"
            titleColour={AppColors.BLACK}
            TextInputColour={AppColors.LIGHTGRAY}
            keyboardType={'number-pad'}
            onChangeText={onChangeAmount}
            value={AmountValue}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={onDatePickerPress} style={{ width: '100%' }}>
              <AppTextInput
                title="Select Date"
                titleColour={AppColors.BLACK}
                TextInputColour={AppColors.LIGHTGRAY}
                value={
                  dateValue
                    ? moment(dateValue).format('DD-MM-YYYY')
                    : 'Select Date'
                }
                placeholder="Select Date"
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
            <TouchableOpacity onPress={onStartTimePress} style={{ flex: 1 }}>
              <AppTextInput
                title="Start Time"
                titleColour={AppColors.BLACK}
                TextInputColour={AppColors.LIGHTGRAY}
                value={
                  startTimeValue
                    ? moment(startTimeValue).format('hh:mm A')
                    : 'Start Time'
                }
                placeholder="Start Time"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onEndTimePress} style={{ flex: 1 }}>
              <AppTextInput
                title="End Time"
                titleColour={AppColors.BLACK}
                TextInputColour={AppColors.LIGHTGRAY}
                value={
                  endTimeValue
                    ? moment(endTimeValue).format('hh:mm A')
                    : 'End Time'
                }
                placeholder="End Time"
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => nav.navigate('AddLocation')}>
            <AppTextInput
              title="Add Location"
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

          <View>
            <AppText title="Select Payment" textFontWeight textSize={2} style={{ marginBottom: 10 }} />
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: paymentMethod === 'Cash' ? '#D8B4FE' : '#E0E0E0', // Light purple if selected
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center'
                }}
                onPress={() => setPaymentMethod && setPaymentMethod('Cash')}
              >
                <Text style={{ color: paymentMethod === 'Cash' ? 'white' : 'black', fontWeight: 'bold' }}>Cash</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: paymentMethod === 'Online' ? '#D8B4FE' : '#E0E0E0',
                  padding: 15,
                  borderRadius: 10,
                  alignItems: 'center'
                }}
                onPress={() => setPaymentMethod && setPaymentMethod('Online')}
              >
                <Text style={{ color: paymentMethod === 'Online' ? 'white' : 'black', fontWeight: 'bold' }}>Online</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CountMeComponent;

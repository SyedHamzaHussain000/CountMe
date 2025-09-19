import { View, Text, Image } from 'react-native'
import React from 'react'
import BackHeader from '../../../../components/AppCommonComponents/BackHeader'
import AppImages from '../../../../assets/images/AppImages'
import { SvgIcons } from '../../../../assets/icons/HomeIcons/SvgIcons'
import AppColors from '../../../../utils/Other/AppColors'
import AppTextInput from '../../../../components/AppCommonComponents/AppTextInput'

const EditProfile = ({navigation}) => {
  return (
    <View>
        <BackHeader title='Edit Profile' navigation={navigation}/>

        <View style={{alignSelf:'center'}}>
            <Image source={AppImages.profileimg} style={{height:70, width:70, }}/>
            <View style={{position:'absolute', zIndex:1, alignSelf:'flex-end', bottom:0, backgroundColor:AppColors.WHITE, padding:5, borderRadius:200}}>
              <SvgIcons.camera/>
            </View>
        </View>
      <View style={{padding:20}}>

        <AppTextInput title='Name' TextColour={AppColors.BLACK} titleColour={AppColors.BLACK} />
        <AppTextInput title='Gender' TextColour={AppColors.BLACK} titleColour={AppColors.BLACK} />
        <AppTextInput title='Birthday' TextColour={AppColors.BLACK} titleColour={AppColors.BLACK} />
        <AppTextInput title='Language' TextColour={AppColors.BLACK} titleColour={AppColors.BLACK} />

      </View>
    </View>
  )
}

export default EditProfile
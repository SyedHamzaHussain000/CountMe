import { View, Text, TextInput, FlatList } from 'react-native'
import React from 'react'
import AppHeader from '../../components/AppCommonComponents/AppHeader'
import AppTextInput from '../../components/AppCommonComponents/AppTextInput'
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons'
import AppColors from '../../utils/Other/AppColors'
import ConversationBar from '../../components/ConversationBar'

const Chats = () => {
  return (
    <View style={{flex:1,backgroundColor:AppColors.WHITE}}>
      <AppHeader/>

      <View style={{borderBottomWidth:1, borderColor:AppColors.GRAY, flexDirection:'row', width:responsiveWidth(90), alignSelf:'center', alignItems:'center', marginTop:10}}> 
      <SvgIcons.searchb />
      <TextInput
      placeholder='Search'

      />
      </View>


      <FlatList
      data={[1,2,3,4,5,6,7,8,9,10]}

      contentContainerStyle={{gap:20,marginTop:20, paddingBottom:150}}
      renderItem={()=>{
        return(
          <ConversationBar/>
        )
      }}
      
      />
    </View>
  )
}

export default Chats
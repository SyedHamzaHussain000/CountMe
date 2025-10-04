import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppHeader from '../../components/AppCommonComponents/AppHeader'
import AppTextInput from '../../components/AppCommonComponents/AppTextInput'
import { responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons'
import AppColors from '../../utils/Other/AppColors'
import ConversationBar from '../../components/ConversationBar'
import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth'
import moment from 'moment'

const Chats = () => {
  const [chatList, setChatList] = useState([]);

  console.log("chatList",chatList)
  const myID = getAuth()?.currentUser?.uid;
useEffect(() => {
  const unsubscribe = firestore()
    .collection('chats')
    .orderBy('lastMessageAt', 'desc')
    .onSnapshot(snapshot => {
      const filteredChats = snapshot?.docs?.map(doc => {
  const data = doc?.data();

  const otherUser = data?.participants?.find(p => p._id !== myID);

  return {
    id: doc.id,
    ...data,
    otherUser,
  };
});

setChatList(filteredChats);
    
    });

  return () => unsubscribe();
}, [myID]);
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
      data={chatList}

      contentContainerStyle={{gap:20,marginTop:20, paddingBottom:150}}
      renderItem={({item})=>{
        return(
          <ConversationBar
          name={item?.otherUser?.fullName}
          message={item?.lastMessage}
          time={item.lastMessageAt}
          FriendId={item?.otherUser?._id}
          />
        )
      }}
      
      />
    </View>
  )
}

export default Chats
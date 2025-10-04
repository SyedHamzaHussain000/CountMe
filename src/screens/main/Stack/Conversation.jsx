import { View, Text, Image, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveHeight, responsiveWidth } from '../../../utils/Other/Responsive_Dimensions';
import { SvgIcons } from '../../../assets/icons/HomeIcons/SvgIcons';
import AppImages from '../../../assets/images/AppImages';
import AppText from '../../../components/AppCommonComponents/AppText';
import AppColors from '../../../utils/Other/AppColors';
import RoundButton from '../../../components/RoundButton';
import firestore from '@react-native-firebase/firestore';


import { getAuth } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import moment from 'moment';
const Conversation = ({navigation, route}) => {

  const {friendId, friendName} = route.params


   const myID = getAuth()?.currentUser?.uid;

  const myData = useSelector(state => state?.auth);

  console.log("myData",myData)
  // const firestore = getFirestore();

  const [message, setMessage] = useState('');
  const [combinedId, setCombineId] = useState();
  const [existedMessage, setExistedMessage] = useState();

  // const FetchChatIStarted = () => {


  //   firestore()
  //     .collection('Chat')
  //     .doc(`${myID}_${friendId}`)
  //     .onSnapshot(doc => {
  //       if (doc?.exists === false) {
  //         console.log('I Started false');

  //         FetchChatUStarted();
  //       } else {
  //         // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",doc.data())
  //         setCombineId(`${myID}_${friendId}`);
  //         setExistedMessage(doc?.data()?.AllMsg);
  //       }
  //     });
  // };

  // const FetchChatUStarted = () => {
  //   firestore().collection('Chat')
  //     .doc(`${friendId}_${myID}`)
  //     .onSnapshot(doc => {
  //       if (doc?.exists === false) {
  //         console.log('U Started false');

  //         console.log('Chat U Started', doc.docs);
  //       } else {
  //         // console.log("***************************************",doc.data())
  //         setCombineId(`${friendId}_${myID}`);
  //         setExistedMessage(doc?.data()?.AllMsg);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   FetchChatIStarted();
  // }, []);

  // const SendMessage = () => {
  //   const messages = {
  //     msg: message,
  //     createdAt: new Date().getTime(),
  //     sendBy: myID,
  //     sendTo: friendId,
  //   };




    

  //   if (message !== '') {
  //     const chatId =
  //       combinedId === `${myID}_${friendId}` ? combinedId : `${friendId}_${myID}`;

  //     // Fetch existing messages
  //     firestore()
  //       .collection('Chat')
  //       .doc(chatId)
  //       .get()
  //       .then(doc => {

  //         if (doc.exists()) {
  //           const existingMessages = doc.data().AllMsg || [];
  //           const updatedMessages = [...existingMessages, messages];

  //           // Update the document with the new messages
  //           firestore()
  //             .collection('Chat')
  //             .doc(chatId)
  //             .set({
  //               ID: [myID, friendId],
  //               AllMsg: updatedMessages,
  //               createdAt: new Date().getTime(),
  //             })
  //             .then(() => {
  //               console.log('Send');
  //             })
  //             .catch(e => {
  //               console.log('what error ?', e.message);
  //             });
  //         } else {
  //           // Create a new document with the new message

            
  //           firestore()
  //             .collection('Chat')
  //             .doc(chatId)
  //             .set({
  //               ID: [myID, friendId],
  //               AllMsg: [messages],
  //               createdAt: new Date().getTime(),
  //             })
  //             .then(() => {
  //               console.log('Send');
  //             })
  //             .catch(e => {
  //               console.log('what error ?', e.message);
  //             });
  //         }
  //       })
  //       .catch(e => {
  //         console.log('what error ?', e.message);
  //       });
  //   }

  //   setMessage('');
  // };


   const chatId =
    String(myID) > String(friendId)
      ? `${myID}_${friendId}`
      : `${friendId}_${myID}`;
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setExistedMessage(allMessages);
      });

      return () => unsubscribe();
    }, [chatId]);
    
    const SendMessage = async () => {

      const arr = [{_id: myID, fullName: myData.full_name}, {_id: friendId, fullName: friendName}]


      

    try {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .set(
          {
            lastMessage: message,
            lastMessageAt: new Date(),
            lastMessageBy: myID,
            participants: arr,
          },
          {merge: true},
        );

      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: message,
          createdAt: new Date(),
          senderId: myID,
          receiverId: friendId,
          user: myData.full_name,
          // receiverUser: [{_id: friendId, name: friendName}],
        });

            
      // await sendMsgNotification(data).unwrap().then((res) => {
      //     console.log('send msg notification response ====>',res)
      // }).catch((error) => {
      //   console.log('failed to send noticiation',error)
      // });
    } catch (error) {
      console.log('Some problem occured',error)
      ShowToast('Error sending message')
    }
  }
  

  return (
    <View style={{justifyContent:'space-between',  flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
          <SvgIcons.backb />
            </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Image
              source={AppImages.IMAGES}
              style={{
                height: responsiveHeight(5),
                width: responsiveHeight(5),
              }}
            />
            <View>
              <AppText title={friendName} textSize={2} textFontWeight />
              <AppText title={'online'} textSize={2} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <SvgIcons.camera />
          <SvgIcons.dots />
        </View>
      </View>


      <FlatList
        data={existedMessage}
        contentContainerStyle={{padding:10, gap:20}}
        renderItem={({ item }) => {

          console.log("item",item)
          return (
            <View style={{ flexDirection: 'row',alignSelf: item.my ? 'flex-end' : 'flex-start', }}>
              {item.my  == false && (
                <Image
                  source={AppImages.IMAGES}
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveHeight(5),
                  }}
                />
              )}

              <View
                style={{
                  backgroundColor: item.my == false ?  '#EBD5FF' : AppColors.PRIMARY,
                  padding: 20,
                  borderRadius:10,
                  maxWidth:responsiveWidth(80),
                  gap:10
                }}
              >
                <AppText title={item?.text}textSize={2} textColor={item.my == false ?  AppColors.BLACK : AppColors.WHITE} />
                <AppText title={moment(item?.createdAt).format("hh:mm A")} textColor={item.my == false ?  AppColors.BLACK : AppColors.WHITE}/>
              </View>
            </View>
          );
        }}
      />

      <View style={{flexDirection:'row', alignSelf:'center', marginBottom:10, gap:10}}>
            <View style={{width:responsiveWidth(80), backgroundColor:AppColors.GRAY, borderRadius:200, flexDirection:'row', alignItems:'center'}}>
                <TextInput
                    placeholder='Text here'
                    style={{width:responsiveWidth(70), paddingHorizontal:10, color:AppColors.WHITE}}
                    placeholderTextColor={AppColors.WHITE}
                    onChangeText={(text) => {
                      setMessage(text);
                    }}
                    value={message}
                />
                <SvgIcons.attachment/>
            </View>

            <RoundButton Icon={<SvgIcons.sendmsg/>} handlePress={()=> SendMessage()} />
      </View>
    </View>
  );
};

export default Conversation;

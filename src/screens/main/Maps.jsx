import { View, Text, Image, ImageBackground, ScrollView, FlatList } from 'react-native'
import React from 'react'
import AppHeader from '../../components/AppCommonComponents/AppHeader'
import AppImages from '../../assets/images/AppImages'
import { responsiveHeight, responsiveWidth } from '../../utils/Other/Responsive_Dimensions'
import AppColors from '../../utils/Other/AppColors'
import AppText from '../../components/AppCommonComponents/AppText'
// import SvgIcons from '../../assets/icons/HomeIcons/SvgIcons'
// import SearchW from '../../assets/icons/HomeIcons/searchw'
import IconText from '../../components/AppCommonComponents/IconText'
import { SvgIcons } from '../../assets/icons/HomeIcons/SvgIcons'
import Line from '../../components/AppCommonComponents/Line'
import Participants from '../../components/AppCommonComponents/Participants'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const Maps = () => {
  const data = [
    {id:1, name:"Alex Hales", type: "Organizer"},
    {id:2, name:"Jhon", type: "participant"},
    {id:3, name:"Jhon", type: "participant"},
    {id:4, name:"Jhon", type: "participant"},
    {id:5, name:"Jhon", type: "participant"},
    {id:6, name:"Slot available", type: "Join now"},
  ]

  


  return (
    <View style={{backgroundColor:AppColors.PURPLE, flex:1}}>
      <AppHeader />
    <ScrollView contentContainerStyle={{flexGrow:1, paddingBottom:responsiveHeight(20)}}>

      <View>

    <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={{height:400, width:responsiveWidth(100), borderBottomRightRadius:30, borderBottomLeftRadius:30, overflow:'hidden'}}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
        }}
        >
        
     </MapView>


        <View style={{position:'absolute', zIndex:0, bottom:0 ,backgroundColor:AppColors.WHITE,width:responsiveWidth(100), alignSelf:'center', padding:20, flexDirection:'row', justifyContent:'space-between', opacity:0.8, borderBottomRightRadius:30, borderBottomLeftRadius:30}}>
          <View>
          <AppText title={"Activities near me"} textSize={2.5} textFontWeight/>
          <AppText title={"200m - 300m"}textSize={2} />
          </View>

          <View style={{height:responsiveHeight(5), width:responsiveHeight(5), backgroundColor:AppColors.YELLOWIS, alignItems:'center', justifyContent:'center', borderRadius:10}}>
              <SvgIcons.searchW  />
          </View>
        </View>


       </View>

      

      <View style={{padding:20, gap:20}}>


      <AppText title={"Activity Detail"} textColor={AppColors.WHITE} textSize={3}/>

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',}}>
        <IconText  title='Activity Name' Icon={<SvgIcons.world  />} titleColour={AppColors.WHITE}/>
        <IconText  title='$200 - $300' Icon={<SvgIcons.Penny  />} titleColour={AppColors.WHITE}/>
      </View>
        <IconText  title='23-Jun-2025 05:00 PM' Icon={<SvgIcons.calender  />} titleColour={AppColors.WHITE}/>

      <View>

        <IconText  title='Lorem Ipsum is simply dummy text of the' Icon={<SvgIcons.location  />} titleColour={AppColors.WHITE}/>

        <View style={{width:responsiveWidth(75), alignSelf:'center',}}>
        <AppText  title='Get Direction' textColor={"#FD26D9"} textSize={2}/>
        </View>
      </View>
        <IconText  title='participants (5/6)' Icon={<SvgIcons.pfp  />} titleColour={AppColors.WHITE}/>
      </View>

      <Line />

      <FlatList
      data={data}
      contentContainerStyle={{paddingHorizontal:20, gap:10, marginTop:20}}
      renderItem={({item})=>{
        
        return(
          
          <Participants name={item.name} pfp={ AppImages.User} type={item.type}/>
        )
      }}
      />

      </ScrollView>
  

    </View>
  )
}

export default Maps
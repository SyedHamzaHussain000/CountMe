import { View, Text,ImageBackground} from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from '../utils/Other/Responsive_Dimensions'
import AppText from './AppCommonComponents/AppText'
import AppColors from '../utils/Other/AppColors'
import SmallButtons from './AppCommonComponents/SmallButtons'
import { SvgXml } from 'react-native-svg'
import Appsvgicon from '../assets/icons/Appsvgicon'
import { SvgIcons } from '../assets/icons/HomeIcons/SvgIcons'
import IconText from './AppCommonComponents/IconText'
import AppImages from '../assets/images/AppImages'

type props ={
  data: any
} 

const Banners = ({data}: props) => {


  return (
             <ImageBackground
               source={AppImages.cardbg}
               style={{
                 height: responsiveHeight(25),
                 marginTop: 10,
                 borderRadius: 20,
                 overflow: 'hidden',
                 padding: 10,
                 justifyContent: 'flex-end',
               }}
             >
               <View style={{ height: responsiveHeight(18), gap: 10 }}>
                 <View
                   style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                   }}
                 >
                   <AppText
                     title={data[0]?.sport}
                     textSize={2.2}
                     textFontWeight
                     textColor={AppColors.WHITE}
                   />
                   <SmallButtons
                     title="Join Now"
                     icon={<SvgXml xml={Appsvgicon.Send} height={18} width={18} />}
                   />
                 </View>

                 <IconText
                   Icon={<SvgIcons.pfp />}
                   title={`participants (${data[0]?.joinedCount}/${data[0]?.totalPlayers})`}
                   titleColour={AppColors.WHITE}
                 />
                 <View>
                   <IconText
                     Icon={<SvgIcons.location />}
                     title={data[0]?.address}
                     titleColour={AppColors.WHITE}
                   />
                   <View
                     style={{ width: responsiveWidth(70), alignSelf: 'center' }}
                   >
                     <AppText
                       title={'Get Direction'}
                       textColor={AppColors.YELLOWIS}
                     />
                   </View>
                 </View>
               </View>
             </ImageBackground>
  )
}

export default Banners
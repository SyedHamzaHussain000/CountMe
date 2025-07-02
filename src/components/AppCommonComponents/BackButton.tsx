import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SvgFromXml } from 'react-native-svg'
import Appsvgicon from '../../assets/icons/Appsvgicon'
import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()}>
      <SvgFromXml xml={Appsvgicon.BackArrow} height={30} width={30}/>
    </TouchableOpacity>
  )
}

export default BackButton
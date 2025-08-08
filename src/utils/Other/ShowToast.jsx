import { View, Text } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const ShowToast = (type, message) => {
  return Toast.show({  
    type: type,
    text1: message
  })
}

export default ShowToast
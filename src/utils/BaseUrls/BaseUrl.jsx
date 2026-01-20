import { getAuth } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const UsersDbRef = database().ref('/Users');

export const UserId = getAuth()?.currentUser?.uid


// export const BASE_URL = "https://appsdemo.pro/CountMe/api/user/"
// export const IMAGE_BASE_URL = "https://appsdemo.pro/CountMe/"
export const BASE_URL = "https://clientdesiqntech.co/CountMe/api/user/"
export const IMAGE_BASE_URL = "https://clientdesiqntech.co/CountMe/"

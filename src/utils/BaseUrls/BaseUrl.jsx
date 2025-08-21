import { getAuth } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const UsersDbRef = database().ref('/Users');

export const UserId = getAuth()?.app?.auth()?.currentUser?.uid


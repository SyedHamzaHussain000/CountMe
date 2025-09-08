import { getDatabase, ref, get } from '@react-native-firebase/database';

const GetAllJoinerByPost = async (postId) => {

  const db = getDatabase();
  const joinsRef = ref(db, `joins/${postId}`);


  try {
    const snapshot = await get(joinsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convert to array
      const joinersArray = Object.values(data);

      // Sort latest first by createdAt
      joinersArray.sort((a, b) => b.createdAt - a.createdAt);

      return joinersArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching joiners:", error);
    return [];
  }
};

export default GetAllJoinerByPost;

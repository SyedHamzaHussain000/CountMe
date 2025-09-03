import { getDatabase, ref, get, } from "@react-native-firebase/database";
import { Alert } from "react-native";

const GetAllPostLikes = async() => {


    const db = getDatabase();
  const postsRef = ref(db, "likes");

  try {
    const snapshot = await get(postsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const postsArray = Object.values(data);
      // sort latest first
      postsArray.sort((a, b) => b.createdAt - a.createdAt);
      return postsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default GetAllPostLikes
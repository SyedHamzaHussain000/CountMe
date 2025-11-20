import { getDatabase, ref, get, } from "@react-native-firebase/database";
import { Alert } from "react-native";
import { ApiCall } from "../../../utils/apicalls/ApiCalls";

const GetAllPosts = async() => {

  try {
      const {data} = await ApiCall('GET', 'getAllPost')

      // console.log("data........................", data)
      return data.data
  } catch (error) {
    console.log("error", error)
  }

return  
    const db = getDatabase();
  const postsRef = ref(db, "posts");

  try {
    const snapshot = await get(postsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("posts Data",data)
      const postsArray = Object.values(data);
      // sort latest first
      postsArray.sort((a, b) => b.createdAt - a.createdAt);

      // console.log("postsArray",postsArray)
      return postsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default GetAllPosts
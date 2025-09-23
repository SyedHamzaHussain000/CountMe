import { getDatabase, ref, query, orderByChild, equalTo, get } from "@react-native-firebase/database";
import { setAllJoiningPosts, setNearbyPosts } from "../../../redux/slices/AuthSlice";

const db = getDatabase();

export async function GetAllJoiningPost(dispatch) {
  try {
    const postsRef = ref(db, "posts");
    const joiningPostsQuery = query(postsRef, orderByChild("isJoiningPost"), equalTo(true));

    const snap = await get(joiningPostsQuery);

    const posts = [];
    if (snap.exists()) {
      snap.forEach(childSnap => {
        posts.push({ id: childSnap.key, ...childSnap.val() });
      });
    }

    dispatch(setAllJoiningPosts(posts)); // you might want to rename this slice to `setJoiningPosts`
    return posts;
  } catch (error) {
    console.error("Error fetching joining posts:", error);
    throw error;
  }
}

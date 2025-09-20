import { getDatabase, ref, query, orderByChild, equalTo, get } from "@react-native-firebase/database";

const GetOnlyMyPostApi = async (userId) => {
  try {
    const db = getDatabase();
    const postsRef = ref(db, "posts");

    // query posts where authorId == userId
    const userPostsQuery = query(postsRef, orderByChild("authorId"), equalTo(userId));
    const snapshot = await get(userPostsQuery);

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
    console.error("❌ Error fetching user posts:", error);
    return [];
  }
};

export default GetOnlyMyPostApi;

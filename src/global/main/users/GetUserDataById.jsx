import { getDatabase, ref, get } from "@react-native-firebase/database";
import { Alert } from "react-native";

const GetUserDataById = async (userId) => {

  try {
    const db = getDatabase();
    const userRef = ref(db, `Users/${userId}`); // go to users table with userId
    const snapshot = await get(userRef);




    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log("✅ User Data:", userData);
      return userData;
    } else {
      console.log("❌ No user found with this ID");
      return null;
    }
  } catch (error) {
    console.error("🔥 Error fetching user details:", error);
    return null;
  }
};

export default GetUserDataById;

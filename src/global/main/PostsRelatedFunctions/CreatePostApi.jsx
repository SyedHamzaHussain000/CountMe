import { getDatabase, ref, push, set, serverTimestamp } from "@react-native-firebase/database";

const db = getDatabase();

export async function CreatePostApi(UserData,userId, caption,CountMeDetails,postLink, matchDateAndTime,AddressDetail, imageUrl ) {
  

  try {
    // Generate a unique post reference
    const newPostRef = push(ref(db, "posts"));

    // Save post data
    await set(newPostRef, {
      postId: newPostRef.key, 
      authorId: userId,
      authorName: UserData?.full_name, // Replace with actual user name
      authorEmail: UserData?.email,
      authorProfilePic: UserData?.ProfileImage, // Replace with actual profile pic URL
      caption: caption,
      imageUrl: imageUrl,
      Link: postLink,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: Date.now(),
      totalPlayers: CountMeDetails?.totalPlayers ? JSON.parse(CountMeDetails?.totalPlayers) : 0,
      amount:CountMeDetails?.amount,
      matchDateAndTime:matchDateAndTime,
      joinedCount: 0,
      sport:CountMeDetails?.sport,
      latitude:AddressDetail?.latitude,
      longitude:AddressDetail?.longitude,
      address:AddressDetail?.address,
    });

    console.log("✅ Post created successfully:", newPostRef.key);
  } catch (error) {
    console.error("❌ Error creating post:", error);
  }
}

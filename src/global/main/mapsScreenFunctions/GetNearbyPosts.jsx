import { GeoFire } from "geofire";
import { getDatabase, ref, get } from "@react-native-firebase/database";
import { useDispatch } from "react-redux";
import { setNearbyPosts } from "../../../redux/slices/AuthSlice";
import { Alert } from "react-native";

const db = getDatabase();
const geoRef = ref(db, "geoPosts");
const geoFire = new GeoFire(geoRef);

export function getNearbyPosts(lat, lng, radiusInM = 200, dispatch) {

    
  return new Promise((resolve, reject) => {
    const geoQuery = geoFire.query({
      center: [lat, lng],
      radius: radiusInM / 1000, // km
    });
    

    const posts = [];
    const fetchPromises = [];

    geoQuery.on("key_entered", (key) => {
      const p = get(ref(db, "posts/" + key)).then((snap) => {
        if (snap.exists()) {
        //   console.log("snap", snap.val());
          posts.push(snap.val());
        }
      });
      fetchPromises.push(p);
    });

    geoQuery.on("ready", async () => {
        try {
            await Promise.all(fetchPromises); // ✅ wait for all get() calls
            console.log("post", posts)
        dispatch(setNearbyPosts(posts))
        resolve(posts);
      } catch (err) {
        reject(err);
      }
    });

    geoQuery.on("error", reject);
  });
}

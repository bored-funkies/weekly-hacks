import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, addDoc, getDocs, where } from "firebase/firestore";
import Activity from "./models/Activity";

const firebaseConfig = {
  apiKey: "AIzaSyAde_CPYpcIkBX_MZDtxTKWpR18kHuRsWQ",
  authDomain: "weekly-hacks.firebaseapp.com",
  projectId: "weekly-hacks",
  storageBucket: "weekly-hacks.appspot.com",
  messagingSenderId: "291373710372",
  appId: "1:291373710372:web:f763bb24d07051142c6cb1",
  measurementId: "G-81HR4FH873"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const activities = collection(database, "activities");
const users = collection(database, "users");

const getActivities = async () => {
  var res = await getDocs(activities);
  return res.docs.map(doc => doc.data());
};

const addActivity = async ( activity: Activity) => {
  return await addDoc(activities, activity); 
}

const authUser = async (mobile: string): Promise<boolean> => {
  const userQuery = query(users, where("mobile", "==", mobile));
  const data = await getDocs(userQuery);
  return !!data; // !! converts data to a boolean value (true or false)
};

export { app, database, activities as dbInstance, addActivity, getActivities, authUser };

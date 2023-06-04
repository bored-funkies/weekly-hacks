import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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
const dbInstance = collection(database, 'activities');

const getActivities = async () => {
  var res = await getDocs(dbInstance);
  return res.docs.map(doc => doc.data());
};

const addActivity = async ( activity: Activity) => {
  return await addDoc(dbInstance, activity); 
}

export { app, database, dbInstance, addActivity, getActivities };

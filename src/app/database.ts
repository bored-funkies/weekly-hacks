import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, addDoc, getDocs, where, QueryFieldFilterConstraint } from "firebase/firestore";
import Activity from "./models/Activity";
import FilterConstraint from "./models/FilterConstraint";
import { KeyValuePair } from "./utils/charts";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "weekly-hacks.firebaseapp.com",
  projectId: "weekly-hacks",
  storageBucket: "weekly-hacks.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APPID,
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

const getAggregatedActivities = async (filters: FilterConstraint[]): Promise<KeyValuePair[]> => {
  let data = await getFilteredData("activities", filters);
  let grouped: any = {};
  data.forEach(function (a) {
      if(grouped[a.mobile] !== undefined){
        grouped[a.mobile]++;
      }
      else{
        grouped[a.mobile] = 1;
      };
  });
  return Object.entries(grouped).map<KeyValuePair>(([key, value]) => ({key, value: <number>value}));
}

const getFilteredData = async (collectionName: string, filters: FilterConstraint[]): Promise<any[]> => {
  let tempCollection = collection(database, collectionName);
  let queryConstraints: QueryFieldFilterConstraint[] = filters.map(a => where(a.column, a.condition, a.value));
  let tempQuery = query(tempCollection, ...queryConstraints);
  return (await getDocs(tempQuery)).docs.map(doc => doc.data());
}

//ToDo: Advanced aggregation function... We can use based on the future requirement... Don't delete!
// const getAggregatedResult = async(collectionName: string, aggregations: Aggregation[], filters: FilterConstraint[]): Promise<any[]> => {
    //reference - https://stackoverflow.com/questions/35506433/grouping-by-multiple-fields-per-object#:~:text=groupBy(people%2C%20function%20(person,join('%7C')%3B%20%7D)%3B
//   let tempCollection = collection(database, collectionName);
//   let queryConstraints: QueryFieldFilterConstraint[] = filters.map( a => where(a.column, a.condition, a.value));
//   let tempQuery = query(tempCollection, ...queryConstraints);
//   let res = await getDocs(tempQuery);
//   let grouped: any = {};
//   res.docs.forEach(function (a) {
//     aggregations.reduce(function (o, g, i) {                           
//         o[a.get(g.column)] = o[a.get(g.column)] || (i + 1 === aggregations.length ? [] : {}); 
//         return o[a.get(g.column)];                                          
//     }, grouped).push(a);
//   });
//   return grouped;
// }

const addActivity = async ( activity: Activity) => {
  return await addDoc(activities, activity); 
}

const authUser = async (mobile: string): Promise<boolean> => {
  const userQuery = query(users, where("mobile", "==", mobile));
  const data = await getDocs(userQuery);
  if(data.empty){
    throw "Invalid User";
  }
  return !data.empty; // If result is empty there is no user with that mobile no so return false
};

export { app, database, activities as dbInstance, addActivity, getActivities, authUser, getAggregatedActivities, getFilteredData};

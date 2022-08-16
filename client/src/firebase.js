import { getAuth} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCHQ8SysCWiY0jWmaT3NZwLCHOl1W3GwFY",
  authDomain: "cen4721-project-3.firebaseapp.com",
  projectId: "cen4721-project-3",
  storageBucket: "cen4721-project-3.appspot.com",
  messagingSenderId: "361789104908",
  appId: "1:361789104908:web:a3cb3890356bed59b65f29",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

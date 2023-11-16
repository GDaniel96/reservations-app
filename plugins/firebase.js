import { initializeApp } from "firebase/app";
import { defineNuxtPlugin } from "nuxt/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyB1YFH8muaMFMBvQEB_mFD5IB0M_IbAck8",
    authDomain: "reservation-21189.firebaseapp.com",
    projectId: "reservation-21189",
    storageBucket: "reservation-21189.appspot.com",
    messagingSenderId: "739763324154",
    appId: "1:739763324154:web:903c4008a5b0319e247543",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
});

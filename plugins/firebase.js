import { initializeApp } from "firebase/app";
import { defineNuxtPlugin } from "nuxt/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.API_KEY,
    authDomain: config.public.AUTH_DOMAIN,
    projectId: config.public.PROJECT_ID,
    storageBucket: config.public.STORAGE_BUCKET,
    messagingSenderId: config.public.MESSAGE_SENDER_ID,
    appId: config.public.APP_ID,
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const auth = getAuth(app);

  nuxtApp.vueApp.provide("firestore", db);
  nuxtApp.provide("firestore", db);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);
});

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0mWorUy-UkxZLm-GY6txTe8fK36vUqO4",
    authDomain: "pest-control-fb12e.firebaseapp.com",
    projectId: "pest-control-fb12e",
    storageBucket: "pest-control-fb12e.firebasestorage.app",
    messagingSenderId: "900865632802",
    appId: "1:900865632802:web:d55dcb70d276a8d34b787b",
    measurementId: "G-2MXZ4RR8JE"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

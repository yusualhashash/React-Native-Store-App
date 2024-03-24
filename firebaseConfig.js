// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzVYDq1Nx4Nh-aPYEV1qzRXX1Yoc9Je_M",
  authDomain: "idlip-online-store.firebaseapp.com",
  projectId: "idlip-online-store",
  storageBucket: "idlip-online-store.appspot.com",
  messagingSenderId: "563627750878",
  appId: "1:563627750878:web:2a227e915c18a3d2c5194f",
  measurementId: "G-SL3NDJ8QGJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

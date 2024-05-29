import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, addDoc,  getDocs, doc, updateDoc, deleteDoc, where, query, getDoc } from "firebase/firestore";
import "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
    apiKey: "AIzaSyD47Q2etrM_FU6gP8P2XkdPyGZAoGpR7LM",
    authDomain: "mind-pass.firebaseapp.com",
    projectId: "mind-pass",
    storageBucket: "mind-pass.appspot.com",
    messagingSenderId: "748343870546",
    appId: "1:748343870546:web:a6604dce3e132b72fb0b8b",
    measurementId: "G-GQNE91TZTK"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);


//função que busca o ID de usuário no cadastro do Firebase
const getUid = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(new Error('SEM ID DE USUÁRIO'));
        }
      });
    });
  };


export {getDoc, getUid, auth, app ,db ,getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query};

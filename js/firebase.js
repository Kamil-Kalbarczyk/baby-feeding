// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBYTfRxehiM77l29mnWhxeydOUx5Npyjqg",
    authDomain: "baby-feeding-kk.firebaseapp.com",
    projectId: "baby-feeding-kk",
    storageBucket: "baby-feeding-kk.appspot.com",
    messagingSenderId: "25079389571",
    appId: "1:25079389571:web:a8cdd0e81999ed815deab6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getFirestore, collection, query, getDocs, getDoc, doc, setDoc, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'

  const db = getFirestore();

const docRef = doc(db, "feeds", "FxBOVsZswFZTo4OTgzqO");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
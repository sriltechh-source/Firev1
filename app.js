alert("app.js loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYX_DIMdhzEHjVFcsBqvIxFiAHBFpS2WI",
  authDomain: "mana-8d9ba.firebaseapp.com",
  projectId: "mana-8d9ba",
  storageBucket: "mana-8d9ba.firebasestorage.app",
  messagingSenderId: "214898827882",
  appId: "1:214898827882:web:f3d4808fb8a548f9136013",
  measurementId: "G-BPJNBWT2J5"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

window.loginWithGoogle = async () => {
    await signInWithPopup(auth, provider);
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user").innerHTML = "Hello " + user.displayName;
    }
});

window.placeOrder = async () => {

  alert("Button clicked");

  if(!auth.currentUser){

    alert("Please login first");

    return;

  }

  if(!navigator.geolocation){

    alert("Geolocation not supported");

    return;

  }

  navigator.geolocation.getCurrentPosition(

    async(position)=>{

      alert("Location captured");

      try{

        const docRef = await addDoc(collection(db, "orders"), {

          customerName: auth.currentUser.displayName,

          email: auth.currentUser.email,

          latitude: position.coords.latitude,

          longitude: position.coords.longitude,

          createdAt: serverTimestamp()

        });

        alert("Order Saved: " + docRef.id);

      } catch(err){

        console.log(err);

        alert("Firestore Error: " + err.message);

      }

    },

    (error)=>{

      alert("Location Error: " + error.message);

    }

  );

};

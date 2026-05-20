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

const firebaseConfig = {
    apiKey: "PASTE_API_KEY",
    authDomain: "PASTE_AUTH_DOMAIN",
    projectId: "PASTE_PROJECT_ID",
    storageBucket: "PASTE_STORAGE_BUCKET",
    messagingSenderId: "PASTE_SENDER_ID",
    appId: "PASTE_APP_ID",
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
    navigator.geolocation.getCurrentPosition(async (position) => {
        await addDoc(collection(db, "orders"), {
            customerName: auth.currentUser?.displayName,

            email: auth.currentUser?.email,

            latitude: position.coords.latitude,

            longitude: position.coords.longitude,

            createdAt: serverTimestamp(),
        });

        alert("Order Saved!");
    });
};

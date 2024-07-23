import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {

    // Web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDU4s74rjlDFif5bsTJhxSlRT-HP44mpQk",
        authDomain: "eventy-c5909.firebaseapp.com",
        projectId: "eventy-c5909",
        storageBucket: "eventy-c5909.appspot.com",
        messagingSenderId: "851322724573",
        appId: "1:851322724573:web:6354b4e8cdb0a34f8a3b34"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    return {
        provide: {
            auth,
            db
        }
    }

});
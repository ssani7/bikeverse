// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB656jga-AXUZrJm9Kk0J80vI9UzaekV4k",
    authDomain: "assignment-12-cameraverse.firebaseapp.com",
    projectId: "assignment-12-cameraverse",
    storageBucket: "assignment-12-cameraverse.appspot.com",
    messagingSenderId: "755778524312",
    appId: "1:755778524312:web:eea4949246777f85c7aced"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
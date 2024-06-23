// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as signOutUser,
    AuthError,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: 'librakeeper-web.firebaseapp.com',
    projectId: 'librakeeper-web',
    storageBucket: 'librakeeper-web.appspot.com',
    messagingSenderId: '317795782010',
    appId: '1:317795782010:web:b1b6239ea87c20d8599ac3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signIn = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        const { code, message } = error as AuthError;
        console.error(`Error ${code}: ${message}`);
    }
};

export const signOut = async () => {
    try {
        await signOutUser(auth);
    } catch (error) {
        const { code, message } = error as AuthError;
        console.error(`Error ${code}: ${message}`);
    }
};

export default app;

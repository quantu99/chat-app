import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyBM0nyOLhW1laaimeasqJ8Rejd-lwmQMSc',
    authDomain: 'chat-05-a9ec2.firebaseapp.com',
    projectId: 'chat-05-a9ec2',
    storageBucket: 'chat-05-a9ec2.appspot.com',
    messagingSenderId: '1096196518915',
    appId: '1:1096196518915:web:4425a1d65443b2024e8a36',
    measurementId: 'G-V8KQP0BBKQ',
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

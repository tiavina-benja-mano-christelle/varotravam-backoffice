import { initializeApp } from "firebase/app";

var firebaseConfig = {
   apiKey: "AIzaSyAU8UgHiGJbxk06z0U3SDYk6MCzSHv14Oc",
   authDomain: "supple-antenna-379817.firebaseapp.com",
   projectId: "supple-antenna-379817",
   storageBucket: "supple-antenna-379817.appspot.com",
   messagingSenderId: "905117852456",
   appId: "1:905117852456:web:3a8b725704c94302dae61d",
   measurementId: "G-X8ZH2KDHZY"
};

let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}


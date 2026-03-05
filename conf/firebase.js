
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBbitDi6F5hEhCRdNj_-FOq3UfpO2awdDo",
    authDomain: "rede-social-68712.firebaseapp.com",
    databaseURL: "https://rede-social-68712-default-rtdb.firebaseio.com",
    projectId: "rede-social-68712",
    storageBucket: "rede-social-68712.firebasestorage.app",
    messagingSenderId: "184240858115",
    appId: "1:184240858115:web:36df5e70da190d96f3da36",
    measurementId: "G-8D5D0JMRY0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


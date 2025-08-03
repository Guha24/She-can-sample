
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKoM_gCUpMILG-C-Bu9RlbIFyEZbc77Sw",
  authDomain: "she-can-backend.firebaseapp.com",
  databaseURL: "https://she-can-backend-default-rtdb.firebaseio.com",
  projectId: "she-can-backend",
  storageBucket: "she-can-backend.firebasestorage.app",
  messagingSenderId: "728641966545",
  appId: "1:728641966545:web:bf6386a4ba4913b16690f0",
  measurementId: "G-LDD62TLW91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function loginUser() {
    const username = document.querySelector("username-box").value;
    const password = document.querySelector("password-box").value;

    firebase.database().ref("users/" + username).once("value", snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password) {
          alert("Login successful!");
          window.location.href="dashboard.html";
        } else {
            document.querySelector('.text1').style.display="";      
        }
      } else {
        alert("Username does not exist");
      }
    });
}


function signupUser() {
  const username = document.getElementById("userame-box").value;
  const password = document.getElementById("password-box").value;

  if (!/^[a-zA-Z]/.test(username)) {
    alert("Username must start with a letter");
    return;
  }

  if (password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    alert("Password must be 10+ characters and include special character");
    return;
  }

  firebase.database().ref("users/" + username).once("value", snapshot => {
    if (snapshot.exists()) {
      alert("Username already exists");
    } else {
      const referralCode = "SCF" + Math.floor(100 + Math.random() * 900);
      firebase.database().ref("users/" + username).set({
        password: password,
        referralCode: referralCode,
        amountRaised: 0
      });
      alert("User registered successfully!");
    }
  });
}

function forgotPassword() {
  const username = document.getElementById("forgot-username").value;

  firebase.database().ref("users/" + username).once("value", snapshot => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      alert("Your password is: " + userData.password);
    } else {
      alert("Username does not exist");
    }
  });
}

document.querySelector('.js-next').addEventListener('click',()=>{
  loginUser();
})

document.querySelector('.js-password').addEventListener('click',()=>{
  forgotPassword();
})

document.querySelector('.js-signup').addEventListener('click',()=>{
  signupUser();
})
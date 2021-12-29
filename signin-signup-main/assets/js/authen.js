//authen
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,  sendEmailVerification,
    onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF2r2V322eyPlYbHiT_I_fvtOjERTryJo",
    authDomain: "auth-58a54.firebaseapp.com",
    projectId: "auth-58a54",
    storageBucket: "auth-58a54.appspot.com",
    messagingSenderId: "768162690839",
    appId: "1:768162690839:web:8e1fc26c5e72346553e952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("daftar").addEventListener("click", function(){
    const email = document.getElementById("email").value
    const password = document.getElementById("pass").value

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        sendEmailVerification(auth.currentUser).then(() =>{
            alert("Silahkan Cek Email Verifikasi");
        });
        console.log("created")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log(errorCode + errorMessage);
    });
})

document.getElementById("masuk").addEventListener("click", function(){
    
    const email1 = document.getElementById("emaillogin").value
    const password1 = document.getElementById("passlogin").value

    onAuthStateChanged(auth, (user) =>{
        if(user){
            const uid = user.uid;
            if(!user.emailVerified){
                console.log("cek email")
                alert("Harap Verifikasi Email!");
            }
            else{
                signInWithEmailAndPassword(auth, email1, password1)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log("logged in")
                    window.location.pathname = "/index.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                    console.log(errorCode + errorMessage);
                });
            }
        }
    })
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAkYF_L7uUyw7IJTziJrKXLcvlmRaqt4XM",
    authDomain: "marvel-cdbd7.firebaseapp.com",
    projectId: "marvel-cdbd7",
    storageBucket: "marvel-cdbd7.firebasestorage.app",
    messagingSenderId: "657044844356",
    appId: "1:657044844356:web:82df63e06e23818fdf3111",
    measurementId: "G-853VQKCHYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Register Function
const registerForm = document.getElementById('registroForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);
    })
    .catch((error) => {
        console.error('Error registering:', error);
    });
});

// Login Function
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
    })
    .catch((error) => {
        console.error('Error logging in:', error);
    });
});
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('Usuario cerró sesión');
    })
    .catch((error) => {
        console.error('Error al cerrar sesión:', error); 
    });
    });
// Auth State Change Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
    document.getElementById('auth').style.display= 'none';
    document.getElementById('content').style.display= 'block';
    console.log('User is logged in:', user);
    } else {
    document.getElementById('auth').style.display= 'block';
    document.getElementById('content').style.display= 'none';
    console.log('No user is logged in');
    }
});
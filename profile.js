import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcicHvJR8SsPppjverjAVmWUbxz4fWRrU",
  authDomain: "final-venue-booking.firebaseapp.com",
  projectId: "final-venue-booking",
  storageBucket: "final-venue-booking.appspot.com",
  messagingSenderId: "130315557712",
  appId: "1:130315557712:web:10ee9fc8cea3aeb1d7ea55"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
const user = auth.currentUser;

auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;
        const database = getDatabase();
        const userRef = ref(database, 'users/' + userId);

        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            const username = userData.username;
            const useremail = userData.email;
            const userstatus = userData.status;

            document.getElementById('name').innerHTML = username;
            document.getElementById('email').innerHTML = useremail;
            document.getElementById('status').innerHTML = userstatus;


            return username;
        }).catch((error) => {
            console.error("Error retrieving user data:", error);
        });
    } else {
        console.log("No user signed in.");
    }
});







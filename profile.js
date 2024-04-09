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

function convertMillisecondsToDate(milliseconds) {
    // Create a new Date object with milliseconds
    const date = new Date(milliseconds);

    // Get the various components of the date
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based index
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Format the date as YYYY-MM-DD HH:MM:SS
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

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
            const book1 = userData.book1;
            const book2 = userData.book2;

            document.getElementById('name').innerHTML = username;
            document.getElementById('email').innerHTML = useremail;
            document.getElementById('status').innerHTML = userstatus;
            document.getElementById('name2').innerHTML = username;
            document.getElementById('name3').innerHTML = username;

            if(book1 != 0){
                get(child(ref(database),'books/'+book1))
                    .then((snapshot)=>{
                    var order = snapshot.val();
                    var date = convertMillisecondsToDate(order.doi)
                    var date2 = convertMillisecondsToDate(order.doi + 86400000 * 7)

                    const tr = document.createElement('tr');
                        const trContent = `
                            <td>${order.id}</td>
                            <td>${order.name}</td>
                            <td>${date}</td>
                            <td>${date2}</td>
                            <td class="${order.status === 'Due' ? 'danger' : order.status === 'available' ? 'success' : 'primary'}">${order.status}</td>
                        `;
                        tr.innerHTML = trContent;
                        document.querySelector('table tbody').appendChild(tr);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            alert(errorMessage);})
                }
                if(book2 !=0){
                        get(child(ref(database),'books/'+book2))
                        .then((snapshot)=>{
                        var order = snapshot.val();
                        var date = convertMillisecondsToDate(order.doi)
                        var date2 = convertMillisecondsToDate(order.doi + 86400000 * 7)
        
                        const tr = document.createElement('tr');
                            const trContent = `
                                <td>${order.id}</td>
                                <td>${order.name}</td>
                                <td>${date}</td>
                                <td>${date2}</td>
                                <td class="${order.status === 'Due' ? 'danger' : order.status === 'available' ? 'success' : 'primary'}">${order.status}</td>
                            `;
                            tr.innerHTML = trContent;
                            document.querySelector('table tbody').appendChild(tr);
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                alert(errorMessage);})

                }
            
            




            return userId;
        }).catch((error) => {
            console.error("Error retrieving user data:", error);
        });
    } else {
        console.log("No user signed in.");
    }
});











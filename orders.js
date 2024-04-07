
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase,ref,child,get,update} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const database = getDatabase();
  get(child(ref(database),'books/'))
  .then((snapshot)=>{
    var Orders = snapshot.val();
    var order;
    var cnt = 1;
    for (order in Orders){
        order = Orders[cnt]
        const tr = document.createElement('tr');
        const trContent = `
            <td>${order.id}</td>
            <td>${order.name}</td>
            <td>${order.user}</td>
            <td>${order.doi}</td>
            <td>${order.dor}</td>
            <td class="${order.status === 'Due' ? 'danger' : order.status === 'available' ? 'success' : 'primary'}">${order.status}</td>
            <td class="primary">Details</td>
        `;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
        cnt++;
    };
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);})

  

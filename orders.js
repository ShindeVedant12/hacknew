
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

  get(child(ref(database),'books/'))
  .then((snapshot)=>{
    var Orders = snapshot.val();
    var order;
    var cnt = 1;
    var cnti = 0;
    var cntd = 0;
    for (order in Orders){
        order = Orders[cnt]
        const tr = document.createElement('tr');
        var date = convertMillisecondsToDate(order.doi)
        var date2 = convertMillisecondsToDate(order.doi + 86400000 * 7)
        if(order.status == "issued"){
          cnti++;
        }
        if(order.status == "Due"){
          cntd++;
        }
        
        const trContent = `
            <td>${order.id}</td>
            <td>${order.name}</td>
            <td>${order.user}</td>
            <td>${date}</td>
            <td>${date2}</td>
            <td class="${order.status === 'Due' ? 'danger' : order.status === 'available' ? 'success' : 'primary'}">${order.status}</td>
        `;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
        cnt++;
        document.getElementById('totalqty').innerHTML = cnt - 1;
        document.getElementById('issueqty').innerHTML = cnti;
        document.getElementById('dueqty').innerHTML = cntd;
        
    };
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);})

  

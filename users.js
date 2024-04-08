const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

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

const app = initializeApp(firebaseConfig);
const database = getDatabase();

  get(child(ref(database),'users/'))
  .then((snapshot)=>{
    var Users = snapshot.val();
    console.log(Users)
    
    var cnt = 0;
    var cnti = 0;
    var cntd = 0;

    const ls = Object.keys(Users)
    console.log(ls)
    for ( var user in Users){
        user = Users[ls[cnt]]
        const tr = document.createElement('tr');
        if(user.status == "Blocked"){
          cnti++;
        }
        if(user.status == "Deleted"){
          cntd++;
        }
        
        const trContent = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.book1}</td>
            <td>${user.book2}</td>
            <td class="${user.status === 'Blocked' ? 'danger' : user.status === 'Online' ? 'success' : 'primary'}">${user.status}</td>
        `;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
        cnt++;
        document.getElementById('totalqty').innerHTML = cnt;
        document.getElementById('issueqty').innerHTML = cnti;
        document.getElementById('dueqty').innerHTML = cntd;
        
    };
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);})

  
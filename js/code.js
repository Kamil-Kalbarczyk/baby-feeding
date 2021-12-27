// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBYTfRxehiM77l29mnWhxeydOUx5Npyjqg",
    authDomain: "baby-feeding-kk.firebaseapp.com",
    projectId: "baby-feeding-kk",
    storageBucket: "baby-feeding-kk.appspot.com",
    messagingSenderId: "25079389571",
    appId: "1:25079389571:web:a8cdd0e81999ed815deab6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getFirestore, doc, setDoc, collection, addDoc, getDocs, query, orderBy, limit  } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'

  const db = getFirestore();
  const q = query(collection(db, "feeds"), orderBy("date", "desc"), limit(4));


// Variables
// const breasts = document.querySelector('main');
const leftBreastButton = document.querySelector('main div.leftBreast');
const rightBreastButton = document.querySelector('main div.rightBreast');
const hisotryUl = document.querySelector('.history__list');
const hisotryList = document.querySelectorAll('.history__list li');
const dateInput = document.querySelector('input[type = date');
const timeInput = document.querySelector('input[type = time');
// let feedingHistory = [];


// add current time to the inputs
dateInput.valueAsDate = new Date();
dateInput.setAttribute('max', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)

timeInput.value = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});


// add data to Firestore
      // Add a new document with a generated id.
      const addDataToFirestore = async (breast, date) => {
        const docRef = await addDoc(collection(db, "feeds"), {
        breast: breast,
        date: date
            });
        console.log("Document written with ID: ", docRef.id);
      }

// chose breast functions

function choseLeftBreast(e) {
    leftBreastButton.classList.remove('nextBreast');
    leftBreastButton.classList.add('lastBreast');
    rightBreastButton.classList.add('nextBreast');
    rightBreastButton.classList.remove('lastBreast');
    // lastLeftBreast = true;
    const newFeeding = {
        breast: 'lewa',
        date: `${dateInput.value} ${timeInput.value}`
    };
    // feedingHistory.push(newFeeding);
    addDataToFirestore('lewa', `${dateInput.value} ${timeInput.value}`);
    renderFeeds();
};

function choseRightBreast(e) {
    rightBreastButton.classList.remove('nextBreast');
    rightBreastButton.classList.add('lastBreast');
    leftBreastButton.classList.add('nextBreast');
    leftBreastButton.classList.remove('lastBreast');
    // lastLeftBreast = false;
   const newFeeding = {
        breast: 'prawa',
        date: `${dateInput.value} ${timeInput.value}`
    };
    // feedingHistory.push(newFeeding);
    addDataToFirestore('prawa', `${dateInput.value} ${timeInput.value}`)
    renderFeeds();
}


// render feeds

const renderFeeds = async () => {
    hisotryUl.innerHTML= '';

      const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //  console.log(doc.id, " => ", doc.data());
          const li = document.createElement('li');
            const breast = document.createElement('p');
            breast.textContent = doc.data().breast;
            const date = document.createElement('p');
            date.textContent = doc.data().date;
            const div = document.createElement('div');
            div.appendChild(breast);
            div.appendChild(date);
            li.appendChild(div);
            // li.innerHTML = `
            //  <div>
            // <p class="history__breast">${doc.data().breast}</p>
            // <p class="history__date">${doc.data().date}</p>
            //  </div>`;
            hisotryUl.appendChild(li);
            if (doc.data().breast === 'lewa') {
               div.style.backgroundColor = '#66fcf1' 
            } else {
                div.style.backgroundColor = '#ffcb9b';
            }
        });
};

renderFeeds();

// check last breast use

const checkLastBreast = async () => {
    const querySnapshot = await getDocs(q);
}

checkLastBreast()

leftBreastButton.addEventListener('click', choseLeftBreast);
rightBreastButton.addEventListener('click', choseRightBreast);
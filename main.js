import './style.css';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from 'firebase/database';
import '@fortawesome/fontawesome-free/css/all.css';
import { key } from 'fontawesome';

const publishBtn = document.getElementById('publish-btn');
const inputEl = document.getElementById('endorsement');
const inputToEl = document.getElementById('to');
const inputFromEl = document.getElementById('from');
const itemList = document.getElementById('itemList');
const likesEl = document.getElementById('likes');

const firebaseConfig = {
  apiKey: 'AIzaSyCMFiXVKyvkCer_I5_hOecYTkXpwePHwEQ',
  authDomain: 'we-are-the-champions-36b9d.firebaseapp.com',
  databaseURL:
    'https://we-are-the-champions-36b9d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'we-are-the-champions-36b9d',
  storageBucket: 'we-are-the-champions-36b9d.appspot.com',
  messagingSenderId: '144627474015',
  appId: '1:144627474015:web:1b5d9894bd4c68d24285ea',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const testimonialListInDb = ref(db, 'testimonialList');

onValue(testimonialListInDb, function (snapshot) {
  let testimonialsArray = Object.values(snapshot.val());
  let keys = Object.keys(snapshot.val());

  itemList.innerHTML = '';

  for (let i = 0; i < testimonialsArray.length; i++) {
    appendItemToList(testimonialsArray[i], keys[i]);
  }

  console.log(testimonialsArray, keys);
});

// Append item to shoppinglist
function appendItemToList(object, key) {
  const li = document.createElement('li');
  let likes = 0;

  li.innerHTML = `
    <h3>To ${object.to}</h3>
    <p>${object.text}</p>
    <div class='details-container'>
           <h3>From ${object.from}</h3>
           <i class="delete fas fa-times" id="delete-btn"></i>
        <div>
            <i class="fas fa-heart" id="like-btn"></i>
            <span id='likes'>0</span>
        </div>
    </div>
  `;

  itemList.appendChild(li);

  li.querySelector('#delete-btn').addEventListener('click', () => {
    console.log(key);
    let exactLocationOfItem = ref(db, `testimonialList/${key}`);

    remove(exactLocationOfItem);
  });
}


// Add Eventlisteners

publishBtn.addEventListener('click', () => {
  const newTestimonial = {
    text: inputEl.value,
    to: inputToEl.value,
    from: inputFromEl.value,
  };

  push(testimonialListInDb, newTestimonial);

  inputFromEl.value = '';
  inputToEl.value = '';
  inputEl.value = '';
});

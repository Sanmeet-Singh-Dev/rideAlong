import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore, getDoc, getDocs, setDoc, collection, doc, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0l9LZ3lYZWsSyPFTsxRACc2ltACy2hsI",
  authDomain: "ridealong-683df.firebaseapp.com",
  databaseURL: "https://ridealong-683df-default-rtdb.firebaseio.com",
  projectId: "ridealong-683df",
  storageBucket: "ridealong-683df.appspot.com",
  messagingSenderId: "553276766158",
  appId: "1:553276766158:web:1c8d10708b75961cae5d9f",
  measurementId: "G-CW67ZBW2B9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var storage = getStorage(app);
const auth = getAuth(app);

console.log("Trip preview Entered");

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');
const rider_id = urlSearchParams.get('rider-id');

const docDriver = doc(db, "driver-details", document_id);
const docRider = doc(db, "rider-details", rider_id);

const docSnapDriver = await getDoc(docDriver);
const docSnapRider = await getDoc(docRider);

const dataRider = docSnapRider.data();
const dataDriver = docSnapDriver.data();
  
const div = document.createElement("div");
  div.classList.add("trip-details");
  const tripPreview = document.getElementById('trip-preview');

  div.innerHTML = `<br><br><br>

  
    <h2> Trip Details </h2>
    <p>Origin: ${dataDriver.trip_details.origin_detail}</p>
    <p>Destination: ${dataDriver.trip_details.destination_detail}</p>
    <p>Date: ${dataDriver.trip_details.date}</p>
    <p>Time: ${dataDriver.trip_details.time}</p>
    <p>Luggage: ${dataDriver.trip_details.luggage}</p>
    <p>Passengers: ${dataDriver.trip_details.passengers}</p>
    <p>Pet: ${dataDriver.trip_details.pet}</p>
    <p>Price: ${dataDriver.trip_details.price}</p>
    <p>Description: ${dataDriver.trip_details.description}</p>

    


    <h2> Driver Details </h2>

    <p>Driver Name: ${dataDriver.name}</p>
    <p> Car Name: ${dataDriver.car_details.car_name} </p> 
    <p> Car Model: ${dataDriver.car_details.car_model} </p> 
    <p> Car Number: ${dataDriver.car_details.car_number} </p> 

    
    <h2> Rider Details </h2>
  <p>Rider Name: ${dataRider.name}</p>
  
  
    `;
  tripPreview.appendChild(div);





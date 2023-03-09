import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage  , uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { getFirestore ,getDoc,getDocs, setDoc, collection ,doc, addDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
var storage =  getStorage(app);
const auth = getAuth(app);

const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

// const documentRef = doc(db, 'rider-details', document_id);

// // Get the document data and retrieve the UID from the data
// const documentData = await getDoc(documentRef);
// if (documentData.exists()) {
//   const uid = documentData.get('uid');
//   console.log(`The UID for document ${document_id} is ${uid}`);
// } else {
//   console.log(`No document found with ID ${documentId}`);
// }

// action on menu button
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    menu.classList.toggle('visible');
})


// get the buttons and pages
const findRide = document.getElementById("findRidebutton");
const offerRideButton = document.getElementById("offerRidebutton");
const findrideButton = document.getElementById("rider-post-ride-submit");
// const requestRide = document.querySelector(".requestRide");
const requestRide2 = document.getElementById("requestRide2");
const startRide1 = document.getElementById("startRide1");
const startRide2 = document.getElementById("startRide2");
const endRide = document.getElementById("endRide");
const endrideSubmit = document.getElementById("endrideSubmit");
const backButton1 = document.getElementById("back-button1");
const backButton2 = document.getElementById("back-button2");
const riderPage1 = document.getElementById("rider-page1");
const riderPage2 = document.getElementById("rider-page2");
const riderPage3 = document.getElementById("rider-page3");
const riderPage4 = document.getElementById("rider-page4");
const riderPage5 = document.getElementById("rider-page5");
const riderPage6 = document.getElementById("rider-page6");
const riderPage7 = document.getElementById("rider-page7");
const riderPage8 = document.getElementById("rider-page8");

const requestPage = document.getElementById('request-page');

requestPage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../request.html?doc-id=${document_id}`;
})

offerRideButton.addEventListener('click',async (e)=>{

    e.preventDefault();
    console.log("OFFER");

    const docRef = doc(db, "driver-details", document_id);
    const documentData = await getDoc(docRef);
    console.log(documentData);
    if (documentData.exists()) {
          const isDriver = documentData.get('is_Driver');
          console.log(`The driver for document ${document_id} is ${isDriver}`);
          window.location.href = `../post-ride.html?doc-id=${document_id}`
        } else {
          console.log(`No driver details found with ID ${document_id}`);
          alert("Please Login as Driver");
        }
})


// add click event listeners to the buttons
findRide.addEventListener("click", function () {
    riderPage1.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton1.classList.remove("visually-hidden");

});
findrideButton.addEventListener("click", function () {
    backButton1.classList.add("visually-hidden");
    backButton2.classList.remove("visually-hidden");
    riderPage2.classList.add("nonvisible");
    riderPage3.classList.remove("nonvisible");
    submitRideRequest();
});
// requestRide.addEventListener("click", function () {
//     riderPage3.classList.add("nonvisible");
//     riderPage4.classList.remove("nonvisible");
// });
requestRide2.addEventListener("click", function () {
    riderPage4.classList.add("nonvisible");
    riderPage5.classList.remove("nonvisible");
});
startRide1.addEventListener("click", function () {
    riderPage5.classList.add("nonvisible");
    riderPage6.classList.remove("nonvisible");
});
startRide2.addEventListener("click", function () {
    riderPage6.classList.add("nonvisible");
    riderPage7.classList.remove("nonvisible");
    initMap();
});
endRide.addEventListener("click", function () {
    riderPage7.classList.add("nonvisible");
    riderPage8.classList.remove("nonvisible");
});
endrideSubmit.addEventListener("click", function () {
    riderPage8.classList.add("nonvisible");
    riderPage1.classList.remove("nonvisible");
});

backButton1.addEventListener("click", function () {
    riderPage1.classList.remove("nonvisible");
    riderPage2.classList.add("nonvisible");
    backButton1.classList.add("visually-hidden");
});
backButton2.addEventListener("click", function () {
    riderPage3.classList.add("nonvisible");
    riderPage2.classList.remove("nonvisible");
    backButton2.classList.add("visually-hidden");
    backButton1.classList.remove("visually-hidden");
});


// adjust the number of passengers
const plusBtn2 = document.querySelector(".plus-btn2");
const minusBtn2 = document.querySelector(".minus-btn2");
const passengerNum = document.getElementById("passenger-number");

plusBtn2.addEventListener("click", () => {
    passengerNum.value = parseInt(passengerNum.value) + 1;
});

minusBtn2.addEventListener("click", () => {
    if (parseInt(passengerNum.value) > 0) {
        passengerNum.value = parseInt(passengerNum.value) - 1;
    }
});

// adjust the number of luggage
const plusBtn1 = document.querySelector(".plus-btn1");
const minusBtn1 = document.querySelector(".minus-btn1");
const luggageNum = document.getElementById("luggage-number");

plusBtn1.addEventListener("click", () => {
    luggageNum.value = parseInt(luggageNum.value) + 1;
});

minusBtn1.addEventListener("click", () => {
    if (parseInt(luggageNum.value) > 0) {
        luggageNum.value = parseInt(luggageNum.value) - 1;
    }
});


//show the map
window.addEventListener('load', () => {
    initMap();
});

function initMap() {
    let center = [4, 44.4]
    const map = tt.map({
        key: "ZUPTa4pAyMBVSiucNojSQx84q9u7PIw4",
        container: "map",
        center: center,
        zoom: 15
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);

            const marker = new tt.Marker({
                position: pos,
                draggable: false,
                element: document.createElement('div.mapmarker')
            });

            marker.addTo(map);

        }, (error) => {
            console.log(error);
            if (error.code == error.PERMISSION_DENIED) {
                window.alert("geolocation permission denied");
            }
        });
    } else {
        window.alert = "This browser does not support geolocation";
    }
}


// get the find a ride requirements
let fromLocation = document.getElementById("fromlocation");
let toLocation = document.getElementById("tolocation");
let rideDate = document.getElementById("date");
let rideTime = document.getElementById("time");
let petChecked = document.getElementById("pets");
let requestrideArray = [];


// create city class
class Ride {
    constructor(fromLocation, toLocation, rideDate, rideTime, luggageNum, passengerNum, petChecked) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.rideDate = rideDate;
        this.rideTime = rideTime;
        this.luggageNum = luggageNum;
        this.passengerNum = passengerNum;
        this.petChecked = petChecked
    }
}
let tempArr = [];
async function submitRideRequest() {
    const ride = new Ride(fromLocation.value, toLocation.value, rideDate.value, rideTime.value, luggageNum.value, passengerNum.value, petChecked.checked ? true : false);
    requestrideArray.push(ride);
    console.log(requestrideArray);

    let origin_temp;
    let destination_temp;
    let querySnapshot = await getDocs(collection(db, 'driver-details'));
    // console.log(user_id);
    querySnapshot.forEach((doc) => {

    //   console.log(doc.data().trip_posted.trip_details);
      if(doc.data().trip_details == undefined){
        console.log("hello")
      }
      else{
        console.log("in Else");
        origin_temp = doc.data().trip_details.origin_detail;
        destination_temp = doc.data().trip_details.destination_detail;
        if(fromLocation.value == origin_temp && toLocation.value == destination_temp){
            console.log(doc.data().trip_details);
            tempArr.push(doc.data());
          }
      }

    });

    console.log(tempArr);
    console.log(tempArr[0].trip_details.price);

    for(let i =0; i<tempArr.length;i++){

        const div = document.createElement("div");
      div.classList.add("driver-details");
      const availableDriver = document.getElementById('available');

      div.innerHTML = `<br><br><br>

      <p>Driver Name: ${tempArr[i].name}</p>
        <p>Origin: ${tempArr[i].trip_details.origin_detail}</p>
        <p>Destination: ${tempArr[i].trip_details.destination_detail}</p>
        <p>Date: ${tempArr[i].trip_details.date}</p>
        <p>Time: ${tempArr[i].trip_details.time}</p>
        <p>Luggage: ${tempArr[i].trip_details.luggage}</p>
        <p>Passengers: ${tempArr[i].trip_details.passengers}</p>
        <p>Pet: ${tempArr[i].trip_details.pet}</p>
        <p>Price: ${tempArr[i].trip_details.price}</p>
        <p>Description: ${tempArr[i].trip_details.description}</p>
        <input type="submit" id="request-driver-${i}" value="Request to Book">
      `;
       availableDriver.appendChild(div);

       const requestDriver = document.getElementById(`request-driver-${i}`);

    requestDriver.addEventListener('click',async (e)=>{

        e.preventDefault();
        console.log("Request Clicked");

        console.log(tempArr[i].email);
        try {
            await setDoc(doc(db, "rider-details", document_id), {
                trip_details: {
                  origin_detail: fromLocation.value,
                  destination_detail: toLocation.value,
                  date: rideDate.value,
                  time: rideTime.value,
                  luggage: luggageNum.value,
                  passengers: passengerNum.value,
                  pet: petChecked.checked,
                  requested_driver: tempArr[i].email
               }
            }, {
              merge: true
            });
              console.log("Document successfully updated!");
             } catch (error) {
              console.error("Error updating document: ", error);
            }

    })

    }


    


    // PUSH requestrideArray into the database for rider-details under particular document id as trip-details

    


}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { collection, addDoc,getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
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
const auth = getAuth(app);
const db = getFirestore(app);
const submit = document.getElementById("submit")
submit.addEventListener('click',(e)=>{
  e.preventDefault();
  const user_email = document.getElementById("email").value;
  const user_name = document.getElementById("name").value;
  const user_password = document.getElementById("password").value;
  const checkBox = document.getElementById('terms-conditions');
  const checkDriver = document.getElementById("driver-checkbox").checked;

  console.log(user_name);
  if (validate_field(user_name) == false){
    alert("Please Enter your Name")
    return
  }
  if(validate_email(user_email) == false || validate_password(user_password) == false){
      alert("Please Enter Correct Details")
      return
  }
  if(checkBox.checked == false){
    alert("Please accept the terms.");
    return
  }

createUserWithEmailAndPassword(auth, user_email, user_password)

  .then(async (userCredential)=>{
    const user = userCredential.user;
    try {

      if(checkDriver == true){

        const docRef = await addDoc(collection(db, "driver-details"), {
          name: user_name,
          email: user_email,
          password: user_password,
        last_login: Date.now(),
        uid: user.uid,
        is_Driver:true,
        
         });

         alert('user created');
         console.log(user.uid);
         location.href = `./driver-details.html?id=${user.uid}`;
      }else{
       const docRef = await addDoc(collection(db, "rider-details"), {
         name: user_name,
         email: user_email,
         password: user_password,
        last_login: Date.now(),
        uid: user.uid
       
        });

        alert('user created');
        location.href = `./profile-setup.html?id=${user.uid}`;
      }
      
    } catch (e){
      alert("Error in processing :" +e);
    }

  })

  .catch(function(error){
      var error_code = error.error_code
      var error_message = error.message

      alert(error_message)
  })
}) 


  function validate_email(str){

    let expression = /^[^@]+@\w+(\.\w+)+\w$/.test(str);
    if(expression == true){
        return true
    } else{
        return false
    }
}

  function validate_password(password){
    if(password < 8){
        return false
    } else{
        return true
    }
  }

  function validate_field(field){
    if(field === null || field === ''){
       return false
    }else{
        return true
    }
  }


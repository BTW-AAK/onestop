
// Wait for the HTML document to finish loading
document.addEventListener('DOMContentLoaded', function() {

    // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAxi-0941fjXf4uHDYi--tDRWfo44t19yU",
    authDomain: "car-race-411f3.firebaseapp.com",
    databaseURL: "https://car-race-411f3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "car-race-411f3",
    storageBucket: "car-race-411f3.appspot.com",
    messagingSenderId: "545753548764",
    appId: "1:545753548764:web:edd36a0607d9dff8a17119"
  };
    firebase.initializeApp(firebaseConfig);
  
    // Get a reference to the sign-up button
    var signupButton = document.querySelector('#button-signup');
    var loginButton = this.querySelector('#button-login')
    var database = firebase.database();
    if (signupButton) {
  
      // Handle sign-up button clicks
      signupButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent the form from submitting
        console.log("the button clicked")
        // Get user info
        var name = document.querySelector('#nameS').value;
        var email = document.querySelector('#emailS').value;
        var password = document.querySelector('#passwordS').value;
  
        // Sign up the user with Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(userCredential) {
            // Signed in
            var user = userCredential.user;
  
            // Update user display name
            user.updateProfile({
              displayName: name
            })
            var userRef = firebase.database().ref('users/' + user.uid);

            // Store the user's data in the database
            userRef.set({
              name: name,
              email: email,
            })
            
            .then(function() {
              // Redirect to dashboard or home page
              window.location.href = "/login.html";
            })
            .catch(function(error) {
              // Handle errors
              console.error(error);
              alert(error)
            });
  
          })
          .catch(function(error) {
            // Handle errors
            console.error(error);
            alert(error)
          });
  
      });
  
    }

if (loginButton){
  loginButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log("button was clicked")
    var emailL = document.querySelector("#emailL").value;
    var passwordL = document.querySelector("#passwordL").value;
    console.log(document.querySelector("#emailL").value)
    firebase.auth().signInWithEmailAndPassword(emailL, passwordL)
.then(function(userCredential) {
  // User is signed in
  var user = userCredential.user;
  console.log("User is signed in");
  alert("signed in sucessfully!")

  // Redirect the user to the homepage
  window.location.href = "Home.html";
})
.catch(function(error) {
  // Handle errors
  console.error(error);
  alert(error)
});
  })
}
var CurrentName = null;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // The User logged in already or has just logged in.
    const homePage = this.querySelector('#home-container')
    const profilePage = this.querySelector('#profile-title')
    if(homePage){
    var CurrentUserUID =(user.uid);
    var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
    currentUserRef.on("value",function(snapshot){
// Getting the current user's name from Firebase
var userRef = firebase.database().ref('users/' + CurrentUserUID + '/name');
userRef.on('value', (snapshot) => {
   CurrentName = snapshot.val();
    return CurrentName;
});


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
//+1 because January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
console.log(today);
document.getElementById("date").innerHTML = today;

console.log(CurrentName)
document.getElementById("name").innerHTML = ", "+CurrentName;
    })};
    if(profilePage){
      var CurrentUserUID =(user.uid);
      var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
      currentUserRef.on("value",function(snapshot){
  // Get the current user's name from Firebase
  var userRef = firebase.database().ref('users/' + CurrentUserUID + '/name');
  userRef.on('value', (snapshot) => {
     CurrentName = snapshot.val();
      return CurrentName;
  });
  currentUserRef.on("value",function(snapshot){
    // Get the current user's email from Firebase
    var usrRefEmail = firebase.database().ref('users/' + CurrentUserUID + '/email');
    usrRefEmail.on('value', (snapshot) => {
       CurrentEmail = snapshot.val();
        return CurrentEmail;
    });
    currentUserRef.on("value",function(snapshot){
      // Get the current user's email from Firebase
      var userRefSchool = firebase.database().ref('users/' + CurrentUserUID + '/school');
      userRefSchool.on('value', (snapshot) => {
         CurrentSchool = snapshot.val();
          return CurrentSchool;
      });
  
  console.log(CurrentName)
  document.getElementById("user-name-text").innerHTML ="Name: " + CurrentName;
  document.getElementById("user-email-text").innerHTML ="Email: " + CurrentEmail;
  document.getElementById("school-name-text").innerHTML ="School: " + CurrentSchool;

  var logoutButton = document.querySelector('#logout-button')
  logoutButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the form from submitting
    console.log("the button clicked")
    firebase.auth().signOut()
    alert("Succuesfully Logged Out")
    window.location.replace("/login.html");
  })
      })})})};

const chatContainer = this.querySelector('#chat-container')
var selectedChat = 1;
if (chatContainer){

  // currentUserRef.on("value",function(snapshot){
  //   // Get the current user's email from Firebase
  //   var userRefSchool = firebase.database().ref('users/' + CurrentUserUID + '/school');
  //   userRefSchool.on('value', (snapshot) => {
  //      CurrentSchool = snapshot.val();
  //       return CurrentSchool;
  //   });





var chatTitlescroller = firebase.database().ref('groups/' + 'group'+1 +'/groupname' );
chatTitlescroller.on('value', (snapshot) => {
  chatTitlescrollerName = snapshot.val();
  document.getElementById("chat1").innerHTML= chatTitlescrollerName

  console.log(chatTitlescrollerName)
});
var chatTitlescroller = firebase.database().ref('groups/' + 'group'+2 +'/groupname');
chatTitlescroller.on('value', (snapshot) => {
  chatTitlescrollerName = snapshot.val();
  document.getElementById("chat2").innerHTML= chatTitlescrollerName
  console.log(chatTitlescrollerName)
});
var chatTitlescroller = firebase.database().ref('groups/' + 'group'+3 +'/groupname');
chatTitlescroller.on('value', (snapshot) => {
  chatTitlescrollerName = snapshot.val();
  document.getElementById("chat3").innerHTML= chatTitlescrollerName
  console.log(chatTitlescrollerName)
});

var chatTitlescroller = firebase.database().ref('groups/' + 'group'+4 +'/groupname');
chatTitlescroller.on('value', (snapshot) => {
  chatTitlescrollerName = snapshot.val();
  document.getElementById("chat4").innerHTML= chatTitlescrollerName
  console.log(chatTitlescrollerName)
});
var chatSelector1 = document.querySelector("#chat1")
var chatSelector2 = document.querySelector("#chat2")
var chatSelector3 = document.querySelector("#chatSelector3")
var chatSelector4 = document.querySelector("#chatSelector4")


document.getElementById ("chatSelector1").addEventListener ("click", chat1, false);
document.getElementById ("chatSelector2").addEventListener ("click", chat2, false);
document.getElementById ("chatSelector3").addEventListener ("click", chat3, false);
document.getElementById ("chatSelector4").addEventListener ("click", chat4, false);
function chat1() {
  selectedChat = 1
  chatswitched()
  console.log("chat1waspressed")
}
function chat2() {
  selectedChat = 2
  chatswitched()
  console.log("chat2")
}
function chat3() {
  selectedChat = 3
  chatswitched()
  console.log("chat3")
}
function chat4() {
  selectedChat = 4
  chatswitched()
  console.log("chat4")
}

console.log(selectedChat)

    
function chatswitched(){
var chatTitleRef = firebase.database().ref('groups/' + 'group'+selectedChat + '/groupname');
chatTitleRef.on('value', (snapshot) => {
       chatTitleNew = snapshot.val();
       console.log(chatTitleNew)
       document.getElementById("chat-box-title").innerHTML= chatTitleNew
       const chatBox = document.querySelector('#Messages')
       chatBox.innerHTML = '';
      });
    };

var chatButton = document.querySelector("#message-enter")

        chatButton.addEventListener('click', function(event) {
var userRef = firebase.database().ref('users/' + user.uid + '/name');
userRef.on('value', (snapshot) => {
   CurrentName = snapshot.val();
  currentMessageID= 1;
        var chatInput = document.querySelector("#message-input").value
        
        message = document.createElement("div");
        message.innerHTML = CurrentName+": "+chatInput;
        message.id = "message"+String(currentMessageID);
        message.className = "placeholder-messages";
        currentMessageID=currentMessageID+1;
        console.log(chatInput)
        const chatBox = document.querySelector('#Messages')
        chatBox.appendChild(message)
        document.querySelector("#message-input").value = "";
      })
    })

      // });
};
}})})
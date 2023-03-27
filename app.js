
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
    // User logged in already or has just logged in.
    const homePage = this.querySelector('#home-container')
    const profilePage = this.querySelector('#profile-title')
    if(homePage){
    var CurrentUserUID =(user.uid);
    var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
    currentUserRef.on("value",function(snapshot){
// Get the current user's name from Firebase
var userRef = firebase.database().ref('users/' + CurrentUserUID + '/name');
userRef.on('value', (snapshot) => {
   CurrentName = snapshot.val();
    return CurrentName;
});


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
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

    Talk.ready.then(function () {
      var CurrentUserUID =(user.uid); 
      var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
      currentUserRef.on("value", function(snapshot) {
        // Get the current user's name from Firebase
        var userRef = firebase.database().ref('users/' + CurrentUserUID + '/name');
        userRef.on('value', (snapshot) => {
           CurrentName = snapshot.val();


        var userRef = firebase.database().ref('users/' + CurrentUserUID + '/email');
        userRef.on('value', (snapshot) => {
           CurrentEmail = snapshot.val();


        console.log(CurrentUserUID)
        var currentUserName = CurrentName;

const me = new Talk.User({
    id: CurrentUserUID,
    name: currentUserName,
    email: CurrentEmail
});
const session = new Talk.Session({
    appId: "tvx8KZAs",
    me: me
});

const other1 = new Talk.User({
    id: "BQiW3RsDCzeYX37E0Mj8n2qkEiI3",
    name: "test16",
    email: "test16@gmail.com"
});

const other2 = new Talk.User({
    id: "456789",
    name: "Steve",
    email: "steve@example.com"
});

const group1 = session.getOrCreateConversation("group1");
const group2 = session.getOrCreateConversation("group");
group1.setParticipant(me,other1,other2);
group2.setParticipant(me,other1,other2)
group1.setAttributes({
    subject: "WSC Group"
});

const chatbox = session.createInbox();
chatbox.select(group1);
chatbox.mount(document.getElementById("talkjs-container"));
});
});
});

    })

    
  }})
  })

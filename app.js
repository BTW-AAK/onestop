
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
              email: email
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

    // Talk.ready.then(function () {
    //   var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
    //   currentUserRef.on("value", function(snapshot) {
    //     // Get the current user's name from Firebase
    //     var userRef = firebase.database().ref('users/' + CurrentUserUID + '/name');
    //     userRef.on('value', (snapshot) => {
    //        CurrentName = snapshot.val();
    //         return CurrentName;
    //     });
    //     console.log(CurrentName)
    //     var currentUserName = CurrentName;
        
    //     // Set the TalkJS user's name to the current user's name
    //     var me = window.talkSession.me;
    //     me.name = currentUserName;
    //   });
    
    //   var me = new Talk.User({
    //     id: 'currentUserID',
    //     name: 'Alice',
    //     email: 'alice@example.com',
    //     photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    //     welcomeMessage: 'Hey there! How are you? :-)',
    //   });
    //   window.talkSession = new Talk.Session({
    //     appId: 'tvx8KZAs',
    //     me: me,
    //   });
    //   var other = new Talk.User({
    //     id: '21322',
    //     name: 'Sebastian',
    //     email: 'Sebastian@example.com',
    //     photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
    //     welcomeMessage: 'Hey, how can I help?',
    //   });
    
    //   var conversation = talkSession.getOrCreateConversation(
    //     Talk.oneOnOneId(me, other)
    //   );
    //   conversation.setParticipant(me);
    //   conversation.setParticipant(other);
    
    //   var inbox = talkSession.createInbox({ selected: conversation });
    //   inbox.mount(document.getElementById('talkjs-container'));
    // });

    Talk.ready.then(() => {
      const CurrentUserUID = user.uid;
    
      // Get the current user's name and email from Firebase
      const userRef = firebase.database().ref('users/' + CurrentUserUID);
      userRef.on('value', (snapshot) => {
        const userData = snapshot.val();
        const CurrentName = userData.name;
        const CurrentEmail = userData.email;
    
        // Create a new Talk.User instance for the current user
        const CurrentUserTalkjs = new Talk.User({
          id: CurrentUserUID,
          name: CurrentName,
          email: CurrentEmail,
        });
        console.log(CurrentUserTalkjs);
        // Create a new chat group for users who have "group1" set to true in their user profile
        const groupRef = firebase.database().ref('users');
        groupRef.on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.groups && childData.groups.group1) {
              const userId = childSnapshot.key;
              const userTalkjs = new Talk.User({
                id: userId,
                name: childData.name,
                email: childData.email,
              });
              CurrentUserTalkjs.conversations.create({
                participants: [userTalkjs],
                subject: "Group 1",
              });

    
        // Create a new Talk.Session instance for the current user
        const session = new Talk.Session({
          appId: "tvx8KZAs",
          me: CurrentUserTalkjs,
        });
    
        // Select and mount the chatbox
        function oneOnOneId(uid1, uid2) {
          if (uid1 < uid2) {
            return uid1 + "-" + uid2;
          } else {
            return uid2 + "-" + uid1;
          }
        }
        const conversationId = oneOnOneId(CurrentUserUID, userId);
        const chatbox = session.getOrCreateConversation(conversationId);
        chatbox.select(conversation);
        chatbox.mount(document.getElementById("talkjs-container"));
    

      }
    });
  });
      });
    
    });
    
  }})
  })

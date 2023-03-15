
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
    var emailL = document.getElementById("#emailL");
    var passwordL = document.getElementById("#passwordL");
    console.log(document.getElementById("#emailL"))
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

Talk.ready.then(function () {
  var currentUserID = firebase.auth().currentUser.uid;
  var currentUserRef = firebase.database().ref("users/" + currentUserID);
  currentUserRef.on("value", function(snapshot) {
    // Get the current user's name from Firebase
    var currentUserName = snapshot.val().name;
    
    // Set the TalkJS user's name to the current user's name
    var me = window.talkSession.me;
    me.name = currentUserName;
    window.talkSession.updateUser(me);
  });

  var me = new Talk.User({
    id: 'currentUserID',
    name: 'Alice',
    email: 'alice@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    welcomeMessage: 'Hey there! How are you? :-)',
  });
  window.talkSession = new Talk.Session({
    appId: 'tvx8KZAs',
    me: me,
  });
  var other = new Talk.User({
    id: '21322',
    name: 'Sebastian',
    email: 'Sebastian@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
    welcomeMessage: 'Hey, how can I help?',
  });

  var conversation = talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );
  conversation.setParticipant(me);
  conversation.setParticipant(other);

  var inbox = talkSession.createInbox({ selected: conversation });
  inbox.mount(document.getElementById('talkjs-container'));
});


});


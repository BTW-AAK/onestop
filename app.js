
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
  
    // Check if the sign-up button exists on the page
    if (signupButton) {
  
      // Handle sign-up button clicks
      signupButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent the form from submitting
  
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
            }).then(function() {
              // Redirect to dashboard or home page
              window.location.href = "/index.html";
            }).catch(function(error) {
              // Handle errors
              console.error(error);
            });
  
          })
          .catch(function(error) {
            // Handle errors
            console.error(error);
          });
  
      });
  
    }
  
  });
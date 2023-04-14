
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
  var school = ""
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
              school: school
            })
            
            .then(function() {
              //  Navigate  home page
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
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;
document.getElementById("date").innerHTML = today;

console.log(CurrentName)
document.getElementById("name").innerHTML = ", "+CurrentName;
    })};
    if(profilePage){
      var CurrentUserUID =(user.uid);
      var currentUserRef = firebase.database().ref("users/" + CurrentUserUID);
      currentUserRef.on("value",function(snapshot){
  // Get the current user's name from Firebase
  var userRef = firebase.database(

  ).ref('users/' + CurrentUserUID + '/name');
  userRef.on('value', (snapshot) => {
     CurrentName = snapshot.val();
      return CurrentName;
  });
  currentUserRef.on("value",function(snapshot){
    // Get the current user's email from Firebase
    var usrRefEmail = firebase.database(
    ).ref('users/' + CurrentUserUID + '/email');
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
var selectedChat = 1
var chatTitleRef = firebase.database().ref('groups/' + 'group'+selectedChat + '/groupname');
chatTitleRef.on('value', (snapshot) => {
       chatTitleNew = snapshot.val();
       console.log(chatTitleNew)
       document.getElementById("chat-box-title").innerHTML= chatTitleNew

      });

    //*TRYING PUBNUB
    (function() {

      

console.log(user.name)
console.log(typeof(user.uid))
if (user.uid=="OsMWx3YDbCTqbK2pVyWVNPiRps43"){
var messegerUID = "20"
}
if (user.uid=="BQiW3RsDCzeYX37E0Mj8n2qkEiI3"){
var messegerUID = "16"
}

var selectedChat = 1
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

      });
      document.getElementById("Messages").innerHTML= ""
      
      pubnub.fetchMessages( // Get the last 10 messages sent in the chat.
      {
          channels: ["group-channel"+selectedChat],
          count: 10,
      },
      function (status, response) {
          if (response.channels[channel] && channel in response.channels) {
              response.channels[channel].forEach((message) => {
                  // console.log(message);
                  if (message.uuid == pubnub.getUUID()) { // Check who sent the message.
                      chat.publishMessage('You', message.message);
                  } else {
                      chat.receiveMessage(message.uuid, message.message);
                  }
              });
          }
      }
  );
    };



      var pubnub = new PubNub({ // Set your PubNub keys here 
          publishKey: 'pub-c-8052d94e-2c4c-4a11-b20e-42cabb798f23',
          subscribeKey: 'sub-c-9faa8c61-4cd1-4289-9de8-1932ade5223d',
          uuid: 'User ' + messegerUID
      });
     
      var messagesArea = document.getElementById('Messages'),
          input = document.getElementById('message-input'),
          sendButton = document.getElementById('message-enter'),
          channel = "group-channel"+selectedChat;

      class chatControl { // Formats messages and scrolls into view.
          publishMessage(name, msg) {
              messagesArea.innerHTML = messagesArea.innerHTML + this.msg(name, msg, 'start', 'primary');
              messagesArea.scrollIntoView(false);
          }
          receiveMessage(name, msg) {
              messagesArea.innerHTML = messagesArea.innerHTML + this.msg(name, msg, 'end', 'secondary');
              messagesArea.scrollIntoView(false);
          }
          msg(name, msg, side, style) {
              var msgTemp = `
                  <div class="card text-white bg-${style}">
                      <div class="card-body">
                          <h6 class="card-subtitle mb-2 text-${side} display-${name}">${name}</h6>
                          <p class="card-text float-${side}">${msg}</p>
                      </div>
                  </div>
                  `;
              return msgTemp;
          }
      }
      var chat = new chatControl();

      pubnub.addListener({ // Get new messages.
          message: function(msg) {
              // console.log(msg);
              if (msg.publisher == pubnub.getUUID()) { // Check who sent the message.
                  chat.publishMessage('You', msg.message);
              } else {
                  chat.receiveMessage(msg.publisher, msg.message);
              }
          },
      });
      pubnub.subscribe({ // Subscribe to wait for messages
          channels: [channel]
      });

      function publishMessage() { // Send messages with PubNub.
          var msg = input.value.trim().replace(/(?:\r\n|\r|\n)/g, '<br>'); // Format message.
          input.value = '';
          if (msg != '') {
              var publishConfig = {
                  channel: channel,
                  message: msg
              };
              pubnub.publish(publishConfig, function(status, response) { // Publish message to current channel.
                 // console.log(status, response);
              });
          }
      };
      sendButton.addEventListener("click", function(e) {
          publishMessage();
      });
      input.addEventListener('keyup', function(e) {
          if ((e.keyCode || e.charCode) === 13) {
              publishMessage();
          }
      });

      pubnub.fetchMessages( // Get the last 10 messages sent in the chat.
      {
          channels: ["group-channel"+selectedChat],
          count: 10,
      },
      function (status, response) {
          if (response.channels[channel] && channel in response.channels) {
              response.channels[channel].forEach((message) => {
                  // console.log(message);
                  if (message.uuid == pubnub.getUUID()) { // Check who sent the message.
                      chat.publishMessage('You', message.message);
                  } else {
                      chat.receiveMessage(message.uuid, message.message);
                  }
              });
          }
      }
  );



  })();
};
}})})
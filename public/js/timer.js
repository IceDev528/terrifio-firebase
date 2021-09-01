$(document).ready(function() {
    ///// replace with Your code snippet
    ////// Initialize Firebase
    // console.log("adsf");
    //   var config = {
    //       apiKey: "AIzaSyA9era-3rZl2r12o3zi7KxQRxdDuWrNw5M",
    //       authDomain: "test111-29980.firebaseapp.com",
    //       databaseURL: "https://test111-29980.firebaseio.com",
    //       projectId: "test111-29980",
    //       storageBucket: "test111-29980.appspot.com",
    //       messagingSenderId: "1068744502107",
    //       appId: "1:1068744502107:web:5f2844507a09c5c9"
    //   };
    //   firebase.initializeApp(config);
    console.log("timerscipt");
    //var myVar = setInterval(myTimer ,1000);
    // var ref = firebase.database().ref('/timer');
    // var obj = {someAttribute: true};
    // ref.push(obj)

    let currentUser;
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            currentUser = await firebase.auth().currentUser;
            console.log("uid", currentUser.uid)
            var myVar = setInterval(myTimer, 1000);
            var newPostKey = firebase.database().ref('user/' + currentUser.uid + "/timer").push().key;

            function myTimer() {
                timeCounter()
            }
            var currUser;


            function timeUpdate(sessionTime) {

                var user = {
                    id: newPostKey,
                    created_at: firebase.database.ServerValue.TIMESTAMP,
                    time: sessionTime
                };
                var updates = {};
                updates['/user/' + currentUser.uid + "/timer/" + newPostKey] = user;
                return firebase.database().ref().update(updates);
            }

            function timeCounter() {
                if (typeof(Storage) !== "undefined") {
                    if (sessionStorage.timecount) {
                        sessionStorage.timecount = Number(sessionStorage.timecount) + 1;
                        timeUpdate(sessionStorage.timecount);


                    } else {
                        sessionStorage.timecount = 1;
                    }
                    document.getElementById("timeResult").innerHTML = "Your Time Spent: " + sessionStorage.timecount + " time(s) in this session.";
                } else {
                    document.getElementById("timeResult").innerHTML = "Sorry, your browser does not support web storage...";
                }
            }

        } else {
            window.location.href = "/login";
        }
    });
    // console.log("currentuser", currentUser);



});
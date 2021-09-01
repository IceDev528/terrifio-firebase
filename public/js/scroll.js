$(document).ready(function() {

    // var currentUser;
    // var aa = async function test() {
    //         await firebase.auth().onAuthStateChanged(function(user) {
    //             if (user) {
    //                 currentUser = firebase.auth().currentUser;
    //                 console.log("scrolluser1", currentUser);
    //                 return currentUser.uid;
    //             } else {
    //                 window.location.href = "/login";
    //             }
    //             return
    //         });
    //     }
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         currentUser = firebase.auth().currentUser;
    //         console.log("scrolluser1", currentUser);
    //     } else {
    //         window.location.href = "/login";
    //     }
    // });

    // await getUser();

    async function getUser() {
        window.value = "";
        await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                window.value = user.uid;
                console.log("getuser", window.value);
                // resolve(user.uid);

            } else {

                // reject(Error('It broke'));
            }
        });
        // console.log("getuser11", window.value);
    }
    // function aa() {
    //     let promise = new Promise(function(resolve, reject) {
    //         firebase.auth().onAuthStateChanged(function(user) {
    //             if (user) {
    //                 console.log("adsfadsf");
    //                 resolve(user.uid);
    //             } else {

    //                 reject(Error('It broke'));
    //             }
    //         });
    //     });
    //     userid = promise;
    //     console.log("scrolluser", userid);
    //     return userid;
    // }
    // var currentUser = aa();
    // console.log("result", currentUser);


    // var cc = currentUser.then(function(result) {
    //     console.log("result", result);
    //     return result;
    // });
    // console.log("total", cc);


    // currentUser = aa();
    // console.log('scrolluser', currentUser)
    var winheight, docheight, trackLength, throttlescroll
    window.addEventListener("scroll", function() {
        // console.log('asdf');

        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                currentUser = await firebase.auth().currentUser;
                // console.log("scrolluser1", currentUser);
                clearTimeout(throttlescroll)
                throttlescroll = setTimeout(function() { // throttle code inside scroll to once every 150 milliseconds
                    amountscrolled()
                }, 150)
                getmeasurements()

                function getmeasurements() {
                    winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
                    docheight = getDocHeight()
                    trackLength = docheight - winheight
                }

                function getDocHeight() {
                    var D = document;
                    return Math.max(
                        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
                        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
                        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
                    );
                }

                function amountscrolled() {
                    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
                    console.log("scrolltop", scrollTop);
                    var pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
                    console.log(pctScrolled + '% scrolled')
                    document.getElementById("scrollResult").innerHTML = pctScrolled + " '% scrolled.";
                    $(document).bind('mousemove', function(e) {
                        $('#scrollResult').css({
                            left: e.pageX + 5,
                            top: e.pageY - 20
                        });
                    });
                    getAndUpdateData(pctScrolled);
                    return pctScrolled;
                }

                function getAndUpdateData(currentScroll) {
                    var ref = firebase.database().ref('user/' + currentUser.uid + "/scrollAmount");
                    console.log("aaa!", currentScroll);
                    ref.once("value", snapshot => {
                        console.log("exists!", snapshot.exists());
                        if (!snapshot.exists()) {
                            var newPostKey = firebase.database().ref('user/' + currentUser.uid + "/scrollAmount").push().key;
                            var obj = {
                                id: newPostKey,
                                created_at: firebase.database.ServerValue.TIMESTAMP,
                                pecentScrolled: amountscrolled()
                            };

                            var updates = {};
                            updates['/user/' + currentUser.uid + "/scrollAmount/" + newPostKey] = obj;
                            return firebase.database().ref().update(updates);

                        }
                        snapshot.forEach(function(item) {
                            if (currentScroll > item.val().pecentScrolled) {
                                var id = item.val().id
                                console.log("id", id)
                                var updates = {};
                                updates['/user/' + currentUser.uid + "/scrollAmount/" + id + "/pecentScrolled"] = currentScroll;
                                firebase.database().ref().update(updates);
                            }
                        });
                    });



                }


            } else {
                window.location.href = "/login";
            }
        });

    }, false)

    function getDocHeight() {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }

    function getmeasurements() {
        winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
        docheight = getDocHeight()
        trackLength = docheight - winheight
    }

    window.addEventListener("resize", function() {
        getmeasurements()
    }, false)

});
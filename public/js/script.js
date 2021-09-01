$(function() {

    // Sidebar Toggler
    function sidebarToggle(toogle) {
        var sidebar = $('#sidebar');
        var padder = $('.content-padder');
        var topbar = $('#nav-top');

        if (toogle) {
            $('.notyf').removeAttr('style');
            sidebar.css({ 'display': 'block', 'x': -300 });
            topbar.addClass('nav-shrink');
            topbar.css('width', '85%');
            sidebar.transition({ opacity: 1, x: 0 }, 250, 'in-out', function() {
                sidebar.css('display', 'block');
            });
            if ($(window).width() > 960) {
                padder.transition({ marginLeft: sidebar.css('width') }, '13%', 'in-out');
            }
        } else {
            $('.notyf').css({ width: '90%', margin: '0 auto', display: 'block', right: 0, left: 0 });
            topbar.removeClass('nav-shrink');
            topbar.css('width', '100%');
            console.log('hide');
            sidebar.css({ 'display': 'block', 'x': '0px' });
            sidebar.transition({ x: -300, opacity: 0 }, 250, 'in-out', function() {
                sidebar.css('display', 'none');
            });
            padder.transition({ marginLeft: 0 }, 250, 'in-out');
        }
    }

    $('#sidebar_toggle').click(function() {
        var sidebar = $('#sidebar');
        var padder = $('.content-padder');
        if (sidebar.css('x') == '-300px' || sidebar.css('display') == 'none') {
            sidebarToggle(true)
        } else {
            sidebarToggle(false)
        }
    });

    function resize() {
        var sidebar = $('#sidebar');
        var padder = $('.content-padder');
        padder.removeAttr('style');
        if ($(window).width() < 960 && sidebar.css('display') == 'block') {
            sidebarToggle(false);
        } else if ($(window).width() > 960 && sidebar.css('display') == 'none') {
            sidebarToggle(true);
        }
    }

    if ($(window).width() < 960) {
        sidebarToggle(false);
    }

    $(window).resize(function() {
        resize()
    });

    $('.content-padder').click(function() {
        if ($(window).width() < 960) {
            sidebarToggle(false);
        }
    });

});

//Check state of user auth, redirect to login
$().ready(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
        } else {
            window.location.href = ('/login');
        }
    });
});


logout = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        sessionStorage.clear();
        window.location.href = ('/login');
    }).catch(function(error) {

    });

}

$(function() {
    var timeout = null;

    function checkStatus() {
        clearTimeout(timeout);
        var status = $('#status');
        status.text(status.data('online-text'));
        status.removeClass('uk-label-warning');
        status.addClass('uk-label-success');
        timeout = setTimeout(function() {
            status.text(status.data('away-text'));
            status.removeClass('uk-label-success');
            status.addClass('uk-label-warning');
        }, status.data('interval'));
    }

    var status = $('#status');
    if (status.length) {
        if (status.data('enabled') == true) {
            checkStatus();
            $(document).on('mousemove', function() {
                checkStatus();
            });
        } else {
            status.css({ 'display': 'none' });
        }
    }

});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(function() {

    /*
        ToDo:
        1. Read user referal state from database
        2. Select all elements to change
        3. Temp: Change elements to Gastle
        4. Read referal reference and pull relevent files
   
        */

    firebase.auth().onAuthStateChanged(function(user) {
        if (user.uid == 'mrYJTDCxMSboFeCOol9QVgkyte53') {
            //Future: Pull colours images and text
            //Current: Define them

            var label = {
                color: '#6da450',
                logo: './images/gastle-logo.png',
                agentPhoto: './images/nivo-jim.jpg'
            }

            $('.left-logo').empty();
            $('.left-logo').append('<img src="' + label.logo + '" style="padding-top: 25px; max-height: 70px; max-width: 110px;" class="uk-align-center uk-text-center" alt="Gastle & Associates" />');
            $('.uk-background-primary').attr('style', 'background-color:' + label.color + ' !important;');
            $('.uk-button-primary').attr('style', 'background-color:' + label.color + ' !important;');

        }
        if (user.uid == 'epiHtSxXM7Ow3rcNde4lxCT8q9B3') {
            //Future: Pull colours images and text
            //Current: Define them

            var label = {
                color: '#5aace2',
                logo: './images/logo_angel.png',
                agentPhoto: './images/nivo-jim.jpg'
            }

            $('.left-logo').empty();
            $('.left-logo').append('<img src="' + label.logo + '" style="padding-top: 25px; max-height: 70px; max-width: 110px;" class="uk-align-center uk-text-center" alt="Gastle & Associates" />');
            $('.uk-background-primary').attr('style', 'background-color:' + label.color + ' !important;');
            $('.uk-button-primary').attr('style', 'background-color:' + label.color + ' !important;');

        }
        if (user) {
            var userMeta;
            firebase.database().ref('user/' + user.uid + '/userMeta').on('value', function(snapshot) {
                userMeta = snapshot.val();
                var ref = getCookie('ref');
                if (ref && userMeta.role == 'inventor') {
                    if (userMeta.campaign) {

                    } else {
                        firebase.database().ref('user/' + user.uid + '/userMeta').update({ 'campaign': ref });
                        firebase.database().ref('leadGen/' + ref + '/').once('value', function(snapshot) {
                            var countNew;
                            var userList = [];
                            if (snapshot.val().count != null) {
                                countNew = snapshot.val().count + 1;
                            } else {
                                countNew = 1;
                            }

                            firebase.database().ref('leadGen/' + ref + '/').update({
                                'count': countNew
                            });
                            firebase.database().ref('leadGen/' + ref + '/accounts').push({ 'uid': user.uid }).then(function(snapshot) {
                                firebase.database().ref('user/' + user.uid + '/userMeta').update({ 'campaignPushId': snapshot.key });
                            });
                        });

                    }
                }
            });


        }


    });

});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

var queryVal = getQueryVariable('cid');

if (queryVal) {
    setCookie('ref', queryVal, 7);
    //Set referral code to capture.
}
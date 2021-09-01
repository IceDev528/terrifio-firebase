function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//jQuery(document).ready(function(){


var storage = firebase.storage();
var pathReference = storage.ref("templates");
var tempRef;
var countryCode;
var reportData;
var reportUid;
var userUid;
var inventorType;
var launch = false;
var sectionSelect = ""; //});



// var loadEvent = new Event('load');
// addEventListener('load', function (e) {
//   jQuery('.loadingSpinner').hide();
// }, false);

function deleteReport() {
    var reportID = reportUid;
    var formName = reportData.formname;
    console.log("ReportID: ".concat(reportID, " FormName: ").concat(formName, " UserID: ").concat(userID));

    if (confirm('Are you sure you wish to delete ' + formName + '?') == true) {
        console.log('Deleting?');
        var parent = firebase.database().ref('user/' + userID + '/reports/' + reportID);
        console.log(parent);
        parent.on('child_removed', function(snapshot) {});
        parent.remove().then(function() {
            if (confirm('Report Deleted Successfully') == true) {
                window.location.replace('/');
            }
        });
    }
}

copyReport = function copyReport() {
    if (confirm('Are you sure you wish to duplicate this report?') == true) {
        firebase.database().ref('user/' + userID + "/reports/").push(reportData, function(error) {
            if (error) {
                console.log(error);
            } else {}
        });
    }
};

function formInfos(reportData) {
    if (!_typeof(reportData.proSearch) == 'undefined') {
        jQuery('#ipPro').toggleClass('uk-hidden');
    }

    var dataOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (typeof reportData.whatwas !== 'undefined' && reportData.whatwas != 'null') {
        var releaseDate = "" + reportData.whatwas[0] + "-" + reportData.whatwas[1] + "-" + reportData.whatwas[2];
        releaseDate = new moment(releaseDate);
        reportData.what = releaseDate.format('dddd, MMMM Do YYYY');
        console.log(releaseDate); // var day = releaseDate.getDate() - 1;
        // var month = releaseDate.getMonth() +1;
        // var year = releaseDate.getFullYear() + 1;

        var releaseDateComm = new moment(reportData.lessComm, 'DD-MM-YYYY');
        oneYearDateComm = oneYearDateComm.add(1, 'year');
        reportData.date56 = oneYearDateComm.format('dddd, MMMM, Do YYYY'); //var oneYearDate = new Date(new Date(releaseDate).setFullYear(new Date().getFullYear() + 1));

        var oneYearDate = new moment(releaseDate);
        oneYearDate = oneYearDate.add(1, 'year');
        reportData.date55 = oneYearDate.format('dddd, MMMM Do YYYY');

        if (reportData.isyour == "NO" && (reportData.inwhich == "Canada" || reportData.inwhich == "United States" || reportData.inwhich == "Australia" || reportData.inwhich == "United Kingdom")) {
            jQuery("#formInfo").append("<li><span class='fas fa-exclamation-triangle fa-li' data-toggle='tooltip' title='This is based on current guidelines' style='color:orange;'></span>File application in &#34; grace period &#34; countries by " + oneYearDate.format('dddd, MMMM Do YYYY') + ". See Invention Project Report for details. </li>");
            jQuery('#form_Data').append("<li class='enabledDate'> Date of Earliest <i>'Publicly Disclosing'</i> Activity: " + releaseDate.format('dddd, MMMM Do YYYY') + "</li>");
        } else if (reportData.isyour == "NO" && reportData.wasyour == "More" && (reportData.inwhich == "Canada" || reportData.inwhich == "United States" || reportData.inwhich == "Australia" || reportData.inwhich == "United Kingdom")) {
            jQuery("#formInfo").append("<li><span class='fas fa-exclamation-triangle fa-li' style='color:orange;'></span>You may have missed your file date of: " + oneYearDate.format('dddd, MMMM Do YYYY') + " to file a claim </li>");
            jQuery('#form_Data').append("<li class='enabledDate'> Date of Earliest <i>'Publicly Disclosing'</i> Activity: " + releaseDate.format('dddd, MMMM Do YYYY') + "</li>");
        } else {
            jQuery('.enabledDate').hide();
        }
    } else if (typeof reportData.whatwas === 'undefined' && (typeof reportData.less !== 'undefined' || typeof reportData.lessComm !== 'undefined')) {
        var releaseDate = new moment(reportData.less, 'DD-MM-YYYY');
        var releaseDateComm = new moment(reportData.lessComm, 'DD-MM-YYYY');
        var oneYearDateComm = new moment(releaseDateComm);
        oneYearDateComm = oneYearDateComm.add(1, 'year');
        reportData.date56 = oneYearDateComm.format('dddd, MMMM, Do YYYY');
        reportData.what = releaseDate.format('dddd, MMMM, Do YYYY');
        reportData.whatComm = releaseDateComm.format('dddd, MMMM, Do YYYY');
        var oneYearDate = new moment(releaseDate);
        oneYearDate = oneYearDate.add(1, 'year');
        reportData.date55 = oneYearDate.format('dddd, MMMM, Do YYYY');
        console.log(releaseDate);

        if (reportData.isyour.toUpperCase() == "NO" && (reportData.inwhich == "Canada" || reportData.inwhich == "United States" || reportData.inwhich == "Australia" || reportData.inwhich == "United Kingdom")) {
            jQuery("#formInfo").append("<li><span class='fas fa-exclamation-triangle fa-li' data-toggle='tooltip' title='This is based on current guidelines' style='color:orange;'></span>File application in &#34; grace period &#34; countries by " + oneYearDate.format('dddd, MMMM Do YYYY') + ". See Invention Project Report for details. </li>");
            jQuery('#form_Data').append("<li class='enabledDate'> Date of Earliest <i>'Publicly Disclosing'</i> Activity: " + releaseDate.format('dddd, MMMM Do YYYY') + "</li>");
        } else if (reportData.isyour == "NO" && reportData.wasyour == "More" && (reportData.inwhich == "Canada" || reportData.inwhich == "United States" || reportData.inwhich == "Australia" || reportData.inwhich == "United Kingdom")) {
            jQuery("#formInfo").append("<li><span class='fas fa-exclamation-triangle fa-li' style='color:orange;'></span>You may have missed your file date of: " + oneYearDate.format('dddd, MMMM Do YYYY') + " to file a claim </li>");
            jQuery('#form_Data').append("<li class='enabledDate'> Date of Earliest <i>'Publicly Disclosing'</i> Activity: " + releaseDate.format('dddd, MMMM Do YYYY') + "</li>");
        } else {
            jQuery('.enabledDate').hide();
        }
    } else {}

    if (reportData.wasyour == 'Less than a year ago') {
        if (reportData.comm.toUpperCase() == 'YES' && reportData.wasyourcomm == 'Less than a year ago') {
            jQuery('#form_Data').append("<li class='enabledDate'> Date of Earliest <i>'Commercially Exploiting'</i> Activity: " + releaseDateComm.format('dddd, MMMM Do YYYY') + "</li>");
        }
    }
}

editForm = function editForm() {
    jQuery('#formNameItem').empty();
    jQuery('#formNameItem').append("Project Name: <input placeholder=\"".concat(reportData.formname, "\" type=\"text\" id=\"formNameEdit\"></input>   \n  \t\t<div id=\"editCont\" class=\"uk-float-right\" uk-grid>\n  \t\t<div class=\"uk-width-auto\">\n  \t\t<ul class=\" uk-iconnav\">\n  \t\t<li><a href=\"#\" onClick=\"updateForm();\" uk-icon=\"icon: check\"></a></li>\n  \t\t<li><a href=\"#\" onClick=\"closeEdit();\" uk-icon=\"icon: close\"></a></li>\n  \t\t</ul>\n  \t\t</div>\n  \t\t</div>"));
};

updateForm = function updateForm() {
    var value = jQuery('#formNameEdit').val();
    var updates = {}; //Here we can tack on other line by line updates to the database.

    updates["user/".concat(userID, "/reports/").concat(reportUid, "/formname")] = value;
    firebase.database().ref().update(updates).then(function() {
        jQuery('#formNameItem').empty();
        jQuery('#formNameItme').text(value);
        closeEdit();
    });
};

closeEdit = function closeEdit() {
    jQuery('#editCont').remove();
    jQuery('#formNameEdit').remove();
    jQuery('#formNameItem').text("Project Name: ".concat(reportData.formname));
};

function readReports(userID, reportID) {
    reportUid = reportID;
    userUid = userID;
    console.log(reportID);

    if (reportID != '') {
        firebase.database().ref('user/' + userID + '/reports/' + reportID).on('value', function(snapshot) {
            // dispatchEvent(loadEvent);
            jQuery('#app-list > div').empty();
            jQuery('#form_Data').empty();
            jQuery('#pro_data').empty();
            jQuery('#formInfo').empty();
            console.log('running this?');
            jQuery('#app-list > div').append("<div class='col-sm-12 col-md-12 col-lg-12'><code class='col-sm-12'>" + JSON.stringify(snapshot.val()) + "</code></div>");
            reportData = snapshot.val();

            if (typeof reportData.proSearch !== 'undefined' && reportData.proSearch != null) {
                var complexity = '';
                var budget = '';

                // switch (reportData.proSearch.budget) {
                //   case '0':
                //   budget = '$1000 - $2000';
                //   break;

                //   case '1':
                //   budget = '$2500 - $5000';
                //   break;

                //   case '2':
                //   budget = '$5500 - $10,000';
                //   break;

                //   case '3':
                //   budget = '$10,000 - $15,000';
                //   break;

                //   case '4':
                //   budget = '$15,000 +';
                //   break;
                // }
                switch (true) {
                    case reportData.proSearch.budget <= 5:
                        budget = '$1000 - $2000';
                        break;
                    case reportData.proSearch.budget > 5 && reportData.proSearch.budget <= 15:
                        budget = '$2500 - $5000';

                        break;
                    case reportData.proSearch.budget > 15 && reportData.proSearch.budget <= 25:
                        budget = '$5500 - $10,000';

                        break;
                    case reportData.proSearch.budget > 25 && reportData.proSearch.budget <= 35:
                        budget = '$10,000 - $15,000';

                        break;
                    case reportData.proSearch.budget > 35 && reportData.proSearch.budget <= 45:
                        budget = '$15,000+';

                        break;
                }

                switch (true) {
                    case reportData.proSearch.complexity <= 5:
                        complexity = 'Simple';
                        break;
                    case reportData.proSearch.complexity > 5 && reportData.proSearch.complexity <= 15:
                        complexity = 'Somewhat Simple';

                        break;
                    case reportData.proSearch.complexity > 15 && reportData.proSearch.complexity <= 25:
                        complexity = 'Involved';

                        break;
                    case reportData.proSearch.complexity > 25 && reportData.proSearch.complexity <= 35:
                        complexity = 'Intricate';

                        break;
                    case reportData.proSearch.complexity > 35 && reportData.proSearch.complexity <= 45:
                        complexity = 'Advanced';

                        break;
                }
                // switch (reportData.proSearch.complexity) {
                //   case '0':
                //   complexity = 'Simple';
                //   break;

                //   case '1':
                //   complexity = 'Somewhat Simple';
                //   break;

                //   case '2':
                //   complexity = 'Involved';
                //   break;

                //   case '3':
                //   complexity = 'Intricate';
                //   break;

                //   case '4':
                //   complexity = 'Advanced';
                //   break;
                // }

                jQuery('#pro_data').append("<li> Innovation Project Name: ".concat(reportData.formname, "<li>Budget: ").concat(budget, " </li><li>Complexity: ").concat(complexity, "</li><li>How do I find an IP Professional?: <a href='#how'>Click Here</a></li>"));
                console.log('doing stuff');
                jQuery('#proTab').removeClass('uk-hidden');
                if (reportData.proSearch.unread == "true") {
                    jQuery('#proTab > a > .uk-badge').removeClass('uk-hidden');

                }

            } else {
                console.log('not doing stuff');
            }

            var countryIcon;

            switch (reportData.inwhich) {
                case 'Canada':
                    countryIcon = '<img class="" src="./images/canada.svg" style="width: 20px;" uk-svg>';
                    break;

                case 'United States':
                    countryIcon = '<img class="" src="./images/united_states.svg" style="width: 20px;" uk-svg>';
                    break;

                case 'United Kingdom':
                    countryIcon = '<img class="" src="./images/united_kingdom.svg" style="width: 20px;" uk-svg>';
                    break;

                case 'Australia':
                    countryIcon = '<img class="" src="./images/australia.svg" style="width: 20px;" uk-svg>';
                    break;

                default:
                    countryIcon = '';
                    break;
            }

            jQuery('#form_Data').append("<li id='formNameItem'>Project Name: " + reportData.formname + "</li><li>Type: " + reportData.whatkind + "</li><li>Country: " + reportData.inwhich + countryIcon + "</li><li id='Enabling'>Is Your Project Secret?: " + reportData.isyour.charAt(0).toUpperCase() + reportData.isyour.slice(1) + "</li>");
            inwhich = reportData.inwhich;
            formInfos(reportData);
            formReport(reportData);
        });
    } else {
        jQuery('#app-list > div').append('{data:null}');
    }
}

jQuery(function() { // jQuery('[data-toggle="tooltip"]').tooltip()
    console.log("userid");

});

function formReport(reportData) {
    var dataOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (typeof reportData.whatwas !== 'undefined' && reportData.whatwas != null) {
        var releaseDate = "" + reportData.whatwas[0] + "-" + reportData.whatwas[1] + "-" + reportData.whatwas[2];
        releaseDate = new moment(releaseDate); //var oneYearDate = new Date(new Date(releaseDate).setFullYear(new Date().getFullYear() + 1));

        var oneYearDate = new moment(releaseDate);
        oneYearDate = oneYearDate.add(1, 'year');
    } else {
        var releaseDate = new moment();
    }
    /* This block controls the logic for which report and what information to show. 
     * Currently the report template is pulled from the firebase storage and data is inserted using
     * handlebars. 
     * REPORT LOGIC BLOCk
     */


    var templateData;
    console.log(reportData.disclosedto);
    //Set the report revision to match the one recieved whent he form was filled out
    if (typeof reportData.ref == 'undefined' || reportData.ref == null) {
        tempRef = "usMono.html";
    } else {
        tempRef = reportData.ref + '.html';
    }


    if (reportData.launch == 'less') {
        launch = true;
        var releaseDateLaunch = new moment(reportData.lessLaunch, 'DD-MM-YYYY');
        var minusOneLaunch = new moment(releaseDateLaunch);
        minusOneLaunch = minusOneLaunch.subtract(1, 'day');
        reportData.launch_day_minus = minusOneLaunch.format('dddd, MMMM, Do YYYY');
        reportData.launch_day = releaseDateLaunch.format('dddd, MMMM, Do YYYY');
    }

    if (typeof reportData.team !== 'undefined' && reportData.team.toUpperCase() == 'SOLO') {
        inventorType = 'solo';
    } else if (typeof reportData.team !== 'undefined' && reportData.team.toUpperCase() == 'CO') {
        inventorType = 'multi';
    }

    if (reportData.isyour.toUpperCase() == 'YES' && reportData.comm.toUpperCase() == 'NO') {
        sectionSelect = "us1nn";
    } else if (reportData.isyour.toUpperCase() == 'NO' && reportData.comm == 'notsure') {
        if (reportData.wasyour == "Less than a year ago") {
            sectionSelect = "us1ym1ns";
        }
    } else if (reportData.isyour.toUpperCase() == 'YES' && reportData.comm.toUpperCase() == 'YES') {
        if (reportData.wasyourcomm == "Less than a year ago") {
            sectionSelect = "us1nym1";
        } else {
            sectionSelect = "us1nyp1";
        }
    } else if (reportData.isyour.toUpperCase() == 'NO') {
        if (reportData.wasyour == 'Less than a year ago') {
            if (reportData.comm.toUpperCase() == 'YES') {
                if (reportData.wasyourcomm == "Less than a year ago") {
                    if (moment(reportData.less, 'DD-MM-YYYY') < moment(reportData.lessComm, 'DD-MM-YYYY')) {
                        sectionSelect = "us1ym1lym1";
                    } else {
                        sectionSelect = "us1ym1gym1";
                    }
                } else {
                    sectionSelect = "us1ym1yp1";
                }
            } else if (reportData.comm.toUpperCase() == 'NO') {
                sectionSelect = "us1ym1n";
            } else {}
        } else {
            sectionSelect = "us1yp1n";
        }
    } else if (reportData.isyour.toUpperCase() == 'YES' && reportData.comm.toUpperCase() == 'NOTSURE') {
        sectionSelect = "us1nns";
    }

    switch (reportData.inwhich) {
        case 'Canada':
            // if(((reportData.disclosedto == 'NO' || reportData.ndasigned == 'YES') || typeof reportData.disclosedto === 'undefined') && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = 'can1.html';
            // }
            // else if((reportData.ndasigned == 'NO' || typeof reportData.disclosedto === 'undefined') && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = 'can2.html';
            // }
            // else if(reportData.wasyour == 'Less than a year ago' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = 'can3.html';
            // } else if(reportData.wasyour == 'More than a year ago' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = 'report4.html';
            // }
            countryCode = "CAD";
            break;
        case 'United States':
            countryCode = "US";
            break;


        case 'United Kingdom':
            // if(((reportData.disclosedto == 'NO' || reportData.ndasigned == 'YES') || typeof reportData.disclosedto === 'undefined') && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = "uk1.html"; 
            // }
            // else if((reportData.ndasigned == 'NO' || typeof reportData.ndasigned === 'undefined' ) && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = "uk2.html";
            // }
            // else if(reportData.wasyour == 'Less than a year ago' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = "uk3.html";
            // } else if(reportData.wasyour == 'More than a year ago' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = "report4.html";
            // }
            countryCode = "UK";
            break;

        case 'Australia':
            // if(((reportData.disclosedto == 'NO' || reportData.ndasigned == 'YES') || typeof reportData.disclosedto === 'undefined') && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = "aus1.html";
            // }
            // else if((reportData.ndasigned == 'NO' || typeof reportData.disclosedto === 'undefined') && reportData.isyour.toUpperCase() == 'YES'){
            //  tempRef = "aus2.html";
            // }
            // else if(reportData.wasyour == 'Less than a year ago' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = "aus3.html";
            // } else if(reportData.wasyour == 'More than a year ago' || typeof reportData.wasyour === 'undefined' && reportData.isyour.toUpperCase() == 'NO'){
            //  tempRef = "report4.html";
            // }
            countryCode = "AUS";
            break;

        default:
            countryCode = "other";
            break;
    } //END REPORT LOGIC BLOCK
    //START REPORT RENDER BLOCK

    /*
    Template is pulled from the firebase storage container.
    Currently this looks through the MONO Template and unhides the proper sections based on the results of the form.
    It also sets the ID in the unhidden sections to allow anchoring.
    Instead of unhiding the sections in the report I should run unhide BEFORE rendering the template.
    First section is always unhidden
    Then based on the ID created I can just select the section and unhide it by the table of contents
    Then further I can remember the last one unhidden (stating at 1/first section) and hide/show it.
    function toggleSelect(sectionSelect){
      UIkit.toggle('#' + sectionLast);
    UIkit.toggle('#' + sectionSelect);
    sectionLast = sectionSelect;
      
    }

    */

    pathReference.child(tempRef).getDownloadURL().then(function(url) {
        jQuery.get(url, function(data) {
            templateData = data;
            var template = templateData;
            template = Handlebars.compile(template);
            jQuery('.reportText').empty();
            jQuery('.reportText').append(template(reportData));
            console.log(sectionSelect);
            jQuery('.' + inventorType).removeClass('uk-hidden');

            if (launch == true) {
                jQuery('.launch').removeClass('uk-hidden');
            }

            jQuery('.' + sectionSelect).removeClass('uk-hidden');

            try {
                jQuery('.' + sectionSelect + '> .sharing').attr('id', 'sharing');
                jQuery('.' + sectionSelect + '> .secret').attr('id', 'secret');
                jQuery('.' + sectionSelect + '> .treaties').attr('id', 'treaties');
                jQuery('.' + sectionSelect + '> .launchsoon').attr('id', 'launchsoon');
                jQuery('.' + sectionSelect + '> .several').attr('id', 'several');
            } catch (error) {
                console.log(error);
            }

            jQuery('.' + countryCode).removeClass('uk-hidden');
            jQuery('.reportText').removeClass('uk-hidden');
        });


    });

    var summary = document.getElementById("entry-template").innerHTML;
    var summary_template = Handlebars.compile(summary);
    jQuery('#summary').empty();
    jQuery('#summary').append(summary_template(reportData));

    //END REPORT RENDER BLOCK
}

// if(typeof getQueryVariable() === 'undefined'){
//   function getQueryVariable(variable)
// {
//        var query = window.location.search.substring(1);
//        var vars = query.split("&");
//        for (var i=0;i<vars.length;i++) {
//                var pair = vars[i].split("=");
//                if(pair[0] == variable){return pair[1];}
//        }
//        return(false);
// }
// }

function myTimer() {
    timeCounter()
}

function timeUpdate(sessionTime) {
    var newPostKey = firebase.database().ref('user/' + userID + "/timer/").push().key;
    var user = {
        id: newPostKey,
        created_at: firebase.database.ServerValue.TIMESTAMP,
        time: sessionTime
    };
    var updates = {};
    updates['/user/' + userID + "/timer/" + newPostKey] = user;
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
        document.getElementById("result").innerHTML = "You have clicked the button " + sessionStorage.timecount + " time(s) in this session.";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
// console.log("userid");
jQuery(document).ready(function() {

    jQuery('#proTab').on('click', function() {
        jQuery('#proTab > a > .uk-badge').addClass('uk-hidden');
        firebase.database().ref('user/' + userID + '/reports/' + reportUid + '/proSearch').update({
            unread: "false"
        }, function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Updated Consent Information At: ' + reportUid + 'for: ' + userID);
            }
        })
    });
    // if(typeof reportData.viewedLegalNotice === 'undefined'){
    //   jQuery('#myLegalNotice').removeClass('uk-hidden');
    // }

    jQuery('#myLegalNotice').on('hide', function() {
        firebase.database().ref('user/' + userID + '/reports/' + reportUid).set({
            viewedLegalNotice: true
        }, function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Updated Consent Information At: ' + reportUid);
            }
        });
    });

    // var myVar = setInterval(myTimer ,1000);
});
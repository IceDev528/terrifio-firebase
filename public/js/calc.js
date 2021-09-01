
// Chart.js Setup for Calculator

var ctx = document.getElementById("myChart");

// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//          datasets: [{
//             labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
//             data: [{x: 1, y: 5000},{x: 2, y: 6928},{x: 3, y: 8857},{x: 4, y: 10785}, {x: 5, y: 12714}, {x: 6, y: 14642}, {x: 7, y: 16571}, {x: 8, y: 18500}, {x: 9, y: 20428}, {x: 10, y: 22357}, {x: 11, y: 24285}, {x: 12, y: 26214}, {x: 13, y: 28142}, {x: 14, y: 30071}, {x: 15, y: 32000}
// ],
//            borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });

if (typeof config === 'undefined') {
    var config = {
        apiKey: "AIzaSyA5rZfAgaCirhIJktpvDpO5MTQKlhZXMrg",
        authDomain: "patentdepot.firebaseapp.com",
        databaseURL: "https://patentdepot.firebaseio.com",
        projectId: "patentdepot",
        storageBucket: "patentdepot.appspot.com",
        messagingSenderId: "1085689362352"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
}
var storage = firebase.storage();
var pathReference = storage.ref("templates");
var tempRef;
var reportData;
var reportUid;
var userUid;
var saveState;
var countryMult = 1;
var isSaved = false;

//});



function initCalc(){
     $('#cost').jRange('setValue', '0');
     $('#complex').jRange('setValue', '0');
}

jQuery(document).ready(function () {
    var $calc = $('#reportCalc');

$(document).on('show', $calc, function(){
  initCalc();
  console.log('ran Init Calc')
});


    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            if (typeof user.uid !== 'undefined' && user.uid != null ) {


                console.log(user.uid)
                updateValues();
                timeSeries(1);
                updateChart();
                
                var value = getQueryVariable('report');
                firebase.database().ref('user/' + currentUser.uid + "/reports/" + value).once('value').then(function(snapshot){
                    var reportData = snapshot.val();
                    // if(typeof reportData.calcEst === 'undefined'){
                    //     saveState = true;
                    //     $('#cost').jRange('setValue', '0');
                    //     $('#complex').jRange('setValue', '0');
                    // }else if (typeof reportData.calcEst !== 'undefined'){
                    //     saveState = true;
                    //     $('#cost').jRange('setValue', reportData.calcEst.costVal);
                    //     $('#complex').jRange('setValue', reportData.calcEst.complexVal);
                    // }
                });
                

            }
        }

    });

    $('#cost').jRange({
        from: 0,
        to: 14,
        values: [0],
        step: 1,
        scale: ['basic','simple','intermediate', 'involved', 'complex'],
        format: '%s',
        width: '90%',
        showLabels: true
    });

    $('#complex').jRange({
        from: 0,
        to: 14,
        step: 1,
        scale: ['Unique', 'Somewhat Unique', 'Uncommon', 'Somewhat Common'],
        format: '%s',
        width: '90%',
        showLabels: true
    });
    
    $('#cost').jRange('setValue', '7');
    $('#complex').jRange('setValue', '7');



});



timeSeries = function (value) {
    // var timeValue = [];

    //    //var initDate = moment();
    //    //var addOffset = (((value+1)/15)*2)+1;
    //    //console.log(((value+1)/(15*2))+1);
    //    for (var i = 0; i<draftCost.length; ++i){
    //        if (i >= 2){
    //            timeValue[i] = ((value+1)/(15*3))+timeValue[i-1]
    //            draftCost[i].x = moment().add(timeValue[i], 'months');

    //        // }else if (i >= 2) {
    //        //     draftCost[i].x = moment(draftCost[i].x).add(addOffset, 'months');
    //        //     console.log(draftCost[i].x);
    //    }else if(i == 1){
    //        timeValue[i] = ((value+1)/(15*2))+timeValue[i-1]
    //        draftCost[i].x = moment().add(timeValue[i], 'months');
    //    }else{
    //        timeValue[i] = 1
    //        draftCost[i].x = moment()
    //    }

    chartValues[0].x = moment();
    chartValues[1].x = moment().add(factorialDate(value + 1, (value + 1) / 15), 'months');

    //}
    //console.log(timeValue);
};
var draftCost = [{ x: 1, y: 7000 }, { x: 2, y: 6928 }, { x: 3, y: 8857 }, { x: 4, y: 10785 }, { x: 5, y: 12714 }, { x: 6, y: 14642 }, { x: 7, y: 16571 }, { x: 8, y: 18500 }, { x: 9, y: 20428 }, { x: 10, y: 22357 }, { x: 11, y: 24285 }, { x: 12, y: 26214 }, { x: 13, y: 28142 }, { x: 14, y: 30071 }, { x: 15, y: 32000 }];

factorial = function (n) {
    console.log(n);
    if (n <= 1) {
        return 7000;
    } else {
        return 20000 / 14 + factorial(n - 1);
    }
};

factorialFile = function (n, co) {
    if (n <= 1) {
        return 3500;
    } else {
        console.log(n);
        console.log(co);
        return factorialFile(n - 1, co) + 7000 / 14 * co;
    }
};

factorialDate = function (n, co) {
    if (n <= 1) {
        return 2;
    } else if (n == 2) {
        return factorialDate(n - 1, co) + co * 2;
    } else {
        return factorialDate(n - 1, co) + co * 3;
    }
};

var chartValues = [{ x: moment(), y: 7000 }, { x: moment().add(2, 'months'), y: 7000 }];

var prevValue;

conversion = function () {
    var country;

    if(typeof reportData !== 'undefined'){
        switch (reportData.inwhich){
            case 'Canada':
            country = 'cad';
            break;
            case 'United States':
            country = 'usd';
            break;
            case 'Australia':
            country = "aus";
            case 'United Kingdom':
            country  = "uk";
            break;
            default:
            country = "Not Supported";
            break;
        }
    }else{
        country = jQuery('#country option:selected').val();
    }
    switch (country) {
        case 'cad':
        countryMult = 1;
        break;
        case 'aus':
        countryMult = 1;
        break;
        case 'usd':
        countryMult = 1.25;
        break;
        case 'uk':
        countryMult = 1.60;
        break;
        default:
        countryMult = 1;
        break;
    }

    chartValues[0].y = chartValues[0].y / countryMult;
    chartValues[1].y = chartValues[1].y / countryMult;
    updateValues();
    lineChart.update();
};

jQuery('#country').change(function () {
    updateChart();
});

function updateValues() {
    var cost = jQuery('#cost').val();
    var complex = jQuery('#complex').val();
    console.log(chartValues[0].y);
    var futureDay = chartValues[1].x;
    futureDay.add(4, 'years');
    var grantEst = futureDay.clone();
    grantEst = grantEst.subtract(4, 'years');
    jQuery('#draftEst').empty();
    jQuery('#draftEst').text(Math.round(chartValues[0].y));
    jQuery('#filingEst').empty();
    jQuery('#filingEst').text(Math.round(chartValues[1].y));
    jQuery('#filingDate').empty();
    jQuery('#filingDate').text(moment(grantEst).format('LL'));
    jQuery('#estGrant').empty();
    jQuery('#estGrant').text(moment(futureDay).format('LL'));
    jQuery('#totalEst').empty();
    jQuery('#totalEst').text(Math.round(chartValues[0].y + chartValues[1].y));
    if (saveState == true) {
        var chartTotal = chartValues[0].y + chartValues[1].y;
        jQuery('#saveButton').removeClass('uk-button-success');
        jQuery('#saveButton').addClass('uk-button-default');
        jQuery('#saveButton').empty();
        jQuery('#saveButton').text('Saving...');
        saveCalc({ 'draftCost': chartValues[0].y, 'costVal': cost , 'complexVal': complex, 'filingCost': chartValues[1].y, 'totalCost': chartTotal, 'filingEstDay': chartValues[1].y });
    }
}

saveCalc = function (data) {
    var getSelect = new Promise(function (resolve, reject) {
        var subID = getQueryVariable('report');
        //console.log(subID);
        resolve(subID);
    });
    getSelect.then(function (value) {
        firebase.database().ref('user/' + currentUser.uid + "/reports/" + value + '/calcEst').set(data, function (error) {
            if (error) {
                //console.log(error);
            } else {
                // jQuery('#saveButton').addClass('uk-button-success');
                // jQuery('#saveButton').removeClass('uk-button-default');
                // jQuery('#saveButton').empty();
                // jQuery('#saveButton').text('Saved!');
            }
        });
    });
};

// function updateChart(value, slider){
//     if (slider == "draft"){

//         chartValues[0].y = draftCost[value].y;

//     }else if(slider == "similar"){
//         // if (value < 1){
//         //     prevValue = 0;
//         // }else{
//         //     prevValue = value - 1;
//         // }
//         console.log((((value+1)/15)+1)*chartValues[0].y)
//         console.log(value + "" + "+1 divided by 15 all plus 1 = " +(((value+1)/15))+"multiplied by: "+chartValues[0].y )
//         timeSeries(value);
//         //chartValues[1].y = Math.round(chartValues[1].y);
//         //console.log(chartValues);
//         lineChart.update();
//         updateValues();
//     }
//     chartValues[1].y = (((value+1)/15)+1)*chartValues[0].y;
//     lineChart.update();
//     updateValues();
// }

updateChart = function () {

    var cost = jQuery('#cost').val();
    var complex = parseInt(jQuery('#complex').val());
    console.log();
    chartValues[0].y = Math.round(factorial(parseInt(cost) + 1));
    timeSeries(complex);
    console.log(complex);

    chartValues[1].y = Math.round(factorialFile(complex + 1, (complex + 1) / 15));
    //conversion()
    chartValues[1].y = chartValues[0].y + chartValues[1].y;
    conversion();
};

var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Cost',
            data: chartValues,
            backgroundColor: '#4054be'
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: "time",
                time: {
                    unit: 'quarter'
                }
            }]
        },
        responsive: true
    }
});

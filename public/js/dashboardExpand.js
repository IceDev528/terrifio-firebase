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

 // firebase.initializeApp(config);
 // var database = firebase.database();

  jQuery(document).ready(function(){
 readUserReports();

  var importantDates = [];

  var monthList = []

  function anchorEvent(reportSuffix, reportPrefix){
    var reportID = String(reportPrefix) + String(reportSuffix);
    //Due to the length of the number value, the number has to be split and combined as converted strings.
    //I have tried passing the whole converted string but the result also breaks with an improper value.

    jQuery('#'+reportID).removeClass('highlight');
    jQuery([document.documentElement, document.body]).animate({
        scrollTop: jQuery('#'+reportID).offset().top - 30

    }, 1000);

    jQuery('#'+reportID).addClass('highlight');

    

  }

  function deleteReport(reportSuffix, reportPrefix, formName){
    var reportID = String(reportPrefix) + String(reportSuffix);
    console.log(reportPrefix)
    if(confirm('Are you sure you wish to delete '+ formName + '?') == true){
      var parent = database.ref('user/' + userID+'/'+reportID);
      parent.on('child_removed', function (snapshot) {
        console.log(snapshot);
      })
      parent.remove();
     } 




  }



  function readUserReports(){

    let i = 1;
    var dataOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    firebase.database().ref('user/' + userID).on('value', function(snapshot) {

      jQuery('#reportTable > table > tbody').empty(); //clear out any old html
      jQuery('#deadlines > dl').empty();
      let i = 1;
      //jQuery('.table > tbody').empty();

      var dateData = [];

      console.log(snapshot.val());
      if ( typeof snapshot.val() !== undefined && snapshot.val() !== null){

        var key = Object.keys(snapshot.val());

        key.forEach(function(value)  {
          var type = "Other"

            //console.log(snapshot.child(value).val());
            if (snapshot.child(value).val().whatkind){
              type = snapshot.child(value).val().whatkind;

            }
            else{
              type="Other" 
            }

            var reportID = value.toString();



            jQuery('#reportTable > ul').append('<li><a class="uk-accordion-title" href="#">Invention Project: '+ snapshot.child(value).val().formname +'</a><div class="uk-accordion-content uk-column-1-2@m" id="'+value+'"><div><h4>Type:</h4><p>'+ snapshot.child(value).val().whatkind +'</p></div><div><h4>Country:</h4><p>'+ snapshot.child(value).val().inwhich +'</p></div><div><h4>Confidential:</h4><p>'+ snapshot.child(value).val().isyour +'</p></div><div><h4>View Report</h4><a href="/report?report='+String(value)+'"><button class="uk-button uk-button-primary uk-button-default" type="button">Report</button></a></div></div></li>')
            console.log(value.substring(0,3)) 
            var reportData = snapshot.child(value).val()

            if( typeof reportData.whatwas !== 'undefined' && reportData.whatwas != 'null'){

              var releaseDate = ""+reportData.whatwas[0]+"-"+reportData.whatwas[1]+"-"+reportData.whatwas[2];
              releaseDate = moment(releaseDate,moment.ISO_8601).add('365', 'days');
              console.log(releaseDate.calendar())
              var countdown = releaseDate.clone();

              console.log(countdown.add('1','year').fromNow())

              // releaseDate = new Date(releaseDate);
              // console.log(releaseDate)
              
              // var day = releaseDate.getDate();
              // var month = releaseDate.getMonth() + 1;
              // var year = releaseDate.getFullYear() + 1;

              // day = String(day)
              // month = String(month)

              // if (month.length < 2) month = '0' + month;
              // if (day.length < 2) day = '0' + day;

              // console.log(month.length  + '   ' + day.length)

              // var oneYearDate = [year, month, day].join('-');



              dateData.push({eventName: reportData.formname ,type: type, report: value, calendar: 'Deadlines To Review For Today', color: 'orange', date: releaseDate.format()}); 

              function getdateFormated (date){
                var otherDates = moment(date).fromNow();
                var calback= function () {
                 return '['+otherDates+']';
               }
               return moment(date).calendar(null,{
                 sameDay: '[Today]',
                 nextDay:calback,
                 nextWeek: calback,
                 lastDay: calback,
                 lastWeek: calback,
                 sameElse: 'MMM DD, YYYY'
               });
              }

              //console.log(oneYearDate)

              var dataOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

              jQuery('#reportTable > ul > li > #'+ value +'').append(' <div> <h4>Date to file by: </h4><p>'+ getdateFormated(releaseDate) +'</p></div>');
              


              // Add ID if deadline passed, that way I can toggle on off.
              if(releaseDate.isBefore()){
                jQuery('#deadlines > dl').append('<dt class="uk-animation-slide-right-medium expired"><a style="color:black;" onClick="anchorEvent(`'+value.substring(3)+'`, `'+value.substring(0,3)+'`);" ></dt><dd class="expired"><span class="fas fa-exclamation-triangle" style="color:orange; line-height:inherit;"></span><span>  '+ i +' '+ snapshot.child(value).val().formname + ' </span></td><td><span> '+ getdateFormated(releaseDate) +'</span></dd></a>');
              }else{
                jQuery('#deadlines > dl').append('<dt class="uk-animation-slide-right-medium"><a style="color:black;" onClick="anchorEvent(`'+value.substring(3)+'`, `'+value.substring(0,3)+'`);" ></dt><dd><span class="fas fa-exclamation-triangle" style="color:orange; line-height:inherit;"></span><span>  '+ i +' '+ snapshot.child(value).val().formname + ' </span></td><td><span> '+ getdateFormated(releaseDate) +'</span></dd></a>');
              }
              
            }

            else if(typeof reportData.whatwas === 'undefined' && typeof reportData.less !== "undefined" && reportData.less != "" ){
              releaseDate = moment(reportData.less, 'DD-MM-YYYY');
              releaseDate = releaseDate.add('365', 'days')
              var countdown = releaseDate.clone();

              console.log(countdown.add('1','year').fromNow())

              // releaseDate = new Date(releaseDate);
              // console.log(releaseDate)
              
              // var day = releaseDate.getDate();
              // var month = releaseDate.getMonth() + 1;
              // var year = releaseDate.getFullYear() + 1;

              // day = String(day)
              // month = String(month)

              // if (month.length < 2) month = '0' + month;
              // if (day.length < 2) day = '0' + day;

              // console.log(month.length  + '   ' + day.length)

              // var oneYearDate = [year, month, day].join('-');



              dateData.push({eventName: reportData.formname ,type: type, report: value, calendar: 'Deadlines To Review For Today', color: 'orange', date: releaseDate.format()}); 

              function getdateFormated (date){
                var otherDates = moment(date).fromNow();
                var calback= function () {
                 return '['+otherDates+']';
               }
               return moment(date).calendar(null,{
                 sameDay: '[Today]',
                 nextDay:calback,
                 nextWeek: calback,
                 lastDay: calback,
                 lastWeek: calback,
                 sameElse: 'MMM DD, YYYY'
               });
              }

              //console.log(oneYearDate)

              var dataOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

              jQuery('.table > tbody').append(' <tr><td><span class="fas fa-exclamation-triangle " style="color:orange; float:right; line-height:inherit;"></span></td><td> Date to file by: </td><td>'+ getdateFormated(releaseDate) +'</td></tr>');
              
              // Add ID if deadline passed, that way I can toggle on off.

              if(releaseDate.isBefore()){
                jQuery('#deadlines > table > tbody').append('<tr class="expired"><a style="color:black;" onClick="anchorEvent('+value.substring(3)+', '+value.substring(0,3)+');" ><td><span class="fas fa-exclamation-triangle" style="color:orange; line-height:inherit;"></span><span>  '+ i +' </td><td> '+ snapshot.child(value).val().formname + ' </span></td><td><span> '+ getdateFormated(releaseDate) +'</span></td></a>');
              }else{
                jQuery('#deadlines > table > tbody').append('<tr><a style="color:black;" onClick="anchorEvent('+value.substring(3)+', '+value.substring(0,3)+');" ><td><span class="fas fa-exclamation-triangle" style="color:orange; line-height:inherit;"></span><span>  '+ i +' </td><td> '+ snapshot.child(value).val().formname + ' </span></td><td><span> '+ getdateFormated(releaseDate) +'</span></td></a>');
              }
            } else{}

            i=i+1;


          });




}


function formatDate(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + (d.getDate() + 1 ),
  year = d.getFullYear();
  console.log(d)
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}


// var calendar = new Calendar('#calendar', dateData);

console.log(dateData);








});
}



// !function() {

//   var today = moment();

//   function Calendar(selector, events) {
//     this.el = document.querySelector(selector);
//     this.events = events;
//     this.current = moment().date(1);
//     this.draw();
//     var current = document.querySelector('.today');
//     if(current) {
//       var self = this;
//       window.setTimeout(function() {
//         self.openDay(current);
//       }, 500);
//     }
//   }

//   Calendar.prototype.draw = function() {
//     //Create Header
//     this.drawHeader();

//     //Draw Month
//     this.drawMonth();

//     this.drawLegend();
//   }

//   Calendar.prototype.drawHeader = function() {
//     var self = this;
//     if(!this.header) {
//       //Create the header elements
//       this.header = createElement('div', 'header');
//       this.header.className = 'header';

//       this.title = createElement('h1');

//       var right = createElement('div', 'right');
//       right.addEventListener('click', function() { self.nextMonth(); });

//       var left = createElement('div', 'left');
//       left.addEventListener('click', function() { self.prevMonth(); });

//       //Append the Elements
//       this.header.appendChild(this.title); 
//       this.header.appendChild(right);
//       this.header.appendChild(left);
//       this.el.appendChild(this.header);
//     }

//     this.title.innerHTML = this.current.format('MMMM YYYY');
//   }

//   Calendar.prototype.drawMonth = function() {
//     var self = this;
    
//     this.events.forEach(function(ev) {
//      ev.date = moment(ev.date);
//    });
    
    
//     if(this.month) {
//       this.oldMonth = this.month;
//       this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
//       this.oldMonth.addEventListener('webkitAnimationEnd', function() {
//         self.oldMonth.parentNode.removeChild(self.oldMonth);
//         self.month = createElement('div', 'month');
//         self.backFill();
//         self.currentMonth();
//         self.fowardFill();
//         self.el.appendChild(self.month);
//         window.setTimeout(function() {
//           self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
//         }, 16);
//       });
//     } else {
//       this.month = createElement('div', 'month');
//       this.el.appendChild(this.month);
//       this.backFill();
//       this.currentMonth();
//       this.fowardFill();
//       this.month.className = 'month new';
//     }
//   }

//   Calendar.prototype.backFill = function() {
//     var clone = this.current.clone();
//     var dayOfWeek = clone.day();

//     if(!dayOfWeek) { return; }

//     clone.subtract('days', dayOfWeek+1);

//     for(var i = dayOfWeek; i > 0 ; i--) {
//       this.drawDay(clone.add('days', 1));
//     }
//   }

//   Calendar.prototype.fowardFill = function() {
//     var clone = this.current.clone().add('months', 1).subtract('days', 1);
//     var dayOfWeek = clone.day();

//     if(dayOfWeek === 6) { return; }

//     for(var i = dayOfWeek; i < 6 ; i++) {
//       this.drawDay(clone.add('days', 1));
//     }
//   }

//   Calendar.prototype.currentMonth = function() {
//     var clone = this.current.clone();

//     while(clone.month() === this.current.month()) {
//       this.drawDay(clone);
//       clone.add('days', 1);
//     }
//   }

//   Calendar.prototype.getWeek = function(day) {
//     if(!this.week || day.day() === 0) {
//       this.week = createElement('div', 'week');
//       this.month.appendChild(this.week);
//     }
//   }

//   Calendar.prototype.drawDay = function(day) {
//     var self = this;
//     this.getWeek(day);

//     //Outer Day
//     var outer = createElement('div', this.getDayClass(day));
//     outer.addEventListener('click', function() {
//       self.openDay(this);
//     });

//     //Day Name
//     var name = createElement('div', 'day-name', day.format('ddd'));

//     //Day Number
//     var number = createElement('div', 'day-number', day.format('DD'));


//     //Events
//     var events = createElement('div', 'day-events');
//     this.drawEvents(day, events);

//     outer.appendChild(name);
//     outer.appendChild(number);
//     outer.appendChild(events);
//     this.week.appendChild(outer);
//   }

//   Calendar.prototype.drawEvents = function(day, element) {
//     if(day.month() === this.current.month()) {
//       var todaysEvents = this.events.reduce(function(memo, ev) {
//         if(ev.date.isSame(day, 'day')) {
//           memo.push(ev);
//         }
//         return memo;
//       }, []);

//       todaysEvents.forEach(function(ev) {
//         var evSpan = createElement('span', ev.color);
//         element.appendChild(evSpan);
//       });
//     }
//   }

//   Calendar.prototype.getDayClass = function(day) {
//     classes = ['day'];
//     if(day.month() !== this.current.month()) {
//       classes.push('other');
//     } else if (today.isSame(day, 'day')) {
//       classes.push('today');
//     }
//     return classes.join(' ');
//   }

//   Calendar.prototype.openDay = function(el) {
//     var details, arrow;
//     var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
//     var day = this.current.clone().date(dayNumber);

//     var currentOpened = document.querySelector('.details');

//     //Check to see if there is an open detais box on the current row
//     if(currentOpened && currentOpened.parentNode === el.parentNode) {
//       details = currentOpened;
//       arrow = document.querySelector('.arrow');
//     } else {
//       //Close the open events on differnt week row
//       //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
//       if(currentOpened) {
//         currentOpened.addEventListener('webkitAnimationEnd', function() {
//           currentOpened.parentNode.removeChild(currentOpened);
//         });
//         currentOpened.addEventListener('oanimationend', function() {
//           currentOpened.parentNode.removeChild(currentOpened);
//         });
//         currentOpened.addEventListener('msAnimationEnd', function() {
//           currentOpened.parentNode.removeChild(currentOpened);
//         });
//         currentOpened.addEventListener('animationend', function() {
//           currentOpened.parentNode.removeChild(currentOpened);
//         });
//         currentOpened.className = 'details out';
//       }

//       //Create the Details Container
//       details = createElement('div', 'details in');

//       //Create the arrow
//       var arrow = createElement('div', 'arrow');

//       //Create the event wrapper

//       details.appendChild(arrow);
//       el.parentNode.appendChild(details);
//     }

//     var todaysEvents = this.events.reduce(function(memo, ev) {
//       if(ev.date.isSame(day, 'day')) {
//         memo.push(ev);
//       }
//       return memo;
//     }, []);

//     this.renderEvents(todaysEvents, details);

//     arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
//   }

//   Calendar.prototype.renderEvents = function(events, ele) {
//     //Remove any events in the current details element
//     var currentWrapper = ele.querySelector('.events');
//     var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

//     events.forEach(function(ev) {
//       var div = createElement('div', 'event');
//       var square = createElement('div', 'event-category ' + ev.color);
//       var span = createElement('span', '', ev.eventName);
//       //var span2 = createElement('span','badge badge-warning', ev.type);
//       var span3 = createElement('span','','Report');
//       var a = createElement('a', '','');
//       a.setAttribute('href', '/report/?report=' + ev.report);
//       a.setAttribute('style', 'color: #FCEE82;');


//       div.appendChild(square);
//       div.appendChild(span);
//       //div.appendChild(span2);
//       div.appendChild(a);
//       a.appendChild(span3);
//       wrapper.appendChild(div);
//     });

//     if(!events.length) {
//       var div = createElement('div', 'event empty');
//       var span = createElement('span', '', 'No Events');

//       div.appendChild(span);
//       wrapper.appendChild(div);
//     }

//     if(currentWrapper) {
//       currentWrapper.className = 'events out';
//       currentWrapper.addEventListener('webkitAnimationEnd', function() {
//         currentWrapper.parentNode.removeChild(currentWrapper);
//         ele.appendChild(wrapper);
//       });
//       currentWrapper.addEventListener('oanimationend', function() {
//         currentWrapper.parentNode.removeChild(currentWrapper);
//         ele.appendChild(wrapper);
//       });
//       currentWrapper.addEventListener('msAnimationEnd', function() {
//         currentWrapper.parentNode.removeChild(currentWrapper);
//         ele.appendChild(wrapper);
//       });
//       currentWrapper.addEventListener('animationend', function() {
//         currentWrapper.parentNode.removeChild(currentWrapper);
//         ele.appendChild(wrapper);
//       });
//     } else {
//       ele.appendChild(wrapper);
//     }
//   }

//   Calendar.prototype.drawLegend = function() {
//     var legend = createElement('div', 'legend');
//     var calendars = this.events.map(function(e) {
//       return e.calendar + '|' + e.color;
//     }).reduce(function(memo, e) {
//       if(memo.indexOf(e) === -1) {
//         memo.push(e);
//       }
//       return memo;
//     }, []).forEach(function(e) {
//       var parts = e.split('|');
//       var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
//       legend.appendChild(entry);
//     });
//     this.el.appendChild(legend);
//   }

//   Calendar.prototype.nextMonth = function() {
//     this.current.add('months', 1);
//     this.next = true;
//     this.draw();
//   }

//   Calendar.prototype.prevMonth = function() {
//     this.current.subtract('months', 1);
//     this.next = false;
//     this.draw();
//   }

//   window.Calendar = Calendar;

//   function createElement(tagName, className, innerText) {
//     var ele = document.createElement(tagName);
//     if(className) {
//       ele.className = className;
//     }
//     if(innerText) {
//       ele.innderText = ele.textContent = innerText;
//     }
//     return ele;
//   }
// }();

// !function() {




//   function addDate(ev) {

//   }


// }();


function clearOld(checkboxElem){
 
  if(checkboxElem.checked){
    jQuery(".expired").each(function(){
      jQuery(this).show();
    });
  }else{
    jQuery(".expired").each(function(){
      jQuery(this).hide();
    });
  }
}

});
 
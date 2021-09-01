/*
This file is for the concept of a calendar:
Req:
Use UIkit
Use Moment.js for timekeeping and date notation
Switcher for MONTH WEEK DAY management and display
GRID or masonry for making the days of the week or in the week 

*/


/*
Counting days in a month:

var moment = require('moment');

var a = moment('2013-01-01');
var b = moment('2013-06-01');

// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
  console.log(m.format('YYYY-MM-DD'));
}

// If you want an inclusive end date (fully-closed interval)
for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
  console.log(m.format('YYYY-MM-DD'));
}

*/
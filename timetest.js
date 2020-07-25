var moment = require("moment");

var startdate = moment();
var endDate;
setTimeout(()=>{endDate = moment(); var secondDiff = endDate.diff(startdate, 'seconds');
console.log(startdate);},4000,);

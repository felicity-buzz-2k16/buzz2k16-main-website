var getDateDiv = function (date) {
  return "<div class='date'>" + date + "</div><br>";
}
var pageroot = 'https://felicity.iiit.ac.in/buzz/'
var getDateEvent = function (event) {
  var atag = event.href ? "<a href=" + pageroot + event.href + " target='_blank'>": "";
  return "<li class='event'>"+atag+"<div class='eventname'><div>" + event.name +
    "</div><div>" + event.time + "</div></div>" + (event.href ? "</a>" : "") + "</li><br>";
}

var getDateList = function (date, event_list) {
  var ret = '';
  for (var i of event_list) {
    ret += getDateEvent(i);
  }
  return "<li class='datelist'>" + getDateDiv(date) + "<ul class='dateevent'>" + ret + "</ul></li><br>";
}

var eventsHTML = '';

for (var i of scheduleJSON) {
  eventsHTML += getDateList (i.date, i.events);
}

var mainlist = document.getElementById('mainlist');
mainlist.innerHTML = eventsHTML;

// Mark today on the calendar
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;

var tds = document.querySelectorAll('#oct tbody td');

if (month === 9) {
  tds = document.querySelectorAll('#sept tbody td');
}

for (var i = 0; i < tds.length; i++) {
  if (parseInt (tds[i].innerText) === day) {
    tds[i].className = "today";
  }
}

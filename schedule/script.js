var scheduleJSON = [
  {
    date: '29 September',
    events: [
      {name: 'Cache In', time: '08:00 AM', href: 'cachein'},
    ]
  },

  {
    date: '30 September',
    events: [
      {name: 'Sports(Futsal, 21 Points, Gully Cricket)', time: '05:00 PM', href: 'sports'},
      {name: 'Rubik\'s Cube', time: '05:30 PM', href: 'rubikscube'},
      {name: 'Zombie Zone', time: '07:00 PM', href: 'gaming'},
      {name: 'Na Show Na Estam', time: '08:00 PM', href: 'misc'},
      {name: 'Lit Quiz', time: '08:00 PM', href: 'lit'},
    ]
  },
  {
    date: '1 October',
    events: [
      {name: 'Hack In', time: '12:00 AM', href: 'hackin'},
      {name: 'Gordian Knot', time: '10:00 AM', href: 'gordianknot'},
      {name: 'Poster Making', time: '03:30 PM', href: 'kalakshetra'},
      {name: 'Pokemon Showdown!', time: '03:30 PM', href: 'gaming'},
      {name: 'Sports(Footsal, 21 Points, Gully Cricket)', time: '05:00 PM', href: 'sports'},
      {name: 'Rangoli Making', time: '05:00 PM', href: 'kalakshetra'},
      {name: 'JAM/ Air Crash', time: '06:00 PM', href: 'jam'},
      {name: 'Design It', time: '06:00 PM', href: 'designit'},
      {name: 'Zombie Zone', time: '07:00 PM', href: 'gaming'},
      {name: 'Hackathon', time: '07:00', href: 'hackathon'},
      {name: 'Mini Militia', time: '09:00 PM', href: 'minimilitia'},
      {name: 'CodeCraft', time: '10:00 PM', href: 'codecraft'},
    ]
  },
  {
    date: '2 October',
    events: [
      {name: 'Hackathon', time: '00:00', href: 'hackathon'},
      {name: 'Sports(Footsal, 21 Points, Gully Cricket)', time: '08:00 AM', href: 'sports'},
      {name: 'Zombie Zone Finals', time: '09:00 AM', href: 'gaming'},
      {name: 'Arduino', time: '09:00 AM - 12:00 Noon', href: 'arduino'},
      {name: 'Friends + Anime Quiz - Miscellaneous', time: '09:30 AM - 11:30 AM', href: 'faquiz'},
      {name: 'Face Painting', time: '10:30 AM', href: 'kalakshetra'},
      {name: 'Spin the Yarn', time: '12:00 PM', href: 'lit'},
      {name: 'Telugu antakshri', time: '03:00 PM', href: 'antakshri'},
      {name: 'Hindi antakshri', time: '03:00 PM', href: 'antakshri'},
      {name: 'Treasure Hunt', time: '05:00 PM', href: 'lit'},
      {name: 'Music and Dance night', time: '07:30 PM', href: 'lolz'}
    ]
  },
];

var getDateDiv = function (date) {
  return "<div class='date'>" + date + "</div><br>";
}
var pageroot = 'https://felicity.iiit.ac.in/buzz/'
var getDateEvent = function (event) {
  return "<li class='event'><a href=" + pageroot + event.href + " target='_blank'><div class='eventname'><div>" + event.name +
    "</div><div>" + event.time + "</div></div></a></li><br>";
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

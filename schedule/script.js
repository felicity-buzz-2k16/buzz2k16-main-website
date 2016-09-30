var scheduleJSON = [
  {
    date: '29 September',
    events: [
      {name: 'Cache In', time: '08:00 AM', href: '/cachein'},
      {name: 'Hack In', time: '09:00 PM', href: 'hackin'},
    ]
  },

  {
    date: '30 September',
    events: [
      {name: 'Sports(Futsal, 21 Points, Gully Cricket)', time: '05:00 PM', href: 'sports'},
      {name: 'Rubik\'s Cube', time: '05:30 PM', href: 'rubikscube'},
      {name: 'Rangoli Making', time: '06:00 PM', href: 'kalakshetra'},
      {name: 'Na Show Na Estam', time: '08:00 PM', href: 'misc'},
      {name: 'Zombie Zone', time: '07:00 PM', href: 'gaming'},
      {name: 'Lit Quiz', time: '08:00 PM', href: 'lit'},
      {name: 'Gordian Knot', time: '10:00 PM', href: 'gordianknot'},
    ]
  },
  {
    date: '1 October',
    events: [
      {name: 'Poster Making', time: '03:30 PM', href: 'kalakshetra'},
      {name: 'Pokemon Showdown!', time: '03:30 PM', href: 'gaming'},
      {name: 'Sports(Footsal, 21 Points, Gully Cricket)', time: '05:00 PM', href: 'sports'},
      {name: 'JAM/ Air Crash', time: '06:00 PM', href: 'jam'},
      {name: 'Design It', time: '06:00 PM', href: 'designit'},
      {name: 'CodeCraft', time: '08:30 PM', href: 'codecraft'},
      {name: 'Zombie Zone', time: '07:00 PM', href: 'gaming'},
      {name: 'Hackathon', time: '07:00', href: 'hackathon'},
    ]
  },
  {
    date: '2 October',
    events: [
      {name: 'Hackathon', time: '00:00', href: 'hackathon'},
      {name: 'Sports(Footsal, 21 Points, Gully Cricket)', time: '08:00 AM', href: 'sports'},
      {name: 'Arduino', time: '09:00 PM', href: 'arduino'},
      {name: 'Face Painting', time: '10:30 AM', href: 'kalakshetra'},
      {name: 'Spin the Yarn', time: '12:00 PM', href: 'lit'},
      {name: 'Telugu antakshri', time: '03:00 PM', href: 'antakshri'},
      {name: 'Hindi antakshri', time: '03:00 PM', href: 'antakshri'},
      {name: 'Zombie Zone Finals', time: '09:00 AM', href: 'gaming'},
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

var scheduleJSON = [
  {
    date: '28 September',
    events: [
      {name: 'Cache In', time: '12:00 AM', href: 'cachein'},
      {name: 'Cache In', time: '12:00 AM', href: 'cachein'},
    ]
  },

  {
    date: '29 September',
    events: [
      {name: 'Cache In', time: '12:00 AM', href: 'cachein'},
    ]
  },
];

var getDateDiv = function (date) {
  return "<div class='date'>" + date + "</div><br>";
}

var getDateEvent = function (event) {
  return "<li class='event'><a href=" + event.href + "><div class=''>" + event.name +
    "</div><div class=''>" + event.time + "</div></a></li><br>";
}

var getDateList = function (date, event_list) {
  console.log(date)
  var ret = '';
  for (var i of event_list) {
    ret += getDateEvent(i);
  }
  return "<li class='datelist'>" + getDateDiv(date) + "<ul class='dateevent'>" + ret + "</ul></li><br>";
}

var eventsHTML = '';

for (var i of scheduleJSON) {
  console.log(i)
  console.log(getDateList (i.date, i.events))
  eventsHTML += getDateList (i.date, i.events);
}

var mainlist = document.getElementById('mainlist');
mainlist.innerHTML = eventsHTML;

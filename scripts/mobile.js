var getDateDiv = function (date) {
	return "<h2 style=\"text-align:center;\">" + date + "</h2><br>";
}

var pageroot = 'https://felicity.iiit.ac.in/buzz/'
var getDateEvent = function (event) {
  var atag = event.href ? `<a href="${pageroot + event.href}">`: "";
	return `${atag}<article class=\"card\">
			<header>
				<button>${event.name}</button>
				<button class="dangerous">${event.time}</button>
			</header>
		</article>
		${event.href ? '</a>': ''}`
}

var getDateList = function (date, event_list) {
		console.log(date)
		var ret = '';
		for (var i of event_list) {
			ret += getDateEvent(i);
		}
		return  "<div>" + getDateDiv(date) + "<div>" + ret + "</div></div><br>";
		}

var eventsHTML = '';

for (var i of scheduleJSON) {
	console.log(i)
		console.log(getDateList (i.date, i.events))
		eventsHTML += getDateList (i.date, i.events);
}

var mainlist = document.getElementById('mainlist');
mainlist.innerHTML = eventsHTML;

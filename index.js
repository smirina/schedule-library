function schedule () {

  var nextID = 1;

  function getNextID () {
    return nextID++
  }


  function expand(id) {
    var ev = events[id]
    var expanded = Object.assign({},ev,{
      speaker: speakers[ev.speaker],
      place: places[ev.place],
      school: schools[ev.school]
    })
    return expanded
  }

  function getAllEvents () {
    return Object.keys(events).map(expand).sort(function (a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
  }

  function getByDate (date) {
    return eventsByDate[date].map(expand)
  }


  function getByDateInterval(date1, date2) {

  }

  function addEvent(data) {
    var id = data.id || getNextID()
    data.id = id
    events[id] = data

    var day = data.date.split('T')[0]
    if (!eventsByDate[day]) {eventsByDate[day] = []}
    eventsByDate[day].push(id)
    return id
  }

  function changeEvent() {

  }

  function addSchool(data) {
    var id = data.id || getNextID()
    data.id = id
    schools[id] = data
    return id
  }

  function changeSchool() {

  }

  function addPlace(data) {
    var id = data.id || getNextID()
    data.id = id
    places[id] = data
    return id
  }

  function changePlace() {

  }

  function addSpeaker(data) {
    var id = data.id || getNextID()
    data.id = id
    speakers[id] = data
    return id
  }

  function changeSpeaker() {

  }

  function serialize() {
    return JSON.stringify({
      events,
      schools,
      speakers,
      places
    })
  }

  function deserialize(data) {
    var parsed = JSON.parse(data)
    Object.assign(speakers, parsed.speakers)
    Object.assign(places, parsed.places)
    Object.assign(schools, parsed.schools)
    Object.assign(events, parsed.events)
  }

  var speakers = {}
  var schools = {}
  var places = {}
  var events = {}
  var eventsByDate = {}

  return {
    getByDate: getByDate,
    getByDateInterval: getByDateInterval,
    addEvent: addEvent,
    changeEvent: changeEvent,
    addSchool: addSchool,
    changeSchool: changeSchool,
    addPlace: addPlace,
    changePlace: changePlace,
    addSpeaker: addSpeaker,
    changeSpeaker: changeSpeaker,
    serialize: serialize,
    deserialize: deserialize,
    getAllEvents: getAllEvents
  }
}

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

  function getRange(date1, date2) {
    var range = []
    var d = new Date(date1)
    var c = d.toISOString().split('T')[0]
    var i = 0
    while (c != date2 && (i++ < 100)) {
      range.push(c)
      d.setDate(d.getDate() + 1)
      c = d.toISOString().split('T')[0]
      console.log(c)
    }
    range.push(c)
    console.log(range)
    return range
  }

  function getByDateInterval(date1, date2) {

    return getRange(date1, date2)
      .map(id => eventsByDate[id] || [])
      .reduce((result, day) => result.concat(day), [])
      .map(expand)
  }

  function getByPlaceAtDateInterval(place, date1, date2) {
    return getRange(date1, date2)
      .map(id => eventsByDate[id] || [])
      .reduce((result, day) => result.concat(day), [])
      .map(expand)
      .filter(ev => ev.place.id === place)
  }

  function checkEvent (data, id) {
    var day = data.date.split('T')[0]
    function toTime(ev) {
      return ev.date.split('T')[1]
    }
    var time = toTime(data)
    var error = null

    if (eventsByDate[day]) {
      var eventsSameDate = eventsByDate[day].map(id => events[id])
      for (var i = 0; i < eventsSameDate.length; i++) {
        var idCheck = id ? id == eventsSameDate[i].id : true
        if (toTime(eventsSameDate[i]) === time && !idCheck) {

          if (eventsSameDate[i].speaker === data.speaker){
            error = {error: true, message: 'This speaker is busy!'}
            console.log(error)
          }

          if (eventsSameDate[i].school === data.school) {
            error = {error: true, message: 'This school is busy!'}
            console.log(error)
          }

          if (eventsSameDate[i].place === data.place) {
            error = {error: true, message: 'This place is busy!'}
            console.log(error)
          }
        }

      }
    }

    if (schools[data.school].students > places[data.place].seats) {
      error = {error: true, message: 'Too much people for this place!'}
      console.log(error)
    }

    return error
  }

  function addEvent(data) {

    var error = checkEvent(data)
    var day = data.date.split('T')[0]

    if (error) {
      return error
    }

    var id = data.id || getNextID()
    data.id = id
    events[id] = data

    if (!eventsByDate[day]) {eventsByDate[day] = []}
    eventsByDate[day].push(id)

    return id
  }

  function changeEvent(id, data) {
    var error = checkEvent(data, id)
    if (error) {
      return error
    }
    events[id] = data
    return id
  }

  function addSchool(data) {
    var id = data.id || getNextID()
    data.id = id
    schools[id] = data
    return id
  }

  function changeSchool(id, data) {
    schools[id] = data
  }

  function addPlace(data) {
    var id = data.id || getNextID()
    data.id = id
    places[id] = data
    return id
  }

  function changePlace(id, data) {
    places[id] = data
  }

  function addSpeaker(data) {
    var id = data.id || getNextID()
    data.id = id
    speakers[id] = data
    return id
  }

  function changeSpeaker(id, data) {
    speakers[id] = data
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
    var eventsObj = parsed.events
    var eventsObjKeys = Object.keys(eventsObj).map(key => eventsObj[key])
    for (var i = 0; i < eventsObjKeys.length; i++) {
      addEvent(eventsObjKeys[i])
    }
  }

  var speakers = {}
  var schools = {}
  var places = {}
  var events = {}
  var eventsByDate = {}
  // var eventsBySpeaker = {}

  return {
    getByDate: getByDate,
    getByDateInterval: getByDateInterval,
    getByPlaceAtDateInterval: getByPlaceAtDateInterval,
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

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
    return getRange(date1, date2)
      .map(id => eventsByDate[id] || [])
      .reduce((result, day) => result.concat(day), [])
      .map(expand)
  }

  function addEvent(data) {

    var day = data.date.split('T')[0]
    function toTime(ev) {
      return ev.date.split('T')[1]
    }
    var time = toTime(data)
    var speaker = data.speaker
    var passEvent = null

    if (eventsByDate[day]) {
      console.log('date!')
      var eventsSameDate = eventsByDate[day].map(id => events[id])
      for (var i = 0; i < eventsSameDate.length; i++) {
        if (toTime(eventsSameDate[i]) === time) {

          if (eventsSameDate[i].speaker === data.speaker){
            passEvent = {error: true, message: 'This speaker is busy!'}
            console.log(passEvent)
          }

          if (eventsSameDate[i].school === data.school) {
            passEvent = {error: true, message: 'This school is busy!'}
            console.log(passEvent)
          }

          if (eventsSameDate[i].place === data.place) {
            passEvent = {error: true, message: 'This place is busy!'}
            console.log(passEvent)
          }
        }

      }
    }
    
    if (schools[data.school].students > places[data.place].seats) {
      passEvent = {error: true, message: 'Too much people for this place!'}
      console.log(passEvent)
    }

    console.log(schools[data.school].students, places[data.place].seats)

    if (passEvent) {
      return passEvent
    }

    var id = data.id || getNextID()
    data.id = id
    events[id] = data

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

  function changeSchool(id, data) {
    schools[id] = data
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
    var eventsObj = parsed.events
    var eventsObjKeys = Object.keys(eventsObj).map(key => eventsObj[key])
    for (var i = 0; i < eventsObjKeys.length; i++) {
      addEvent(eventsObjKeys[i])
    }
    // var speakersObj = parsed.speakers
    // var speakersObjKeys = Object.keys(speakersObj).map(key => speakersObj[key])
    // for (var n = 0; n < speakersObjKeys.length; n++) {
    //   addEvent(speakersObjKeys[n])
    // }
  }

  var speakers = {}
  var schools = {}
  var places = {}
  var events = {}
  var eventsByDate = {}
  // var eventsBySpeaker = {}

  return {
    getByDate: getByDate,
    // getBySpeaker: getBySpeaker,
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

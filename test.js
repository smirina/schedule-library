var myData = JSON.stringify({
  events: {
    1: {
      name: 'Вводная лекция',
      school: '1',
      place: '3',
      speaker: 'grlv',
      date: '2017-05-09T19:00:00'
    },
    2: {
      name: 'Интерфейсы и разработка',
      school: '2',
      place: '3',
      speaker: 'zen',
      date: '2017-05-10T19:00:00'
    },
    3: {
      name: 'Про дизайнеров',
      school: '2',
      place: '1',
      speaker: 'ktlh',
      date: '2017-05-10T19:00:00'
    }
  },
  schools: {
    1: {
      id: 'sh-mr',
      name: 'Школа мобильной разработки',
      students: 32
    },
    2: {
      id: 'sh-dis',
      name: 'Школа мобильного дизайна',
      students: 28
    },
    3: {
      id: 'sh-ri',
      name: 'Школа разработки интерфейсов',
      students: 32
    }
  },
  places: {
    1: {
      id: '1',
      name: 'Зеленая альпака',
      seats: 10
    },
    2: {
      id: '2',
      name: 'Желтоватый слон',
      seats: 32
    },
    3: {
      id: '3',
      name: 'Синий кит',
      seats: 40
    }
  },
  speakers: {
    grlv: {
      name: 'Андрей Гурылев',
      details: 'Разработчик Wrike'
    },
    ktlh: {
      name: 'Кирилл Телехов',
      details: 'Разработчик мобильных приложений'
    },
    zen: {
      name: 'Алиса Зен',
      details: 'Опытный дизайнер'
    }
  }
})

var mySchedule = schedule()

var mySchool = mySchedule.addSchool({name: 'Школа тестирования', students: 32})

var myPlace = mySchedule.addPlace({name: 'Зеленая альпака', seats: 35})

var mySpeaker = mySchedule.addSpeaker({name: 'Анатолий Сергеев', details: 'Опытный разработчик'})

var myEventData = {
  name: 'Первая лекция',
  school: mySchool,
  place: myPlace,
  speaker: mySpeaker,
  date: '2017-06-01T19:00:00'
}

var myEvent = mySchedule.addEvent(myEventData)

mySchedule.changeEvent(myEvent, Object.assign({}, myEventData, {name:'Первая лекция (обновлено)'}))

mySchedule.deserialize(myData)

var result = mySchedule.getByPlaceAtDateInterval('3', '2017-05-09', '2017-05-11')

var tpl = document.getElementById('timetable-row')
var timetableDiv = document.querySelector('.timetable')

function toCard(data) {
  var card = tpl.content.cloneNode(true)
  card.querySelector('.lection').innerHTML = data.name
  card.querySelector('.speaker').innerHTML = data.speaker.name
  card.querySelector('.date').innerHTML = new Date(data.date).toLocaleDateString()
  card.querySelector('.place').innerHTML = data.place.name
  return card
}

result
  .map(toCard)
  .forEach(el => timetableDiv.appendChild(el))

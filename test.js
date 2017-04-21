var myData = JSON.stringify({
  events: {
    1: {
      name: 'Еще лекция',
      school: '1',
      place: '1',
      speaker: 'grlv',
      date: '2017-05-10T19:00:00'
    },
    2: {
      name: 'Про дизайн',
      school: '2',
      place: '1',
      speaker: 'zen',
      date: '2017-05-03T19:00:00'
    },
    3: {
      name: 'Про дизайнеров',
      school: '1',
      place: '2',
      speaker: 'ktlh',
      date: '2017-05-04T19:00:00'
    }
  },
  schools: {
    1: {
      id: 'sh-ti',
      name: 'Школа тестирования',
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
      name: 'Зеленая альпака',
      seats: 30
    },
    2: {
      name: 'Желтоватый слон',
      seats: 32
    },
    3: {
      name: 'Синий кит',
      seats: 40
    }
  },
  speakers: {
    grlv: {
      name: 'Андрей Гурылев',
      details: 'Wrike'
    },
    ktlh: {
      name: 'Ктулху',
      details: 'Неописуем'
    },
    zen: {
      name: 'Алиса Зен',
      details: 'Самый главный лис'
    }
  }
})

var mySchedule = schedule()
//deserialize
// var mySchool = mySchedule.addSchool({name: 'Школа тестирования', students: 32})
//
// var myPlace = mySchedule.addPlace({name: 'Зеленая альпака', seats: 30})
//
// var mySpeaker = mySchedule.addSpeaker({name: 'Ктулху', details: 'Неописуем'})
//
// var myEvent = mySchedule.addEvent({
//   name: 'Первая лекция',
//   school: mySchool,
//   place: myPlace,
//   speaker: mySpeaker,
//   date: '2017-05-01T19:00:00'
// })


mySchedule.deserialize(myData)
var result1 = mySchedule.getAllEvents()

var tpl = document.getElementById('timetable-row')
var timetableDiv = document.querySelector('.timetable')

var result = mySchedule.getByDate('2017-05-04');

function toCard(data) {
  var card = tpl.content.cloneNode(true)
  card.querySelector('.lection').innerHTML = data.name
  card.querySelector('.speaker').innerHTML = data.speaker.name
  card.querySelector('.date').innerHTML = data.date
  return card
}


result
  .map(toCard)
  .forEach(el => timetableDiv.appendChild(el))

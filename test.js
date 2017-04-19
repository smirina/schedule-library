var myData = JSON.stringify({
  events: {
    1: {
      name: 'Еще лекция',
      school: '1',
      place: '1',
      speaker: '1',
      date: '2017-05-02T19:00:00'
    },
    2: {
      name: 'Про дизайн',
      school: '2',
      place: '1',
      speaker: '3',
      date: '2017-05-03T19:00:00'
    },
    3: {
      name: 'Про дизайнеров',
      school: 'sh-ti',
      place: '2',
      speaker: '2',
      date: '2017-05-03T19:00:00'
    }
  },
  schools: {
    'sh-ti': {
      id: 'sh-ti',
      name: 'Школа тестирования',
      students: 32
    },
    'sh-dis': {
      id: 'sh-dis',
      name: 'Школа мобильного дизайна',
      students: 28
    },
    'sh-ri': {
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
    gktlh: {
      name: 'Ктулху',
      details: 'Неописуем'
    },
    zen: {
      name: 'Алиса Зен',
      details: 'Самый главный лис'
    }
  }
})

//поправить сериалайзы - ивенты стоит добавлять по одному и средствами библиотеки, чтобы проверять данные

var mySchedule = schedule()
//import
var mySchool = mySchedule.addSchool({name: 'Школа тестирования', students: 32})

var myPlace = mySchedule.addPlace({name: 'Зеленая альпака', seats: 30})

var mySpeaker = mySchedule.addSpeaker({name: 'Ктулху', details: 'Неописуем'})

var myEvent = mySchedule.addEvent({
  name: 'Первая лекция',
  school: mySchool,
  place: myPlace,
  speaker: mySpeaker,
  date: '2017-05-01T19:00:00'
})

var result = mySchedule.getByDate('2017-05-01')

console.log('hello: ',result)

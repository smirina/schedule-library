# Задание 2

## Типы данных
В описании методов ниже используются обозначения:
id в системе обозначаются строками
### ev
Объект со свойствами name (string), school (id школы), place (id места проведения), speaker (id преподавателя), date (дата в формате iso)

### shortDate
Дата формата YYYY-MM-DD

Библиотека предоставляет следующие методы:
## Добавление и изменение событий:
### `addEvent(ev)`
Возвращает id при успешном добавлении или объект со свойством error в случае ошибки
### `changeEvent(id, ev)`

## Выборки
### `getAllEvents()`
### `getByDate(shortDate)`
### `getByDateInterval(shortDateFrom, shortDateTo)`
### `getByPlaceAtDateInterval(place, shortDateFrom, shortDateTo)`

## Добавление и изменение данных
### `addSchool(schoolData)`
### `changeSchool(id, schoolData)`
### `addPlace(placeData)`
### `changePlace(id, placeData)`
### `addSpeaker(speakerData)`
### `changeSpeaker(id, speakerData)`

## Сериализация данных
### `serialize()`
### `deserialize(data)`

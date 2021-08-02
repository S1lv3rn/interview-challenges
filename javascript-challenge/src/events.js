/**
  An event could look like this:
  ```
  {
    id: 107,
    startsAt: '2021-01-27T13:01:11Z',
    endsAt: '2021-01-27T15:01:11Z',
    title: 'Daily walk',
  }
  ```
*/


/**
  Take an array of events and return an object that is a  mapping from the 'day' to the events occuring on that day.
  The keys should be the day-difference to the earliest occuring event.
  Each days events should be sorted in ascending order of startsAt

  A result could look like:
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      { id: 156, startsAt: '2021-01-27T17:01:11Z',  endsAt: '2021-01-27T22:01:11Z',  title: 'Dinner' },
    ],
    2: [
      { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
    ]
  }
 ```

 Your solution should not modify any of the function arguments
*/
const groupEventsByDay = (events) => {
  let sortedEvents = events;
  let eventsByDays = {};
  //check if event array?

  sortedEvent.sort(function(a, b){return a.startsAt-b.startsAt});//use new Date()
  let startDate = sortedEvent[0].startsAt.date;

  for (let i = 0; i < sortedEvent; i++) {
    let key = (sortedEvents[i].startsAt.date - startDate).toString(); // fix the date stuff and evey thing will be done

    if (eventsByDay[key] == null) eventsByDay[key] = [];
    eventsByDay[key].push(sortedEvents[i]);
  }

  return eventsByDay;
};

/**
  Adjust the start and end date of an event so it maintains its total duration, but is moved `toDay`.
  `eventsByDay` should be the same as the return value of `groupEventsByDay`
  `id` will be the event that should be moved
  `toDay` will be a number that indicates the key of `eventsByDay` that the target event should be moved to

  Example:
  ```
  moveEventToDay(
    {
      0: [
        { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
      ],
      2: [
        { id: 5676, startsAt: '2021-01-29T13:01:11Z',  endsAt: '2021-01-29T15:01:11Z',  title: 'Daily walk' },
      ]
    },
    5676,
    3,
  )
  ```
  Should return something like
  ```
  {
    0: [
      { id: 106, startsAt: '2021-01-27T13:01:11Z',  endsAt: '2021-01-27T15:01:11Z',  title: 'Daily walk' },
    ],
    3: [
      { id: 5676, startsAt: '2021-01-30T13:01:11Z',  endsAt: '2021-01-30T15:01:11Z',  title: 'Daily walk' },
    ]
  },
  ```

  Your solution should not modify any of the function arguments
*/
const moveEventToDay = (eventsByDay, id, toDay) => { //what if moving the only ele of day 0
  //have to do a linear search bc events in the object are not sorted by id
  let newEventsByDay = eventsByDay;

  for (day of eventsByDay) {
    for (let j = 0; j < day.length; j++) { //looking through the array in the day

      if (day[j].id === id) {
        let oldArray = day;
        let arr1 = day.slice(0, j);
        let arr2 = day.slice(j+1);
        let targetEvent = day[j];
        newEventsByDay[day][j] = arr1.concat(arr2);

        let dayDiff = toDay - day;
        targetEvent.startsAt += dayDiff;
        targetEvent.endsAt += dayDiff;

        newEventsByDay[toDay].push(targetEvent);
        newEventsByDay[toDay].sort(function(a, b){return a.startsAt-b.startsAt});
        return newEventsByDay;
      }
    }
  }

  return null;
};

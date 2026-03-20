# Display Plugins

## RelativeTime

Adds methods to format dates as human-readable relative time strings (e.g., "3 hours ago").

```javascript
var relativeTime = require('dayjs/plugin/relativeTime')
// import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
```

### API

```javascript
dayjs().fromNow(withoutSuffix?)           // "in 31 years"
dayjs().from(dayjs('1990-01-01'))         // "in 31 years"
dayjs().from(dayjs('1990-01-01'), true)   // "31 years" (no suffix)

dayjs().toNow(withoutSuffix?)             // relative time to now
dayjs().to(dayjs('1990-01-01'))           // "31 years ago"
```

| Method | Returns | Description |
|--------|---------|-------------|
| `.fromNow(withoutSuffix?)` | string | Relative time from now |
| `.from(compared, withoutSuffix?)` | string | Relative time from a given date |
| `.toNow(withoutSuffix?)` | string | Relative time to now |
| `.to(compared, withoutSuffix?)` | string | Relative time to a given date |

---

## Calendar

Returns a formatted string for calendar-style time display relative to a reference date.

```javascript
var calendar = require('dayjs/plugin/calendar')
// import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

dayjs().calendar(dayjs('2008-01-01'))
```

### Custom Formats

```javascript
dayjs().calendar(null, {
  sameDay:  '[Today at] h:mm A',
  nextDay:  '[Tomorrow at] h:mm A',
  nextWeek: 'dddd [at] h:mm A',
  lastDay:  '[Yesterday at] h:mm A',
  lastWeek: '[Last] dddd [at] h:mm A',
  sameElse: 'DD/MM/YYYY'
})
```

| Key | When Used | Example Output |
|-----|-----------|----------------|
| `sameDay` | Same calendar day | "Today at 2:30 AM" |
| `nextDay` | The next day | "Tomorrow at 2:30 AM" |
| `nextWeek` | Within the next week | "Sunday at 2:30 AM" |
| `lastDay` | The previous day | "Yesterday at 2:30 AM" |
| `lastWeek` | Within the past week | "Last Monday at 2:30 AM" |
| `sameElse` | All other dates | "17/10/2011" |

---

## Duration

Adds `dayjs.duration()` and `dayjs.isDuration()` for working with time durations.

```javascript
var duration = require('dayjs/plugin/duration')
// import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

dayjs.duration(100)           // 100 milliseconds
dayjs.isDuration(value)       // boolean
```

Supports creating, cloning, humanizing, formatting, unit conversions (ms/s/m/h/d/w/M/y), add/subtract, diff, JSON, ISO 8601 strings, and locale.

---

## ToArray

Adds `.toArray()` which returns a Day.js instance as an array of date/time components.

```javascript
var toArray = require('dayjs/plugin/toArray')
// import toArray from 'dayjs/plugin/toArray'
dayjs.extend(toArray)

dayjs('2019-01-25').toArray()
// => [ 2019, 0, 25, 0, 0, 0, 0 ]
//      year, month(0-indexed), date, hours, minutes, seconds, ms
```

---

## ToObject

Adds `.toObject()` which returns a Day.js instance as a plain object.

```javascript
var toObject = require('dayjs/plugin/toObject')
// import toObject from 'dayjs/plugin/toObject'
dayjs.extend(toObject)

dayjs('2019-01-25').toObject()
// => { years: 2019, months: 0, date: 25, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
```

---

## BadMutable

Makes Day.js instances mutable so setters mutate in place rather than returning a new instance. **Not recommended — use only for moment.js migration.**

```javascript
var badMutable = require('dayjs/plugin/badMutable')
// import badMutable from 'dayjs/plugin/badMutable'
dayjs.extend(badMutable)

const today = dayjs()
today.add(1, 'day')
console.log(today) // mutated — shows tomorrow
```

Without this plugin, `today.add(1, 'day')` leaves `today` unchanged and returns a new instance.

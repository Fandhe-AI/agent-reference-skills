# Day.js — Durations

Duration objects represent a length of time (not a specific point in time). They are contextless — "2 hours" rather than "between 2 and 4 pm today." Unit conversions that require context (e.g., how many days in a year) are not reliable on durations; use `dayjs#diff` instead.

**Requires:** `Duration` plugin

```javascript
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
```

---

## Creating

```javascript
dayjs.duration(100)                  // 100 milliseconds
dayjs.duration(2, 'days')            // 2 days
dayjs.duration({
  seconds: 2, minutes: 2, hours: 2,
  days: 2, weeks: 2, months: 2, years: 2
})
dayjs.duration('P1Y2M3DT4H5M6S')    // ISO 8601
dayjs.duration('P1M')
```

### Available Units

| Unit | Shorthand |
|------|-----------|
| years | y |
| months | M |
| weeks | w |
| days | d |
| hours | h |
| minutes | m |
| seconds | s |
| milliseconds | ms |

---

## Clone

Returns a clone of the duration object.

```javascript
dayjs.duration().clone()
```

---

## Humanize

Displays a duration in human-readable text. Requires the `RelativeTime` plugin in addition to `Duration`.

**Requires:** `Duration` plugin + `RelativeTime` plugin

```javascript
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.duration(1, 'minutes').humanize()      // "a minute"
dayjs.duration(2, 'minutes').humanize()      // "2 minutes"
dayjs.duration(24, 'hours').humanize()       // "a day"

// With suffix
dayjs.duration(1, 'minutes').humanize(true)  // "in a minute"

// Past (negative value)
dayjs.duration(-1, 'minutes').humanize(true) // "a minute ago"
```

---

## Format

Returns a formatted string based on a token string. Wrap literal characters in square brackets to escape them.

```javascript
dayjs.duration({
  seconds: 1, minutes: 2, hours: 3,
  days: 4, months: 6, years: 7
}).format('YYYY-MM-DDTHH:mm:ss')
// "0007-06-04T03:02:01"
```

### Format Tokens

| Token | Output | Description |
|-------|--------|-------------|
| `Y` | 18 | Years (1-digit) |
| `YY` | 18 | Years (2-digit) |
| `YYYY` | 2018 | Years (4-digit) |
| `M` | 1-12 | Months |
| `MM` | 01-12 | Months (zero-padded) |
| `D` | 1-31 | Days |
| `DD` | 01-31 | Days (zero-padded) |
| `H` | 0-23 | Hours |
| `HH` | 00-23 | Hours (zero-padded) |
| `m` | 0-59 | Minutes |
| `mm` | 00-59 | Minutes (zero-padded) |
| `s` | 0-59 | Seconds |
| `ss` | 00-59 | Seconds (zero-padded) |
| `SSS` | 000-999 | Milliseconds |

---

## Milliseconds

`.milliseconds()` returns the milliseconds component (0–999).
`.asMilliseconds()` returns the total duration in milliseconds.

```javascript
dayjs.duration(500).milliseconds()    // 500
dayjs.duration(1500).milliseconds()   // 500
dayjs.duration(15000).milliseconds()  // 0

dayjs.duration(500).asMilliseconds()  // 500
dayjs.duration(1500).asMilliseconds() // 1500
dayjs.duration(15000).asMilliseconds()// 15000
```

---

## Seconds

`.seconds()` returns the seconds component (0–59).
`.asSeconds()` returns the total duration in seconds.

```javascript
dayjs.duration(500).seconds()    // 0
dayjs.duration(1500).seconds()   // 1
dayjs.duration(15000).seconds()  // 15

dayjs.duration(500).asSeconds()  // 0.5
dayjs.duration(1500).asSeconds() // 1.5
dayjs.duration(15000).asSeconds()// 15
```

---

## Minutes

`.minutes()` returns the minutes component (0–59).
`.asMinutes()` returns the total duration in minutes.

```javascript
dayjs.duration().minutes()
dayjs.duration().asMinutes()
```

---

## Hours

`.hours()` returns the hours component (0–23).
`.asHours()` returns the total duration in hours.

```javascript
dayjs.duration().hours()
dayjs.duration().asHours()
```

---

## Days

`.days()` returns the days component (0–30).
`.asDays()` returns the total duration in days.

```javascript
dayjs.duration().days()
dayjs.duration().asDays()
```

---

## Weeks

`.weeks()` returns the weeks component (0–4).
`.asWeeks()` returns the total duration in weeks.

> Note: weeks are counted as a subset of days and are **not** deducted from the days count. One week = 7 days.

```javascript
dayjs.duration().weeks()
dayjs.duration().asWeeks()
```

---

## Months

`.months()` returns the months component (0–11).
`.asMonths()` returns the total duration in months.

```javascript
dayjs.duration().months()
dayjs.duration().asMonths()
```

---

## Years

`.years()` returns the years component.
`.asYears()` returns the total duration in years.

```javascript
dayjs.duration().years()
dayjs.duration().asYears()
```

---

## Add

Returns a cloned duration with a specified amount of time added.

```javascript
var a = dayjs.duration(1, 'd')
var b = dayjs.duration(2, 'd')

a.add(b).days()            // 3  — pass another duration
a.add({ days: 2 }).days()  // 3  — pass an object
a.add(2, 'days').days()    // 3  — pass value + unit string
```

---

## Subtract

Returns a cloned duration with a specified amount of time subtracted.

```javascript
var a = dayjs.duration(3, 'd')
var b = dayjs.duration(2, 'd')

a.subtract(b).days()            // 1
a.subtract({ days: 2 }).days()  // 1
a.subtract(2, 'days').days()    // 1
```

---

## Using Duration with Diff

Pass the result of `dayjs#diff` to `dayjs.duration()` to get a duration object representing the time between two dates.

```javascript
var x = dayjs()
var y = dayjs()

var d = dayjs.duration(x.diff(y))
// duration object with the difference between x and y
```

See also: [Difference display docs](../display/difference.md)

---

## As Unit of Time

Alternative syntax to `Duration#asX` methods.

```javascript
var d = dayjs.duration(/* ... */)

d.as('hours')
d.as('minutes')
d.as('seconds')
d.as('milliseconds')
```

---

## Get Unit of Time

Alternative syntax to individual getter methods. Returns the component value (not the total as-X value).

```javascript
var d = dayjs.duration(/* ... */)

d.get('hours')
d.get('minutes')
d.get('seconds')
d.get('milliseconds')
```

---

## As JSON (toJSON)

When serialized to JSON, a duration is represented as an ISO 8601 string automatically.

```javascript
JSON.stringify({
  postDuration: dayjs.duration(5, 'm')
})
// '{"postDuration":"PT5M"}'
```

---

## Is a Duration

`dayjs.isDuration()` returns `true` only for duration objects created with `dayjs.duration()`.

```javascript
dayjs.isDuration()                          // false
dayjs.isDuration(new Date())                // false
dayjs.isDuration(dayjs())                   // false
dayjs.isDuration(dayjs.duration())          // true
dayjs.isDuration(dayjs.duration(2, 'minutes')) // true
```

---

## As ISO 8601 String (toISOString)

Returns the duration as an ISO 8601 duration string (`PnYnMnDTnHnMnS`).

```javascript
dayjs.duration(1, 'd').toISOString() // "P1D"
```

| Symbol | Meaning |
|--------|---------|
| P | Period designator (always at start) |
| Y | Years |
| M | Months (or Minutes after T) |
| D | Days |
| T | Time designator |
| H | Hours |
| S | Seconds |

---

## Locale

Get or set the locale of a duration. Affects string methods like `humanize()`.

**Requires:** `RelativeTime` plugin

```javascript
import 'dayjs/locale/es'

dayjs.duration(1, 'minutes').locale('en').humanize() // "a minute"
dayjs.duration(1, 'minutes').locale('es').humanize() // "un minuto"
```

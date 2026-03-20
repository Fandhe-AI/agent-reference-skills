# Day.js — Display

Once parsing and manipulation are done, you need some way to display the Day.js object. This section covers all display and output methods.

---

## format

Get the formatted date according to the string of tokens passed in. To escape characters, wrap them in square brackets (e.g., `[MM]`).

```javascript
dayjs().format()
// current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'

dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
// 'YYYYescape 2019-01-25T00:00:00-02:00Z'

dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'
```

### Format Tokens

| Token | Output | Description |
|-------|--------|-------------|
| `YY` | 18 | Two-digit year |
| `YYYY` | 2018 | Four-digit year |
| `M` | 1-12 | Month, starting at 1 |
| `MM` | 01-12 | Month, 2-digits |
| `MMM` | Jan-Dec | Abbreviated month name |
| `MMMM` | January-December | Full month name |
| `D` | 1-31 | Day of month |
| `DD` | 01-31 | Day of month, 2-digits |
| `d` | 0-6 | Day of week (Sunday = 0) |
| `dd` | Su-Sa | Min name of day of week |
| `ddd` | Sun-Sat | Short day name |
| `dddd` | Sunday-Saturday | Full day name |
| `H` | 0-23 | Hour (24-hour) |
| `HH` | 00-23 | Hour (24-hour), 2-digits |
| `h` | 1-12 | Hour (12-hour clock) |
| `hh` | 01-12 | Hour (12-hour), 2-digits |
| `m` | 0-59 | Minute |
| `mm` | 00-59 | Minute, 2-digits |
| `s` | 0-59 | Second |
| `ss` | 00-59 | Second, 2-digits |
| `SSS` | 000-999 | Millisecond, 3-digits |
| `Z` | +05:00 | UTC offset, ±HH:mm |
| `ZZ` | +0500 | UTC offset, ±HHmm |
| `A` | AM PM | Meridiem (uppercase) |
| `a` | am pm | Meridiem (lowercase) |

### Localized Formats

Requires the `LocalizedFormat` plugin:

```javascript
dayjs.extend(LocalizedFormat)
dayjs().format('L LT')
```

| Token | English Output | Example |
|-------|----------------|---------|
| `LT` | h:mm A | 8:02 PM |
| `LTS` | h:mm:ss A | 8:02:18 PM |
| `L` | MM/DD/YYYY | 08/16/2018 |
| `LL` | MMMM D, YYYY | August 16, 2018 |
| `LLL` | MMMM D, YYYY h:mm A | August 16, 2018 8:02 PM |
| `LLLL` | dddd, MMMM D, YYYY h:mm A | Thursday, August 16, 2018 8:02 PM |
| `l` | M/D/YYYY | 8/16/2018 |
| `ll` | MMM D, YYYY | Aug 16, 2018 |
| `lll` | MMM D, YYYY h:mm A | Aug 16, 2018 8:02 PM |
| `llll` | ddd, MMM D, YYYY h:mm A | Thu, Aug 16, 2018 8:02 PM |

> Additional formats (`Q`, `Do`, `k`, `kk`, `X`, `x`) are available through the `AdvancedFormat` plugin.

---

## fromNow

Returns the string of relative time from now. Requires the `RelativeTime` plugin.

```javascript
dayjs.extend(relativeTime)

dayjs('1999-01-01').fromNow()       // '22 years ago'
dayjs('1999-01-01').fromNow(true)   // '22 years'  (without suffix)
```

### Breakdown Range

| Range | Key | Sample Output |
|-------|-----|---------------|
| 0 to 44 seconds | s | a few seconds ago |
| 45 to 89 seconds | m | a minute ago |
| 90 seconds to 44 minutes | mm | 2 minutes ago ... 44 minutes ago |
| 45 to 89 minutes | h | an hour ago |
| 90 minutes to 21 hours | hh | 2 hours ago ... 21 hours ago |
| 22 to 35 hours | d | a day ago |
| 36 hours to 25 days | dd | 2 days ago ... 25 days ago |
| 26 to 45 days | M | a month ago |
| 46 days to 10 months | MM | 2 months ago ... 10 months ago |
| 11 months to 17 months | y | a year ago |
| 18 months+ | yy | 2 years ago ... 20 years ago |

---

## from

Returns a relative time string from a reference date. Requires the `RelativeTime` plugin.

```javascript
dayjs.extend(relativeTime)

var a = dayjs('2000-01-01')

dayjs('1999-01-01').from(a)        // 'a year ago'
dayjs('1999-01-01').from(a, true)  // 'a year'  (without suffix)
```

---

## toNow

Returns the relative time from a date to now. Requires the `RelativeTime` plugin.

```javascript
dayjs.extend(relativeTime)

dayjs('1999-01-01').toNow()       // 'in 22 years'
dayjs('1999-01-01').toNow(true)   // '22 years'  (without suffix)
```

> `toNow()` is the inverse of `fromNow()` — it shows how much time remains until now from a past date.

---

## to

Returns a relative time string to a reference date. Requires the `RelativeTime` plugin.

```javascript
dayjs.extend(relativeTime)

var a = dayjs('2000-01-01')

dayjs('1999-01-01').to(a)        // 'in a year'
dayjs('1999-01-01').to(a, true)  // 'a year'  (without suffix)
```

---

## calendar

Displays time relative to a given reference time (defaults to now), formatted contextually. Requires the `Calendar` plugin.

```javascript
dayjs.extend(calendar)

dayjs().calendar()
dayjs().calendar(dayjs('2008-01-01'))
```

### Default Output Keys

| Key | Display Value |
|-----|---------------|
| `lastWeek` | Last Monday at 2:30 AM |
| `lastDay` | Yesterday at 2:30 AM |
| `sameDay` | Today at 2:30 AM |
| `nextDay` | Tomorrow at 2:30 AM |
| `nextWeek` | Sunday at 2:30 AM |
| `sameElse` | 7/10/2011 |

### Custom Format

```javascript
dayjs().calendar(null, {
  sameDay:  '[Today at] h:mm A',
  nextDay:  '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay:  '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY'
})
```

> To escape characters, wrap them in square brackets (e.g., `[Today]`).

---

## diff

Calculates the difference between two date-time values in the specified unit.

```javascript
const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')

date1.diff(date2)                       // 20214000000  (default: milliseconds)
date1.diff('2018-06-05', 'month')       // 7
date1.diff('2018-06-05', 'month', true) // 7.645161290322581  (float)
```

### Available Units

| Unit | Shorthand | Description |
|------|-----------|-------------|
| `day` | `d` | Day |
| `week` | `w` | Week of Year |
| `quarter` | `Q` | Quarter |
| `month` | `M` | Month |
| `year` | `y` | Year |
| `hour` | `h` | Hour |
| `minute` | `m` | Minute |
| `second` | `s` | Second |
| `millisecond` | `ms` | Millisecond |

> Units are case insensitive and support plural and short forms. Short forms are case sensitive.

---

## valueOf

Returns the number of milliseconds since the Unix Epoch.

```javascript
dayjs('2019-01-25').valueOf() // 1548381600000
+dayjs(1548381600000)         // 1548381600000
```

---

## unix

Returns the number of seconds since the Unix Epoch, floored to the nearest second (no milliseconds).

```javascript
dayjs('2019-01-25').unix() // 1548381600
```

---

## daysInMonth

Returns the number of days in the current month.

```javascript
dayjs('2019-01-25').daysInMonth() // 31
```

---

## toDate

Returns a copy of the native JavaScript `Date` object parsed from the Day.js instance.

```javascript
dayjs('2019-01-25').toDate()
```

---

## toArray

Returns an array mirroring the date's parameters. Requires the `ToArray` plugin.

```javascript
dayjs.extend(toArray)

dayjs('2019-01-25').toArray()
// [ 2019, 0, 25, 0, 0, 0, 0 ]
// [ year, monthIndex, day, hour, minute, second, millisecond ]
```

> Month index is 0-based (January = 0).

---

## toJSON

Serializes the Day.js object as an ISO 8601 string (suitable for JSON).

```javascript
dayjs('2019-01-25').toJSON() // '2019-01-25T02:00:00.000Z'
```

---

## toISOString

Returns an ISO 8601 formatted string representation.

```javascript
dayjs('2019-01-25').toISOString() // '2019-01-25T02:00:00.000Z'
```

---

## toObject

Returns a plain object containing the date's properties. Requires the `ToObject` plugin.

```javascript
dayjs.extend(toObject)

dayjs('2019-01-25').toObject()
/* {
  years: 2019,
  months: 0,
  date: 25,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
} */
```

> `months` is 0-indexed (January = 0).

---

## toString

Returns a human-readable string representation of the date.

```javascript
dayjs('2019-01-25').toString() // 'Fri, 25 Jan 2019 02:00:00 GMT'
```

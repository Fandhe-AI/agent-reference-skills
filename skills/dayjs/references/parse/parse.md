# Day.js — Parse

Day.js creates a wrapper around the native `Date` object by calling `dayjs()` with supported input formats. The Day.js object is immutable — all API operations that change it return a new instance.

---

## Parse (Overview)

The `dayjs()` function accepts the following input types:

- Now (no argument)
- String (ISO 8601)
- String + Format (requires `CustomParseFormat` plugin)
- Unix Timestamp in milliseconds
- Unix Timestamp in seconds (`dayjs.unix()`)
- JavaScript `Date` object
- Object (requires `ObjectSupport` plugin)
- Array (requires `ArraySupport` plugin)
- UTC (requires `UTC` plugin)
- Day.js clone

---

## Now

Calling `dayjs()` without parameters returns a fresh Day.js object with the current date and time.

```javascript
var now = dayjs()
```

Equivalent to `dayjs(new Date())`.

**Special cases:**
- `dayjs(undefined)` — treated the same as `dayjs()` (parameters default to undefined when omitted)
- `dayjs(null)` — treated as invalid input; will not be processed

---

## String

Parse an ISO 8601 formatted string.

```javascript
dayjs('2018-04-04T16:00:00.000Z')
dayjs('2018-04-13 19:18:17.040+02:00')
dayjs('2018-04-13 19:18')
```

- Space character is accepted in place of the `T` separator
- UTC offset notation is supported (e.g., `+02:00`)
- Millisecond precision is optional

> For consistent results parsing anything **other** than ISO 8601 strings, use String + Format.

---

## String + Format

Parse a date using a known format string. Requires the `CustomParseFormat` plugin.

```javascript
dayjs.extend(customParseFormat)
dayjs("12-25-1995", "MM-DD-YYYY")
```

### Locale-Aware Parsing

Pass locale as the third parameter:

```javascript
require('dayjs/locale/es')
dayjs('2018 Enero 15', 'YYYY MMMM DD', 'es')
```

### Strict Parsing

Pass `true` as the fourth parameter to enforce exact format matching:

```javascript
dayjs('1970-00-00', 'YYYY-MM-DD').isValid()              // true
dayjs('1970-00-00', 'YYYY-MM-DD', true).isValid()        // false
dayjs('1970-00-00', 'YYYY-MM-DD', 'es', true).isValid()  // false
```

### Multiple Format Options

```javascript
dayjs("12-25-2001", ["YYYY", "YYYY-MM-DD"], 'es', true);
```

### Parsing Tokens

| Token | Example | Description |
|-------|---------|-------------|
| YY | 01 | Two-digit year |
| YYYY | 2001 | Four-digit year |
| M | 1-12 | Month (1-based) |
| MM | 01-12 | Two-digit month |
| MMM | Jan-Dec | Abbreviated month name |
| MMMM | January-December | Full month name |
| D | 1-31 | Day of month |
| DD | 01-31 | Two-digit day |
| H | 0-23 | 24-hour hour |
| HH | 00-23 | Two-digit 24-hour |
| h | 1-12 | 12-hour hour |
| hh | 01-12 | Two-digit 12-hour |
| m | 0-59 | Minutes |
| mm | 00-59 | Two-digit minutes |
| s | 0-59 | Seconds |
| ss | 00-59 | Two-digit seconds |
| S | 0-9 | 1-digit milliseconds |
| SS | 00-99 | 2-digit milliseconds |
| SSS | 000-999 | 3-digit milliseconds |
| Z | -05:00 | UTC offset |
| ZZ | -0500 | Compact UTC offset |
| A | AM PM | Meridiem (uppercase) |
| a | am pm | Meridiem (lowercase) |
| Do | 1st...31st | Ordinal day |
| X | 1410715640.579 | Unix timestamp (seconds) |
| x | 1410715640579 | Unix timestamp (milliseconds) |

Recognized separator characters: `-_:.,()/`

---

## Unix Timestamp (milliseconds)

Create a Day.js object from a Unix timestamp in milliseconds (13-digit integer since Jan 1 1970 12AM UTC).

```javascript
dayjs(1318781876406)
```

> The argument must be a **number**.

---

## Unix Timestamp (seconds)

Create a Day.js object from a Unix timestamp in seconds (10-digit integer). Internally multiplied by 1000.

```javascript
dayjs.unix(1318781876)
```

Fractional seconds are preserved:

```javascript
dayjs.unix(1318781876.721)
```

---

## Date

Create a Day.js object from a native JavaScript `Date` object. The `Date` object is cloned — mutations to the original do not affect the Day.js instance.

```javascript
var d = new Date(2018, 8, 18)
var day = dayjs(d)
```

---

## Object

Create a Day.js object by specifying units as an object. Requires the `ObjectSupport` plugin.

```javascript
dayjs.extend(objectSupport)

dayjs({ hour: 15, minute: 10 })
dayjs.utc({ y: 2010, M: 3, d: 5, h: 15, m: 10, s: 3, ms: 123 })
dayjs({ year: 2010, month: 3, day: 5, hour: 15, minute: 10, second: 3, millisecond: 123 })
dayjs({ years: 2010, months: 3, date: 5, hours: 15, minutes: 10, seconds: 3, milliseconds: 123 })
```

**Notes:**
- `day` and `date` both refer to the day of the month
- `dayjs({})` returns the current time
- Months are **0-indexed** (0 = January), matching `new Date(year, month, date)` behavior

### Supported Property Keys

| Short | Long | Plural |
|-------|------|--------|
| `y` | `year` | `years` |
| `M` | `month` | `months` |
| `d` / `date` | `day` | `date` |
| `h` | `hour` | `hours` |
| `m` | `minute` | `minutes` |
| `s` | `second` | `seconds` |
| `ms` | `millisecond` | `milliseconds` |

---

## Array

Create a Day.js object from an array of numbers mirroring the parameters of `new Date()`. Requires the `ArraySupport` plugin.

```javascript
dayjs.extend(arraySupport)

dayjs([2010, 1, 14, 15, 25, 50, 125]) // February 14th, 3:25:50.125 PM
dayjs.utc([2010, 1, 14, 15, 25, 50, 125])
dayjs([2010])        // January 1st
dayjs([2010, 6])     // July 1st
dayjs([2010, 6, 10]) // July 10th
```

**Notes:**
- `dayjs([])` with an empty array returns the current time
- Months are **0-indexed** (0 = January, 1 = February, ...)
- Array order: `[year, month, date, hours, minutes, seconds, milliseconds]`

---

## UTC

Parse and display dates in Coordinated Universal Time. Requires the `UTC` plugin.

By default, Day.js works in local time. `dayjs.utc()` switches all display, getter, and setter operations to UTC.

```javascript
dayjs.extend(utc)

// Local time
dayjs().format()     // 2019-03-06T08:00:00+08:00

// UTC time
dayjs.utc().format() // 2019-03-06T00:00:00Z
```

In UTC mode, all accessors use `Date#getUTC*` / `Date#setUTC*` internally:

```javascript
dayjs.utc().seconds(30).valueOf()
// equivalent to: new Date().setUTCSeconds(30)

dayjs.utc().seconds()
// equivalent to: new Date().getUTCSeconds()
```

Switch between UTC and local time:
- `dayjs#utc` — convert to UTC mode
- `dayjs#local` — convert to local time mode

---

## Dayjs Clone

All Day.js objects are immutable. Use `.clone()` or pass an existing Day.js object to `dayjs()` to create a copy.

```javascript
// Method 1: .clone()
var a = dayjs()
var b = a.clone()
// a and b are two separate Day.js objects

// Method 2: passing a Day.js object to dayjs()
var a = dayjs()
var b = dayjs(a)
```

Both approaches produce independent objects that do not share references.

---

## Validation — isValid()

Returns `true` if the Day.js object represents a valid date, `false` otherwise.

### Non-Strict (default)

Checks whether the value can be parsed into a Date/Time object. Overflow dates are automatically adjusted.

```javascript
dayjs('2022-01-33').isValid()
// true — parsed to 2022-02-02

dayjs('some invalid string').isValid()
// false
```

### Strict

Validates that the value is both parseable **and** an actual calendar date. Requires the `CustomParseFormat` plugin.

```javascript
dayjs('2022-02-31', 'YYYY-MM-DD', true).isValid()
// false — February 31st does not exist
```

Pass `true` as the third parameter (or fourth when locale is specified) to enable strict mode.

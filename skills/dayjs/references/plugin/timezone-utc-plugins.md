# Timezone/UTC Plugins

## UTC

Adds UTC mode with `.utc()`, `.local()`, `.utcOffset()`, and `.isUTC()` methods.

```javascript
var utc = require('dayjs/plugin/utc')
// import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
```

### API

```javascript
// Create in UTC mode
dayjs.utc().format()                    // 2019-03-06T09:11:55Z

// Convert local to UTC
dayjs().utc().format()                  // 2019-03-06T09:11:55Z

// Check UTC mode
dayjs.utc().isUTC()                     // true

// Switch back to local time
dayjs.utc().local().format()            // 2019-03-06T17:11:55+08:00

// With CustomParseFormat
dayjs.utc('2018-01-01', 'YYYY-MM-DD')

// UTC offset
dayjs().utcOffset()
```

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `dayjs.utc` | `(dateType?, format?)` | Dayjs | Create a Dayjs in UTC mode |
| `.utc()` | `()` | Dayjs | Clone with UTC flag |
| `.local()` | `()` | Dayjs | Clone in local time |
| `.utcOffset()` | `()` | Dayjs | Clone with new UTC offset |
| `.isUTC()` | `()` | boolean | Whether instance is in UTC mode |

### Notes

In UTC mode, display methods output UTC time. Getters/setters use `Date#getUTC*` / `Date#setUTC*` internally.

---

## Timezone

Adds timezone conversion with `dayjs.tz()`, `.tz()`, `dayjs.tz.guess()`, and `dayjs.tz.setDefault()`. **Requires UTC plugin.**

```javascript
var utc      = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
```

### Converting Between Timezones

```javascript
// Treat existing timestamp as UTC, then display in target timezone
dayjs('2014-06-01 12:00').tz('America/New_York')
// => 2014-06-01T08:00:00 in America/New_York

// Keep the wall-clock time, change timezone label
dayjs('2014-06-01 12:00').tz('America/New_York', true)
// => 2014-06-01T12:00:00 in America/New_York
```

### Parsing in a Timezone

```javascript
dayjs.tz('2013-11-18 11:55', 'Asia/Taipei').format()
// => 2013-11-18T11:55:00+08:00
```

### Converting UTC to Timezone

```javascript
dayjs.utc('2013-11-18 11:55').tz('Asia/Taipei').format()
// => 2013-11-18T19:55:00+08:00
```

### Guess User Timezone

```javascript
dayjs.tz.guess()  // e.g., "America/Chicago"
```

### Default Timezone

```javascript
dayjs.tz.setDefault('America/New_York')  // set default
dayjs.tz.setDefault()                    // reset to system timezone
```

### Notes

Unlike Moment.js, `dayjs()` always defaults to local timezone even after `setDefault()`. Only `dayjs.tz()` uses the configured default timezone.

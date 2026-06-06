# Timezone

Parse and convert dates across timezones using the UTC and Timezone plugins.

```javascript
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// Parse a string in a specific timezone
dayjs.tz('2013-11-18 11:55', 'Asia/Taipei').format()
// => '2013-11-18T11:55:00+08:00'

// Convert an existing time to another timezone
dayjs('2014-06-01 12:00').tz('America/New_York').format()
// => '2014-06-01T08:00:00-04:00'

// Detect the user's local timezone
dayjs.tz.guess() // => 'Asia/Tokyo'  (example)

// Set a default timezone for the app
dayjs.tz.setDefault('America/New_York')
dayjs.tz.setDefault() // reset to system timezone
```

## Notes

- Both `utc` and `timezone` plugins must be loaded; `timezone` depends on `utc`.
- `dayjs.tz(str, tz)` interprets the string as local time in that timezone.
- `.tz(tz)` on an existing instance converts to the target timezone without changing the underlying instant.
- Timezone names follow the IANA database (e.g., `'America/New_York'`, `'Asia/Tokyo'`).

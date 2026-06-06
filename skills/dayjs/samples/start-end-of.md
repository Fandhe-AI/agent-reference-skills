# Start and End of Time Unit

Snap a date to the beginning or end of a given time unit.

```javascript
import dayjs from 'dayjs'

const d = dayjs('2019-04-15 12:30:45')

// Start of unit
d.startOf('year')   // => 2019-01-01 00:00:00
d.startOf('month')  // => 2019-04-01 00:00:00
d.startOf('week')   // => 2019-04-14 00:00:00 (Sunday by default)
d.startOf('day')    // => 2019-04-15 00:00:00
d.startOf('hour')   // => 2019-04-15 12:00:00

// End of unit
d.endOf('year')     // => 2019-12-31 23:59:59.999
d.endOf('month')    // => 2019-04-30 23:59:59.999
d.endOf('day')      // => 2019-04-15 23:59:59.999

// Practical: date range for current month
const from = dayjs().startOf('month')
const to   = dayjs().endOf('month')
```

## Notes

- Both methods return a cloned object; the original is unchanged.
- Week start day depends on locale; use `weekday` plugin for locale-aware week boundaries.
- `endOf` sets milliseconds to 999, making it safe for inclusive range queries.
- Units are case-insensitive and accept plural/short forms (`'days'`, `'d'`).

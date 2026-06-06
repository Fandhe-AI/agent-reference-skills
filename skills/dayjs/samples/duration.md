# Duration

Represent and manipulate lengths of time (not tied to a specific start point) using the Duration plugin.

```javascript
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime' // needed for humanize()

dayjs.extend(duration)
dayjs.extend(relativeTime)

// Create from milliseconds
dayjs.duration(1000)           // 1 second

// Create from a value + unit
dayjs.duration(2, 'days')
dayjs.duration(90, 'minutes')

// Create from an object
dayjs.duration({ hours: 2, minutes: 30, seconds: 15 })

// Create from ISO 8601 duration string
dayjs.duration('P1Y2M3DT4H5M6S') // 1y 2mo 3d 4h 5m 6s

// Access components
const d = dayjs.duration({ hours: 1, minutes: 30 })
d.hours()        // 1
d.minutes()      // 30
d.asMinutes()    // 90  (total as a single unit)
d.asMilliseconds() // 5400000

// Human-readable string (requires relativeTime plugin)
dayjs.duration(1, 'day').humanize()    // "a day"
dayjs.duration(3, 'months').humanize() // "3 months"

// Check type
dayjs.isDuration(d) // true
```

## Notes

- Duration is a stand-alone concept: it has no reference date (use `add`/`subtract` to apply it to one).
- `hours()` returns the hours component only; `asHours()` converts the entire duration.
- `humanize()` requires the RelativeTime plugin to be loaded first.
- ISO 8601 strings: `P` prefix, `T` separates date from time parts (`P1DT2H` = 1 day 2 hours).

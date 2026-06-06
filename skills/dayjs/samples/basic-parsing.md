# Basic Parsing

Create Day.js objects from strings, native Date, timestamps, and objects.

```javascript
import dayjs from 'dayjs'

// Current time
dayjs() // => Dayjs object for now

// ISO 8601 string
dayjs('2019-01-25') // => 2019-01-25T00:00:00

// Native Date
dayjs(new Date(2019, 0, 25)) // => 2019-01-25T00:00:00

// Unix timestamp (milliseconds)
dayjs(1548381600000)

// Unix timestamp (seconds) — requires unix()
dayjs.unix(1548381600)

// Object
dayjs({ year: 2019, month: 0, date: 25 }) // month is 0-indexed

// Clone
const a = dayjs('2019-01-25')
const b = dayjs(a) // independent copy
```

## Notes

- Day.js objects are immutable; every operation returns a new instance.
- Month in object notation is 0-indexed (0 = January), matching native `Date`.
- `dayjs.unix()` expects seconds, not milliseconds.
- Invalid input results in an object where `.isValid()` returns `false`.

# Formatting

Convert a Day.js object to a formatted string using format tokens.

```javascript
import dayjs from 'dayjs'

// Default ISO 8601
dayjs().format()
// => '2020-04-02T08:02:17-05:00'

// Custom tokens
dayjs('2019-01-25').format('DD/MM/YYYY')     // => '25/01/2019'
dayjs('2019-01-25').format('YYYY-MM-DD')     // => '2019-01-25'
dayjs('2019-01-25').format('h:mm A')         // => '12:00 AM'
dayjs('2019-01-25').format('dddd, MMMM D')   // => 'Friday, January 25'

// Escape literal text with square brackets
dayjs('2019-01-25').format('[Today is] dddd') // => 'Today is Friday'
```

## Notes

- `YYYY` = 4-digit year, `MM` = 2-digit month, `DD` = 2-digit day.
- `HH` = 24-hour clock, `hh` = 12-hour clock; pair `hh` with `A` (AM/PM).
- `dddd` = full weekday name; `ddd` = abbreviated.
- Wrap any literal text in `[ ]` to prevent token substitution.

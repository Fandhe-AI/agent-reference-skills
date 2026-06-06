# Add and Subtract

Shift a date forward or backward by a given amount and unit.

```javascript
import dayjs from 'dayjs'

const base = dayjs('2019-01-25')

// Add
base.add(7, 'day')    // => 2019-02-01
base.add(1, 'month')  // => 2019-02-25
base.add(1, 'year')   // => 2020-01-25

// Subtract
base.subtract(7, 'day')   // => 2019-01-18
base.subtract(1, 'month') // => 2018-12-25

// Chaining
dayjs('2019-01-25')
  .add(1, 'day')
  .subtract(1, 'year')
  .format('YYYY-MM-DD')
// => '2018-01-26'

// Short-form unit aliases
base.add(7, 'd')  // 'day'
base.add(2, 'w')  // weeks
base.add(3, 'M')  // months (capital M)
base.add(1, 'y')  // years
```

## Notes

- `add` and `subtract` always return a new Day.js object; the original is unchanged.
- Unit strings are case-insensitive and support plural forms (`days`, `months`).
- `M` (month) is capital; `m` (minute) is lowercase — mixing them up is a common mistake.
- Chaining is supported because each operation returns a Dayjs instance.

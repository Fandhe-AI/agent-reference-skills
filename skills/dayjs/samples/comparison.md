# Date Comparison

Compare two dates using isBefore, isAfter, isSame, and diff.

```javascript
import dayjs from 'dayjs'

const a = dayjs('2019-01-25')
const b = dayjs('2018-06-05')

// Boolean comparisons
a.isBefore(b)              // false
a.isAfter(b)               // true
a.isSame(b)                // false
a.isSame('2019-01-25')     // true

// Granularity — only compare down to specified unit
a.isBefore('2019-02-01', 'month') // false (same month? no, but Jan < Feb → true)
a.isSame('2019-06-15', 'year')    // true  (both 2019)

// diff — numeric difference between two dates
a.diff(b)                  // 20214000000 (milliseconds, default)
a.diff(b, 'month')         // 7
a.diff(b, 'month', true)   // 7.645161... (float)
a.diff(b, 'day')           // 234
```

## Notes

- `isBefore` / `isAfter` / `isSame` accept a Dayjs object or any string/Date dayjs can parse.
- The optional second argument sets comparison granularity; coarser units ignore finer-grained differences.
- `diff` returns a truncated integer by default; pass `true` as the third argument for a float.
- Negative `diff` means the argument is later than the caller.

# Relative Time

Display human-readable relative time strings such as "3 days ago" using the RelativeTime plugin.

```javascript
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// From now
dayjs().fromNow()                       // "a few seconds ago"
dayjs('2020-01-01').fromNow()          // "5 years ago"
dayjs('2099-01-01').fromNow()          // "in 73 years"

// Without the suffix/prefix
dayjs('2020-01-01').fromNow(true)      // "5 years"

// Relative to a specific date
dayjs('2025-01-01').from(dayjs('2024-01-01'))  // "in a year"
dayjs('2025-01-01').from(dayjs('2024-01-01'), true) // "a year"

// To now / to a specific date
dayjs('2020-01-01').toNow()            // "in 5 years" (opposite direction)
dayjs('2020-01-01').to(dayjs('2025-06-01')) // "in 5 years"
```

## Notes

- RelativeTime depends on locale; load a locale before calling these methods to get localized strings.
- `fromNow()` is shorthand for `.from(dayjs())`.
- `toNow()` is shorthand for `.to(dayjs())` and reverses the direction.
- `withoutSuffix: true` strips "ago" / "in" for use in custom sentence construction.

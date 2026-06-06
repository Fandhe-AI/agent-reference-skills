# Custom Format Parsing

Parse date strings that don't follow ISO 8601 using the CustomParseFormat plugin.

```javascript
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

// Parse with explicit format
dayjs('12-25-1995', 'MM-DD-YYYY') // => 1995-12-25

// Locale-aware parsing
import 'dayjs/locale/es'
dayjs('2018 Enero 15', 'YYYY MMMM DD', 'es') // => 2018-01-15

// Strict mode — rejects invalid dates
dayjs('1970-00-00', 'YYYY-MM-DD', true).isValid() // false

// Multiple candidate formats
dayjs('12-25-2001', ['YYYY', 'YYYY-MM-DD'])
```

## Notes

- Without `customParseFormat`, non-ISO strings may be parsed incorrectly or produce invalid objects.
- Strict mode (`true` as third or fourth argument) requires an exact format match.
- Locale argument must come before the strict flag: `dayjs(str, format, locale, strict)`.
- Common tokens: `YYYY` year, `MM` month, `DD` day, `HH`/`mm`/`ss` time, `A` AM/PM.

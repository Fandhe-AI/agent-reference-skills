# Locale (i18n)

Switch the display language globally or per-instance.

```javascript
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'dayjs/locale/de'

// Change globally
dayjs.locale('ja')
dayjs('2019-01-25').format('YYYY年MM月DD日(dddd)') // => '2019年01月25日(金曜日)'

// Revert to English
dayjs.locale('en')

// Per-instance locale (does not affect global)
dayjs('2019-01-25').locale('de').format('dddd, D. MMMM YYYY')
// => 'Freitag, 25. Januar 2019'

// With RelativeTime in locale
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('ja')
dayjs('2020-01-01').fromNow() // => '5年前'
```

## Notes

- Only English is bundled by default; each additional locale must be explicitly imported.
- Changing the global locale does not retroactively affect already-created instances.
- Per-instance locale via `.locale('xx')` returns a new object and leaves the global setting untouched.
- Locale names match the IETF BCP 47 subtags used in the `dayjs/locale/` directory (e.g., `ja`, `zh-cn`, `pt-br`).

# Other Plugins

## BuddhistEra

Extends `format()` to support Buddhist Era (B.E.) year tokens. The Buddhist Era year = Gregorian year + 543 (e.g., 1977 AD = 2520 BE). Used in Cambodia, Laos, Myanmar, Thailand, Sri Lanka, and some Chinese communities.

```javascript
var buddhistEra = require('dayjs/plugin/buddhistEra')
// import buddhistEra from 'dayjs/plugin/buddhistEra'
dayjs.extend(buddhistEra)

dayjs().format('BBBB BB')
```

### Format Tokens

| Token | Output Example | Description |
|-------|----------------|-------------|
| `BBBB` | 2561 | Full Buddhist Era year (Gregorian + 543) |
| `BB` | 61 | Two-digit Buddhist Era year |

---

## DevHelper

Provides development-time warnings and hints. Automatically disabled when `process.env.NODE_ENV === 'production'`.

```javascript
var devHelper = require('dayjs/plugin/devHelper')
// import devHelper from 'dayjs/plugin/devHelper'
dayjs.extend(devHelper)
```

### Conditional Loading (Recommended Pattern)

```javascript
if (isInDevelopment) {
  var devHelper = require('dayjs/plugin/devHelper')
  dayjs.extend(devHelper)
}
```

JavaScript minifiers (e.g., UglifyJS) can automatically strip this plugin from production bundles.

---

## LocaleData

Adds `dayjs.localeData()` API to access locale-specific information such as month names, weekday names, and format patterns.

```javascript
var localeData = require('dayjs/plugin/localeData')
// import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
```

### Global Methods

```javascript
dayjs.months()
dayjs.monthsShort()
dayjs.weekdays()
dayjs.weekdaysShort()
dayjs.weekdaysMin()
dayjs.longDateFormat('L')
```

### Global Locale Data Object

```javascript
const globalLocaleData = dayjs.localeData()
globalLocaleData.firstDayOfWeek()
globalLocaleData.months()
globalLocaleData.monthsShort()
globalLocaleData.weekdays()
globalLocaleData.weekdaysShort()
globalLocaleData.weekdaysMin()
globalLocaleData.longDateFormat('L')
globalLocaleData.months(dayjs())
globalLocaleData.monthsShort(dayjs())
globalLocaleData.weekdays(dayjs())
globalLocaleData.weekdaysShort(dayjs())
globalLocaleData.weekdaysMin(dayjs())
globalLocaleData.meridiem()
globalLocaleData.ordinal()
```

### Instance Locale Data Object

```javascript
const instanceLocaleData = dayjs().localeData()
instanceLocaleData.firstDayOfWeek()
instanceLocaleData.months()
instanceLocaleData.monthsShort()
instanceLocaleData.weekdays()
instanceLocaleData.weekdaysShort()
instanceLocaleData.weekdaysMin()
instanceLocaleData.longDateFormat('L')
instanceLocaleData.meridiem()
instanceLocaleData.ordinal()
```

To use `longDateFormat('L')`, also extend `localizedFormat`:

```javascript
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
```

---

## UpdateLocale

Adds `dayjs.updateLocale()` to dynamically modify locale properties.

```javascript
var updateLocale = require('dayjs/plugin/updateLocale')
// import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  months: String[]
})
```

| Parameter | Type | Description |
|-----------|------|-------------|
| locale | string | Target locale identifier (e.g., `'en'`) |
| config | object | Locale properties to update (e.g., `months` as string array) |

### Notes

- v1.11.20: for a `config` property that is a plain object (not an array) and already exists as an object on the locale, `updateLocale` merges it one level deep (`{ ...existing, ...update }`) instead of replacing it wholesale. Arrays and primitive values are still replaced entirely (#3012).

---

## NegativeYear

Parses date strings that start with `-` followed by the year (e.g. `'-2020-01-01'`) as negative years.

```javascript
var negativeYear = require('dayjs/plugin/negativeYear')
// import negativeYear from 'dayjs/plugin/negativeYear'
dayjs.extend(negativeYear)

dayjs('-2020-01-01').year() // -2020
```

### Notes

- Only string input whose first character is `-` is handled by the plugin; other input, including non-negative year strings such as `'2020-01-01'`, is parsed as usual.
- Works with the utc plugin: with `dayjs.extend(utc)` as well, `dayjs.utc('-2020-01-01').year()` returns `-2020`.
- Not supported: `'01/03/-2021'` and `'01-03--2021'` produce Invalid Date in the plugin's tests. Use the year-first form (e.g. `'-2021/01/03'`; `dayjs('-2021/01/03').format('YYYY-MM-DD')` returns `'-2021-01-03'`).
- A leading `-` is treated as a negative year only when the rest of the string parses to a year that appears right after the `-`; otherwise the string is passed through unchanged (e.g. `dayjs('-03-15').format('YYYY-MM-DD')` returns `'2001-03-15'` in the plugin's tests).
- v1.11.12: the NegativeYear plugin was added (#2640), with UTC support (#2692). https://github.com/iamkun/dayjs/releases/tag/v1.11.12
- The official site has no docs page for this plugin (`day.js.org/docs/en/plugin/negative-year` returns 404). This page is based on https://github.com/iamkun/dayjs/blob/v1.11.23/src/plugin/negativeYear/index.js and https://github.com/iamkun/dayjs/blob/v1.11.23/test/plugin/negativeYear.test.js.

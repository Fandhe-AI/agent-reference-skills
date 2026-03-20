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

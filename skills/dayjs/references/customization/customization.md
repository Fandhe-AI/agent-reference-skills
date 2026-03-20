# Day.js — Customization

Day.js is very easy to customize. You can create new locales or modify existing ones using the `updateLocale` plugin.

## Customization (Overview)

### Creating Custom Locales

```javascript
var localeObject = {...} // Day.js locale Object
dayjs.locale('en-my-settings', localeObject);
```

### Updating Existing Locales

Requires the `UpdateLocale` plugin:

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  /**/
})
```

### Full Locale Object Template

```javascript
const localeObject = {
  name: 'es',
  weekdays: 'Domingo_Lunes ...'.split('_'),
  weekdaysShort: 'Sun_M'.split('_'), // optional
  weekdaysMin: 'Su_Mo'.split('_'), // optional
  weekStart: 1, // optional, 1 = Monday
  yearStart: 4, // optional
  months: 'Enero_Febrero ... '.split('_'),
  monthsShort: 'Jan_F'.split('_'), // optional
  ordinal: n => `${n}º`,
  formats: {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    l: 'D/M/YYYY',
    ll: 'D MMM, YYYY',
    lll: 'D MMM, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
  meridiem: (hour, minute, isLowercase) => {
    return hour > 12 ? 'PM' : 'AM'
  }
}
```

### Creating Locale Files

Structure for locale files (e.g., `dayjs/locale/es.js`):

```javascript
import dayjs from 'dayjs'

const locale = { ... }

dayjs.locale(locale, null, true)

export default locale
```

---

## Month Names (`Locale#months`)

`Locale#months` should be an array of full month names. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  months: [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
})
```

### Function-Based Month Names

For scenarios requiring conditional logic based on formatting context:

```javascript
dayjs.updateLocale("en", {
  months: function (dayjsInstance, format) {
    // dayjsInstance: the Day.js object being formatted
    // format: the formatting string
    if (/^MMMM/.test(format)) {
      return monthShortFormat[dayjsInstance.month()];
    } else {
      return monthShortStandalone[dayjsInstance.month()];
    }
  },
});
```

---

## Month Abbreviations (`Locale#monthsShort`)

`Locale#monthsShort` should be an array of abbreviated month names. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  monthsShort: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
})
```

`monthsShort` can also accept a callback function, similar to `Locale#months`.

---

## Weekday Names (`Locale#weekdays`)

`Locale#weekdays` should be an array of the weekday names. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdays: [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
})
```

---

## Weekday Abbreviations (`Locale#weekdaysShort`)

`Locale#weekdaysShort` should be an array of abbreviated weekday names. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
})
```

- The array follows the standard week order (Sunday through Saturday).
- This customization applies globally once set.

---

## Minimal Weekday Abbreviations (`Locale#weekdaysMin`)

`Locale#weekdaysMin` enables configuration of minimal two-letter weekday abbreviations. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
})
```

---

## Relative Time (`Locale#relativeTime`)

`Locale#relativeTime` provides replacement strings for the `dayjs#from` method. Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})
```

### Configuration Properties

| Key | Description |
|-----|-------------|
| `future` | Prefix/suffix applied to future dates (`%s` is replaced with the value) |
| `past` | Prefix/suffix applied to past dates (`%s` is replaced with the value) |
| `s`, `m`, `h`, `d`, `M`, `y` | Singular forms (a few seconds, a minute, an hour, a day, a month, a year) |
| `mm`, `hh`, `dd`, `MM`, `yy` | Plural forms (`%d` is replaced with the count) |

### Advanced: Function Token

For locales requiring special processing, tokens can be defined as functions:

```javascript
relativeTime: {
  yy: function (number, withoutSuffix, key, isFuture) {
    return string;
  }
}
```

**Function Parameters:**

| Parameter | Description |
|-----------|-------------|
| `number` | Unit count for the specified key |
| `withoutSuffix` | Boolean indicating if suffix display is omitted |
| `key` | The replacement key identifier |
| `isFuture` | Boolean for future vs. past context |

### Thresholds and Rounding

```javascript
var config = {
  thresholds: [{}],
  rounding: function
}
dayjs.extend(relativeTime, config)
```

Default threshold example:

```javascript
var thresholds = [
  { l: 's', r: 1 },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y', r: 1 },
  { l: 'yy', d: 'year' }
]
```

Custom threshold keys can be added and matched with locale updates:

```javascript
var thresholds = [
  ...,
  { l: 'ss', r: 59, d: 'second' }
]
dayjs.updateLocale('en', {
  relativeTime: {
    ...,
    ss: "%d seconds"
  }
})
```

The `rounding` function processes numeric values before formatting. Default is `Math.round`; alternatives like `Math.floor` can be substituted.

---

## Calendar (`Locale#calendar`)

`Locale#calendar` allows defining how dates are displayed in relative calendar format (e.g., "Yesterday", "Today", "Tomorrow"). Requires the `UpdateLocale` plugin.

```javascript
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L'
  }
})
```

### Configuration Keys

| Key | Description |
|-----|-------------|
| `lastDay` | Format for dates one day in the past |
| `sameDay` | Format for the current date |
| `nextDay` | Format for dates one day in the future |
| `lastWeek` | Format for dates in the previous week |
| `nextWeek` | Format for dates in the upcoming week |
| `sameElse` | Fallback format for all other dates |

### Advanced: Callback Functions

Calendar values can be defined as callback functions. The function receives a Day.js object representing "now" as the first parameter, and `this` refers to the current Day.js instance:

```javascript
function callback (now) {
    return '[hoy a la' + ((this.hour() !== 1) ? 's' : '') + ']' + now.format();
}
```

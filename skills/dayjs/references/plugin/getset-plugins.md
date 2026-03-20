# Get/Set Plugins

## DayOfYear

Gets or sets the day of the year (1–365/366).

```javascript
var dayOfYear = require('dayjs/plugin/dayOfYear')
// import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

dayjs('2010-01-01').dayOfYear()      // 1  (get)
dayjs('2010-01-01').dayOfYear(365)   // 2010-12-31 (set)
```

---

## WeekOfYear

Gets or sets the week number of the year.

```javascript
var weekOfYear = require('dayjs/plugin/weekOfYear')
// import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

dayjs('2018-06-27').week()    // 26 (get)
dayjs('2018-06-27').week(5)   // set week 5
```

---

## WeekYear

Gets the locale-aware week year. **Requires WeekOfYear plugin (extend first).**

```javascript
var weekOfYear = require('dayjs/plugin/weekOfYear')
var weekYear   = require('dayjs/plugin/weekYear')
// import weekOfYear from 'dayjs/plugin/weekOfYear'
// import weekYear from 'dayjs/plugin/weekYear'
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

dayjs().weekYear()
```

---

## IsoWeek

Gets/sets ISO week number, ISO weekday, and ISO week year. Also extends `.startOf()` / `.endOf()` with `'isoWeek'` unit.

```javascript
var isoWeek = require('dayjs/plugin/isoWeek')
// import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

dayjs().isoWeek()       // get ISO week number
dayjs().isoWeekday()    // get ISO weekday (1=Mon, 7=Sun)
dayjs().isoWeekYear()   // get ISO week year
dayjs().startOf('isoWeek')
dayjs().endOf('isoWeek')
```

---

## IsoWeeksInYear

Returns the number of ISO weeks in a year. **Requires IsLeapYear plugin.**

```javascript
var isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear')
var isLeapYear     = require('dayjs/plugin/isLeapYear')
// import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
// import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

dayjs('2004-01-01').isoWeeksInYear() // 53
dayjs('2005-01-01').isoWeeksInYear() // 52
```

---

## QuarterOfYear

Gets or sets the quarter (1–4). Extends `.add()`, `.subtract()`, `.startOf()`, `.endOf()` with `'quarter'` unit.

```javascript
var quarterOfYear = require('dayjs/plugin/quarterOfYear')
// import quarterOfYear from 'dayjs/plugin/quarterOfYear'
dayjs.extend(quarterOfYear)

dayjs('2010-04-01').quarter()    // 2 (get)
dayjs('2010-04-01').quarter(2)   // set quarter 2
```

---

## Weekday

Gets or sets the locale-aware day of the week. The start of the week (Sunday or Monday) is determined by the current locale.

```javascript
var weekday = require('dayjs/plugin/weekday')
// import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)

// When Sunday starts the week:
dayjs().weekday(-7)  // last Sunday
dayjs().weekday(7)   // next Sunday

// When Monday starts the week:
dayjs().weekday(-7)  // last Monday
dayjs().weekday(7)   // next Monday
```

---

## PluralGetSet

Adds plural aliases for all getter/setter methods.

```javascript
var pluralGetSet = require('dayjs/plugin/pluralGetSet')
// import pluralGetSet from 'dayjs/plugin/pluralGetSet'
dayjs.extend(pluralGetSet)

dayjs().milliseconds()  // same as dayjs().millisecond()
dayjs().seconds()
dayjs().minutes()
dayjs().hours()
dayjs().days()
dayjs().weeks()
dayjs().isoWeeks()
dayjs().months()
dayjs().quarters()
dayjs().years()
dayjs().dates()
```

---

## MinMax

Adds `dayjs.max()` and `dayjs.min()` static methods to compare multiple Day.js instances.

```javascript
var minMax = require('dayjs/plugin/minMax')
// import minMax from 'dayjs/plugin/minMax'
dayjs.extend(minMax)

// Returns the latest date (multiple arguments)
dayjs.max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))

// Returns the earliest date (array argument)
dayjs.min([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])
```

Both methods return a Day.js object.

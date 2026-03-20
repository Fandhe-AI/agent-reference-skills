# Day.js — Get + Set

Day.js uses overloaded getters and setters: calling these methods without parameters acts as a getter, and calling them with a parameter acts as a setter. All setter operations return new instances since dayjs objects maintain immutability.

```javascript
dayjs().second(30).valueOf() // => new Date().setSeconds(30)
dayjs().second()             // => new Date().getSeconds()
```

In UTC mode, methods map to their UTC equivalents:

```javascript
dayjs.utc().second(30).valueOf() // => new Date().setUTCSeconds(30)
dayjs.utc().second()             // => new Date().getUTCSeconds()
```

---

## Millisecond

Gets or sets the millisecond. Accepts values from 0 to 999. Values outside the range carry over to seconds.

```javascript
dayjs().millisecond()   // getter — returns 0-999
dayjs().millisecond(1)  // setter — returns new dayjs object
```

---

## Second

Gets or sets the second. Accepts values from 0 to 59. Overflow carries over to minutes.

```javascript
dayjs().second()   // getter — returns 0-59
dayjs().second(1)  // setter — returns new dayjs object
```

---

## Minute

Gets or sets the minutes. Accepts values from 0 to 59. Overflow carries over to hours.

```javascript
dayjs().minute()    // getter — returns 0-59
dayjs().minute(59)  // setter — returns new dayjs object
```

---

## Hour

Gets or sets the hour. Accepts values from 0 to 23 (24-hour clock). Overflow cascades to the next day.

```javascript
dayjs().hour()    // getter — returns 0-23
dayjs().hour(12)  // setter — returns new dayjs object
```

---

## Date of Month

Gets or sets the day of the month. Accepts values from 1 to 31. Overflow carries over to subsequent months.

> `dayjs#date` is for the date of the month, and `dayjs#day` is for the day of the week.

```javascript
dayjs().date()   // getter — returns 1-31
dayjs().date(1)  // setter — returns new dayjs object
```

---

## Day of Week

Gets or sets the day of the week. Accepts values from 0 (Sunday) to 6 (Saturday). Values outside the range cascade into adjacent weeks.

> `dayjs#date` is for the date of the month, and `dayjs#day` is for the day of the week.

```javascript
dayjs().day()   // getter — returns 0 (Sun) to 6 (Sat)
dayjs().day(0)  // setter — returns new dayjs object
```

---

## Day of Week (Locale Aware)

Gets or sets the day of the week based on locale settings. Requires the `Weekday` plugin. The meaning of index 0 depends on the locale's first day of the week.

```javascript
dayjs.extend(weekday)

// When Sunday is the first day of the week:
dayjs().weekday(-7)  // previous Sunday
dayjs().weekday(7)   // following Sunday
dayjs().weekday(-5)  // last Tuesday
dayjs().weekday(5)   // next Friday

// When Monday is the first day of the week:
dayjs().weekday(-7)  // previous Monday
dayjs().weekday(7)   // following Monday
```

---

## ISO Day of Week

Gets or sets the ISO day of the week where Monday = 1 and Sunday = 7. Requires the `IsoWeek` plugin.

```javascript
dayjs.extend(isoWeek)

dayjs().isoWeekday()   // getter — returns 1 (Mon) to 7 (Sun)
dayjs().isoWeekday(1)  // setter — Monday, returns new dayjs object
```

---

## Day of Year

Gets or sets the day of the year (1–366). Requires the `DayOfYear` plugin. Overflow propagates to the year.

```javascript
dayjs.extend(dayOfYear)

dayjs('2010-01-01').dayOfYear()     // 1
dayjs('2010-01-01').dayOfYear(365)  // 2010-12-31
```

---

## Week of Year

Gets or sets the week of the year. Requires the `WeekOfYear` plugin.

```javascript
dayjs.extend(weekOfYear)

dayjs('2018-06-27').week()   // 26
dayjs('2018-06-27').week(5)  // setter — returns new dayjs object
```

---

## Week of Year (ISO)

Gets or sets the ISO week of the year. Requires the `IsoWeek` plugin.

```javascript
dayjs.extend(isoWeek)

dayjs().isoWeek()   // getter — returns ISO week number
dayjs().isoWeek(2)  // setter — returns new dayjs object
```

---

## Month

Gets or sets the month. Accepts values from 0 to 11. Months are zero-indexed: January = 0, December = 11. Overflow carries over to the year.

```javascript
dayjs().month()    // getter — returns 0-11
dayjs().month(0)   // setter — January, returns new dayjs object
dayjs().month(11)  // setter — December, returns new dayjs object
```

---

## Quarter

Gets or sets the quarter of the year (1–4). Requires the `QuarterOfYear` plugin.

- Q1: January–March
- Q2: April–June
- Q3: July–September
- Q4: October–December

```javascript
dayjs.extend(quarterOfYear)

dayjs('2010-04-01').quarter()   // 2
dayjs('2010-04-01').quarter(2)  // setter — returns new dayjs object
```

---

## Year

Gets or sets the year.

```javascript
dayjs().year()      // getter — returns current year
dayjs().year(2000)  // setter — returns new dayjs object
```

---

## Week Year

Gets the week-year according to the current locale. Requires the `WeekYear` and `WeekOfYear` plugins.

```javascript
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)

dayjs().weekYear()  // getter — returns locale-aware week-year
```

---

## Week Year (ISO)

Gets the ISO week-year. Requires the `IsoWeek` plugin.

```javascript
dayjs.extend(isoWeek)

dayjs().isoWeekYear()  // getter — returns ISO week-year
```

---

## Weeks In Year (ISO)

Gets the number of ISO weeks in the year (52 or 53). Requires the `IsoWeeksInYear` and `IsLeapYear` plugins.

```javascript
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

dayjs('2004-01-01').isoWeeksInYear()  // 53
dayjs('2005-01-01').isoWeeksInYear()  // 52
```

---

## Get

Generic string getter. Retrieves the corresponding information using a unit string. Equivalent to calling the unit method directly.

```javascript
dayjs().get(unit) === dayjs()[unit]()
```

Units are case-insensitive and support plural and short forms (short forms are case-sensitive).

```javascript
dayjs().get('year')
dayjs().get('month')       // starts at 0
dayjs().get('date')
dayjs().get('hour')
dayjs().get('minute')
dayjs().get('second')
dayjs().get('millisecond')
```

### Available Units

| Unit | Shorthand | Description |
|------|-----------|-------------|
| `date` | `D` | Date of Month |
| `day` | `d` | Day of Week (Sunday=0, Saturday=6) |
| `month` | `M` | Month (January=0, December=11) |
| `year` | `y` | Year |
| `hour` | `h` | Hour |
| `minute` | `m` | Minute |
| `second` | `s` | Second |
| `millisecond` | `ms` | Millisecond |

---

## Set

Generic setter. Accepts a unit string and a value, returns a new instance with the changes applied. Equivalent to calling the unit method directly with a value.

```javascript
dayjs().set(unit, value) === dayjs()[unit](value)
```

Units are case-insensitive and support plural and short forms. Returns a new instance (immutable).

```javascript
dayjs().set('date', 1)
dayjs().set('month', 3)   // April
dayjs().set('second', 30)

// Chaining
dayjs().set('hour', 5).set('minute', 55).set('second', 15)
```

For available units, see the [Get](#get) section above.

---

## Maximum

Returns the latest (furthest future) Day.js instance from a collection. Requires the `MinMax` plugin.

```javascript
dayjs.extend(minMax)

// Multiple arguments
dayjs.max(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))

// Array input
dayjs.max([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])
```

---

## Minimum

Returns the earliest (furthest past) Day.js instance from a collection. Requires the `MinMax` plugin.

```javascript
dayjs.extend(minMax)

// Multiple arguments
dayjs.min(dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01'))

// Array input
dayjs.min([dayjs(), dayjs('2018-01-01'), dayjs('2019-01-01')])
```
